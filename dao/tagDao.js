// 标签模块（也称为分区）
const query = require('../utils/myDB');

// 获取标签列表
function findTag(){
    let sql = `SELECT * FROM tag`;
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

// 添加标签，为管理员特权



//删除标签，为管理员特权 

module.exports = {
    findTag,
}

