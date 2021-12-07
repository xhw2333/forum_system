// 分区模块
const express = require('express');
const {findTag} = require('../dao/tagDao');

const router = express.Router();

// 获取标签（分区）列表
router.get('/taglist',function(req,res){
    findTag().then(tags=>{
        res.status(200).json({
            status: 1,
            data: tags,
            msg: ''
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