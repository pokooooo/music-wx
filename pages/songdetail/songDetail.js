import request from "../../utils/request";
import moment from "moment";

let music = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 1472480890,
    song: {},
    isPlay: true,
    musicLink: '',
    musicList: [],
    showList: false,
    currentTime: '00:00',
    durationTime: '00:00'
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
        music.musicList.unshift(data)
      }
      this.setData({
        musicList: music.musicList
      })
    })
    this.getSongUrl().then(() => {


      this.backgroundAudioManager = wx.getBackgroundAudioManager()
      this.backgroundAudioManager.src = this.data.musicLink
      this.backgroundAudioManager.title = this.data.song.name
      this.backgroundAudioManager.onPlay(() => {
        this.changePlayState(true);
      })
      this.backgroundAudioManager.onPause(() => {
        this.changePlayState(false);
      })
      this.backgroundAudioManager.onStop(() => {
        this.changePlayState(false);
      })
      this.backgroundAudioManager.onTimeUpdate(() => {
        let currentTime = moment(this.backgroundAudioManager.currentTime * 1000).format('mm:ss')
        let currentWidth = this.backgroundAudioManager.currentTime/this.backgroundAudioManager.duration * 450;
        this.setData({
          currentTime,
          currentWidth
        })
      })
      this.backgroundAudioManager.onEnded(() => {
        let index = Math.floor(Math.random() * music.musicList.length)
        wx.redirectTo({
          url: '/pages/songdetail/songDetail?id=' + music.musicList[index].id
        })
      })
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
          let durationTime = moment(data.songs[0].dt).format('mm:ss')
          this.setData({
            song: data.songs[0],
            durationTime
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
    wx.redirectTo({
      url: '/pages/songdetail/songDetail?id=' + music.musicList[index].id
    })
  },
  show(){
    let showList = !this.data.showList
    this.setData({
      showList
    })
  },
  change(event) {
    if (music.musicList[event.currentTarget.id].id === this.data.id) {
      return
    }
    wx.redirectTo({
      url: '/pages/songdetail/songDetail?id=' + music.musicList[event.currentTarget.id].id
    })
  },
  delete(event) {
    if (music.musicList[event.currentTarget.id].id === this.data.id) {
      music.musicList.splice(event.currentTarget.id,1)
      if(music.musicList.length === 0) {
        wx.switchTab({
          url: '/pages/index/index'
        })
        this.backgroundAudioManager.stop()
        return
      }
      wx.redirectTo({
        url: '/pages/songdetail/songDetail?id=' + music.musicList[event.currentTarget.id].id
      })
    } else {
      music.musicList.splice(event.currentTarget.id,1)
    }
    this.setData({
      musicList: music.musicList
    })
  },
  close() {
    this.setData({
      showList: false
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