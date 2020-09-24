// pages/classification/classification.js
var vantUiUtils = require('../../utils/vantUtils.js')
var api = require('../../utils/api.js')
var wxRequest = require('../../utils/wxRequest.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    id: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      skip: 0,
      skip1: 0,
      newVertical: [],
      vertical: [],
    })
    this.getNewVerticalByIdData()
  },
  /**
   * 根据id获取热门
   */
  getVerticalByIdData() {
    var self = this
    var vantLoadingToast = vantUiUtils.vantLoadingToast()
    wxRequest.getRequest(api.getCategorybyid(self.data.id, self.data.skip1)).then(response => {
      var data = response.data
      var vertical = data.res.vertical
      if (self.data.skip1 > 0) {
        if (vertical.length == 0) {
          wx.showToast({
            title: '没有更多',
            icon: 'none'
          })
        } else {
          self.setData({
            vertical: self.data.vertical.concat(vertical)
          })
        }
      } else {
        self.setData({
          vertical: vertical
        })
      }
      vantLoadingToast.clear()
    }).catch(function (response) {
      vantLoadingToast.clear()
      vantUtils.vantFailToast()
    })
  },
  /**
   * 根据id获取最新
   */
  getNewVerticalByIdData() {
    var self = this
    var vantLoadingToast = vantUiUtils.vantLoadingToast()
    wxRequest.getRequest(api.getNewCategorybyid(self.data.id, self.data.skip)).then(response => {
      var data = response.data
      var newVertical = data.res.vertical
      if (self.data.skip > 0) {
        if (newVertical.length == 0) {
          wx.showToast({
            title: '没有更多',
            icon: 'none'
          })
        } else {
          self.setData({
            newVertical: self.data.newVertical.concat(newVertical)
          })
        }
      } else {
        self.setData({
          newVertical: newVertical
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
      if (this.data.newVertical.length === 0) {
        this.getNewVerticalByIdData()
      }
    } else if (index === 1) {
      if (this.data.vertical.length === 0) {
        this.getVerticalByIdData()
      }
    }
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
    // console.log(this.data.active)
    switch (this.data.active) {
      case 0:
        this.data.skip += 30
        this.getNewVerticalByIdData()
        break
      case 1:
        this.data.skip1 += 30
        this.getVerticalByIdData()
        break
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})