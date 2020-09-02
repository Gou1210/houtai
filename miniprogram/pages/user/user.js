
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sdate:0,
    edate:0,
    list:[]
  },
onLoad(options){
  let that = this

  that.setData({                 //this.setData的方法用于把传递过来的id转化成小程序模板语言
    sdate: Math.round(new Date(options.sdate).getTime() / 1000),         
    edate: Math.round(new Date(options.edate).getTime() / 1000),
  })
  wx.cloud.callFunction({
    name: "getUsers",
    data: {
      sdate: that.data.sdate,
      edate: that.data.edate
    },
    success(res) {
      var list = res.result.data.reverse()
  
      //处理一下数据的时间格式
      for (var i = 0; i < list.length; i++) {
        list[i].date = that.dateFormat(list[i].date);
      }
      //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
      that.setData({
        list: list
      })
    },
    fail(res) {
      console.log("保存失败", res)
    }
  })
},
  dianji(options){
    

  },
  //把时间戳改成字符串
  dateFormat: function (timestamp) {
    var f = new Date(timestamp * 1000);
    var year = f.getFullYear();
    var month = (f.getMonth() + 1) > 10 ? (f.getMonth() + 1) : '0' + (f.getMonth() + 1);
    var day = f.getDate() > 10 ? f.getDate() : '0' + f.getDate();
    var hour = f.getHours() > 10 ? f.getHours() : '0' + f.getHours();
    var minute = f.getMinutes() > 10 ? f.getMinutes() : '0' + f.getMinutes();
    var second = f.getSeconds() > 10 ? f.getSeconds() : '0' + f.getSeconds();
    var tm = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    return tm
  },
  //把时间戳改成字符串
  export(){
    let that = this
    wx.cloud.callFunction({
      name: "excel",
      data: {
        userdata: that.data.list,
      },
      success(res) {
        console.log("保存成功", res)
        that.getFileUrl(res.result.fileID)
      },
      fail(res) {
        console.log("保存失败", res)
      }
    })
  },
  //获取云存储文件下载地址，这个地址有效期一天
  getFileUrl(fileID) {
    
    let that = this;
    wx.cloud.getTempFileURL({
      fileList: [fileID],
      
      success: res => {
        var url = res.fileList[0].tempFileURL
        console.log("文件下载链接", url)
        wx.setClipboardData({
          data: url,
          success(res) {
            wx.getClipboardData({
              success(res) {
                console.log("下载链接已复制", res.data) // data
              }
            })
          }
        })
      },
      fail: err => {
      }
    })
  },
})