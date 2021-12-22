var express = require("express");
var bodyParser = require("body-parser");
var userRouter = require("./routes/userRouter.js");
var noteRouter = require("./routes/noteRouter");
var commentRouter= require("./routes/commentRouter");
var praiseRouter= require("./routes/praiseRouter");
var friendRouter= require("./routes/friendRouter");
var tagRouter= require("./routes/tagRouter");
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
app.use(userRouter);
app.use(noteRouter);
app.use(commentRouter);
app.use(praiseRouter);
app.use(friendRouter);
app.use(tagRouter);


app.listen(8000,function(){
    console.log("http://localhost:8000 running");
})


