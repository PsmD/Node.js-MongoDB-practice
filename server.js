const express = require('express');
const app = express();
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));
import Diary from './models/Diary';


app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/views/home.html')
});
app.get('/write', (req, res)=>{
    res.sendFile(__dirname + '/views/write.html')
});
app.post('/add', (req, res)=>{
    res.send('전송완료');
    db.collection('post').insertOne({title: req.body.title, issues: req.body.issues}, ()=>{
        console.log('저장완료')
    });
});

app.listen(5000, ()=>{
    console.log('http://localhost:5000')
});
