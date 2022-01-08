// 分区模块
const tagDao = require('../dao/tagDao');

/**
 * @description 处理获取标签（分区）列表逻辑
 * @param {*} res 响应体
 */
function getTagList(res) {
    tagDao.findTag().then(tags => {
        res.status(200).json({
            status: 1,
            data: tags,
            msg: '获取标签成功'
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
    getTagList,
};