const express = require('express')
require('./db/mongoose')
const seekerRouter = require('./routers/seeker')
const employerRouter = require('./routers/employer')
const app = express()
const port = process.env.PORT

app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,Content-Length, Accept-Encoding, X-CSRF-Token");
    next();
  });


app.use(seekerRouter)
app.use(employerRouter)
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})