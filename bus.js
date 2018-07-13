const io = require('socket.io')()
const argv = require('yargs').argv
const logger = require('fancy-log')
const someWord = require('random-words')

const {p = 8888 , port = p, n=someWord(), name=n} = process.env.ENV === 'docker' ? process.env : argv

const events = require('./events')

io.on('connection', function(client){
    logger(`CONNECTION | ${client.id}`)

    client.on(events.login, (data, callback) => {
        logger(`${events.login} | ${client.id} | ${JSON.stringify(data)}`)
        callback()
        io.emit(events.login,data)
    })

    client.on('disconnect', () => {
        logger(`DISCONNECTION | ${client.id}`)
    })

})




const success = io.listen(port)
if (success) logger(`event bus ${name.toUpperCase()} started on ${port}`)