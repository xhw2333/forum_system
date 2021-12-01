const User = require('../model/user');
const Note = require("../model/note");
const {toArr,toStr} = require("../utils/typeChange");
const { 
    addUser,
    findAllUsers,
    deleteUser,
    findUserById,
    findUserByNameAndPwd,
    findUserByName,
    updateUser,
} = require('../dao/userDao');

const {
    addNote,
    updateNote,
    findNote,
    findUserNote,
    deleteNote,
    findAllNote,
} = require("../dao/noteDao");

let user = new User('小明', '124324');

// deleteNote(2).then(res=>{
//     console.log("delete success");
// })
findUserNote(1).then(res=>{
    console.log(res);
    const {nid,title,content,tag,date,uid,name} = res[1];
    // console.log(tag);
    let note = new Note(nid,title,content,uid,date,name,toArr(tag));
    console.log(note.getDate);
})
// findAllNote().then(res=>{
//     console.log(res);
//     // const {nid,title,content,tag,date,uid,name} = res[0];
//     // // console.log(tag);
//     // let note = new Note(nid,title,content,uid,date,name,toArr(tag));
//     // console.log(note.getDate);
// })
// findNote(1).then(res=>{
//     console.log(res);
//     const {nid,title,content,tag,date,uid,name} = res[0];
//     // console.log(tag);
//     let note = new Note(nid,title,content,uid,date,name,toArr(tag));
//     console.log(note.getDate);
// })
// updateNote('河粉与果条','woshinidie',toStr([1,2,3]),1).then(res=>{
//     console.log("success");
// })
// addNote('数据挖掘','。。。',toStr([1,2]),1).then(res=>{
//     console.log("success");
// })

// updateUser(2,'x132hw','123432156').then(res=>{
//     console.log(res);
// });

// findUserByName('xhw12').then(res=>{
//     console.log(res);
// });

// findUserByNameAndPwd('xhw','123456').then(res=>{
//     console.log(res);
// });

// findUserById(1).then(res=>{
//     console.log(res);
// });

// deleteUser(3).then(res=>{
//     console.log(res);
// });

// findAllUsers().then(res=>{
//     console.log(res[0]);
// }).catch(err=>{
//     console.log(err);
// })

// addUser('test','123456').then(res=>{
//     console.log(res);
// });

// console.log(user);


