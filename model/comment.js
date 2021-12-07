// 评论
class Comment{
    constructor(cid,content,nid,uid,name){
        this.cid = cid;
        this.content = content;
        this.nid = nid;
        this.uid = uid;
        this.commenter = name;
    }
}

module.exports = Comment;