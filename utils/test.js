const User = require('../model/user');
const { 
    addUser,
    findAllUsers,
    deleteUser,
    findUserById,
    findUserByNameAndPwd,
    findUserByName,
    updateUser,
} = require('../dao/userDao');

let user = new User('小明', '124324');



updateUser(2,'x132hw','123432156').then(res=>{
    console.log(res);
});

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


