const express = require('express')
const app = express()
const port = 3000

// app.use('/', express.static("./"))
console.log("Server Started at port 6000");
app.use("/", express.static("./"))
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
})
app.get("/", function(req, res){
  res.sendFile(__dirname + "/battle.html")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
