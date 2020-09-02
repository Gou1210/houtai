const cloud = require('wx-server-sdk')
//这里最好也初始化一下你的云开发环境
cloud.init({
  env: "bfxy-hpbml"
})
//操作excel用的类库
const xlsx = require('node-xlsx');

// 云函数入口函数
exports.main = async(event, context) => {
  try {
    let {userdata} = event
    
    //1,定义excel表格名
    let dataCVS = 'dingdan.xlsx'
    //2，定义存储数据的
    let alldata = [];
    let row = [  '手机', '型号','时间','订单价格', '满减券', '优惠价', '高', '左宽', '中宽', '右宽', '数量', '面积', '配件价', '标配价格','一单价格', '配件表' ]; //表属性
    alldata.push(row);

    for (let key in userdata) {
      let arr = [];

      arr.push(userdata[key].moblie);
      arr.push(userdata[key].title);
      arr.push(userdata[key].time);
      arr.push(userdata[key].totalPrice);
      arr.push(userdata[key].juanGai);
      arr.push(userdata[key].zhekou);
      arr.push(userdata[key].height);
      arr.push(userdata[key].width1);
      arr.push(userdata[key].width0);
      arr.push(userdata[key].width2);
      arr.push(userdata[key].num);
      arr.push(userdata[key].square);
      arr.push(userdata[key].partsPriceSumCon);
      arr.push(userdata[key].standardPriceSum);
      arr.push(userdata[key].standardParts);
      arr.push(userdata[key].partsArr);
      alldata.push(arr)
    }
    //3，把数据保存到excel里
    var buffer = await xlsx.build([{
      name: "mySheetName",
      data: alldata
    }]);
    //4，把excel文件保存到云存储里
    return await cloud.uploadFile({
      cloudPath: dataCVS,
      fileContent: buffer, //excel二进制文件
    })

  } catch (e) {
    console.error(e)
    return e
  }
}
