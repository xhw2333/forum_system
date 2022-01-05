// 标签模块（也称为分区）
const query = require('../utils/myDB');

// 获取标签列表
function findTag() {
    let sql = `SELECT * FROM tag5384`;
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

// 添加标签，为管理员特权
function addTag(tag, color) {
    let sql = `insert into tag5384(tid,tag,color) values(0,?,?)`;
    let sqlParams = [tag, color];
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

// 更新标签，管理员权限
function updateTag(tid, tag, color) {
    let sql = "update tag5384 set tag = ? , color = ? where tid =" + tid;
    let sqlParams = [tag, color];
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


//删除标签，为管理员特权 
function deleteTag(tid) {
    let sql = `delete from tag5384 where tid = ?`;
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

module.exports = {
    findTag,
    addTag,
    deleteTag,
    updateTag,
}

