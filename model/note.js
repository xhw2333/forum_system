const {formatDate} = require("../utils/format");
class Note{
    constructor(nid,title,content,uid,date,author,tid,color,tag,comment,praise){
        this.nid = nid;
        this.title = title;
        this.content = content;
        this.uid = uid;
        this.author = author;
        this.tid = tid; //标签id 
        this.date = formatDate(date);
        this.color = color; //标签颜色
        this.tag = tag; //标签名
        this.comment = comment;
        this.praise = praise;
    }

    set setTitle(val){
        this.title = val;
    }

    get getTitle(){
        return this.title;
    }

    set setContent(val){
        this.content = val;
    }

    get getContent(){
        return this.content;
    }

    set setTag(val){
        this.tag = [...this.tag,...val];
    }

    get getTag(){
        return this.tag;
    }

    get getDate(){
        return this.date;
    }
}

// console.log(new Note(1,'nihao','wohsifa',1,'xhw',[9,3,4]));

module.exports = Note;