// 点赞模块
const query = require("../utils/myDB");

// 添加点赞数据
function addPraise(nid,uid){
    let sql = `INSERT INTO praise5384(nid,uid) VALUES(?,?)`;
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

// 取消点赞，即删除数据
function cancelPraise(nid,uid){
    let sql = `DELETE FROM praise5384 WHERE nid = ? AND uid = ?`;
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


// 查询是否有点赞
function checkIfPraise(nid,uid){
    let sql = `SELECT * FROM praise5384 WHERE nid = ? AND uid = ?`;
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

// 查询nid贴文的点赞量
function findPraiseCountByNid(nid){
    let sql = `SELECT count(*) as praise5384 FROM praise WHERE nid = ?`;
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
    cancelPraise,
    addPraise,
    checkIfPraise,
    findPraiseCountByNid
}