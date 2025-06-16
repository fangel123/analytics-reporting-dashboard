require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 3001;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(cors());
app.use(express.json());

app.get("/api/products/ranking", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.product_name, SUM(s.quantity) AS total_sold
      FROM sales s
      JOIN products p ON s.product_id = p.id
      GROUP BY p.product_name
      ORDER BY total_sold DESC;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/sales/correlation", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT quantity, discount, state FROM sales;
    `);
    const groupedByState = result.rows.reduce((acc, row) => {
      if (!acc[row.state]) {
        acc[row.state] = [];
      }
      acc[row.state].push({ x: row.quantity, y: parseFloat(row.discount) });
      return acc;
    }, {});
    res.json(groupedByState);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/sales/heatmap-by-country", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT state, SUM(quantity) AS total_quantity
      FROM sales
      GROUP BY state
      ORDER BY total_quantity DESC;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Backend server berjalan di http://localhost:${port}`);
});
