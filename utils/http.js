module.exports = function (options) {
  var prod = '#';
  return new Promise((resolve, reject) => {
    wx.request({
      url: prod + options.url,
      data: options.data,
      method: options.type,
      success(res) {
        resolve(res.data);
      },
      fail(res) {
        reject(res);
      }
    })
  })
}