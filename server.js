const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const app = express();

//------VARIABLES-----------
let buzzArr = [];
let new_score = 0;

//-----MIDDLEWARE----------
app.use( express.static( 'public' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {extended:true} ) );

function hasCorrectKeys(keysToCheck){
  return function(req,res,next){
    let isValid = keysToCheck.every(function(el){
      return req.body.hasOwnProperty(el);
    });
    if(isValid){
      return next();
    }else{
      return res.send('AHHHH FUCK something\'s wrong');
    }
  };
}

//------REQUEST-HANDLERS--------------
app.get( '/buzzwords', ( req, res ) => {
  res.send({
    'buzzWords': buzzArr
  });
});

app.route( '/buzzword' )
  .post( hasCorrectKeys(['buzzword', 'points']), buzzwordPost )
  .put( hasCorrectKeys(['buzzword', 'heard']), buzzwordPut )
  .delete( hasCorrectKeys(['buzzword']), buzzwordDelete );

app.post( '/reset', hasCorrectKeys(['reset']), ( req, res ) => {
  buzzwordReset( req, res );
});

//-------FUNCTIONS---------------
function buzzwordPost( req, res ) {
  req.body.heard = false;
  buzzArr.push( req.body );
  res.send( {'success': true} );
}

function buzzwordPut( req, res ) {
  let pointsEarned = parseFloat(buzzArr.filter((el) => {
      return el.buzzword === req.body.buzzword;
    })[0].points);
  if(req.body.heard === 'true'){
    new_score+=pointsEarned;
  }else if(req.body.heard === 'false'){
    new_score-=pointsEarned;
  }
  res.send( {'success': true, 'newScore': new_score} );
}

function buzzwordDelete( req, res ) {
  for ( let j = 0; j < buzzArr.length; j++ ) {
    if( buzzArr[j].buzzword === req.body.buzzword ) {
      buzzArr.splice( j, 1 );
      res.send( {'success': true} );
      return;
    }
  }
  res.send( 'Even sherlock holmes couldn\'t find that buzzword, yo!' );
}

function buzzwordReset( req, res ) {
  if( req.body.reset ){
    buzzArr = [];
    new_score = 0;
    res.send( {'success': true} );
  }
}

//-------SERVER------------
// const server = app.listen( 3000, () => {
//   let host = server.address().address;
//   let port = server.address().port;

//   console.log( `Example app listening at http://localhost:${port}` );
// });

module.exports = app;