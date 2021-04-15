import request from "../../utils/request";

let timer = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeHolderContext: '',
    searchContext: '',
    hotList: [],
    searchList: [],
    historyList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request('/search/default').then(data => {
      this.setData({
        placeHolderContext: data.data.showKeyword
      })
    })
    request('/search/hot/detail').then(data => {
      this.setData({
        hotList: data.data
      })
    })
    let historyList = wx.getStorageSync('historyList');
    if(historyList){
      this.setData({
        historyList
      })
    }
  },

  handleSearch(event) {
    this.setData({
      searchContext: event.detail.value
    })
    clearTimeout(timer)
    timer = setTimeout(() => {
      this.search()
    },300)
  },
  search() {
    if(!this.data.searchContext) {
      this.setData({
        searchList: []
      })
      return
    }
    request('/search',{keywords: this.data.searchContext,limit: 10}).then(data => {
      this.setData({
        searchList: data.result.songs
      })
    })
    let {searchContext, historyList} = this.data;
    if(historyList.indexOf(searchContext) !== -1) {
      historyList.splice(historyList.indexOf(searchContext),1)
    }
    historyList.unshift(searchContext)
    this.setData({
      historyList
    })
    wx.setStorageSync('historyList',historyList)
  },
  clearSearchContext() {
    this.setData({
    searchContext: '',
    searchList: []
  })
  },
  deleteHistoryList() {
    this.setData({
      historyList: []
    })
    wx.removeStorageSync('historyList')
  },
  back() {
    wx.switchTab({
      url: '/pages/video/video'
    })
  },
  toSongDetail(event) {
    wx.navigateTo({
      url: '/pages/songdetail/songDetail?id=' + event.currentTarget.id
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