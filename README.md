```
const { forEach } = require('callbag-basics')
const fromAMQPQueue = require('callbag-from-amqp-queue')
const url = {
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'guest',
    password: 'guest',
    locale: 'en_US',
    frameMax: 0,
    heartbeat: 0,
    vhost: '/',
};

const socketOptions = {};

const source = fromAMQPQueue(url, socketOptions, 'test')
forEach(x => console.log(x))(source)
```
