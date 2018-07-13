BusClient = require('./BusClient')
const events = require('./events')

let c1 = new BusClient('http://localhost:8888')
c1.login({username: 'yann', password: 'lul'})
let ctr = 0

setInterval(()=> {
    c1.login({username: 'bigsott', password: ctr++})
}, 2000)

let c2 = new BusClient('http://localhost:8888')
c2.listen(events.login, (data)=> {
    console.log('oh shit!',data)
    // c2.connection.disconnect()
})