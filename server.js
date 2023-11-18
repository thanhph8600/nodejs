const express = require('express')
const app = express()
const port = 3000

const router_ = require('./router/root')

app.set("view engine",'ejs')
app.use(express.static("public"))

app.use('/',router_)

app.listen(port,(res)=>{
    console.log('website port '+ port);
})