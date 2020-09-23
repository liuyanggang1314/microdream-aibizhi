//index.js
//获取应用实例
const app = getApp()
var vantUtils = require('../../utils/vantUtils.js')
Page({
  data: {
    active: 0,
  },

  onLoad: function () {

  },
  /**
   * 标签页点击事件
   * @param {*} event 
   */
  onTabClick(event) {
    //console.log(event.detail.name)
    this.setData({
      active: event.detail.name
    })
  },
  /**
   * 轮播图点击事件
   * @param {*} event 
   */
  onGoSwiper(event) {
    console.log(event.currentTarget.id)
    wx.navigateTo({
      url: '../swipe/swipe'
    })
  },
  onGoClassification(event){
    console.log(event.currentTarget.id)
    wx.navigateTo({
      url: '../classification/classification'
    })
  }
})