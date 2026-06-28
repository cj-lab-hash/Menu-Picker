import "dotenv/config";
import express from "express";
import cors from "cors";
import pg from "pg";

const { Pool } = pg;
const app = express();
const port = process.env.PORT || 3001;

app.use(cors({ origin: process.env.FRONTEND_URL || "*" }));
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

app.get("/", (req, res) => res.json({ ok: true, app: "Menu Picker API" }));

app.get("/api/dishes", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, category, image, ingredients, steps FROM dishes ORDER BY name ASC");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load dishes" });
  }
});

app.get("/api/favorites", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, category, image, ingredients, steps FROM favorites ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load favorites" });
  }
});

app.post("/api/favorites", async (req, res) => {
  const { name, category, image, ingredients, steps } = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });
  try {
    const result = await pool.query(
      `INSERT INTO favorites (name, category, image, ingredients, steps)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (name) DO UPDATE SET
         category = EXCLUDED.category,
         image = EXCLUDED.image,
         ingredients = EXCLUDED.ingredients,
         steps = EXCLUDED.steps
       RETURNING *`,
      [name, category || "Other", image || "", ingredients || [], steps || []]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save favorite" });
  }
});

app.delete("/api/favorites/:name", async (req, res) => {
  try {
    await pool.query("DELETE FROM favorites WHERE name = $1", [decodeURIComponent(req.params.name)]);
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to remove favorite" });
  }
});

app.listen(port, () => console.log(`Menu Picker API running on port ${port}`));
