const EventBus = require('./EventBus')

let bs = new EventBus()

bs.addEvent('money', ({data, logger})=> logger('---- Message ---- we rich! '+data.cash))
bs.addEvent('timeflies', ({data, logger})=> logger('---- Message ---- we be old out here '+data.age))

bs.start()
