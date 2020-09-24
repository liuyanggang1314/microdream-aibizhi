// pages/luo/luo.js
var vantUiUtils = require('../../utils/vantUtils.js')
var api = require('../../utils/api.js')
var wxRequest = require('../../utils/wxRequest.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    featuredVideo: [],
    hotVideo: [],
    newVideo: [],
    skip: 0,
    skip1: 0,
    skip2: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFeaturedVideo()
  },
  /**
   * 推荐
   */
  getFeaturedVideo() {
    var self = this
    var vantLoadingToast = vantUiUtils.vantLoadingToast()
    wxRequest.getRequest(api.getFeaturedVideo(self.data.skip)).then(response => {
      var data = response.data
      var featuredVideo = data.res.videowp
      if (self.data.skip > 0) {
        if (featuredVideo.length == 0) {
          wx.showToast({
            title: '没有更多',
            icon: 'none'
          })
        } else {
          self.setData({
            featuredVideo: self.data.featuredVideo.concat(featuredVideo)
          })
        }
      } else {
        self.setData({
          featuredVideo: featuredVideo
        })
      }
      vantLoadingToast.clear()
    }).catch(function (response) {
      vantLoadingToast.clear()
      vantUtils.vantFailToast()
    })
  },
  /**
   * 最新
   */
  getNewVideo() {
    var self = this
    var vantLoadingToast = vantUiUtils.vantLoadingToast()
    wxRequest.getRequest(api.getNewVideo(self.data.skip1)).then(response => {
      var data = response.data
      var newVideo = data.res.videowp
      if (self.data.skip1 > 0) {
        if (newVideo.length == 0) {
          wx.showToast({
            title: '没有更多',
            icon: 'none'
          })
        } else {
          self.setData({
            newVideo: self.data.newVideo.concat(newVideo)
          })
        }
      } else {
        self.setData({
          newVideo: newVideo
        })
      }
      vantLoadingToast.clear()
    }).catch(function (response) {
      vantLoadingToast.clear()
      vantUtils.vantFailToast()
    })
  },
  /**
   * 热门
   */
  getHotVideo() {
    var self = this
    var vantLoadingToast = vantUiUtils.vantLoadingToast()
    wxRequest.getRequest(api.getHotVideo(self.data.skip2)).then(response => {
      var data = response.data
      var hotVideo = data.res.videowp
      if (self.data.skip2 > 0) {
        if (hotVideo.length == 0) {
          wx.showToast({
            title: '没有更多',
            icon: 'none'
          })
        } else {
          self.setData({
            hotVideo: self.data.hotVideo.concat(hotVideo)
          })
        }
      } else {
        self.setData({
          hotVideo: hotVideo
        })
      }
      vantLoadingToast.clear()
    }).catch(function (response) {
      vantLoadingToast.clear()
      vantUtils.vantFailToast()
    })
  },
  /**
   * 标签页点击事件
   * @param {*} event 
   */
  onTabClick(event) {
    //console.log(event.detail.name)
    var index = event.detail.name
    this.setData({
      active: index
    })
    if (index === 0) {
      if (this.data.featuredVideo.length === 0) {
        this.getFeaturedVideo()
      }
    } else if (index === 1) {
      if (this.data.newVideo.length === 0) {
        this.getNewVideo()
      }
    } else if (index === 2) {
      if (this.data.hotVideo.length === 0) {
        this.getHotVideo()
      }
    }
  },
  /**
   * 播放页面
   * @param {*} event 
   */
  onGoLuoPlay(event) {
    // console.log(event.currentTarget.id)
    wx.navigateTo({
      url: '../luoplay/luoplay?id=' + event.currentTarget.id
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
    switch (this.data.active) {
      case 0:
        this.data.skip += 30
        this.getFeaturedVideo()
        break
      case 1:
        this.data.skip1 += 30
        this.getNewVideo()
        break
      case 2:
        this.data.skip2 += 30
        this.getHotVideo()
        break
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})