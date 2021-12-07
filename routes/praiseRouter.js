// 点赞模块
const express = require('express');
const {addPraise,findPraiseCountByNid,cancelPraise, checkIfPraise} = require('../dao/praiseDao');

// 路由容器
const router = express.Router();

// 点赞贴文
router.post('/praise',function(req,res){
    const {nid,uid} = req.body;
    addPraise(nid,uid).then(msg=>{
        res.status(200).json({
            status: 1,
            data: null,
            msg: '点赞成功'
        })
    }).catch(err=>{
        res.status(500).json({
            status: -1,
            data: null,
            msg: ''
        })
    })
})

// 取消点赞贴文
router.post('/cancelpraise',function(req,res){
    const {nid,uid} = req.body;

    cancelPraise(nid,uid).then(msg=>{
        res.status(200).json({
            status: 1,
            data: null,
            msg: '已取消赞'
        })
    }).catch(err=>{
        res.status(500).json({
            status: -1,
            data: null,
            msg: ''
        })
    })
})

// 检查是否有点赞
router.get('/ifpraise',function(req,res){
    const {nid,uid} = req.query;
    checkIfPraise(nid,uid).then(list=>{

        res.status(200).json({
            status: 1,
            data: list.length != 0,
            msg: `${list.length?'已':'无'}点赞`
        })
    }).catch(err=>{
        res.status(500).json({
            status: -1,
            data: null,
            msg: ''
        })
    })
})

module.exports = router;
