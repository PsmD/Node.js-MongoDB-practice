const express = require('express');
const app = express();

import rootRouter from "./routers/rootRouter";

app.use(express.urlencoded({extended: true})) 
app.set('view engine', 'ejs');
app.use("/", rootRouter);

export default app;