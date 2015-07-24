var database = require('monk')('localhost/kwlh');
var users = database.get('users');
var whatever = users.remove();
console.log(whatever.then.toString());
