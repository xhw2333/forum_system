const express = require("express");
const User = require('../model/user');
const { addUser, findUserByName, findUserByNameAndPwd, findAllUsers } = require('../dao/userDao');

// 创建路由容器
const router = express.Router();

router.get("/hello", function (req, res) {
    res.status(200).json({
        data: 'hello world！'
    })
})

// 用户登录
router.post('/login', async function (req, res) {
    const { name, pwd } = req.body;
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
        users = users.map((item)=>{
            // 去除密码
            const {id,name} = item;
            return new User(id,name);
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

module.exports = router;