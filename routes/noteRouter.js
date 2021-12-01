const express = require('express');
const Note = require("../model/note");
const { addNote, findNote, findUserNote, deleteNote, updateNote, findAllNote } = require("../dao/noteDao");
const { toArr, toStr } = require("../utils/typeChange");
const { query } = require('express');

// 创建路由容器
const router = express.Router();


// 获取贴文
router.get('/notelist', function (req, res) {
    console.log(req.query);
    const query = req.query;
    // 查询某帖文
    if ('nid' in query) {
        const { nid } = query;
        findNote(nid).then(note => {
            const { nid, uid, name, title, content, date, tag } = note[0];
            const data = new Note(nid, title, content, uid, date, name, toArr(tag));

            res.status(200).json({
                status: 1,
                data,
                msg: ''
            })
        }).catch(err => {
            res.status(500).json({
                status: -1,
                data: null,
                msg: '',
            })
        })
    }
    // 查询特定用户的贴文
    else if ('uid' in query) {
        const { uid } = query;
        findUserNote(uid).then(notes => {
            const data = notes.map((note, index) => {
                const { nid, uid, name, title, content, date, tag } = note;
                return new Note(nid, title, content, uid, date, name, toArr(tag));
            })
            res.status(200).json({
                status: 1,
                data,
                msg: ''
            })
        }).catch(err => {
            res.status(500).json({
                status: -1,
                data: null,
                msg: '',
            })
        })
    }
    // 查询所有贴文
    else {
        console.log('all');
        findAllNote().then(notes => {
            const data = notes.map((note, index) => {
                const { nid, uid, name, title, content, date, tag } = note;
                return new Note(nid, title, content, uid, date, name, toArr(tag));
            })
            res.status(200).json({
                status: 1,
                data,
                msg: ''
            })
        }).catch(err => {
            res.status(500).json({
                status: -1,
                data: null,
                msg: '',
            })
        })
    }
});

// 添加贴文
router.post('/addnote', function (req, res) {
    const { title, content, tag, uid } = req.body;
    addNote(title, content, toStr(tag), uid).then(res => {
        res.status(200).json({
            status: 1,
            data: null,
            msh: '添加成功'
        })
    }).catch(err => {
        res.status(500).json({
            status: -1,
            data: null,
            msh: ''
        })
    })

})

// 删除贴文
router.post('/deletenote', function (req, res) {
    const { nid, uid } = req.body;
    deleteNote(nid, uid).then(() => {
        res.status(200).json({
            status: 1,
            data: null,
            msg: '删除成功'
        })
    }).catch(err => {
        res.status(500).json({
            status: -1,
            data: null,
            msh: ''
        })
    })
})

// 修改贴文
router.post('/updatenote',function(req,res){
    const {title,content,tag,nid} = req.body;
    updateNote(title,content,toStr(tag),nid).then(res=>{
        res.status(200).json({
            status: 1,
            data: null,
            msg: '修改成功'
        })
    }).catch(err=>{
        res.status(500).json({
            status: -1,
            data: null,
            msg: '',
        })
    })
})


module.exports = router;