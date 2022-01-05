// 好友模块
const query = require("../utils/myDB");


// 添加好友数据
function addFriend(uid,fid){
    let sql = 'INSERT INTO friend5384(uid,fid) VALUES(?,?)';
    let sqlParams = [uid,fid];
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

// 查找是否存在好友关系
function findRelate(uid,fid){
    let sql = 'SELECT * FROM friend5384 WHERE (uid = ? AND fid = ?) OR (fid = ? AND uid = ?);';
    let sqlParams = [uid,fid,uid,fid];
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

// 查询id的好友
function findFriendList(id){
    let sql = `SELECT fid AS friends,name FROM friend5384 as friend,user5384 as user WHERE uid = ? AND friend.fid = user.id UNION ALL SELECT uid AS friends,name FROM friend5384 as friend,user5384 as user WHERE fid = ? AND friend.uid = user.id;`;
    let sqlParams = [id,id];
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

// 删除好友
function deleteFriend(uid,fid){
    let sql = `delete from friend5384 WHERE (uid = ? AND fid = ?) OR (fid = ? AND uid = ?)`;
    let sqlParams = [uid,fid,uid,fid];
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
    findFriendList,
    deleteFriend,
    findRelate,
    addFriend
}