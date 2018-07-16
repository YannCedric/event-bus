const socket = require('socket.io-client')

class BusSubscriber  {
    constructor({hostname='localhost', port=8888}){
        this.host=`http://${hostname}:${port}`
        this.events = []
    }

    addSubscription(event, callback){
        this.events.push({event, callback})
    }

    subscribe(){
        this.connection = socket(this.host)

        this.events.forEach(({event,callback}) => {
            this.connection.on(event, (data) => {
                callback(data)
            })
        })
    }

}
module.exports=BusSubscriber