// 点赞模块
const praiseDao = require('../dao/praiseDao');


/**
 * @description 处理点赞贴文的逻辑
 * @param {*} res 响应体
 * @param {*} nid 贴文id
 * @param {*} uid 用户id
 * @returns 
 */
function praiseNote(res, nid, uid) {
    if (uid <= 0) {
        res.status(200).json({
            status: 0,
            msg: '无效用户。。',
            data: null
        })
        return;
    }
    praiseDao.addPraise(nid, uid).then(msg => {
        res.status(200).json({
            status: 1,
            data: null,
            msg: '点赞成功'
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            status: -1,
            data: null,
            msg: '服务器内部错误'
        })
    })
}


/**
 * @description 处理取消点赞贴文的逻辑
 * @param {*} res 响应体
 * @param {*} nid 贴文id
 * @param {*} uid 用户id
 * @returns 
 */
function cancelPraise(res, nid, uid) {
    if (uid <= 0) {
        res.status(200).json({
            status: 0,
            msg: '无效用户。。',
            data: null
        })
        return;
    }
    praiseDao.cancelPraise(nid, uid).then(msg => {
        res.status(200).json({
            status: 1,
            data: null,
            msg: '已取消赞'
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            status: -1,
            data: null,
            msg: '服务器内部错误'
        })
    })
}


/**
 * @description 检查该用户是否有点赞过该贴文
 * @param {*} res 响应体
 * @param {*} nid 贴文id
 * @param {*} uid 用户id
 * @returns 
 */
function checkIfPraise(res, nid, uid) {
    if (uid <= 0) {
        res.status(200).json({
            status: 0,
            msg: '无效用户。。',
            data: null
        })
        return;
    }
    praiseDao.checkIfPraise(nid, uid).then(list => {

        res.status(200).json({
            status: 1,
            data: list.length != 0,
            msg: `${list.length ? '已' : '无'}点赞`
        })
    }).catch(err => {
        res.status(500).json({
            status: -1,
            data: null,
            msg: '服务器内部错误'
        })
    })
}


module.exports = {
    praiseNote,
    cancelPraise,
    checkIfPraise,
};
