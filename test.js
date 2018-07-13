BusClient = require('./client')
const events = require('./events')

let c1 = new BusClient('http://localhost:8000')
c1.login({username: 'yann', password: 'lul'})

let c2 = new BusClient('http://localhost:8000')
c2.listen(events.login, (data)=> {
    console.log('oh shit!',data)
    c2.connection.disconnect()
})