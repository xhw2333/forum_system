var express = require("express");
var bodyParser = require("body-parser");
var router = require("./routes/router.js");
const cors = require('cors');

var app = express();

//跨域问题
app.use(cors());

//配置
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/',express.static('./views/'));

//挂在路由
app.use(router);


app.listen(3000,function(){
    console.log("http://localhost:3000 running");
})


