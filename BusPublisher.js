const socket = require('socket.io-client')

class BusPublisher  {
    constructor({hostname='localhost', port=8888}){
        this.host=`http://${hostname}:${port}`
    }

    publish({event='blank', data={}}={}){
        this.connection = socket(this.host)

        this.connection.emit(event, data , ()=>{
            this.connection.disconnect()
        })
    }

}
module.exports=BusPublisher