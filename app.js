const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./controller/user");
const noteRouter = require("./controller/note");
const commentRouter= require("./controller/comment");
const praiseRouter= require("./controller/praise");
const friendRouter= require("./controller/friend");
const tagRouter= require("./controller/tag");
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


