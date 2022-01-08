// 评论模块
const express = require('express');
const commentService = require('../service/comment');

// 创建路由容器
const router = express.Router();

// 添加评论
router.post('/addcomment', function (req, res) {
    const { content, nid, uid } = req.body;
    return commentService.addComment(res, content, nid, uid);
})

// 删除评论
router.post('/deletecomment', function (req, res) {
    const { cid, uid } = req.body;
    return commentService.deleteComment(res, cid, uid);
})

// 获取评论
router.get('/commentlist', function (req, res) {
    const { nid } = req.query;
    return commentService.getCommentList(res, nid);
})


module.exports = router;