const socket = require('socket.io-client')
const events = require('./events')

class BusClient  {
    constructor(host){
        this.host=host
    }

    login({username, password}){
        this.connection = socket(this.host)

        this.connection.emit(events.login, {username, password}, ()=>{
            this.connection.disconnect()
        })
    }

    listen(event, callback){
        this.connection = socket(this.host)

        this.connection.on(event, (data) => {
            callback(data)
        })
    }

}
module.exports=BusClient