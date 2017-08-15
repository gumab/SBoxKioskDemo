var dgram = require('dgram');
var SERVER_HOST = '0.0.0.0';
var SERVER_PORT = 9999;
function udpServer() {
  var server = dgram.createSocket('udp4');
  server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ':' + address.port);
  });
  server.on('message', function (message, remote) {
    //console.log(message.toString());
    if (message.toString() == 'reg') {
      send(server, remote.address, remote.port);
    } else {
      try {
        var reqObj = JSON.parse(message.toString());
        if (reqObj.target) {
          send(server, reqObj.target.host, reqObj.target.port, reqObj.data);
        }
      } catch (e) {
        console.log('Can\' Parse message');
        console.log(message);
      }
    }
  });
  server.bind(SERVER_PORT, SERVER_HOST);
}

function send(client, host, port, data) {
  if (!data) {
    var ack = {
      type: 'ack',
      c_host: host,
      c_port: port
    };
    data = ack
  }
  var message = new Buffer(JSON.stringify(data));
  client.send(message, 0, message.length, port, host, function (err, bytes) {
    console.log(host + ':' + port + ' - message sent');
  });
}

udpServer();

