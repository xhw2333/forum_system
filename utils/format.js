
// 日期格式化
function formatDate(date){
    date = date || new Date();
    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();
    
    if(month < 10) month = '0' + month;
    if(day < 10) day = '0' + day;
    
    return '' + year +'-' + month + '-' + day;    
}


module.exports = {
    formatDate
}