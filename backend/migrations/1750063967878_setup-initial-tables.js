exports.up = (pgm) => {
  pgm.createTable("categories", {
    id: "id",
    name: { type: "varchar(255)", notNull: true, unique: true },
  });

  pgm.createTable("subcategories", {
    id: "id",
    name: { type: "varchar(255)", notNull: true, unique: true },
    category_id: {
      type: "integer",
      notNull: true,
      references: '"categories"',
      onDelete: "CASCADE",
    },
  });

  pgm.createTable("products", {
    id: "id",
    product_name: { type: "varchar(255)", notNull: true, unique: true },
    subcategory_id: {
      type: "integer",
      notNull: true,
      references: '"subcategories"',
      onDelete: "CASCADE",
    },
  });

  pgm.createTable("sales", {
    invoice_id: { type: "varchar(50)", primaryKey: true },
    product_id: {
      type: "integer",
      notNull: true,
      references: '"products"',
      onDelete: "RESTRICT",
    },
    branch: { type: "char(1)", notNull: true },
    city: { type: "varchar(100)", notNull: true },
    customer_type: { type: "varchar(50)" },
    gender: { type: "varchar(10)" },
    unit_price: { type: "decimal(10, 2)", notNull: true },
    quantity: { type: "integer", notNull: true },
    tax_5_percent: { type: "decimal(10, 4)" },
    total: { type: "decimal(10, 4)", notNull: true },
    order_date: { type: "date", notNull: true },
    order_time: { type: "time", notNull: true },
    payment_method: { type: "varchar(50)" },
    cogs: { type: "decimal(10, 2)" },
    gross_margin_percentage: { type: "decimal(10, 9)" },
    gross_income: { type: "decimal(10, 4)" },
    rating: { type: "decimal(3, 1)" },
    discount: { type: "decimal(5, 2)", default: 0 },
    state: { type: "varchar(100)" },
    country: { type: "varchar(100)" },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("sales");
  pgm.dropTable("products");
  pgm.dropTable("subcategories");
  pgm.dropTable("categories");
};
