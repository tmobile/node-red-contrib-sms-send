module.exports = function(RED) {
    function SMSSendNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            var arr = msg.payload.split(",");
            var number = Number(arr[0]);
            var message = arr[1];
            var SerialPort = require("serialport").SerialPort;
            var serialPort = new SerialPort("/dev/ttyUSB3", {
                baudrate: 115200
            });
            serialPort.on("open", function() {
                console.log('open');
                setTimeout(function(){ console.log("sleep(3)"); }, 3000);
                serialPort.write(new Buffer("AT+CMGF=1\r", 'ascii'), function(err, results) {
                    console.log('err ' + err);
                    console.log('results ' + results);
                });
                setTimeout(function(){ console.log("sleep(3)"); }, 3000);
                serialPort.write(new Buffer("AT+CMGS=\""+number+"\"\r", 'ascii'), function(err,$
                    console.log('err ' + err);
                    console.log('results ' + results);
                });
                setTimeout(function(){ console.log("sleep(3)"); }, 3000);
                serialPort.write(new Buffer(message + "\r\n" + chr(26), 'ascii'), function(err,$
                    console.log('err ' + err);
                    console.log('results ' + results);
                });
            });
            node.send(msg);
        });
    }
    RED.nodes.registerType("sms-send",SMSSendNode);
}
