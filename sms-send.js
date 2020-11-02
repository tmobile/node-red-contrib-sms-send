/**
Copyright 2020 T-Mobile USA, Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

See the LICENSE file for additional language around the disclaimer of warranties.
Trademark Disclaimer: Neither the name of “T-Mobile, USA” nor the names of
its contributors may be used to endorse or promote products
*/

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
