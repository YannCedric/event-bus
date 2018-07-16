const BusPublisher = require('./BusPublisher')
const BusSubscriber = require('./BusSubscriber')

let bc = new BusPublisher({hostname: 'localhost', port: '8080'})
let bs = new BusSubscriber({hostname: 'localhost', port: '8080'})


setTimeout(() => {
    bc.publish({event: 'bus', data: {cash: 20000}})
}, 2000);
    
    
setTimeout(() => {
    bc.publish({event: 'bus', data: {age: 55}})
}, 3000);

bs.addSubscription('bus', (data)=> {
    console.log('bus', data)
})

bs.addSubscription('bus', (data)=> {
    console.log('sub got some money', data)
})

bs.subscribe()