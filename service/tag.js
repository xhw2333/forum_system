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
            msg: ''
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
    getTagList,
};