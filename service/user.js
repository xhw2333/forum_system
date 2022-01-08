const svgCaptcha = require('svg-captcha');
const User = require('../model/user');
const userDao = require('../dao/userDao');
const friendDao = require("../dao/friendDao");
const noteDao = require("../dao/noteDao");
const global = require("../utils/global");

/**
 * @description 处理登录的逻辑
 * @param {*} res 响应体
 * @param {*} name 用户名
 * @param {*} pwd 密码
 * @param {*} code 验证码
 * @returns 
 */
async function login(res, name, pwd, code) {
    // 验证码错误
    if (!code || code !== global.code) {
        return res.status(200).json({
            status: 0,
            data: null,
            msg: '验证码错误'
        })
    }
    try {
        const user = await userDao.findUserByNameAndPwd(name, pwd);
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
            msg: '服务器内部错误',
        })
    }
}

/**
 * @description 处理注册的逻辑
 * @param {*} res 响应体
 * @param {*} name 用户名
 * @param {*} pwd 密码
 * @returns 
 */
async function register(res, name, pwd) {
    try {
        // 判断用户是否已经存在
        const ifHas = await userDao.findUserByName(name);
        if (ifHas) return res.status(200).json({
            status: 0,
            data: null,
            msg: '该用户已存在'
        })

        userDao.addUser(name, pwd).then(result => {
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
                msg: '服务器内部错误',
            })
        })

    } catch (err) {
        res.status(500).json({
            status: -1,
            data: null,
            msg: '服务器内部错误',
        })
    }
}

/**
 * @description 处理获取用户列表的逻辑
 * @param {*} res 响应体
 */
function getUserList(res) {
    userDao.findAllUsers().then(users => {
        console.log(users);
        users = users.map((item) => {
            // 去除密码
            const { id, name } = item;
            return new User(id, name);
        })

        res.status(200).json({
            status: 1,
            data: users,
            msg: '获取用户列表成功'
        });
    }).catch(err => {
        res.status(500).json({
            status: -1,
            data: null,
            msg: '服务器内部错误',
        })
    })
}

/**
 * @description 处理获取用户基本情况的逻辑
 * @param {*} res 响应体
 * @param {*} uid 用户id
 * @returns 
 */
async function getUserBase(res, uid) {
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
        const friendList = await friendDao.findFriendList(uid);
        // 贴文数
        const noteList = await noteDao.findUserNote(uid);
        // 贴文分类情况
        const classify = await noteDao.findNoteByTag(uid);
        // console.log(friendList,noteList,classify)
        res.status(200).json({
            status: 1,
            data: {
                friendCount: friendList.length,
                noteTotal: noteList.length,
                classify
            },
            msg: '获取用户基本情况成功'
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            status: -1,
            data: null,
            msg: '服务器内部错误',
        })
    }
}

/**
 * @description 处理生成验证码的逻辑
 * @param {*} res 响应体
 */
function getCode(res) {
    var codeConfig = {
        size: 4,// 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 3, // 干扰线条的数量
        width: 100,
        height: 40,
        // background: '#fff'
    }
    // 生成验证码
    var captcha = svgCaptcha.create(codeConfig);
    // 存储验证码
    global.code = captcha.text.toLowerCase();
    // console.log(serve_code);

    // res.setHeader('Content-Type', 'image/svg+xml');
    res.status(200).json({
        status: 1,
        msg: '验证码',
        data: String(captcha.data),
    });
}

/**
 * @description 处理搜索用户的逻辑
 * @param {*} res 响应体
 * @param {*} key 关键字
 */
function searchUser(res, key) {
    userDao.findUserByKey(key).then(users => {
        console.log(users);
        users = users.map((item) => {
            // 去除密码
            const { id, name } = item;
            return new User(id, name);
        })

        res.status(200).json({
            status: 1,
            data: users,
            msg: '搜索结果已展示'
        });
    }).catch(err => {
        res.status(500).json({
            status: -1,
            data: null,
            msg: '服务器内部错误',
        })
    })
}

/**
 * @description 处理更新用户信息的逻辑
 * @param {*} res 响应体
 * @param {*} name 用户名
 * @param {*} pwd 密码
 * @param {*} uid 用户id
 * @returns 
 */
function updateUser(res, name, pwd, uid) {
    if (uid <= 0) {
        res.status(200).json({
            status: 0,
            msg: '无效用户。。',
            data: null
        })
        return;
    }
    userDao.updateUser(uid, name, pwd).then(flag => {
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
            msg: '服务器内部错误',
        })
    })
}

/**
 * @description 处理用户注销的逻辑
 * @param {*} res 响应体
 * @param {*} uid 用户id
 * @param {*} name 用户名
 * @param {*} pwd 密码
 * @returns 
 */
function logout(res, uid, name, pwd) {
    if (uid <= 0) {
        res.status(200).json({
            status: 0,
            msg: '无效用户。。',
            data: null
        })
        return;
    }
    userDao.deleteUserBySelf(uid, name, pwd).then(flag => {
        if (flag === true) {
            res.status(200).json({
                status: 1,
                data: flag,
                msg: '用户已注销'
            });
        } else {
            res.status(200).json({
                status: -1,
                data: flag,
                msg: '用户注销失败'
            });
        }

    }).catch(err => {
        res.status(500).json({
            status: -1,
            data: null,
            msg: '服务器内部错误',
        })
    })
}

module.exports = {
    login,
    register,
    getUserList,
    getUserBase,
    getCode,
    searchUser,
    updateUser,
    logout,
}
