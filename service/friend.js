// 好友模块
const friendDao = require('../dao/friendDao');
const User = require('../model/user');

/**
 * @description 处理添加好友逻辑
 * @param {*} res 响应体
 * @param {*} uid 用户id
 * @param {*} fid 好友id
 * @returns 
 */
function addFriend(res, uid, fid) {
    if (uid <= 0 || fid <= 0) {
        res.status(200).json({
            status: 0,
            msg: '无效用户。。',
            data: null
        })
        return;
    }

    if (uid === fid) {
        res.status(200).json({
            status: 0,
            data: null,
            msg: '不能添加自己为好友'
        })
        return;
    }
    friendDao.findRelate(uid, fid).then(list => {
        if (list.length !== 0) return true;
        return friendDao.addFriend(uid, fid);
    }).then((flag) => {
        if (flag == true) {
            res.status(200).json({
                status: 0,
                data: null,
                msg: '对方已是好友'
            })
        } else {
            res.status(200).json({
                status: 1,
                data: null,
                msg: '添加好友成功'
            })
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            status: -1,
            data: null,
            msg: ''
        })
    })
}


/**
 * @description 处理删除好友逻辑
 * @param {*} res 响应体
 * @param {*} uid 用户id
 * @param {*} fid 好友id
 */
function deleteFriend(res, uid, fid) {
    friendDao.deleteFriend(uid, fid).then(msg => {
        res.status(200).json({
            status: 1,
            data: null,
            msg: '删除成功'
        })
    }).catch(err => {
        res.status(500).json({
            status: -1,
            data: null,
            msg: ''
        })
    })
}


/**
 * @description 处理获取好友列表逻辑
 * @param {*} res 响应体
 * @param {*} uid 用户id
 * @returns 
 */
function getFriendList(res, uid) {
    if (uid <= 0) {
        res.status(200).json({
            status: 0,
            msg: '无效用户。。',
            data: null
        })
        return;
    }
    friendDao.findFriendList(uid).then(list => {
        const data = list.map((item) => {
            const { friends, name } = item;
            return new User(friends, name);
        })
        res.status(200).json({
            status: 1,
            data,
            msg: '获取好友列表'
        })
    }).catch(err => {
        res.status(500).json({
            status: -1,
            data: null,
            msg: ''
        })
    })
}


module.exports = {
    addFriend,
    deleteFriend,
    getFriendList,
};
