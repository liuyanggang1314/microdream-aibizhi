// pages/swipe/swipe.js
var vantUiUtils = require('../../utils/vantUtils.js')
var api = require('../../utils/api.js')
var wxRequest = require('../../utils/wxRequest.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerPosi: wx.getMenuButtonBoundingClientRect(),
    id: null,
    desc: null,
    name: null,
    lcover: null,
    skip: 0,
    wallpaper: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      desc: options.desc,
      name: options.name,
      lcover: options.lcover
    })
    this.getSwipeData()
  },
  /**
   * 获取轮播图详细数据
   */
  getSwipeData() {
    var self = this
    var vantLoadingToast = vantUiUtils.vantLoadingToast()
    wxRequest.getRequest(api.getsubject(self.data.skip, self.data.id))
      .then(response => {
        var data = response.data
        var wallpaper = data.res.wallpaper
        if (self.data.skip > 0) {
          if (wallpaper.length == 0) {
            wx.showToast({
              title: '没有更多',
              icon: 'none'
            })
          } else {
            self.setData({
              wallpaper: self.data.wallpaper.concat(wallpaper)
            })
          }
        } else {
          self.setData({
            wallpaper: wallpaper
          })
        }
        vantLoadingToast.clear()
      }).catch(err => {
        vantLoadingToast.clear()
      })
  },
  /**
   * 返回上一页
   */
  goback() {
    wx.navigateBack({
      delta: 1
    })
  },
 /**
   * 图片点击事件
   */
  clickImgPreview(res) {
    var id = res.currentTarget.id
    wx.previewImage({
      current: id, // 当前显示图片的http链接
      urls: [id] // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.skip += 15
    this.getSwipeData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})