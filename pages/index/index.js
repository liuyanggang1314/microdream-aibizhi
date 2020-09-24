//index.js
//获取应用实例
var vantUiUtils = require('../../utils/vantUtils.js')
var api = require('../../utils/api.js')
var wxRequest = require('../../utils/wxRequest.js')
Page({
  data: {
    active: 0,
    isFirst: true,
    skip: 0,
    skip1: 0,
    homepage: [],
    vertical: [],
    newVertical: [],
    category: []
  },

  onLoad: function () {
    this.getVerticalData()
  },
  /**
   * 获取推荐数据
   */
  getVerticalData() {
    var self = this
    var vantLoadingToast = vantUiUtils.vantLoadingToast()
    wxRequest.getRequest(api.getHomepage(self.data.skip)).then(response => {
      var data = response.data.res
      var vertical = data.vertical
      if (self.data.skip === 0) {
        var homepage = data.homepage[0].items
        for (let index = 0; index < homepage.length; index++) {
          const element = homepage[index];
          if (element.value.cover === undefined) {
            homepage.splice(index, 1)
          }
        }
        self.setData({
          homepage: homepage,
          vertical: vertical,
          isFirst: false
        })
      } else {
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
      }
      vantLoadingToast.clear()
    }).catch(err => {
      vantLoadingToast.clear()
      vantUtils.vantFailToast()
    })
  },
  /**
   * 获取最新模块数据
   */
  getNewVerticalData() {
    var self = this
    var vantLoadingToast = vantUiUtils.vantLoadingToast()
    wxRequest.getRequest(api.getVertical(self.data.skip1)).then(response => {
      var data = response.data
      var newVertical = data.res.vertical
      if (self.data.skip1 > 0) {
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
    }).catch(err => {
      vantLoadingToast.clear()
      vantUtils.vantFailToast()
    })
  },
  /**
   * 获取分类
   */
  getCategoryData() {
    var self = this
    var vantLoadingToast = vantUiUtils.vantLoadingToast()
    wxRequest.getRequest(api.getCategory()).then(response => {
      var data = response.data
      var category = data.res.category
      self.setData({
        category: category
      })
      vantLoadingToast.clear()
    }).catch(function (response) {
      vantLoadingToast.clear()
      vantUtils.vantFailToast()
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
      if (this.data.vertical.length === 0) {
        this.getVerticalData()
      }
    } else if (index === 1) {
      if (this.data.newVertical.length === 0) {
        this.getNewVerticalData()
      }
    } else if (index === 2) {
      if (this.data.category.length === 0) {
        this.getCategoryData()
      }
    }
  },
  /**
   * 轮播图点击事件
   * @param {*} event 
   */
  onGoSwiper(event) {
    console.log(event.currentTarget.id)
    var data = this.data.homepage[event.currentTarget.id]
    wx.navigateTo({
      url: '../swipe/swipe?id=' + data.value.id + '&desc=' + data.value.desc + '&name=' + data.value.name + '&lcover=' + data.value.lcover
    })
  },
  /**
   * 跳转分类详情页
   * @param {*} event 
   */
  onGoClassification(event) {
    // console.log(event.currentTarget.id)
    wx.navigateTo({
      url: '../classification/classification?id=' + event.currentTarget.id
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log(this.data.active)
    switch (this.data.active) {
      case 0:
        this.data.skip += 30
        this.getVerticalData()
        break
      case 1:
        this.data.skip1 += 30
        this.getNewVerticalData()
        break
      case 2:
        break
    }
  },

})