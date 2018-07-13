const io = require('socket.io')()
const argv = require('yargs').argv
const fancylog = require('fancy-log')
const someWord = require('random-words')
const fs = require('fs')

const {logfile='./logs.txt' ,p = 8888 , port = p, n=someWord(), name=n} = process.env.ENV === 'docker' ? process.env : argv

const fileLogger = fs.createWriteStream(logfile, {
    flags: 'a' // 'a' means appending (old data will be preserved)
})

// Logger middleware to write into text file
let logger = (log) => {
    const msg = log+'\n'
    fileLogger.write(msg)
    fancylog(msg)
}

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




// const success = io.listen(port)
// if (success) logger(`event bus ${name.toUpperCase()} started on ${port}`)
const success = io.listen(port)
logger(`event bus ${name.toUpperCase()} started on ${port}`)