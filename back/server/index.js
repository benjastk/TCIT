const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();
 
const connectDb = async () => {
    try {
        const client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'testdb',
            password: 'Benja616-',
            port: 5432
        })
 
        await client.connect()
        const res = await client.query('SELECT * FROM posts.posts')
        await client.end()
    } catch (error) {
        //console.log(error)
    }
}
connectDb();

app.get("/api/getData", async(req, res) => {
  try {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'testdb',
        password: 'Benja616-',
        port: 5432
    })

    await client.connect()
    const resp = await client.query('SELECT * FROM posts.posts')
    await client.end()
    res.json({ message: resp });
  } catch (error) {
      console.log(error)
  }
  
});
app.post("/api/registerData", async(req, res) => {
    try {
        const client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'testdb',
            password: 'Benja616-',
            port: 5432
        })
        await client.connect()
        const res = await client.query("INSERT INTO posts.posts(nombre, descripcion, created_at, updated_at) VALUES ('"+ req.body.nombre +"', '"+ req.body.descripcion +"', '2023-11-19 23:51:00', '2023-11-19 23:51:00')")
        await client.end()
        res.json({ post: true }); 
    } catch (error) {
        //console.log(error)
    }
});
app.listen(PORT, () => {
  console.log('listo');
});