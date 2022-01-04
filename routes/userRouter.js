const express = require("express");
const svgCaptcha = require('svg-captcha');
const User = require('../model/user');
const { addUser, findUserByName, findUserByNameAndPwd, updateUser, findAllUsers, findUserByKey } = require('../dao/userDao');
const { findFriendList } = require("../dao/friendDao");
const { findUserNote, findNoteByTag } = require("../dao/noteDao");

// 创建路由容器
const router = express.Router();

//存储验证码
let serve_code = ''; 

// 用户登录
router.post('/login', async function (req, res) {
    const { name, pwd,code } = req.body;
    // 验证码错误
    if(!code || code !== serve_code){
        res.status(200).json({
            status: 0,
            data: null,
            msg: '验证码错误'
        })
        return;
    }
    try {
        const user = await findUserByNameAndPwd(name, pwd);
        if (user.length == 0) return res.status(200).json({
            status: 0,
            data: null,
            msg: '该用户不存在'
        })

        const { id, name: uname, pwd: upwd } = user[0] || null;
        res.status(200).json({
            status: 1,
            data: new User(id, uname, upwd),
            msg: '登录成功'
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: -1,
            data: null,
            msg: '',
        })
    }
})

// 用户注册
router.post("/register", async function (req, res) {
    const { name, pwd } = req.body;
    try {
        const ifHas = await findUserByName(name);
        if (ifHas) return res.status(200).json({
            status: 0,
            data: null,
            msg: '该用户已存在'
        })

        addUser(name, pwd).then(result => {
            console.log(result ? '插入成功' : '插入失败');

            res.status(200).json({
                status: 1,
                data: null,
                msg: '注册成功'
            });

        }).catch(err => {
            console.log(err);
            res.status(500).json({
                status: -1,
                data: null,
                msg: '',
            })
        })

    } catch (err) {
        res.status(500).json({
            status: -1,
            data: null,
            msg: '',
        })
    }
})

// 获取用户列表
router.get('/users', function (req, res) {
    findAllUsers().then(users => {
        console.log(users);
        users = users.map((item) => {
            // 去除密码
            const { id, name } = item;
            return new User(id, name);
        })

        res.status(200).json({
            status: 1,
            data: users,
            msg: ''
        });
    }).catch(err => {
        res.status(500).json({
            status: -1,
            data: null,
            msg: '',
        })
    })
})

// 获取用户基本情况
router.post('/base', async (req, res) => {
    const { uid } = req.body;
    if (uid <= 0) {
        res.status(200).json({
            status: 0,
            msg: '无效用户。。',
            data: null
        })
        return;
    }
    try {
        // 好友数
        const friendList = await findFriendList(uid);
        // 贴文数
        const noteList = await findUserNote(uid);
        // 贴文分类情况
        const classify = await findNoteByTag(uid);
        // console.log(friendList,noteList,classify)
        res.status(200).json({
            status: 1,
            data: {
                friendCount: friendList.length,
                noteTotal: noteList.length,
                classify
            },
            msg: ''
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            status: -1,
            data: null,
            msg: '',
        })
    }
})

// 获取验证码
router.get('/code', function (req, res) {
    var codeConfig = {
        size: 4,// 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 3, // 干扰线条的数量
        width:100,
        height: 40,
        // background: '#fff'
    }
    // 生成验证码
    var captcha = svgCaptcha.create(codeConfig);
    serve_code = captcha.text.toLowerCase();
    // console.log(serve_code);

    // res.setHeader('Content-Type', 'image/svg+xml');
    res.status(200).json({
        status: 1,
        msg: '验证码',
        data:String(captcha.data),
    });
})

// 搜索用户
router.post("/searchuser", function (req, res) {
    const { key } = req.body;
    findUserByKey(key).then(users => {
        console.log(users);
        users = users.map((item) => {
            // 去除密码
            const { id, name } = item;
            return new User(id, name);
        })

        res.status(200).json({
            status: 1,
            data: users,
            msg: ''
        });
    }).catch(err => {
        res.status(500).json({
            status: -1,
            data: null,
            msg: '',
        })
    })
})

// 更新用户信息
router.post("/updateuser", function (req, res) {
    const { name, pwd, uid } = req.body;
    if (uid <= 0) {
        res.status(200).json({
            status: 0,
            msg: '无效用户。。',
            data: null
        })
        return;
    }
    updateUser(uid, name, pwd).then(flag => {
        if (flag === true) {
            res.status(200).json({
                status: 1,
                data: flag,
                msg: '修改用户信息成功'
            });
        } else {
            res.status(200).json({
                status: -1,
                data: flag,
                msg: '修改用户信息失败'
            });
        }

    }).catch(err => {
        res.status(500).json({
            status: -1,
            data: null,
            msg: '',
        })
    })
})


module.exports = router;