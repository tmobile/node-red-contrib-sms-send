[![Travis (.com) branch](https://img.shields.io/travis/com/tmobile/node-red-contrib-sms-send/main?style=flat-square)](https://travis-ci.com/tmobile/node-red-contrib-sms-send) ![GitHub package.json version](https://img.shields.io/github/package-json/v/tmobile/node-red-contrib-sms-send?style=flat-square) [![npm (scoped)](https://img.shields.io/npm/v/@tmus/node-red-contrib-sms-send?style=flat-square)](https://www.npmjs.com/package/@tmus/node-red-contrib-sms-send)

# Send SMS Messages in Node-RED

> **Warning**: This Node-RED node has only been tested on the [Quectel EC25A](https://www.quectel.com/product/ec25.htm) module. If you find this node to work with other modules, or wish to contribute support for additional modules, let us know!

This node takes a `payload` in the format `<number>,<message>` where `<number>` is the phone number to send the message to and `<message>` is the message text. The message is then forwarded to the next node.
