const io = require('socket.io')()
const fancylog = require('fancy-log')
const someWord = require('random-words')
const fs = require('fs')

module.exports = class EventBus {
    constructor({logfile='none',p = 8888 , port = p, n=someWord().toUpperCase(), name=n}={}){
        
        this.name = name
        this.port = port
        this.listeners = []
        // Logger middleware to write into text file
        this.logger = (log) => {
            const msg = log+'\n'
            if(logfile === 'none')
                fancylog(log)
            else {
                const fileLogger = fs.createWriteStream(logfile, {
                    flags: 'a' // 'a' means appending (old data will be preserved)
                })
                fileLogger.write(msg)
                fancylog(msg)
            }
        }

    }

    start(){
        const {name, port, logger} = this
        logger('        Events:')

        this.listeners.forEach( item => {
            logger(`            * ${item.event}`)
            io.on('connection', function(client){
                
                client.on(item.event, (data, clientCallback) => {
                    logger(`CONNECTION | ${client.id}`)
                    logger(`${item.event} | ${client.id} | ${JSON.stringify(data)}`)
                    
                    io.emit(item.event,data)
                    
                    item.callback({data, logger, client})
                    
                    clientCallback()
                    client.on('disconnect', () => {
                        logger(`DISCONNECTION | ${client.id}`)
                    })
                })
            
            })
        })


        io.listen(port) // blocking line
        logger(`Event-Bus ${name} started on ${port}`)
    }

    addEvent(event, callback){
        this.listeners.push({event, callback})
    }
}