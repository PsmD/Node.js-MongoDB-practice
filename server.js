const express = require('express');
const app = express();
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));
const MongoClient = require('mongodb').MongoClient;

var db;
MongoClient.connect('mongodb+srv://dragon:ehrhs431@cluster0.02ouy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (err, client)=>{
if(err) return console.log(err)    
db = client.db('diaryapp');
    console.log('저장완료');
            app.listen(5000, ()=>{
                console.log('http://localhost:5000')
    });
    
});


app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/home.html')
});
app.get('/write', (req, res)=>{
    res.sendFile(__dirname + '/write.html')
});
app.post('/add', (req, res)=>{
    res.send('전송완료');
    db.collection('post').insertOne({제목: req.body.title, 날짜: req.body.date}, ()=>{
        console.log('저장완료')
    });
});