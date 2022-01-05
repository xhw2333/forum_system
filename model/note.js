const {formatDate} = require("../utils/format");
class Note{
    constructor(nid,title,content,uid,date,author,tid,color,tag,comment,praise){
        this.nid = nid;  //贴文id
        this.title = title;  //标题
        this.content = content;  //内容
        this.uid = uid;  //用户id
        this.author = author;  //作者
        this.tid = tid; //标签id 
        this.date = formatDate(date); //发表时间
        this.color = color; //标签颜色
        this.tag = tag; //标签名
        this.comment = comment; //评论数
        this.praise = praise; //点赞数
    }

}

module.exports = Note;