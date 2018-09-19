/**
 * Created by Administrator on 2018/9/18.
 */

//各奖项详细信息
//prop:中奖概率 name：奖项名称 index: 奖品序号
var data = [
    {'prop': 10, 'name': '奖品一', 'index': 0},
    {'prop': 35, 'name': '奖品二', 'index': 1},
    {'prop': 55, 'name': '奖品三', 'index': 2},
    {'prop': 100, 'name': '奖品四', 'index': 3},
    {'prop': 200, 'name': '奖品五', 'index': 4},
    {'prop': 200, 'name': '奖品六', 'index': 5},
    {'prop': 400, 'name': '奖品七', 'index': 6}
];

//阻止重复点击抽奖
var isClick = false;

//抽奖
var lottery = {
    index: 0,     //转动的位置
    count: 8,     //奖品数量，九宫格有八个奖品
    timer: 0,     //setTimeout
    speed: 210,    //转动速度
    times: 0,     //转动的次数
    cycle: 56,    //转动基数，至少要转多少次
    prize: 0,     //抽奖结果，奖品的index

    //移除上一个奖品的选中样式，给下一个添加选中样式
    move: function () {
        var index = this.index;
        var count = this.count;
        $('.lottery .prise-'+index).removeClass('on');
        index += 1;
        if (index > count - 1){
            index = 0;
        }
        $('.lottery .prise-'+index).addClass('on');
        this.index = index;
    },

    //转动效果
    roll: function () {
        lottery.times += 1;
        lottery.move();

        if (lottery.times > lottery.cycle && lottery.index === lottery.prize){
            //抽奖结束
            clearTimeout(lottery.timer);
            lottery.times = 0;
            lottery.speed = 210;
            isClick = false;
            console.log('抽奖结束，恭喜获得' + data[lottery.prize].name);
        }else {
            //控制转动速度
            if (lottery.times < 8){
                lottery.speed -= 20;
            }else if (lottery.times > 48){
                lottery.speed += 20;
            }

            //延时递归调用
            lottery.timer = setTimeout(lottery.roll, lottery.speed);
        }

        return false;
    }

};

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

//根据概率算法得到的抽奖结果
function getResult() {
    var gArr = [];
    for(var i=0; i<data.length; i++){
        gArr.push(data[i]['prop'])
    }

    return data[getResultIndex(gArr)];
}


//开始抽奖
function start() {
    if (isClick){
        return false;
    }

    isClick = true;

    var res = getResult();
    lottery.prize = res.index;

    lottery.roll();
}