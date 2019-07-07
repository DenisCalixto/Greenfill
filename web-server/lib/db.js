let mysql = require('mysql');

let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'greenfill'
});

// connection.connect(function(error){
//     if(!!error) {
//         console.log(error);
//     }
//     else {
//         console.log('Connected!:)');
//     }
// });

// connection.end(function(error){
//     if(!!error) {
//         console.log(error);
//     }
//     else {
//         console.log('Disconnected!:(');
//     }
// });

module.exports = connection;