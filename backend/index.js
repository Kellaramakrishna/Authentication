const express = require("express");
const mysql = require("mysql");
const dotEnv = require("dotenv");
const cors = require("cors"); 
const registrationRoute = require("./router/resgistrationRoute");
const loginRoute=require("./router/loginRoute")
const app = express();

app.use(express.json());
app.use(cors()); 

dotEnv.config();

global.con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

con.connect((err) => {
    if (err) {
        console.error("Error connecting to database:", err);
    } else {
        console.log("Connected to database!");
    }
});

app.use("/voltuswave", registrationRoute);
app.use("/voltuswave", loginRoute);

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
