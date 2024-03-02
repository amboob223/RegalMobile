const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db"); // because this is whats being exported form module.exports on the otyher page



// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'https://regalsouls.netlify.app');
//     next();
// });
//middleware is needed or we will get an error
app.use(cors());
app.use(express.json());

// what is set Heahder and why access-allow origin



//submitting the data
app.post("/souls", async (req, res) => {
    try {
        const { first, last, birthdate, phone, target, email} = req.body // we decontructed the body object in the cleint
        const newInfo = await pool.query(
            "INSERT INTO readings(id,first,last,email,phone,birthdate,target) VALUES(nextval('readings_id_seq'),$1,$2,$3,$4,$5,$6) RETURNING *",
            [first, last, email, phone, birthdate, target]
        );

        res.json(
            newInfo.rows[0]
            )//this is what we sending back to the browser

    } catch (error) {
        console.log(error.message)
            res.status(500).json({ error: "Internal Server Error" })
    }
})




app.listen("3000", () => {
    console.log("server works")
})