const express = require("express");
const userService = require("../service/user");

// 创建路由容器
const router = express.Router();


// 用户登录
router.post('/login', async function (req, res) {
    const { name, pwd, code } = req.body;
    return userService.login(res, name, pwd, code);
})

// 用户注册
router.post("/register", async function (req, res) {
    const { name, pwd } = req.body;
    return userService.register(res, name, pwd);
})

// 获取用户列表
router.get('/users', function (req, res) {
    return userService.getUserList(res);
})

// 获取用户基本情况
router.post('/base', async (req, res) => {
    const { uid } = req.body;
    return userService.getUserBase(res, uid);
})

// 获取验证码
router.get('/code', function (req, res) {
    return userService.getCode(res);
})

// 搜索用户
router.post("/searchuser", function (req, res) {
    const { key } = req.body;
    return userService.searchUser(res, key);
})

// 更新用户信息
router.post("/updateuser", function (req, res) {
    const { name, pwd, uid } = req.body;
    return userService.updateUser(res, name, pwd, uid);
})

// 用户注销
router.post("/logout", function (req, res) {
    const { uid, name, pwd } = req.body;
    return userService.logout(res,uid,name,pwd);
})


module.exports = router;