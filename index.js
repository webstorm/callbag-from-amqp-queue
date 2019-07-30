const amqplib = require('amqplib/callback_api')
const fromAMQPQueue = (url, socketOptions, queue) => (start, sink) => {
    if (start !== 0) return;
    amqplib.connect(url, socketOptions, (err, connection) => {
        if (err) return sink(2, err)
        connection.once('error', (err) => sink(2, err))
        connection.once('close', (...args) => sink(2, args))
        connection.createConfirmChannel((err, channel) => {
            if (err) return sink(2, err)

            sink(0, (t, p) => {
                if (t !== 2) return;
                // unsuscribe
                channel.close()
                channel.removeAllListeners()
                connection.removeAllListeners()
                connection.close()
            })
            channel.consume(queue, (msg) => {
                sink(1, msg.content.toString('utf-8'))
            })
        })
    })
}

module.exports = fromAMQPQueue
