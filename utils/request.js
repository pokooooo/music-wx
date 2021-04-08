export default function request(url,data = {},method = 'GET') {
    return new Promise((resolve,reject) => {
        wx.request({
            url: 'https://autumnfish.cn' + url,
            data,
            method,
            header: {
              cookie: wx.getStorageSync('cookies')[2]
            },
            success: res => {
                if(url === '/login/cellphone')
                    wx.setStorageSync('cookies',res.cookies)
                resolve(res.data)
            },
            fail: res => {
                reject(res)
            }
        })
    })

}