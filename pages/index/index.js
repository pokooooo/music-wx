import request from "../../utils/request";

let music = getApp().globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    recommendList: [],
    topList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request('/banner',{type: 2}).then(data => {
      this.setData({
        bannerList: data.banners
      })
    })
    request('/personalized',{limit: 10}).then(data => {
      this.setData({
        recommendList: data.result
      })
    })
    let index = 1005
    let resultArr = []
    while(index <= 1009){
      request('/playlist/detail',{id: index++}).then(data => {
        let result = {name: data.playlist.name, tracks: data.playlist.tracks.slice(0,3)}
        resultArr.push(result)
        this.setData({
          topList: resultArr
        })
      })
    }
  },
  getListDetail(event) {
    request('/playlist/detail',{id: event.currentTarget.id}).then(data => {
      let isAdd = true
      for(let item of data.playlist.tracks) {
        let data = {
          id: item.id.toString(),
          name: item.name
        }
        for(let item of music.musicList) {
          if(item.id === data.id) isAdd = false
        }
        if(isAdd) music.musicList.push(data)
      }
      wx.navigateTo({
        url: '/pages/songdetail/songDetail?id=' + data.playlist.tracks[0].id
      })
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