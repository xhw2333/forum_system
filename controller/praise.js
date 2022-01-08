// 点赞模块
const express = require('express');
const praiseService = require('../service/praise');

// 路由容器
const router = express.Router();

// 点赞贴文
router.post('/praise', function (req, res) {
    const { nid, uid } = req.body;
    return praiseService.praiseNote(res,nid,uid);
})

// 取消点赞贴文
router.post('/cancelpraise', function (req, res) {
    const { nid, uid } = req.body;
    return praiseService.cancelPraise(res,nid,uid);
})

// 检查是否有点赞
router.get('/ifpraise', function (req, res) {
    const { nid, uid } = req.query;
    return praiseService.checkIfPraise(res,nid,uid);
})

module.exports = router;
