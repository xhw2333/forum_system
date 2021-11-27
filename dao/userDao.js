// 用户模块
const query = require("../utils/myDB");


// 添加用户数据
function addUser(name, pwd) {
    let sql = "INSERT INTO user (id,name,pwd) VALUES(0,?,?);";
    let sqlParams = [
        name,
        pwd
    ];
    return new Promise((resolve, reject) => {
        query(sql, sqlParams, function (err, res) {
            if (err) {
                reject(err.message);
            } else {
                resolve(true);
            }
        })
    });
}

// 查看所有用户
function findAllUsers() {
    let sql = "SELECT * FROM user";
    return new Promise((resolve, reject) => {
        query(sql, null, function (err, res) {
            if (err) {
                reject(err.message);
            } else {
                resolve(res);
            }
        })
    });
}


// 根据id找用户
function findUserById(id) {
    let sql = "SELECT * FROM user WHERE id = ?";
    let sqlParams = [id];
    return new Promise((resolve, reject) => {
        query(sql, sqlParams, function (err, res) {
            if (err) {
                reject(err.message);
            } else {
                resolve(res);
            }
        })
    })
}

// 根据名字和密码找用户,用于登录
function findUserByNameAndPwd(name, pwd) {
    let sql = "SELECT * FROM user WHERE name = ? AND pwd = ?";
    let sqlParams = [name, pwd];
    return new Promise((resolve, reject) => {
        query(sql, sqlParams, function (err, res) {
            if (err) {
                reject(err.message);
            } else {
                resolve(res);
            }
        })
    })
}

// 根据名字找用户，用于查重
function findUserByName(name) {
    let sql = "SELECT * FROM user WHERE name = ?";
    let sqlParams = [name];
    return new Promise((resolve, reject) => {
        query(sql, sqlParams, function (err, res) {
            if (err) {
                reject(err.message);
            } else {
                resolve(!!res.length);
            }
        })
    })
}



// 删除用户
function deleteUser(id) {
    let sql = "DELETE FROM user WHERE id = ?";
    let sqlParams = [id];
    return new Promise((resolve, reject) => {
        query(sql, sqlParams, function (err, res) {
            if (err) {
                reject(err.message);
            } else {
                resolve(true);
            }
        })
    })
}

// 更新用户信息
function updateUser(id,name,pwd) {
    let sql = "UPDATE user SET name = ?,pwd = ? WHERE id = " + id;
    let sqlParams = [name,pwd];
    return new Promise((resolve,reject)=>{
        query(sql, sqlParams, function (err, res) {
            if (err) {
                reject(false);
            } else {
                resolve(true);
            }
        })
    })
}

module.exports = {
    addUser,
    findAllUsers,
    deleteUser,
    findUserById,
    findUserByNameAndPwd,
    findUserByName,
    updateUser,
}