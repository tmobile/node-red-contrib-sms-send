module.exports = function(RED) {
    function SMSSendNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            var arr = msg.payload.toString().split(",");
            var number = arr[0];
            var message = arr[1];
            var SerialPort = require("serialport");
            var serialPort = new SerialPort("/dev/ttyUSB3", {
                baudRate: 115200
            });
            serialPort.on("open", function() {
                console.log('PORT OPEN');
                serialPort.write(new Buffer.from("AT+CMGF=1\r", 'utf8'), function(err, results) {
                     console.log("SMS MODE: AT+CMGF=1\r");
                    setTimeout(function(){
                        serialPort.write(new Buffer.from("AT+CMGS=\""+number+"\"\r", 'utf8'), function(err, results) {
                            console.log("SET RECIPIENT: AT+CMGS=\""+number+"\"\r");
                            setTimeout(function(){
                                serialPort.write(new Buffer.from(message + "\r\n" + String.fromCharCode(26), 'utf8'), function(err, results) {
                                    console.log("SENT MESSAGE:"+message+"\r");
                                    serialPort.close(function (err){
                                    console.log('PORT CLOSED');
                                    });
                                });
                            }, 3000);
                        });
                    }, 3000);
                });
            });
            node.send(msg);
        });
    }
    RED.nodes.registerType("sms-send",SMSSendNode);
}
