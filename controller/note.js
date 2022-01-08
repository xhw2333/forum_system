const express = require('express');
const noteService = require("../service/note");

// 创建路由容器
const router = express.Router();


// 获取贴文
router.get('/notelist', function (req, res) {
    console.log(req.query);
    const query = req.query;
    // 查询某帖文
    if ('nid' in query) {
        const { nid } = query;
        return noteService.getNoteListByNid(res,nid);
    }
    // 查询特定用户的贴文
    if ('uid' in query) {
        const { uid } = query;
        return noteService.getNoteListByUid(res,uid);
    }
    // 根据标签查找贴文
    if ("tid" in query) {
        const { tid } = query;
        return noteService.getNoteListByTid(res,tid);
    }
    // 根据关键字查找贴文
    if("key" in query){
        const {key} = query;
        return noteService.getNoteListByKey(res,key);
    }
    // 查询所有贴文
    return noteService.getNoteList(res);
});

// 添加贴文
router.post('/addnote', function (req, res) {
    const { title, content, tid, uid } = req.body;
    return noteService.addNote(res,title,content,tid,uid);
})

// 删除贴文
router.post('/deletenote', function (req, res) {
    const { nid, uid } = req.body;
    return noteService.deleteNote(res,nid,uid);
})

// 修改贴文
router.post('/updatenote', function (req, res) {
    const { title, content, tid, nid, uid } = req.body;
    return noteService.updateNote(res,title,content,tid,nid,uid);
})


module.exports = router;