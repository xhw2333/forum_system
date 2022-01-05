// 贴文模块
const query = require("../utils/myDB");
const { formatDate } = require("../utils/format");

// 添加贴文数据
function addNote(title, content, tid, uid) {
    let sql = "INSERT INTO note5384 (nid,title,content,tid,date,uid) VALUES(0,?,?,?,?,?)";
    let sqlParams = [
        title,
        content,
        tid,
        formatDate(new Date()),
        uid
    ];

    return new Promise((resolve, reject) => {
        query(sql, sqlParams, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

// 修改贴文
function updateNote(title, content, tid, nid, uid) {
    let sql = "update note5384 set title = ? , content = ? ,tid = ? where nid = ? and uid = ?";
    let sqlParams = [title, content, tid, nid, uid];
    return new Promise((resolve, reject) => {
        query(sql, sqlParams, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

// 查找所有贴文
function findAllNote() {
    // let sql = "SELECT nid,uid,name,title,content,tag,date FROM note,user WHERE note.uid = user.id";
    let sql = `
        select note.nid,uid,name,title,content,note.tid,date,comment,praise,color,tag
        from 
        (
            select note.nid,count(comment.content) as comment from note5384 as note left outer join comment5384 as comment
            on note.nid = comment.nid
            group by note.nid
        ) as data1,
        (
            select note.nid,count(praise.uid) as praise from note5384 as note left outer join praise5384 as praise
            on note.nid = praise.nid
            group by note.nid
        ) as data2,
        user5384 as user,
        note5384 as note,
        tag5384 as tag
        where data1.nid = data2.nid and data1.nid = note.nid and note.uid = user.id and tag.tid = note.tid
        order by note.nid
    `;
    return new Promise((resolve, reject) => {
        query(sql, null, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

// 查找贴文
function findNote(nid) {
    // let sql = "SELECT nid,uid,name,title,content,tag,date FROM note,user WHERE nid = ? AND note.uid = user.id";
    let sql = `
        select note.nid,uid,name,title,content,note.tid,date,comment,praise,color,tag
        from 
        (
            select note.nid,count(comment.content) as comment from note5384 as note left outer join comment5384 as comment
            on note.nid = comment.nid
            group by note.nid
        ) as data1,
        (
            select note.nid,count(praise.uid) as praise from note5384 as note left outer join praise5384 as praise
            on note.nid = praise.nid
            group by note.nid
        ) as data2,
        user5384 as user,
        note5384 as note,
        tag5384 as tag
        where data1.nid = data2.nid and data1.nid = note.nid and note.uid = user.id and tag.tid = note.tid and note.nid = ? 
    `;
    let sqlParams = [nid];
    return new Promise((resolve, reject) => {
        query(sql, sqlParams, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

// 查找贴文
function findNoteByTid(tid) {
    // let sql = "SELECT nid,uid,name,title,content,tag,date FROM note,user WHERE nid = ? AND note.uid = user.id";
    let sql = `
        select note.nid,uid,name,title,content,note.tid,date,comment,praise,color,tag
        from 
        (
            select note.nid,count(comment.content) as comment from note5384 as note left outer join comment5384 as comment
            on note.nid = comment.nid
            group by note.nid
        ) as data1,
        (
            select note.nid,count(praise.uid) as praise from note5384 as note left outer join praise5384 as praise
            on note.nid = praise.nid
            group by note.nid
        ) as data2,
        user5384 as user,
        note5384 as note,
        tag5384 as tag
        where data1.nid = data2.nid and data1.nid = note.nid and note.uid = user.id and tag.tid = note.tid and note.tid = ? 
        order by note.nid
    `;
    let sqlParams = [tid];
    return new Promise((resolve, reject) => {
        query(sql, sqlParams, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

// 根据关键字查找贴文
function findNoteByKey(key){
    let sql = `
        select note.nid,uid,name,title,content,note.tid,date,comment,praise,color,tag
        from 
        (
            select note.nid,count(comment.content) as comment from note5384 as note left outer join comment5384 as comment
            on note.nid = comment.nid
            group by note.nid
        ) as data1,
        (
            select note.nid,count(praise.uid) as praise from note5384 as note left outer join praise5384 as praise
            on note.nid = praise.nid
            group by note.nid
        ) as data2,
        user5384 as user,
        note5384 as note,
        tag5384 as tag
        where data1.nid = data2.nid and data1.nid = note.nid and note.uid = user.id and tag.tid = note.tid 
        and (tag like '%${key}%' or name like '%${key}%' or title like '%${key}%' or content like '%${key}%')
    `;
    let sqlParams = [];
    return new Promise((resolve, reject) => {
        query(sql, sqlParams, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

// 查找某个用户的贴文
function findUserNote(uid) {
    // let sql = "SELECT nid,uid,name,title,content,tag,date FROM note,user WHERE uid = ? AND note.uid = user.id";
    let sql = `
        select note.nid,uid,name,title,content,note.tid,date,comment,praise,color,tag
        from 
        (
            select note.nid,count(comment.content) as comment from note5384 as note left outer join comment5384 as comment
            on note.nid = comment.nid
            group by note.nid
        ) as data1,
        (
            select note.nid,count(praise.uid) as praise from note5384 as note left outer join praise5384 as praise
            on note.nid = praise.nid
            group by note.nid
        ) as data2,
        user5384 as user,
        note5384 as note,
        tag5384 as tag
        where data1.nid = data2.nid and data1.nid = note.nid and note.uid = user.id and tag.tid = note.tid and note.uid = ? 
        order by note.nid
    `;
    let sqlParams = [uid];
    return new Promise((resolve, reject) => {
        query(sql, sqlParams, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

// 删除贴文
function deleteNote(nid, uid) {
    let sql = "delete from note5384 where nid = ? and uid = ?";
    let sqlParams = [nid, uid];
    return new Promise((resolve, reject) => {
        query(sql, sqlParams, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

// 删除贴文(管理员权限)
function deleteNoteByNid(nid, uid) {
    let sql = "delete from note5384 where nid = ?";
    let sqlParams = [nid];
    return new Promise((resolve, reject) => {
        query(sql, sqlParams, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

// 找某个用户的贴文分类发布情况
function findNoteByTag(uid) {
    let sql = `
    select tag, color,count(*) as count from note5384 as note,tag5384 as tag
    where note.tid = tag.tid and note.uid = ?
    group by note.tid;
    `;
    let sqlParams = [uid];
    return new Promise((resolve, reject) => {
        query(sql, sqlParams, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

module.exports = {
    addNote,
    updateNote,
    findNote,
    findUserNote,
    findAllNote,
    deleteNote,
    findNoteByTag,
    findNoteByTid,
    findNoteByKey,
    deleteNoteByNid,
}