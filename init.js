import "./db";
require("dotenv").config();
import "./models/User";
import app from "./server";

app.listen(process.env.PORT, ()=>{
    console.log('http://localhost:5000')
});