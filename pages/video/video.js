import request from "../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList: [],
    currentID: 0,
    videoGroup: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request('/video/group/list').then(data => {
      this.setData({
        videoList: data.data.slice(0,14),
        currentID: data.data[0].id
      })
    })
    this.getVideoGroup()
  },

  changeID(event) {
    let id = parseInt(event.currentTarget.id)
    wx.showLoading({
      title: '正在加载'
    })
    this.setData({
      currentID: id,
      videoGroup: []
    })
    this.getVideoGroup()
  },
  getVideoGroup() {
    let id = this.data.currentID
    request('/video/group',{id}).then(data => {
      if(data.datas.length === 0) this.getVideoGroup()
      this.setData({
        videoGroup: data.datas
      })
      wx.hideLoading()
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