const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true})) 
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
require('dotenv').config()

app.listen(process.env.PORT, ()=>{
    console.log('http://localhost:5000')
});
app.use('/', require('./routes/menurouter.js'));

