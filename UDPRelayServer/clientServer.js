var RELAY_PORT = 9999;
var RELAY_HOST = '127.0.0.1';
var dgram = require('dgram');

function clientServer() {

  var client = dgram.createSocket('udp4');

  client.on('message', function (message, remote) {
    try {
      var msgObj = JSON.parse(message.toString())
      if (msgObj.type == 'ack') {
        console.log(msgObj);
      } else {
        console.log(msgObj);
      }
    } catch (e) {
      console.log(message);
    }
  });

  client.bind(55555, '0.0.0.0');

  register(client)();
  setInterval(register(client),3600000);
}


function register(client) {
  return function () {
    var message = new Buffer('reg');
    client.send(message, 0, message.length, RELAY_PORT, RELAY_HOST, function (err, bytes) {
      if (err) throw err;
      console.log('UDP message sent to ' + RELAY_HOST + ':' + RELAY_PORT);
    });
  }
}

clientServer();