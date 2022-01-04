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
    // this.setData({
    //   userInfo: {"backgroundImgIdStr":"18866520021023533","avatarImgIdStr":"109951166119777926","followed":false,"backgroundUrl":"https://p2.music.126.net/w8Cmo5mP4g3eHICl5b5VIw==/18866520021023533.jpg","detailDescription":"","description":"","userId":320428509,"userType":0,"experts":{},"mutual":false,"remarkName":null,"expertTags":null,"authStatus":0,"birthday":-2209017600000,"city":420100,"backgroundImgId":18866520021023533,"avatarUrl":"https://p1.music.126.net/2CSfFNRpVRpx7D7IkFyFPQ==/109951166119777926.jpg","province":420000,"vipType":11,"gender":0,"accountStatus":0,"defaultAvatar":false,"nickname":"风葬烟","avatarImgId":109951166119777926,"djStatus":0,"signature":"","authority":0,"avatarImgId_str":"109951166119777926","followeds":0,"follows":0,"eventCount":0,"avatarDetail":null,"playlistCount":4,"playlistBeSubscribedCount":0}    })
    //   request('/user/record',{uid: this.data.userInfo.userId,type: 1}).then(data => {
    //     this.setData({
    //       recentPlayList: data.weekData
    //     })
    //   })
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