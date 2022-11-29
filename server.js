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

// Use default router
server.use(router)
server.listen(PORT, () => {
  console.log('JSON Server is running')
})