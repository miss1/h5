/**
 * Created by Administrator on 2018/9/17.
 */

//各奖项详细信息
//prop:中奖概率 name：奖项名称 angle1：该项在圆盘中的起始角度 angle2：该项在圆盘中的结束角度
var data = [
    {'prop': 400, 'name': '未中奖', 'angle1': 313, 'angle2': 355},
    {'prop': 250, 'name': '提高白条额度', 'angle1': 262, 'angle2': 302},
    {'prop': 250, 'name': '免分期服务费', 'angle1': 210, 'angle2': 251},
    {'prop': 45, 'name': '免单5元', 'angle1': 159, 'angle2': 200},
    {'prop': 30, 'name': '免单10元', 'angle1': 110, 'angle2': 150},
    {'prop': 20, 'name': '免单50元', 'angle1': 56, 'angle2': 97},
    {'prop': 5, 'name': '免单4999元', 'angle1': 5, 'angle2': 46}
];

//转盘转动的起始角度
var angle = 0;

//阻止重复点击抽奖
var isClick = false;

//开始抽奖
function start() {

    if (isClick){
        return false;
    }

    isClick = true;

    var res = getResult();
    var a = randomnum(res.angle1, res.angle2);
    $('#pan').rotate({
        duration: 3000,
        angle: angle,
        animateTo: 1080 + a,
        easing: $.easing.easeInOutCubic,
        callback: function () {
            angle = a;
            isClick = false;
            alert(res.name);
        }
    });
}

//根据概率算法得到的抽奖结果
function getResult() {
    var gArr = [];
    for(var i=0; i<data.length; i++){
        gArr.push(data[i]['prop'])
    }

    return data[getResultIndex(gArr)];
}

//概率算法，arr:各项奖品概率组成的数组
function getResultIndex(arr){
    var leng = 0;
    for(var i=0; i<arr.length; i++){
        leng+=arr[i];                                     //获取总数
    }
    for(var i=0; i<arr.length; i++){
        var random = parseInt(Math.random()*leng);        //获取 0-总数 之间的一个随随机整数
        if(random<arr[i]){
            return i;                                     //如果在当前的概率范围内,得到的就是当前概率
        }
        else {
            leng-=arr[i];                                 //否则减去当前的概率范围,进入下一轮循环
        }
    }
}

// 获取2个值之间的随机数
function randomnum(smin, smax) {
    var Range = smax - smin;
    var Rand = Math.random();
    return (smin + Math.round(Rand * Range));
}



//测试数据，循环1000次取得每个奖品出现的次数
function test() {
    var record = [];
    for(var i = 0;i<1000;i++){
        var result = getResult();
        var index=false;
        for(var j in record){
            if(record[j].name==result['name']){
                index = j;
                break;
            }
        }
        if(index!==false){
            record[index].num+=1;
        }else{
            record.push({name:result['name'],num:1});
        }
    }

    console.log(record);
}
//test();