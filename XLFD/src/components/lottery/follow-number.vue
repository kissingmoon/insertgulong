<template>
    <parcel>
        <div class="follow-number-content">
            <div class="title-content">
                <div class="back" @click="changeNumber"><i class="icon-arrows-left"></i></div>
                <h1 class="title">智能追号</h1>
            </div>
            <div class="period-content">
                距{{lotteryInfo.show_qh}}期截止:{{drawCountTime}}
            </div>
            <div class="set-base-content">
                 <div class="set-item">
                    <p>追号 </p><p class="number"><input type="tel" v-model.number="zhuihaoCountQs" maxlength="2" readonly @click="showKeyboard(1)"></p><p> 期</p>
                </div>
                <div class="set-item">
                    <p>起始金额 </p><p class="number times"><input type="tel" v-model.number="baseTimes" maxlength="6" readonly @click="showKeyboard(2)"></p><p>{{betUnit[lotteryModes]}}</p>
                </div>
                <div class="set-item">
                    <p>隔 </p><p class="number"><input type="tel" v-model.number="apartPeriod" maxlength="2" readonly @click="showKeyboard(3)"></p><p> 期</p>
                </div>
                <div class="set-item">
                    <p>翻 </p><p class="number times"><input type="tel" v-model.number="times" maxlength="4" readonly @click="showKeyboard(4)"></p><p> 倍</p>
                </div>
            </div>
            <div class="list-title">
                <div class="qh">
                    期号
                </div>
                <div class="je">
                    注数
                </div>
                <div class="bs">
                    单注金额
                </div>
                
                <div class="bj">
                    编辑
                </div>
            </div>
            <!-- <scroll ref="scroll" class="scroll-content" :data="numberList"> -->
            <div class="scroll-content">
                <ul class="follow-number-wrapper">
                    <li class="follow-number-item" v-for="(item,i) in numberList" :key="i">
                        <div class="qh">{{item.period}}</div>
                        <div class="je">{{betCount}}</div>
                        <div class="bs">
                            <!-- <p class="minus" @click="changeTimes(i,'minus')"><i class="icon-minus"></i></p> -->
                            <p class="txt"><input type="tel" v-model.number="item.times" maxlength="6"></p>
                            <p class="add">{{betUnit[lotteryModes]}}</p>
                            <!-- <p class="add" @click="changeTimes(i,'add')"><i class="icon-add"></i></p> -->
                        </div>
                        
                        <div class="bj flex flex-center" @click="deletePeriod(i)">
                            <!-- <i class="icon-delete"></i> -->
                            <span class="sc-text">删除</span>
                            
                        </div>
                    </li>
                </ul>
            </div>
            <!-- </scroll> -->
            <div class="lottery-set">
                <div class="number" @click="showAllNum">
                    <p>号码: <span>{{numArr[numArr.length - 1]}}</span>                        
                        <em :class="{'rotate':isShow}"><i class="angle"></i></em>
                    </p>
                </div>
                <div class="stop" @click="setZhuihaoStop">
                    <p class="check-box" ><i class="icon-right" v-show="zhuihaoStop == 1"></i></p>
                    <p>中奖后停止追号</p>
                </div>
            </div>
            <transition name="slide">
                <div class="numList" v-if="isShow">
                    <p v-for="(item,index) in numArr">{{numArr.length - index}}: {{item}}</p>
                </div>
            </transition>
            <div class="lottery-bottom">
                <div class="clear-all" @click="changeNumber">
                    <p>修改号码</p>
                </div>
                <!-- <div class="bet-collect">
                    <p class="bet-count">共{{zhuihaoCountQs}}期<span>{{betMoney}}</span>元</p>
                </div> -->
                <div class="bet-collect">
                    <p class="bet-count">共{{zhuihaoCountQs}}期<span>{{betMoney}}</span>元</p>
                    <p class="balance">余额:{{account.balance || 0}}元</p>
                </div>
                <div class="bet-btn" @click="bet">
                    <p>投注</p>
                </div>
                <!-- <div class="brokerage" @click="earnMoney">
                    <p class="check-box" ><i class="icon-right" v-show="earnCommission"></i></p>
                    <p>赚佣金</p>
                </div> -->
            </div>
            <loading v-show="loadingShow" :loadingTip="loadingTip"></loading>
            <!-- 数字键盘 -->
            <number-keyboard
                 :keyboardShow="keyboardShow"
                 :keyboardType="keyboardType"
                 :oldVal="keyOldVal"
                 :varName="keyName"
                 :lotteryModes="lotteryModes"
                 @close="hide"
                 @changeKeyNumber="changeKeyNumber"
                >
            </number-keyboard>
        </div>
    </parcel>
</template>

<script type="text/ecmascript-6">
  import {mapMutations,mapGetters} from 'vuex';
  import numberKeyboard from 'base/number-keyboard/number-keyboard';
  import Scroll from 'base/scroll/scroll';
  import Parcel from 'base/parcel/parcel';
  import Loading from 'base/loading/loading';
  import {httpUrl,betUnit} from 'common/js/map';

  export default {
    data() {
      return {
        keyboardShow:false,  //显示数字键盘
        isMake:true,
        zhuihaoCountQs:5,
        zhuihaoStop:1,
        zhuihaoAllQh:'',
        zhuihaoAllBs:'',
        baseTimes:1,
        apartPeriod:1,
        times:1,
        numberList:[],
        lotteryQh:[],
        betMoney:0,
        betUnit,
        loadingShow:false,  
        loadingTip:'正在投注...',
        keyboardType:3, // 数字键盘类型 1金额 2倍数 3期数
        keyName:'zhuihaoCountQs', // 数字键盘改变名称
        keyOldVal:'5', // 键盘初始值
        numArr:[],
        isShow:false,
      }
    },
    props: {
        gdParam:{
            type: Object,
            default: {}
        },
        lotteryId:{
            type: String,
            default: null
        },
        betNumber:{
            type: String,
            default: null
        },
        wfFlag:{
            type: String,
            default: null
        },
        drawCountTime:{
            type: String,
            default: '00:00:00'
        },
        betCount:{
            type: Number,
            default: 0
        },
        lotteryModes:{
            type: Number,
            default: 0
        },
        betTimes:{
            type: Number,
            default: 1
        },
        lotteryInfo:{
            type: Object,
            default: {}
        },
        earnCommission:{
            type: Boolean,
            default: false
        },
    },
    components:{
        Scroll,
        Parcel,
        Loading,
        numberKeyboard
    },
    mounted() {
        this.init();
    },
    computed: {
        ...mapGetters([
            'account'
        ])
    },
    methods: {
        init(){            
            this.baseTimes=this.betTimes;
            this.watchInit();
            this.getLotteryQh();
            this.getNums();
        },
        showAllNum(){
            this.isShow = !this.isShow;
        },
        //  获取追号号码数组
        getNums(){            
            let arrList,newList = [];
            if(this.wfFlag == '11x5_qwx_dds' || this.wfFlag == 'k3_hz_hz' || this.wfFlag == 'k3_3bth_hz'){
                arrList = this.betNumber.split(',')
                this.numArr = arrList.reverse();
            }
            else{
                arrList = this.betNumber.split(',')
                for(let i = 0; i < arrList.length;i++){
                    let str = arrList[i].replace(/\d(?=(\d{1})+\.)/g, "$&,").replace(/\d{1}(?![,.]|$)/g, "$&,");
                    if( str.length > 0 ){
                        newList.push(str)
                    }
                }
                this.numArr = newList.reverse();
            }
            if(this.wfFlag.includes('11x5')){
                arrList = this.betNumber.split('-')
                this.numArr = arrList.reverse();
            }
        },
        // 初始化监听
        watchInit(){
            this.$watch('lotteryInfo',() => { 
                this.makeNumberList();
            }, {deep: true});
            this.$watch('numberList',(newVal) => {
                const regex = /^\d*$/;
                let mode=1/Math.pow(10,this.lotteryModes)*this.betCount;
                this.betMoney = 0;
                if(!regex.test(newVal)) {
                    this.numberList.forEach((item) => {
                        if(item.times){
                            item.times=Math.floor(item.times);
                        }
                        const oneMoney = item.times*mode > 99990 ? 99990 : item.times*mode;
                        this.betMoney += oneMoney
                    });
                }else{
                    this.numberList.forEach((item) => {
                        const oneMoney = item.times*mode > 99990 ? 99990 : item.times*mode;
                        this.betMoney += oneMoney
                    });
                }
                this.betMoney = this.betMoney.toFixed(2)
            }, {deep: true});
            this.$watch('baseTimes',(newVal,oldVal) => {
                const regex = /^\d*$/;
                if(!regex.test(newVal)) {
                    this.baseTimes = oldVal ;
                }
                if(newVal >= 1){
                    this.makeNumberList();
                }
            });
        },
        // 获取往后20期期号
        getLotteryQh(){
            this.$axios.postRequest(httpUrl.bet.lotteryQh,{'lottery_id':this.lotteryId})
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    this.lotteryQh = res.data;
                    this.makeNumberList();
                };
            })
        },
        // 生成跟单数据
        makeNumberList(){
            if(!this.isMake){return}
            this.numberList=[];
            let times=this.baseTimes;
            let period = '';
            let hide_period = '';
            this.betMoney = 0;
            for(var i = 0; i< this.zhuihaoCountQs; i++){
                // period=(this.lotteryInfo.show_qh-0+i) > 99 ? ""+this.lotteryInfo.show_qh-0+i : "0"+(this.lotteryInfo.show_qh-0+i);
                // hide_period=this.lotteryInfo.lottery_qh-0+i+"";
                period=this.lotteryQh[i].show_qh
                hide_period=this.lotteryQh[i].lottery_qh;
                if( i != 0 &&  i%this.apartPeriod == 0){
                    times= times*this.times > 999999 ? 999999 : times*this.times;
                }
                this.numberList.push({
                    period,
                    times,
                    hide_period
                })
            }
        },
        //加减倍数或金额
        changeTimes(i,type){
            if(type){
                if(!this.numberList[i].times){
                    this.numberList[i].times=1;
                    return;
                }
                this.numberList[i].times = type == 'add'? this.numberList[i].times +1 : ((this.numberList[i].times - 1 <= 0)? 1:this.numberList[i].times - 1);
            }
            this.numberList[i].money = this.numberList[i].times * 2 / Math.pow(10,this.lotteryModes) * this.betCount;
        },
        // 设置追号停止模式
        setZhuihaoStop(){
            this.zhuihaoStop=this.zhuihaoStop == 1 ? 0 : 1;
        },
        // 删除跟单期号
        deletePeriod(i){
            this.numberList.splice(i,1);
            this.isMake=false;
            this.zhuihaoCountQs = this.zhuihaoCountQs-1;
            this.isMakeTime = setTimeout(() => {
                this.isMake=true;
            },300);
        },
        //修改号码
        changeNumber(){
            this.$emit('changeNumber');
        },
        //赚佣金
        earnMoney(){
            this.$emit('moneyPop','gdSetShow');
        },
        //下注
        bet(){
            if(parseFloat(this.betMoney) > parseFloat(this.account.balance)){
                this.$emit('moneyPop','moneyLackShow');
                return;
            }
            let zhuihao_all_qh='';
            let zhuihao_all_bs_by_money ='';
            const url= this.earnCommission  ? httpUrl.bet.betZyj : httpUrl.bet.betOrderZh;
            this.numberList.forEach((item,i) => {
                zhuihao_all_qh += item.hide_period;
                zhuihao_all_bs_by_money  += item.times;
                if(i != this.numberList.length-1){
                    zhuihao_all_qh +=  "#";
                    zhuihao_all_bs_by_money  +=  "#";
                }
            });
            let param={
                lottery_id:this.lotteryId,
                wf_flag:this.wfFlag,
                bet_number:this.betNumber,
                bet_count:this.betCount,
                lottery_modes:this.lotteryModes,
                zhuihao_count_qs:this.zhuihaoCountQs,
                zhuihao_stop:this.zhuihaoStop,
                zhuihao_all_qh,
                zhuihao_all_bs_by_money 
            }
            if(this.earnCommission){
                param=Object.assign({},param,this.gdParam);
            }
            this.loadingShow=true;
            this.$axios.postRequest(url,param)
            .then((res)=> {
                this.loadingShow=false;
                if(res.data && !res.data.errorCode){
                    this.$emit("betSuccess");
                };
            })
            .catch((err) => {
                this.loadingShow=false;
            });
        },
        // 倍投模式计算金额
        // countMoney(times){
        //     let mode=1/Math.pow(10,this.lotteryModes)*this.betCount;
        //     return times*mode > 99990 ? 99990 : times*mode;
        // },
        // 清空
        clearData(dataName){
            this[dataName] = '';
        },
        // 显示数字键盘
        showKeyboard(type){
            switch(type){
                case 1:
                    this.keyboardType=3 
                    this.keyName='zhuihaoCountQs' 
                    this.keyOldVal=this.zhuihaoCountQs + ''
                    break;
                case 2:
                    this.keyboardType=1 
                    this.keyName='baseTimes' 
                    this.keyOldVal=this.baseTimes + ''
                    break;
                case 3:
                    this.keyboardType=3 
                    this.keyName='apartPeriod' 
                    this.keyOldVal=this.apartPeriod + ''
                    break;
                case 4:
                    this.keyboardType=2 
                    this.keyName='times' 
                    this.keyOldVal=this.times + ''
                    break;
            }
            this.show('keyboardShow');
        },
        changeKeyNumber(key,val){
            this.keyOldVal = val;
            this[key]=val;
            this.hide('keyboardShow');
        },
        // 显示
        show(key){
            this[key]=true;
        },
        // 隐藏
        hide(key){
            this[key]=false;
        },
        
    },
    watch: {
        zhuihaoCountQs(newVal,oldVal){
            const regex = /^\d*$/;
            if(!regex.test(newVal)) {
                this.zhuihaoCountQs = oldVal ;
            }
            if(newVal >= 1){
                this.zhuihaoCountQs = newVal > 20 ? 20 : newVal;
                this.makeNumberList();
            }
        },
        times(newVal,oldVal){
            const regex = /^\d*$/;
            if(!regex.test(newVal)) {
                this.times = oldVal ;
            }
            if(newVal >= 1){
                this.makeNumberList();
            }
        },
        apartPeriod(newVal,oldVal){
            const regex = /^\d*$/;
            if(!regex.test(newVal)) {
                this.apartPeriod = oldVal ;
            }
            if(newVal >= 1){
                this.makeNumberList();
            }
        }
    }
  }
</script>

<style scoped lang="scss">
    @import "common/scss/variable.scss";
    @import 'common/scss/mixin.scss';
    .follow-number-content{
        position: fixed;
        width: 100%;
        top: 0rem;
        bottom: 0rem;
        z-index: 203;
        background: #fff;
        .title-content{
            position:relative;
            height:1.2rem;
            line-height: 1.2rem;
            text-align: center;
            color:#fff;
            background: #474643;            
            .back{
                position:absolute;
                height:1.2rem;
                line-height: 1.4rem;
                padding: 0 0.5rem 0 0.3rem;
                font-size: 0.52rem;
                font-size: $font-size-large-x;
            }
            .service{
                position:absolute;
                height:1.2rem;
                line-height: 1.35rem;
                font-size:$font-size-large-x;
                padding-right: 0.4rem;
                vertical-align: bottom;
                color:$color-yellow;
                right: 0;
                span{
                    font-size:$font-size-small-x;
                }
            }
            .title{
                display: inline-block;
                height:1.2rem;
                line-height: 1.2rem;
                vertical-align: top;
                padding: 0 2.4rem;
                font-size: $font-size-large-m;
                @include no-wrap();
            }
        }
        .period-content{
            height:0.6rem;
            line-height: 0.6rem;
            font-size: $font-size-small-x;
            color: #3A3634;
            text-align: center;
            background-color: #f2f2f2;
        }
        .set-base-content{
            height:1rem;
            color: #3A3634;
            .set-item{
                height:0.7rem;
                float: left;
                padding-left:0.3rem;
                padding-top:0.22rem;
                p{
                    display: inline-block;
                    height:0.6rem;
                    line-height: 0.6rem;
                    text-align: center;
                    &.number{
                        width:0.8rem;
                        height:0.56rem;
                        margin: 0 .02rem;
                        border-radius: 0.1rem;
                        background: $color-red;
                        input{
                            width:100%;
                            height:0.56rem;
                            background: none;
                            border:0;
                            padding:0;
                            margin: 0;
                            color: #fff;
                            line-height: 0.56rem;
                            text-align: center;
                        }
                    }
                    &.times{
                        width:1.2rem;
                    }
                }
            }
        }
        .list-title{
            height:0.7rem;
            background-color: #F2F2F2;
            div{
                float: left;
                line-height: 0.7rem;
                text-align: center;
                color: #3A3634;
                &.qh{
                    width:2.2rem;
                }
                &.bs{
                    width:4rem;                   
                }
                &.je{
                    width:2rem;
                }
                &.bj{
                    width:1.8rem;
                }
            }
        }
        .scroll-content{
            height:calc( 100% - 5.75rem);
            overflow-y: auto;
            .follow-number-wrapper{
                height:auto;
                overflow: hidden;
                .follow-number-item{
                    height:auto;
                    overflow: hidden;
                    color: $color-gray;
                    line-height: 0.6rem;
                    @include border-bottom-1px(solid,#F1F1F1);
                    div{
                        padding:0.1rem;
                        float: left;
                        @include border-right-1px(solid,#E9E9E9 );
                        text-align: center;
                        &.qh{
                            width:2rem;
                        }
                        &.bs{
                            width:3.6rem;
                            color: $color-text;
                            padding-left: 0.2rem;
                            padding-right: 0.2rem;
                            p{
                                float: left;
                                &.minus{
                                    width:0.7rem;
                                    background: $color-bg-gray;
                                    font-size: $font-size-medium-x;
                                    height: 0.6rem;
                                    line-height: 0.6rem;
                                    border-top-left-radius: 0.1rem;
                                    border-bottom-left-radius: 0.1rem;
                                }
                                &.txt{
                                    width:2.9rem;
                                    input{
                                         width:2.9rem;
                                         height: 0.6rem;
                                         text-align: center;
                                         padding:0;
                                         margin: 0;
                                         color: $color-red;
                                         border-radius: 0.1rem;
                                         background-color: #F2F2F2;
                                    }
                                }
                                // &.add{
                                //     width:0.7rem;
                                //     background: $color-bg-gray;
                                //     font-size: $font-size-medium-x;
                                //     height: 0.6rem;
                                //     line-height: 0.6rem;
                                //     border-top-right-radius: 0.1rem;
                                //     border-bottom-right-radius: 0.1rem;
                                // }
                                &.add{
                                    width:0.7rem;
                                    font-size: $font-size-medium-x;
                                    height: 0.6rem;
                                    line-height: 0.6rem;
                                    color: #3A3634;
                                }
                            }
                        }
                        &.je{
                            width:1.8rem;
                            @include no-wrap();
                        }
                        &.bj{
                            width:1.6rem;
                            // font-size: $font-size-large;
                            @include border-right-1px(solid,$color-bg-white-a0);
                            .sc-text{
                                background-color: #F2F2F2;
                                border-radius: 0.1rem;
                                padding:0 0.1rem;
                            }
                        }
                    }

                }
            }
        }
        .lottery-set{
            position: absolute;
            z-index: 9;
            height:0.8rem;
            width:100%;
            bottom:1.45rem;
            line-height: 0.8rem;
            background: #f2f2f2;
            .number{
                float: left;
                width:6.6rem;
                height:0.8rem;
                position: relative;
                @include no-wrap();
                p{
                    display: inline-block;
                    padding-left: 0.2rem;
                    padding-right: .6rem;
                    
                    color: #454545;
                    min-width: 60%;
                    @include no-wrap();
                    span{
                        margin-left: .1rem;
                        font-size: .44rem;
                    }
                    em{
                        position: absolute;
                        bottom: .28rem;
                        right: .3rem;
                        width: .4rem;
                        height: .26rem;
                        // transform: rotate(-90deg);
                        transition: transform .5s;
                        &.rotate{
                            transform: rotate(180deg)
                        }
                    }
                    .angle{
                        display: block;
                        width: 0;
                        height: 0;
                        border-width: .3rem .2rem .3rem .2rem;
                        border-style: solid;
                        border-color: transparent transparent #454545 transparent;
                        position: absolute;
                        bottom: 0;
                        left: 0;
                    }
                }
            }
            .stop{
                float: left;
                height:0.52rem;
                width:3.4rem;
                text-align: right;
                color:#fff;
                padding:0.18rem 0;
                p{
                    float: left;
                    color: #3A3634;
                    line-height: 0.45rem;
                    &.check-box{
                        width:0.4rem;
                        height:0.4rem;
                        background: #fff;
                        color:#383838;
                        font-weight: bold;
                        border-radius: 0.07rem;
                        line-height: 0.45rem;
                    }
                }
            }
        }
        .numList{
            width: 5rem;
            background-color: #E0E0E0;
            position: absolute;
            bottom: 2.25rem;
            z-index: 0;
            padding: .1rem .2rem;
            border-radius: .2rem .2rem 0 0 ;
            p{
                font-size: .4rem;
                color: #797979;
                line-height: .68rem;
                text-indent: .3rem;
                margin-bottom: .2rem;
                &:last-child{
                    margin-bottom: 0;
                }
            }
        }
        .slide-enter-active, .slide-leave-active{
            transition: all 0.3s ease-in-out;
        }
        .slide-enter,.slide-leave-to{
            transform: translate3d(0, 100%, 0);
            }
        .lottery-bottom{
            position: absolute;
            height:1.45rem;
            width:100%;
            bottom:0;
            line-height: 1.15rem;
            background: #474643;
            color:rgb(230, 230, 230);
            .clear-all{
                height:1.15rem;
                width:1.8rem;
                float: left;
                padding:0.25rem 0.2rem;
                p{
                    width:1.8rem;
                    height:0.9rem;
                    line-height: 0.9rem;
                    text-align: center;
                    background: #5E5D5B;
                    border-radius: 0.1rem;
                }
            }
            .bet-collect{
                height:1.2rem;
                width:3.8rem;
                float: left;
                padding-top:0.25rem;
                p{
                    line-height: 0.5rem;
                    @include no-wrap();
                    span{
                        color:$color-yellow;
                    }
                }
            }
            .brokerage{
                float: right;
                width:1.7rem;
                height:0.67rem;
                text-align: center;
                background:$color-bg-deep-gray;
                border-radius: 0.1rem;
                margin-top:0.25rem;
                padding-top:0.3rem;
                padding-left:0.2rem;
                margin-right: 0.2rem;
                p{
                    float: left;
                    line-height: 0.45rem;
                    &.check-box{
                        width:0.4rem;
                        height:0.4rem;
                        background: #fff;
                        color:$color-text;
                        border-radius: 0.07rem;
                        line-height: 0.45rem;
                    }
                }
            }
            .bet-btn{
                height:1.15rem;
                width:1.6rem;
                float: right;
                padding-top:0.25rem;
                margin-right:0.2rem;
                p{
                    width:1.6rem;
                    height:0.9rem;
                    line-height: 0.9rem;
                    text-align: center;
                    background:$color-yellow;
                    border-radius: 0.1rem;
                    color:$color-text;
                    font-size: $font-size-medium-x;
                }
            }

        }
    }
</style>