// 评论
class Comment{
    constructor(cid,content,nid,uid,name){
        this.cid = cid; //评论id
        this.content = content; //内容
        this.nid = nid; //贴文id
        this.uid = uid; //评论者id
        this.commenter = name; //评论者
    }
}

module.exports = Comment;