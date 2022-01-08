// 好友模块
const express = require('express');
const friendService = require('../service/friend');

const router = express.Router();

// 添加好友
router.post('/addfriend', function (req, res) {
    const { uid, fid } = req.body;
    return friendService.addFriend(res,uid,fid);
})

// 删除好友
router.post('/deletefriend', function (req, res) {
    const { uid, fid } = req.body;
   return friendService.deleteFriend(res,uid,fid);
})

// 获取好友列表
router.get('/friendlist', function (req, res) {
    const { uid } = req.query;
    return friendService.getFriendList(res,uid);
})


module.exports = router;
