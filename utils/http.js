module.exports = function(options) {
  var test = 'https://tapi.juzishu.com.cn/';//测试地址
  var prod = 'https://api.jzsonline.com/';//线上地址
  console.log(options)
  // https://api.juzishu.com.cn
  return new Promise((resolve, reject) => {
    wx.request({
      url: prod + options.url, 
      data: options.data,
      method: options.type,
      success (res) {
        resolve(res.data);
      },
      fail (res){
        reject(res);
      }
    })
  })
}