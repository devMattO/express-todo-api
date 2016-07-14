'use strict';
const app = require('./server');
// const PORT = process.env.PORT;



const server = app.listen( 3000, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log( `Example app listening at http://localhost:${port}` );
});