import request from "../../utils/request";

let music = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 1472480890,
    song: {},
    isPlay: true,
    musicLink: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id) {
      this.setData({
        id: options.id
      })
    }

    this.getSongDetail().then(() => {
      console.log(music);
      music.musicID = this.data.id
      let data = {
        name: this.data.song.name,
        id: this.data.id
      }
      let is = true
      music.musicList.forEach(item => {
        if(item.id === data.id) {
          is = false
        }
      })
      if(is) {
        music.musicList.push(data)
      }
    })
    this.getSongUrl().then(() => {


      this.backgroundAudioManager = wx.getBackgroundAudioManager()
      this.backgroundAudioManager.src = this.data.musicLink
      this.backgroundAudioManager.title = this.data.song.name
      this.backgroundAudioManager.onPlay(() => {
        this.changePlayState(true);
      });
      this.backgroundAudioManager.onPause(() => {
        this.changePlayState(false);
      });
      this.backgroundAudioManager.onStop(() => {
        this.changePlayState(false);
      });
    })
  },
  changePlayState(isPlay){
    this.setData({
      isPlay
    })
  },

  getSongDetail() {
    return new Promise(resolve => (
        request('/song/detail',{ids: this.data.id}).then(data => {
          this.setData({
            song: data.songs[0]
          })
          wx.setNavigationBarTitle({
            title: this.data.song.name
          })
          resolve()
        })
    ))
  },
  getSongUrl() {
    return new Promise(resolve => {
      request('/song/url', {id: this.data.id}).then(data => {
        this.setData({
          musicLink: data.data[0].url
        })
        resolve()
      })
    })
  },
  handleMusicPlay(){
    let isPlay = !this.data.isPlay
    this.setData({
      isPlay
    })
    this.musicControl(isPlay)
  },
  musicControl(isPlay) {

    if(isPlay) {
      this.backgroundAudioManager.src = this.data.musicLink;
      this.backgroundAudioManager.title = this.data.song.name;
    } else {
      this.backgroundAudioManager.pause()
    }
  },
  handleSwitch(event) {
    let index
    if(event.currentTarget.id === 'pre') {
      for(let i in music.musicList) {
        if(music.musicList[i].id === music.musicID) index = i - 1
      }
    } else {
      for(let i in music.musicList) {
        if(music.musicList[i].id === music.musicID) index = i*1 + 1
      }
    }
    if(index < 0 || index >= music.musicList.length) return
    console.log(index)
    wx.navigateTo({
      url: '/pages/songdetail/songDetail?id=' + music.musicList[index].id
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