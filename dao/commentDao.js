// 评论模块
const query = require('../utils/myDB');

// 添加评论数据
function addComment(content,nid,uid){
    let sql = `INSERT INTO comment5384(content,nid,uid) VALUES(?,?,?)`;
    let sqlParams = [content,nid,uid];
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

// 删除评论
function deleteComment(cid,uid){
    let sql = `DELETE FROM comment5384 WHERE cid = ? and uid = ?`;
    let sqlParams = [cid,uid];
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

// 查找nid贴文的评论
function findCommentByNid(nid){
    let sql = `select cid,content,nid,uid,name from comment5384 as comment,user5384 as user where nid = ? and user.id = comment.uid`;
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

module.exports = {
    findCommentByNid,
    deleteComment,
    addComment
}


