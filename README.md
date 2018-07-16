# EVENT BUS

Light event-bus (and clients), build with nodejs.  
The module can handle about 1400-1800 concurrent connections.

# API

## Event Bus

```javascript
const {EventBus} = require('event-bus-mini')

const bus = new EventBus({port: 8000, name: 'MY AWESOME BUS'})

bus.addEvent('event1', ({data, logger, client})=> {
    useData(data)
})

bus.addEvent('event2', ({data, logger, client})=> {
    useData2(data)
})

bus.addEvent('event3', ({data, logger, client})=> {
    useData3(data)
})

bus.start() // Actually start the server
```

#### Event Bus Inside Docker Container

To run the Bus inside a docker container,

  1. Edit the file `dockerConfig.js` to specify some events that will occure on the bus
  2. Build an image: `docker build -t eventbus .`
  3. Run this command to start a container, providing a **port** for your server AND **mapping** that port to a port on the host machine: `docker run -e p=9090 -p 8080:9090 eventbus`

## Bus Subscriber

```javascript
const {BusSubscriber} = require('event-bus-mini')

let sub = new BusSubscriber({hostname: '127.0.0.1',port: 8000})

sub.addSubscription('event1', (data)=> {
    console.log('got some dataaa!', data)
})

sub.addSubscription('event2', (data)=> {
    console.log('got some other dataaa!', data)
})

sub.addSubscription('event3', (data)=> {
    console.log('got even more awesome dataaa!', data)
})

sub.subscribe() // Start listening to listed events
```

## Bus Publisher

```javascript
const {BusPublisher} = require('event-bus-mini')

const publisher = new BusPublisher({hostname: '132.11.341',port:8000})

publisher.publish({event: 'event1', data: money})

publisher.publish({event: 'event2', data: {name: 'cedric', age: '22})

publisher.publish({event: 'event3', data: {awesomeness: 'gold'}})
```