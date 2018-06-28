<template>
    <parcel>
        <div class="follow-number-content">
            <div class="title-content">
                <div class="back" @click="changeNumber"><i class="icon-arrows-left"></i></div>
                <h1 class="title">智能追号</h1>
            </div>
            <div class="period-content">
                距2018125636期截止:00:00:00
            </div>
            <div class="set-base-content">
                 <div class="set-item">
                    <p>追号</p>
                    <p class="number"><input type="text" v-model.number="zhuihaoCountQs" ></p>
                    <p>期</p>
                </div>
                <div class="set-item">
                    <p>起始倍数</p>
                    <p class="number"><input type="text" v-model.number="baseTimes" ></p>
                    <p>倍</p>
                </div>
                <div class="set-item">
                    <p>隔</p>
                    <p class="number"><input type="text" v-model.number="apartPeriod" ></p>
                    <p>期</p>
                </div>
                <div class="set-item">
                    <p>翻</p>
                    <p class="number"><input type="text" v-model.number="times" ></p>
                    <p>倍</p>
                </div>
            </div>
            <div class="list-title">
                <div class="qh">
                    期号
                </div>
                <div class="bs">
                    倍数
                </div>
                <div class="je">
                    金额
                </div>
                <div class="bj">
                    编辑
                </div>
            </div>
            <scroll ref="scroll" class="scroll-content" :data="numberList">
                <ul class="follow-number-wrapper">
                    <li class="follow-number-item" v-for="(item,i) in numberList">
                        <div class="qh">{{item.period}}</div>
                        <div class="bs">
                            <p class="minus" @click="changeTimes(i,'minus')"><i class="icon-minus"></i></p>
                            <p class="txt"><input type="text" v-model.number="item.times"></p>
                            <p class="add" @click="changeTimes(i,'add')"><i class="icon-add"></i></p>
                        </div>
                        <div class="je">{{item.money}}</div>
                        <div class="bj" @click="deletePeriod(i)">
                            <i class="icon-delete"></i>
                        </div>
                    </li>
                </ul>
            </scroll>
            <div class="lottery-set">
                <div class="number">
                    <p>号码:{{betNumber}}</p>
                </div>
                <div class="stop" @click="setZhuihaoStop">
                    <p class="check-box" ><i class="icon-right" v-show="zhuihaoStop == 1"></i></p>
                    <p>中奖后停止追号</p>
                </div>
            </div>
            <div class="lottery-bottom">
                <div class="clear-all" @click="changeNumber">
                    <p>修改号码</p>
                </div>
                <div class="bet-collect">
                    <p class="bet-count">共{{zhuihaoCountQs}}期<span>{{betMoney}}</span>元</p>
                </div>
                <div class="bet-btn" @click="bet">
                    <p>投注</p>
                </div>
                <div class="brokerage" @click="earnMoney">
                    <p class="check-box" ><i class="icon-right" v-show="earnCommission"></i></p>
                    <p>赚佣金</p>
                </div>
            </div>
        </div>
    </parcel>
</template>

<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex';
  import Scroll from 'base/scroll/scroll';
  import Parcel from 'base/parcel/parcel';
  import {httpUrl} from 'common/js/map';

  export default {
    data() {
      return {
          zhuihaoCountQs:5,
          zhuihaoStop:1,
          zhuihaoAllQh:'',
          zhuihaoAllBs:'',
          baseTimes:1,
          apartPeriod:1,
          times:1,
          numberList:[],
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
        betCount:{
            type: Number,
            default: 0
        },
        lotteryModes:{
            type: Number,
            default: 0
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
        Parcel
    },
    mounted() {
        this.init();
    },
    computed:{
        betMoney(){
            var money=0;
            this.numberList.forEach((item,i) => {
                money += item.money;
            });
            return money;
        }
    },
    methods: {
        init(){
            // this.$watch('numberList', function(){ 

            // }, {deep: true});
            this.makeNumberList();
        },
        // close(){
        //     this.$emit('close','followNumberShow');
        // },
        makeNumberList(){
            this.numberList=[];
            var times=this.baseTimes;
            var period = this.lotteryInfo.show_qh;
            var hide_period = this.lotteryInfo.lottery_qh;
            var mode=2/Math.pow(10,this.lotteryModes)*this.betCount;
            var money= 0;
            for(var i = 0; i< this.zhuihaoCountQs; i++){
                period=(this.lotteryInfo.show_qh-0+i) > 99 ? ""+this.lotteryInfo.show_qh-0+i : "0"+(this.lotteryInfo.show_qh-0+i);
                hide_period=this.lotteryInfo.lottery_qh-0+i+"";
                if( i != 0 &&  i%this.apartPeriod == 0){
                    times= times*this.times;
                }
                money= times*mode;
                this.numberList.push({
                    period,
                    times,
                    money,
                    hide_period
                })
            }
        },
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
        setZhuihaoStop(){
            this.zhuihaoStop=this.zhuihaoStop == 1 ? 0 : 1;
        },
        deletePeriod(i){
            this.numberList.splice(i,1);
            this.zhuihaoCountQs = this.zhuihaoCountQs-1;
        },
        changeNumber(){
            this.$emit('changeNumber');
        },
        earnMoney(){
            this.$emit('earnMoney','gdSetShow');
        },
        bet(){
            var zhuihao_all_qh='';
            var zhuihao_all_bs='';
            const url= this.earnCommission  ? httpUrl.bet.betZyj : httpUrl.bet.betOrderZh;
            this.numberList.forEach((item,i) => {
                zhuihao_all_qh += item.hide_period;
                zhuihao_all_bs += item.times;
                if(i != this.numberList.length-1){
                    zhuihao_all_qh +=  "#";
                    zhuihao_all_bs +=  "#";
                }
            });
            var param={
                lottery_id:this.lotteryId,
                wf_flag:this.wfFlag,
                bet_number:this.betNumber,
                bet_count:this.betCount,
                lottery_modes:this.lotteryModes,
                zhuihao_count_qs:this.zhuihaoCountQs,
                zhuihao_stop:this.zhuihaoStop,
                zhuihao_all_qh,
                zhuihao_all_bs

            }
            if(this.earnCommission){
                param=Object.assign({},param,this.gdParam);
            }
            this.$axios.postRequest(url,param)
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.$emit("gdBetSuccess");
                    };
                });
        }
        
    },
    watch: {
        zhuihaoCountQs(newVue){
            if(newVue > 1){
                this.makeNumberList();
            }
        },
        baseTimes(newVue){
            if(newVue > 1){
                this.makeNumberList();
            }
        },
        apartPeriod(newVue){
            if(newVue > 1){
                this.makeNumberList();
            }
        },
        times(newVue){
            if(newVue > 1){
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
        @include bg-image('bg-lottery-shallow');
        background-size: 1rem;
        .title-content{
            position:relative;
            height:1.2rem;
            line-height: 1.2rem;
            text-align: center;
            color:#fff;
            @include bg-image('bg-lottery-title');
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center bottom;
            
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
                color:$color-text-yellow;
                right: 0;
                span{
                    font-size:$font-size-small-x;
                }
            }
            .title{
                display: block;
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
            color:#fff;
            text-align: center;
            @include bg-image('bg-follow-num-03');
            background-size: 0.6rem;
        }
        .set-base-content{
            height:1rem;
            @include bg-image('bg-lottery-shallow');
            background-size: 1rem;
            color:#fff;
            .set-item{
                height:0.7rem;
                float: left;
                padding-left:0.5rem;
                padding-top:0.22rem;
                p{
                    display: inline-block;
                    height:0.6rem;
                    line-height: 0.6rem;
                    text-align: center;
                    &.number{
                        width:0.6rem;
                        height:0.56rem;
                        border-radius: 0.1rem;
                        background:#FFF;
                        input{
                            width:0.6rem;
                            height:0.56rem;
                            background: none;
                            border:0;
                            padding:0;
                            margin: 0;
                            line-height: 0.56rem;
                            text-align: center;
                        }
                    }
                }
            }
        }
        .list-title{
            height:0.7rem;
            @include bg-image('bg-follow-num-02');
            background-size: 0.7rem;
            div{
                float: left;
                @include border-right-1px(solid,rgb(76, 134, 108));
                line-height: 0.7rem;
                text-align: center;
                color:#fff;
                &.qh{
                    width:2.3rem;
                }
                &.bs{
                    width:3.5rem;
                }
                &.je{
                    width:3rem;
                }
                &.bj{
                    width:1.2rem;
                    @include border-right-1px(solid,$color-bg-white-a0);
                }
            }
        }
        .scroll-content{
            height:calc( 100% - 5.25rem);
            overflow: hidden;
            .follow-number-wrapper{
                height:auto;
                overflow: hidden;
                .follow-number-item{
                    height:auto;
                    overflow: hidden;
                    color: #fff;
                    line-height: 0.6rem;
                    &:nth-child(odd){
                        @include bg-image('bg-follow-num-01');
                        background-size: 1rem;
                    }
                    div{
                        padding:0.1rem;
                        float: left;
                        @include border-right-1px(solid,rgb(76, 134, 108));
                        text-align: center;
                        &.qh{
                            width:2.1rem;
                        }
                        &.bs{
                            width:3.1rem;
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
                                    width:1.7rem;
                                    input{
                                         width:1.7rem;
                                         height: 0.6rem;
                                         text-align: center;
                                         padding:0;
                                         margin: 0;
                                    }
                                }
                                &.add{
                                    width:0.7rem;
                                    background: $color-bg-gray;
                                    font-size: $font-size-medium-x;
                                    height: 0.6rem;
                                    line-height: 0.6rem;
                                    border-top-right-radius: 0.1rem;
                                    border-bottom-right-radius: 0.1rem;
                                }
                            }
                        }
                        &.je{
                            width:2.8rem;
                        }
                        &.bj{
                            width:1rem;
                            font-size: $font-size-large;
                            @include border-right-1px(solid,$color-bg-white-a0);
                        }
                    }

                }
            }
        }
        .lottery-set{
            position: absolute;
            height:0.6rem;
            width:100%;
            bottom:1.15rem;
            line-height: 0.6rem;
            background:rgb(69, 138, 102);
            
            .number{
                float: left;
                width:6.6rem;
                height:0.6rem;
                p{
                    padding-left: 0.2rem;
                    @include no-wrap();
                }
            }
            .stop{
                float: left;
                height:0.52rem;
                width:3.4rem;
                text-align: right;
                color:#fff;
                padding-top:0.08rem;
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

        }
        .lottery-bottom{
            position: absolute;
            height:1.15rem;
            width:100%;
            bottom:0;
            line-height: 1.15rem;
            @include bg-image('bg-lottery-bottom');
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center top;
            color:rgb(230, 230, 230);
            .clear-all{
                height:1.15rem;
                width:1.8rem;
                float: left;
                padding:0.25rem 0.2rem;
                p{
                    width:1.8rem;
                    height:0.67rem;
                    line-height: 0.67rem;
                    text-align: center;
                    background:$color-bg-deep-gray;
                    border-radius: 0.1rem;
                }
            }
            .bet-collect{
                height:1.15rem;
                width:3.8rem;
                float: left;
                p{
                    line-height: 1.15rem;
                    @include no-wrap();
                    span{
                        color:$color-text-yellow;
                    }
                }
            }
            .brokerage{
                float: right;
                width:1.7rem;
                height:0.52rem;
                text-align: center;
                background:$color-bg-deep-gray;
                border-radius: 0.1rem;
                margin-top:0.25rem;
                padding-top:0.15rem;
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
                    height:0.67rem;
                    line-height: 0.67rem;
                    text-align: center;
                    background:$color-text-yellow;
                    border-radius: 0.1rem;
                    color:$color-text;
                    font-size: $font-size-medium-x;
                }
            }

        }
    }

</style>