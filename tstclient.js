const BusPublisher = require('./BusPublisher')
const BusSubscriber = require('./BusSubscriber')

let bc = new BusPublisher({hostname: 'localhost', port: '8888'})
let bs = new BusSubscriber({hostname: 'localhost', port: '8888'})


setTimeout(() => {
    bc.publish({event: 'money', data: {cash: 20000}})
}, 2000);
    
    
setTimeout(() => {
    bc.publish({event: 'money', data: {age: 55}})
}, 3000);

setTimeout(() => {
    bc.publish({event: 'no callback', data: {age: 55}})
}, 4000);

// bs.addSubscription('money', (data)=> {
//     console.log('bus', data)
// })

bs.addSubscription('no callback')

bs.subscribe()