
import express from "express";
import pg from "pg";
const { Pool } = pg;

const app = express();
app.use(express.json());

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// dishes
app.get("/api/dishes", async (req,res)=>{
  const r = await pool.query("SELECT * FROM dishes");
  res.json(r.rows);
});

// favorites
app.get("/api/favorites", async (req,res)=>{
  const r = await pool.query("SELECT * FROM favorites");
  res.json(r.rows);
});

app.post("/api/favorites", async (req,res)=>{
  const {name,image,ingredients,steps} = req.body;
  await pool.query(
    "INSERT INTO favorites(name,image,ingredients,steps) VALUES ($1,$2,$3,$4)",
    [name,image,ingredients,steps]
  );
  res.sendStatus(201);
});

app.delete("/api/favorites/:name", async (req,res)=>{
  await pool.query("DELETE FROM favorites WHERE name=$1",[req.params.name]);
  res.sendStatus(200);
});

app.listen(3001);
