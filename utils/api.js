var HOST_URI = 'https://api.liuyanggang.com/aibizhi/'

module.exports = {

  // 获取首页(推荐)
  getHomepage: function (skip) {
    var url = HOST_URI + 'gethomepage?skip=' + skip;
    return url;
  },
  //获取推荐类型1(推荐)
  getsubject: function (skip, id) {
    var url = HOST_URI + 'getsubject?skip=' + skip + '&id=' + id;
    return url;
  },
  //获取推荐类型2(推荐)
  getsubject1: function (skip, id) {
    var url = HOST_URI + 'getsubject1?skip=' + skip + '&id=' + id;
    return url;
  },
  //通过id获取推荐类型2(推荐)
  getsubjectbyid: function (id) {
    var url = HOST_URI + 'getsubjectbyid?id=' + id;
    return url;
  },
  // 获取首页(最新)
  getVertical: function (skip) {
    var url = HOST_URI + 'getvertical?skip=' + skip;
    return url;
  },
  // 获取首页(分类)
  getCategory: function () {
    var url = HOST_URI + 'getcategory';
    return url;
  },
  // 获取首页(分类)Byid
  getCategorybyid: function (id, skip) {
    var url = HOST_URI + 'getcategorybyid?id=' + id + '&skip=' + skip;
    return url;
  },
    // 获取视频(视频)
    getVideo: function (skip) {
      var url = HOST_URI + 'getvideo?skip=' + skip;
      return url;
    },
};