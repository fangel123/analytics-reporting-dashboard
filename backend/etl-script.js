require("dotenv").config();
const { Client } = require("pg");
const xlsx = require("xlsx");

const client = new Client({ connectionString: process.env.DATABASE_URL });

const getOrInsert = async (table, column, value, extras = {}) => {
  if (!value) {
    throw new Error(
      `Nilai untuk kolom ${column} di tabel ${table} tidak boleh kosong.`
    );
  }
  let res = await client.query(`SELECT id FROM ${table} WHERE ${column} = $1`, [
    value,
  ]);
  if (res.rows.length > 0) {
    return res.rows[0].id;
  } else {
    const extraColumns = Object.keys(extras);
    const extraValues = Object.values(extras);
    const placeholders = extraColumns.map((_, i) => `$${i + 2}`).join(", ");
    const query = `
      INSERT INTO ${table} (${column}${
      extraColumns.length > 0 ? ", " + extraColumns.join(", ") : ""
    })
      VALUES ($1${extraColumns.length > 0 ? ", " + placeholders : ""})
      RETURNING id
    `;
    res = await client.query(query, [value, ...extraValues]);
    return res.rows[0].id;
  }
};

const cleanCurrency = (value) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    return parseFloat(value.replace(/[^0-9.-]+/g, ""));
  }
  return 0;
};

async function runETL() {
  await client.connect();

  try {
    const workbook = xlsx.readFile(
      "../supermarket-data/supermarket_sales.xlsx"
    );
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    console.log(`Ditemukan ${data.length} baris data. Memulai proses ETL...`);
    await client.query("BEGIN");

    for (const row of data) {
      if (
        !row["Order ID"] ||
        !row["Category"] ||
        !row["Sub-Category"] ||
        !row["Product Name"]
      ) {
        console.warn("Melewati baris dengan data esensial yang hilang:", row);
        continue;
      }

      const categoryName = row["Category"];
      const subCategoryName = row["Sub-Category"];
      const productName = row["Product Name"];

      const categoryId = await getOrInsert("categories", "name", categoryName);

      const subcategoryId = await getOrInsert(
        "subcategories",
        "name",
        subCategoryName,
        { category_id: categoryId }
      );

      const productId = await getOrInsert(
        "products",
        "product_name",
        productName,
        { subcategory_id: subcategoryId }
      );

      const saleQuery = `
        INSERT INTO sales (invoice_id, product_id, branch, city, customer_type, gender, unit_price, quantity, tax_5_percent, total, order_date, order_time, payment_method, cogs, gross_margin_percentage, gross_income, rating, discount, state, country)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
        ON CONFLICT (invoice_id) DO NOTHING;
      `;

      const salesValue = cleanCurrency(row["Sales"]);
      const quantity = row["Quantity"] || 1;
      const unitPrice = salesValue / quantity;

      const orderDate = new Date(Date.UTC(1900, 0, row["Order Date"] - 1));

      await client.query(saleQuery, [
        row["Order ID"],
        productId,
        "A",
        row["City"],
        row["Segment"],
        "Unknown",
        unitPrice,
        quantity,
        0,
        salesValue,
        orderDate,
        "00:00:00",
        row["Ship Mode"],
        salesValue - cleanCurrency(row["Profit"]),
        row["Profit Ratio"],
        cleanCurrency(row["Profit"]),
        5.0,
        row["Discount"],
        row["State"],
        row["Country"],
      ]);
    }

    await client.query("COMMIT");
    console.log("Proses ETL berhasil diselesaikan!");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Terjadi error selama ETL, transaksi dibatalkan:", error);
  } finally {
    await client.end();
  }
}

runETL();
