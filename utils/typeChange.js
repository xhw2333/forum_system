
// 字符串转数组
function toArr(str){
    return str.split(",").map((item)=>parseInt(item));
}

// 数组转字符串
function toStr(arr){
    return arr.join(",");
}

module.exports = {
    toArr,
    toStr,
}