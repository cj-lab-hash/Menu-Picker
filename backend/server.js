import express from "express";
import pkg from "pg";
import cors from "cors";
const {Pool}=pkg;

const app=express();
app.use(cors());
app.use(express.json());

const pool=new Pool({connectionString:process.env.DATABASE_URL});

app.get("/api/dishes",async(req,res)=>{
 const r=await pool.query("SELECT * FROM dishes");
 res.json(r.rows);
});

app.listen(3001,()=>console.log("Server running"));
