const {formatDate} = require("../utils/format");
class Note{
    constructor(nid,title,content,uid,date,author,tag){
        this.nid = nid;
        this.title = title;
        this.content = content;
        this.uid = uid;
        this.author = author;
        this.tag = tag || [];
        this.date = formatDate(date);
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