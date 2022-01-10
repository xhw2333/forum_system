// 点赞模块
const query = require("../utils/myDB");

// 添加点赞数据,改标志，设置
function addPraise(nid, uid) {
    let sql = "update praise5384 set flag = 1 where nid = ? and uid = ?";
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

// 插入数据记录，防止有些数据没加进来
function insertData(nid, uid, flag) {
    let sql = `INSERT INTO praise5384(nid,uid,flag) VALUES(?,?,?)`;
    let sqlParams = [nid, uid, flag];
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

// 取消点赞，即删除数据
function cancelPraise(nid, uid) {
    // let sql = `DELETE FROM praise5384 WHERE nid = ? AND uid = ?`;
    let sql = `update praise5384 set flag = 0 where nid = ? and uid = ?`;
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

// 查询是否数据存在
function checkIfData(nid, uid) {
    let sql = `SELECT * FROM praise5384 WHERE nid = ? AND uid = ?`;
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

// 查询是否有点赞
function checkIfPraise(nid, uid) {
    let sql = `SELECT * FROM praise5384 WHERE nid = ? AND uid = ? AND flag = 1`;
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

// 查询nid贴文的点赞量
function findPraiseCountByNid(nid) {
    let sql = `SELECT count(*) as praise FROM praise5384 WHERE nid = ? and flag = 1`;
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

module.exports = {
    cancelPraise,
    addPraise,
    checkIfPraise,
    findPraiseCountByNid,
    insertData,
    checkIfData,
}