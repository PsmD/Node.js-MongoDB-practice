import "./db";
require("dotenv").config();
const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true})) 
app.set('view engine', 'ejs');


app.listen(process.env.PORT, ()=>{
    console.log('http://localhost:5000')
});

import rootRouter from "./routers/rootRouter";
app.use("/", rootRouter);
export default app;