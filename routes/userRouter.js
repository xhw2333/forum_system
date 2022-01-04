const express = require("express");
const User = require('../model/user');
const { addUser, findUserByName, findUserByNameAndPwd, updateUser, findAllUsers, findUserByKey } = require('../dao/userDao');
const { findFriendList } = require("../dao/friendDao");
const { findUserNote, findNoteByTag } = require("../dao/noteDao");

// 创建路由容器
const router = express.Router();

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