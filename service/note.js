const Note = require("../model/note");
const noteDao = require("../dao/noteDao");


/**
 * @description 处理根据【贴文id】获取贴文的逻辑
 * @param {*} res 响应体
 * @param {*} nid 贴文id
 */
function getNoteListByNid(res, nid) {
    noteDao.findNote(nid).then(note => {
        console.log(note);
        const { nid, uid, name, title, content, date, tid, color, tag, comment, praise } = note[0];
        const data = new Note(nid, title, content, uid, date, name, tid, color, tag, comment, praise);

        res.status(200).json({
            status: 1,
            data,
            msg: '获取贴文成功'
        })
    }).catch(err => {
        res.status(500).json({
            status: -1,
            data: null,
            msg: '服务器内部错误',
        })
    })
}

/**
 * @description 处理根据【用户id】获取贴文的逻辑
 * @param {*} res 响应体
 * @param {*} uid 用户id
 * @returns 
 */
function getNoteListByUid(res, uid) {
    if (uid <= 0) {
        res.status(200).json({
            status: 0,
            msg: '无效用户。。',
            data: null
        })
        return;
    }
    noteDao.findUserNote(uid).then(notes => {
        console.log(notes);
        const data = notes.map((note, index) => {
            const { nid, uid, name, title, content, date, tid, color, tag, comment, praise } = note;
            return new Note(nid, title, content, uid, date, name, tid, color, tag, comment, praise);
        })
        res.status(200).json({
            status: 1,
            data,
            msg: '获取贴文成功'
        })
    }).catch(err => {
        res.status(500).json({
            status: -1,
            data: null,
            msg: '服务器内部错误',
        })
    })
}

/**
 * @description 处理根据【标签id】获取贴文的逻辑
 * @param {*} res 响应体
 * @param {*} tid 标签id
 */
function getNoteListByTid(res, tid) {
    noteDao.findNoteByTid(tid).then(notes => {
        console.log(notes);
        const data = notes.map((note, index) => {
            const { nid, uid, name, title, content, date, tid, color, tag, comment, praise } = note;
            return new Note(nid, title, content, uid, date, name, tid, color, tag, comment, praise);
        })

        res.status(200).json({
            status: 1,
            data,
            msg: '获取贴文成功'
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            status: -1,
            data: null,
            msg: '服务器内部错误',
        })
    })
}

/**
 * @description 处理根据【关键字】获取贴文的逻辑
 * @param {*} res 响应体
 * @param {*} key 关键字
 */
function getNoteListByKey(res, key) {
    noteDao.findNoteByKey(key).then(notes => {
        console.log(notes);
        const data = notes.map((note, index) => {
            const { nid, uid, name, title, content, date, tid, color, tag, comment, praise } = note;
            return new Note(nid, title, content, uid, date, name, tid, color, tag, comment, praise);
        })

        res.status(200).json({
            status: 1,
            data,
            msg: '获取贴文成功'
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            status: -1,
            data: null,
            msg: '服务器内部错误',
        })
    })
}

/**
 * @description 处理获取贴文的逻辑
 * @param {*} res 响应体
 */
function getNoteList(res) {
    noteDao.findAllNote().then(notes => {
        console.log(notes);
        const data = notes.map((note, index) => {
            const { nid, uid, name, title, content, date, tid, color, tag, comment, praise } = note;
            return new Note(nid, title, content, uid, date, name, tid, color, tag, comment, praise);
        })
        res.status(200).json({
            status: 1,
            data,
            msg: '获取贴文成功'
        })
    }).catch(err => {
        res.status(500).json({
            status: -1,
            data: null,
            msg: '服务器内部错误',
        })
    })
}


/**
 * @description 处理添加贴文的逻辑 
 * @param {*} res 响应体
 * @param {*} title 标题
 * @param {*} content 内容
 * @param {*} tid 标签id
 * @param {*} uid 用户id
 * @returns 
 */
function addNote(res, title, content, tid, uid) {
    if (uid <= 0) {
        res.status(200).json({
            status: 0,
            msg: '无效用户。。',
            data: null
        })
        return;
    }
    noteDao.addNote(title, content, tid, uid).then(result => {
        res.status(200).json({
            status: 1,
            data: null,
            msg: '发表成功'
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            status: -1,
            data: null,
            msg: '服务器内部错误'
        })
    })
}


/**
 * @description 处理删除贴文的逻辑
 * @param {*} res 响应体
 * @param {*} nid 贴文id
 * @param {*} uid 用户id
 * @returns 
 */
function deleteNote(res, nid, uid) {
    if (uid <= 0) {
        res.status(200).json({
            status: 0,
            msg: '无效用户。。',
            data: null
        })
        return;
    }
    noteDao.deleteNote(nid, uid).then(() => {
        res.status(200).json({
            status: 1,
            data: null,
            msg: '删除成功'
        })
    }).catch(err => {
        res.status(500).json({
            status: -1,
            data: null,
            msh: '服务器内部错误'
        })
    })
}


/**
 * @description 处理修改贴文的逻辑
 * @param {*} res 响应体
 * @param {*} title 标题
 * @param {*} content 内容
 * @param {*} tid 标签id
 * @param {*} nid 贴文id
 * @param {*} uid 用户id
 * @returns 
 */
function updateNote(res, title, content, tid, nid, uid) {
    if (uid <= 0) {
        res.status(200).json({
            status: 0,
            msg: '无效用户。。',
            data: null
        })
        return;
    }
    noteDao.updateNote(title, content, tid, nid, uid).then(result => {
        res.status(200).json({
            status: 1,
            data: null,
            msg: '修改成功'
        })
    }).catch(err => {
        res.status(500).json({
            status: -1,
            data: null,
            msg: '服务器内部错误',
        })
    })
}



module.exports = {
    getNoteListByNid,
    getNoteListByUid,
    getNoteListByTid,
    getNoteListByKey,
    getNoteList,
    addNote,
    deleteNote,
    updateNote,
};