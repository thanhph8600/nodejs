const express = require('express')
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors');
const app = express();
const port = 3000


const router_ = require('./router/root')

app.set("view engine",'ejs')
app.use(express.static("public"))

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    // Add your store configuration if needed
}));
app.use(flash());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use(cors());
app.use(cors({
  allowedHeaders: ['Content-Type', 'Authorization', 'token'],
}));
app.use('/',router_)

app.listen(port,(res)=>{
    console.log('website port '+ port);
})