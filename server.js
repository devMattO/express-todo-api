const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

//------ROUTES-------------
let buzzwordRouter = require('./routes/buzzword');


//-----MIDDLEWARE----------
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//-------------------------

app.get('/buzzwords', (req,res)=>{
  res.send({
    'buzzWords': ['budz']
  });
});

app.route('/buzzword')
  .post((req,res)=>{
    res.send();
  })
  .put((req,res)=>{
    res.send();
  })
  .delete((req,res)=>{
    res.send();
  });

const server = app.listen(3000, ()=>{
  let host = server.address().address;
  let port = server.address().port;

  console.log(`Example app listening at http://localhost:${port}`);
});