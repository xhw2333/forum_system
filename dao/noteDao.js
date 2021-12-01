// 贴文模块
const query = require("../utils/myDB");
const {formatDate} = require("../utils/format");

// 添加贴文数据
function addNote(title,content,tag,uid){
    let sql = "INSERT INTO note (nid,title,content,tag,date,uid) VALUES(0,?,?,?,?,?)";
    let sqlParams = [
        title,
        content,
        tag,
        formatDate(new Date()),
        uid
    ];

    return new Promise((resolve,reject)=>{
        query(sql,sqlParams,function(err,res){
            if(err){
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

// 修改贴文
function updateNote(title,content,tag,nid){
    let sql = "update note set title = ? , content = ? ,tag = ? where nid =" + nid;
    let sqlParams = [title,content,tag];
    return new Promise((resolve,reject)=>{
        query(sql,sqlParams,function(err,res){
            if(err){
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

// 查找所有贴文
function findAllNote(){
    let sql = "SELECT nid,uid,name,title,content,tag,date FROM note,user WHERE note.uid = user.id";
    return new Promise((resolve,reject)=>{
        query(sql,null,function(err,res){
            if(err){
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

// 查找贴文
function findNote(nid){
    let sql = "SELECT nid,uid,name,title,content,tag,date FROM note,user WHERE nid = ? AND note.uid = user.id";
    let sqlParams = [nid];
    return new Promise((resolve,reject)=>{
        query(sql,sqlParams,function(err,res){
            if(err){
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

// 查找某个用户的贴文
function findUserNote(uid){
    let sql = "SELECT nid,uid,name,title,content,tag,date FROM note,user WHERE uid = ? AND note.uid = user.id";
    let sqlParams = [uid];
    return new Promise((resolve,reject)=>{
        query(sql,sqlParams,function(err,res){
            if(err){
                reject(err);
            } else {
                resolve(res);
            }
        })
    }) 
}

// 删除贴文
function deleteNote(nid,uid){
    let sql = "delete from note where nid = ? and uid = ?";
    let sqlParams = [nid,uid];
    return new Promise((resolve,reject)=>{
        query(sql,sqlParams,function(err,res){
            if(err){
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
}