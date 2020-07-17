module.exports = function(RED) {
    function SMSSendNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            var arr = msg.payload.toString().split(",");
            console.log('ARR:'+arr);
            var number = arr[0];
            console.log('NUMBER:'+number);
            var message = arr[1];
            console.log('MESSAGE:'+message);
            var SerialPort = require("serialport");
            var serialPort = new SerialPort("/dev/ttyUSB3", {
                baudRate: 115200
            });
            serialPort.on("open", function() {
                console.log('open');
                serialPort.write(new Buffer.from("AT+CMGF=1\r", 'utf8'), function(err, results) {
                    serialPort.write(new Buffer.from("AT+CMGS=\""+number+"\"\r", 'utf8'), function(err, results) {
                        serialPort.write(new Buffer.from(message + "\r\n" + String.fromCharCode(26), 'utf8'), function(err, results) {
                            serialPort.close(function (err){
                                console.log('port closed', err);
                            });
                        });
                    });
                });
            });
            node.send(msg);
        });
    }
    RED.nodes.registerType("sms-send",SMSSendNode);
}
