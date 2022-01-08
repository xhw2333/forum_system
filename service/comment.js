// 评论模块
const Comment = require('../model/comment');
const commentDao = require('../dao/commentDao');


/**
 * @description 处理添加评论的逻辑
 * @param {*} res 响应体
 * @param {*} content 内容
 * @param {*} nid 贴文id
 * @param {*} uid 用户id
 * @returns 
 */
function addComment(res, content, nid, uid) {
    if (uid <= 0) {
        res.status(200).json({
            status: 0,
            msg: '无效用户。。',
            data: null
        })
        return;
    }
    commentDao.addComment(content, nid, uid).then(msg => {
        res.status(200).json({
            status: 1,
            data: null,
            msg: '评论成功'
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
 * @description 处理删除评论的逻辑
 * @param {*} res 响应体
 * @param {*} cid 评论id
 * @param {*} uid 用户id
 * @returns 
 */
function deleteComment(res, cid, uid) {
    if (uid <= 0) {
        res.status(200).json({
            status: 0,
            msg: '无效用户。。',
            data: null
        })
        return;
    }
    commentDao.deleteComment(cid, uid).then(msg => {
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
 * @description 处理获取评论的逻辑
 * @param {*} res 响应体
 * @param {*} nid 贴文id
 */
function getCommentList(res, nid) {
    commentDao.findCommentByNid(nid).then(list => {
        console.log(list);
        const data = list.map((item) => {
            const { cid, content, nid, uid, name } = item;
            return new Comment(cid, content, nid, uid, name);
        })
        res.status(200).json({
            status: 1,
            data,
            msg: ''
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            status: -1,
            data: null,
            msg: ''
        })
    })
}



module.exports = {
    addComment,
    deleteComment,
    getCommentList,
};