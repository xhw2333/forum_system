// 好友模块
const express = require('express');
const { findFriendList, findRelate, deleteFriend, addFriend } = require('../dao/friendDao');
const User = require('../model/user');

const router = express.Router();

// 添加好友
router.post('/addfriend', function (req, res) {
    const { uid, fid } = req.body;
    if (uid <= 0 || fid <= 0) {
        res.status(200).json({
            status: 0,
            msg: '无效用户。。',
            data: null
        })
        return;
    }

    if (uid === fid) {
        res.status(200).json({
            status: 0,
            data: null,
            msg: '不能添加自己为好友'
        })
        return;
    }
    findRelate(uid, fid).then(list => {
        if (list.length !== 0) return true;
        return addFriend(uid, fid);
    }).then((flag) => {
        if (flag == true) {
            res.status(200).json({
                status: 0,
                data: null,
                msg: '对方已是好友'
            })
        } else {
            res.status(200).json({
                status: 1,
                data: null,
                msg: '添加好友成功'
            })
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            status: -1,
            data: null,
            msg: ''
        })
    })
})

// 删除好友
router.post('/deletefriend', function (req, res) {
    const { uid, fid } = req.body;
    deleteFriend(uid, fid).then(msg => {
        res.status(200).json({
            status: 1,
            data: null,
            msg: '删除成功'
        })
    }).catch(err => {
        res.status(500).json({
            status: -1,
            data: null,
            msg: ''
        })
    })
})

// 获取好友列表
router.get('/friendlist', function (req, res) {
    const { uid } = req.query;
    if (uid <= 0) {
        res.status(200).json({
            status: 0,
            msg: '无效用户。。',
            data: null
        })
        return;
    }
    findFriendList(uid).then(list => {
        const data = list.map((item) => {
            const { friends, name } = item;
            return new User(friends, name);
        })
        res.status(200).json({
            status: 1,
            data,
            msg: '获取好友列表'
        })
    }).catch(err => {
        res.status(500).json({
            status: -1,
            data: null,
            msg: ''
        })
    })
})


module.exports = router;
