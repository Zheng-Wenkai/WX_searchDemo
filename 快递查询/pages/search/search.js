//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    no:null,
    company:['sf','sto','yt','yd','tt'],
    com: ['顺丰', '申通', '圆通', '韵达', '天天'],
    index:0,
    username: null,
    expressInfo:null,
  },
  onLoad: function () {
    if (app.globalData.userInfo==null) {
      wx.revigateTo({
        url: '../login/login',
      })
    }
    else{
      console.log(app.globalData.userInfo.username)
      this.setData({
        username:app.globalData.userInfo.username
      })
    } 
  },
  search:function(){
    // console.log(this.data.index);
    // console.log(this.data.company[this.data.index]);
    var that=this;
    wx.request({
      url: 'http://v.juhe.cn/exp/index?key=&com=' //在https://www.juhe.cn/docs/api/id/43注册后可申请数据，将获得的接口填入url
      + this.data.company[this.data.index] + '&no=' + this.data.no, 
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          expressInfo:res.data
        })
      }
    })
  },
  noInput:function(e){
    this.setData({
      no:e.detail.value
    })
  },
  companyInput: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  }
})
