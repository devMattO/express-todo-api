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

//------REQUESTS---------------
app.get( '/buzzwords', ( req,res ) => {
  res.send({
    'buzzWords': buzzArr
  });
});

app.route( '/buzzword' )
  .post( buzzwordPost )
  .put( buzzwordPut )
  .delete( buzzwordDelete );

app.post( '/reset', ( req, res ) => {
  buzzwordReset( req, res );
});

//-------FUNCTIONS---------------
function buzzwordPost( req, res ) {
  req.body.heard = false;
  buzzArr.push( req.body );
  res.send( {'success': true} );
}

function buzzwordPut( req, res ) {
  for ( let i = 0; i < buzzArr.length; i++ ) { //----------try functionally with map??
    if( buzzArr[i].buzzword === req.body.buzzword ) { //if the buzzword in the array|object is the same as the one coming in the body
      new_score += parseFloat( buzzArr[i].points ); //add its point value to your score
      res.send( {'success': true, 'newScore': new_score} );
      return;
    }
  }
  res.send( 'Even sherlock holmes couldn\'t find that buzzword, yo!' );
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
const server = app.listen( 3000, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log( `Example app listening at http://localhost:${port}` );
});