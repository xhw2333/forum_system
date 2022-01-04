// 评论模块
const express = require('express');
const Comment = require('../model/comment');
const { addComment, deleteComment, findCommentByNid } = require('../dao/commentDao');

// 创建路由容器
const router = express.Router();

// 添加评论
router.post('/addcomment', function (req, res) {
    const { content, nid, uid } = req.body;
    if (uid <= 0) {
        res.status(200).json({
            status: 0,
            msg: '无效用户。。',
            data: null
        })
        return;
    }
    addComment(content, nid, uid).then(msg => {
        res.status(200).json({
            status: 1,
            data: null,
            msg: '评论成功'
        })
    }).catch(err => {
        res.status(500).json({
            status: -1,
            data: null,
            msg: ''
        })
    })
})

// 删除评论
router.post('/deletecomment', function (req, res) {
    const { cid, uid } = req.body;
    if (uid <= 0) {
        res.status(200).json({
            status: 0,
            msg: '无效用户。。',
            data: null
        })
        return;
    }
    deleteComment(cid, uid).then(msg => {
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

// 获取评论
router.get('/commentlist', function (req, res) {
    const { nid } = req.query;
    findCommentByNid(nid).then(list => {
        console.log(list);
        const data = list.map((item) => {
            const { cid, content, nid, uid, name, commentNum } = item;
            return new Comment(cid, content, nid, uid, name);
        })
        res.status(200).json({
            status: 1,
            data,
            msg: ''
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            status: -1,
            data: null,
            msg: ''
        })
    })
})


module.exports = router;