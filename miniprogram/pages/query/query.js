
Page({
  data: {
   sdate:'',
   edate:''
  },
  onReady: function () {
    // var that = this;
    // var tm = that.getDate()
    // that.setData({
    //   sdate:tm,
    //   edate:tm
    // })
 
  },
   //登记信息查询
  queryUser(){
    //把时间接受过来传给user页面
    var sdate=this.data.sdate+" 00:00:00"
    var edate = this.data.edate + " 23:59:59"
    //变成时间戳
    console.log(sdate)
    console.log(edate)
    wx.navigateTo({
      url: '../user/user?sdate=' + sdate + "&edate=" + edate
    });
    // wx.setStorage({
    //   key:"sdate",
    //   data:sdate
    // })
    // wx.setStorage({
    //   key:"edate",
    //   data:edate
    // })
  },
   //账单信息查询
  bindSDateChange: function (e) {
    this.setData({
      sdate: e.detail.value
    })},
    bindEDateChange: function (e) {
      this.setData({
        edate: e.detail.value
      })
  }
 
})