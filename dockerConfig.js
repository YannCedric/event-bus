const EventBus = require('./EventBus')
const argv = require('yargs').argv

const {logfile ,p , port = p, n, name=n} = process.env.ENV === 'docker' ? process.env : argv

let bus = new EventBus({logfile, port,name})

// Add some events to be watched
// in the sectio bellow
//------------------------------
bus.addEvent('bus', ({data, logger})=> logger('docker bus',data))



//------------------------------

bus.start()