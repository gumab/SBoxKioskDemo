var dgram = require('dgram');
function udpServer(){
 var port=9999;
 var host='0.0.0.0';
 var server=dgram.createSocket('udp4');
 server.on('listening',function(){
  var address = server.address();
  console.log('UDP Server listening on ' + address.address+':'+address.port);
 });
 server.on('message',function(message,remote){
  console.log(remote.address+':'+remote.port+'-'+message);
  //setInterval(sendAck(remote.address,remote.port),1000);
  server.close();
  sendAck(remote.address,remote.port)();
 });
 server.bind(port,host);
}

function sendAck(host, port){
return function(){
  var ack = new Buffer('ack');
  var client  = dgram.createSocket('udp4');
console.log(client);
  client.bind(9999,'0.0.0.0');
  client.send(ack,0,ack.length,port,host,function(err,bytes){
    console.log(host+':'+port+' - message sent');
    client.close();
  });
  udpServer();
}
}

udpServer();

