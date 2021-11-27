/* 
    数据库连接工具
*/

const mysql = require("mysql");
// 连接数据库
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'forum'
})

/* 封装数据库操作方法query -- 用于增删查改 */
const query = (sql, sqlParams, callback) => {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, sqlParams, function (qerr, vals, field) {
                //释放连接
                conn.release();
                // 事件驱动回调
                callback(qerr, vals, field);
            })
        }
    })
}

module.exports = query;