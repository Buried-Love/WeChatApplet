var md5 = require('../libs/md5tool.js')
var appid = '1000000';
var appkey = 'xxxxx';
function getSignParmars(map){
  console.log(map);
  var timestamp = '1527132315';
  map.time_stamp = timestamp;
  var signstr = 'partner='+ appid +'&appkey=' + appkey + '&data=' + JSON.stringify(map);
  console.log(signstr);
  var sign = getmd5(signstr);
  return {"partner":appid, "data":JSON.stringify(map), "sign":sign}
}

function getmd5(str){
  return md5.md5(str);
}


module.exports = {
  getSignParmars: getSignParmars
}  