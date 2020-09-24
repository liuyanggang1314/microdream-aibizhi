var HOST_URI = 'https://www.liuyanggang.com:8443/aibizhi/'

module.exports = {

  // 获取首页(推荐)
  getHomepage: function (skip) {
    var url = HOST_URI + 'getHomepage?skip=' + skip;
    return url;
  },
  //获取推荐类型(推荐)
  getsubject: function (skip, id) {
    var url = HOST_URI + 'getSubject?skip=' + skip + '&id=' + id;
    return url;
  },
  // 获取首页(最新)
  getVertical: function (skip) {
    var url = HOST_URI + 'getVertical?skip=' + skip;
    return url;
  },
  // 获取首页(分类)
  getCategory: function () {
    var url = HOST_URI + 'getCategory';
    return url;
  },
  // 获取首页(分类)Byid 热门
  getCategorybyid: function (id, skip) {
    var url = HOST_URI + 'getCategoryById?id=' + id + '&skip=' + skip;
    return url;
  },
   // 获取首页(分类)Byid 最新
   getNewCategorybyid: function (id, skip) {
    var url = HOST_URI + 'getNewCategoryById?id=' + id + '&skip=' + skip;
    return url;
  },
    // 获取视频(视频) 推荐
    getFeaturedVideo: function (skip) {
      var url = HOST_URI + 'getFeaturedVideo?skip=' + skip;
      return url;
    },
     // 获取视频(视频) 最新
     getNewVideo: function (skip) {
      var url = HOST_URI + 'getNewVideo?skip=' + skip;
      return url;
    },
     // 获取视频(视频) 热门
     getHotVideo: function (skip) {
      var url = HOST_URI + 'getHotVideo?skip=' + skip;
      return url;
    },
};