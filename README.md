Small json-server to simulate raspberry API specified in another project.

Make copy to save original db.json

    nodemon server.js

## API description

| REST         | Return value  | Description |
|--------------|-----------| -------- |
| **PUT /state/{relay}/{state}** | {"STATE":"OK"} | Set single relays state, possible values defined in constants |
| **GET /states** | {"ONE":"OFF","TWO":"AUTO","THREE":"ON","FOUR":"OFF"} | Get relay states in single object, which is handled in ser object. |
| **GET /weather** | {"TEMP1": float, "TEMP2": float, "HUMID": float} | Query weather status from Arduino. |
| **GET /light** | {"LIGHT":float value} | Query light status from Arduino. |
| **GET /logs** | [log objects in a list] | Get saved logs. |