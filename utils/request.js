let cookie = getApp().globalData.cookie

export default function request(url,data = {},method = 'GET') {
    return new Promise((resolve,reject) => {
        if(!!cookie) {
            data.cookie = cookie
        }
        wx.request({

            url: 'http://localhost:4000' + url,
            data,
            method,
            // header: {
            //   cookie: cookie
            // },
            success: res => {
                if(url === '/login/cellphone')
                cookie = res.data.cookie
                    // wx.setStorageSync('cookies',res.data.cookie)
                resolve(res.data)
            },
            fail: res => {
                reject(res)
            }
        })
    })

}