const EventBus = require('./EventBus')

let bs = new EventBus()

bs.addEvent('money')
bs.addEvent('timeflies', ({data})=> console.log('timeflies event' , data))
bs.addEvent('no callback')

bs.start()
