const userDao = require("../dao/userDao");
const tagDao = require("../dao/tagDao");
const noteDao = require("../dao/noteDao");


// 删除用户
let uid = 0;
userDao.deleteUser(uid).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})


// 添加标签
let tag = '',
    color = '';
tagDao.addTag(tag, color).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})

// 删除标签
let tid = 0;
tagDao.deleteTag(tid).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})

{
    // 删除标签
    let tid = 0,
        tag = 0,
        color = '';
    tagDao.updateTag(tid, tag, color).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
}

// 删除贴文
let nid = 0;
noteDao.deleteNoteByNid(nid).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})


