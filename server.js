const PORT = 3000
const FILE = 'db.json'

const NUM_TO_STR = {
  1: 'ONE',
  2: 'TWO',
  3: 'THREE',
  4: 'FOUR'
}

const fs = require('fs');
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(FILE)
const middlewares = jsonServer.defaults()
server.use(middlewares)

// custom PUT path to simulate relay state change as it is without body
server.put('/state/:relay/:state', (req, res) => {
  var relay = req.params['relay']
  var state = req.params['state']

  // assure no undefined key-value pairs end up in db
  if(!Object.keys(NUM_TO_STR).includes(relay)){
    res.send({"STATE": "NOT OK"})
    return
  }

  var file_content = fs.readFileSync(FILE);
  var content = JSON.parse(file_content);

  content.states[NUM_TO_STR[relay]] = state.toUpperCase()
  fs.writeFileSync(FILE, JSON.stringify(content));
  res.send({"STATE": "OK"})
})

// custom PUT path to simulate motion seconds change
server.put('/motion/:seconds', (req, res) => {
  var seconds = req.params['seconds']
  seconds = parseInt(seconds)

  // assure no undefined key-value pairs end up in db
  if(isNaN(seconds) || seconds <= 0){
    res.send({"MOTION": 0})
    return
  }

  var file_content = fs.readFileSync(FILE);
  var content = JSON.parse(file_content);

  content.motion['MOTION'] = seconds
  fs.writeFileSync(FILE, JSON.stringify(content));
  res.send({"MOTION": seconds})
})

// Use default router
server.use(router)
server.listen(PORT, () => {
  console.log('JSON Server is running')
})