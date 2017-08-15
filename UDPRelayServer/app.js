var RELAY_PORT = 9999;
var RELAY_HOST = 'gumabae.iptime.org';
var dgram = require('dgram');


function run() {
  var targetHost = process.argv[2];
  var targetPort = process.argv[3];
  var data = process.argv[4];

  if (targetHost && targetPort && data) {
    var client = dgram.createSocket('udp4');
    var message = {
      target: {
        host: targetHost,
        port: targetPort
      },
      data: {
        myValue: data
      }
    }
    send(client, RELAY_HOST, RELAY_PORT, message);
  } else {
    console.log('usage >> node app.js HOST PORT DATA');
  }
}

function send(client, host, port, data) {
  var message = new Buffer(JSON.stringify(data));
  client.send(message, 0, message.length, port, host, function (err, bytes) {
    console.log(host + ':' + port + ' - message sent');
    client.close();
  });
}

run();