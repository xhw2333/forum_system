// 分区模块
const express = require('express');
const tagService = require('../service/tag');

const router = express.Router();

// 获取标签（分区）列表
router.get('/taglist',function(req,res){
    return tagService.getTagList(res);
})

module.exports = router;