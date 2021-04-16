import request from "../../utils/request";

let music = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    recentPlayList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(wx.getStorageSync('userInfo')) {
      this.setData({
        userInfo: JSON.parse(wx.getStorageSync('userInfo'))
      })
      request('/user/record',{uid: this.data.userInfo.userId,type: 1}).then(data => {
        this.setData({
          recentPlayList: data.weekData
        })
      })
    }
  },
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  toSongDetail(event) {
    wx.navigateTo({
      url: '/pages/songdetail/songDetail?id=' + event.currentTarget.id
    })
  },
  back() {
    wx.navigateTo({
      url: '/pages/songdetail/songDetail?id=' + music.musicID
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})