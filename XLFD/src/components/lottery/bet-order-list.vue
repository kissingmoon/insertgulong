<template>
    <parcel>
        <div class="order-content">
            <div class="title-content">
                <div class="back" @click="close"><i class="icon-arrows-left"></i></div>
                <h1 class="title">支付</h1>
            </div>
            <div class="unify-money">
                <p class="">请输入统一金额：</p>
                <p><input type="tel" v-model.number="unifyMoney" placeholder="请输入金额" /></p>
            </div>
            <!-- <scroll ref="scroll" class="scroll-content" :data="updataNumberList" > -->
            <div class="scroll-content">
                <div class="order-main">
                    <ul class="order-wrapper">
                        <li class="order-item" v-for="(item,i) in updataNumberList" :key="i">
                            <div class="number-wrapper">
                                <div class="code">{{item.number_str}}</div>
                                <div class="delete-code" @click="deleteOrder(i)"><i class="icon-close-circle"></i></div>
                            </div>
                            <div class="pl-wrapper">
                                赔率：{{item.pl}}
                            </div>
                            <div class="money-wrapper">
                                <div class="wf">{{item.wf_name}}</div>
                                <div class="code-money">
                                    <p>金额:</p>
                                    <p><input type="tel" placeholder="请输入金额" v-model.number="item.bet_money" maxlength="6" /></p>
                                    <p>元</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="add-order">
                        <div class="add-order-btn" @click="close">
                            <div class="txt">
                                <i class="icon-add-circle add-circle"></i>
                                添加一注
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- </scroll> -->
            <div class="lottery-bottom">
                <div class="clear-all" @click="clearBetOrderList">
                    <p>清空</p>
                </div>
                <div class="bet-btn" @click="bet">
                    <p>投注</p>
                </div>
                <div class="lhc-bet-count">
                    {{updataNumberList.length}}注
                </div>
            </div>
            <loading v-show="loadingShow" :loadingTip="loadingTip"></loading>
        </div>
    </parcel>
</template>

<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex';
  import Scroll from 'base/scroll/scroll';
  import Parcel from 'base/parcel/parcel';
  import Loading from 'base/loading/loading';
  import {httpUrl} from 'common/js/map';

  export default {
    data() {
        return {
            unifyMoney:'',
            loadingShow:false,  
            loadingTip:'正在投注...',
        }
    },
    props: {
        lotteryId:{
            type: String,
            default: null
        },
        wfFlag:{
            type: String,
            default: null
        },
        lotteryInfo:{
            type: Object,
            default: {}
        },
        updataNumberList:{
            type: Array,
            default: []
        },
    },
    components:{
        Scroll,
        Parcel,
        Loading
    },
    mounted() {
        this.init();
    },
    computed:{

    },
    methods: {
        init(){
            this.watchInit();
        },
        watchInit(){
            this.$watch('updataNumberList',(newVal) => {
                const regex = /^\d*$/;
                if(!regex.test(newVal)) {
                    this.updataNumberList.forEach((item,i) => {
                        if(item.bet_money){
                            item.bet_money=Math.floor(item.bet_money);
                        }
                    });
                }
            }, {deep: true});
        },
        close(){
            this.$emit('close','betOrderListShow');
        },
        clearBetOrderList(){
            this.$emit('clearBetOrderList');
        },
        deleteOrder(i){
            this.$emit('deleteOrder', i);
        },
        bet(){
            var bet_number='';
            var count_money='';
            var wf_flag='';
            var pl_flag='';
            this.updataNumberList.forEach((item,i) => {
                bet_number += item.number_str;
                count_money += item.bet_money;
                wf_flag += item.wf_flag;
                pl_flag += item.pl_flag;
                if(i != this.updataNumberList.length-1){
                    bet_number +=  "#";
                    count_money +=  "#";
                    wf_flag +=  "#";
                    pl_flag +=  "#";
                }
            });
            var param={
                lottery_id:this.lotteryId,
                lottery_qh:this.lotteryInfo.lottery_qh,
                bet_number,
                count_money,
                wf_flag,
                pl_flag
            };
            this.loadingShow=true;
            this.$axios.postRequest(httpUrl.bet.betLHC28,param)
            .then((res)=> {
                this.loadingShow=false;
                if(res.data && !res.data.errorCode){
                    this.$emit('betSuccess');
                };
            })
            .catch((err) => {
                this.loadingShow=false;
            });

        }
        
    },
    watch: {
        unifyMoney(newVal,oldVal){
            const regex = /^\d*$/;
            if(!regex.test(newVal)) {
                this.unifyMoney = oldVal ;
            }
            this.updataNumberList.forEach((item,i) => {
                item.bet_money=newVal;
            });
        }
    }
  }
</script>

<style scoped lang="scss">
    @import "common/scss/variable.scss";
    @import 'common/scss/mixin.scss';
    .order-content{
        position: fixed;
        width: 100%;
        top: 0rem;
        bottom: 0rem;
        z-index: 203;
        background: #F1F1F1;
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
        .unify-money{
            height:1.3rem;
            line-height: 1.3rem;
            font-size: $font-size-large;
            padding:0 0.2rem;
            margin-bottom:0.2rem;
            color: #727272;
            background-color: #fff;
            p{
                display: inline-block;
                input{
                    width:2.6rem;
                    height:0.7rem;
                    line-height: 0.7rem;
                    padding-left: 0.2rem;
                    border-radius: 0.08rem;
                    background-color: #F2F2F2;
                    color: $color-red;
                    font-size: $font-size-medium-x;
                    &::placeholder{
                        font-size:.2rem;
                        color: #727272;
                    }
                }
            }
        }
        .scroll-content{
            height:calc( 100% - 4.15rem);
            overflow-y: auto;
            .order-main{
                height:auto;
                overflow: hidden;
                .order-wrapper{
                    height:auto;
                    overflow: hidden;
                    .order-item{
                        height:auto;
                        overflow: hidden;
                        color: #3A3634;
                        padding:0.3rem 0.4rem;
                        margin-bottom: .2rem;
                        background-color: #fff;
                        .number-wrapper{
                            height: 0.7rem;
                            line-height: 0.7rem;
                            color: $color-red;
                            .code{
                                float: left;
                                font-size: $font-size-large;
                                width:7.6rem;
                                @include no-wrap;
                            }
                            .delete-code{
                                float: right;
                                height: 0.7rem;
                                font-size: $font-size-large-x;
                                display: flex;
                                align-items: center;
                            }
                        }
                        .pl-wrapper{
                            height: 0.7rem;
                            line-height: 0.7rem;
                        }
                        .money-wrapper{
                            height: 0.7rem;
                            line-height: 0.7rem;
                            .wf{
                                float: left;
                            }
                            .code-money{
                                float: right;
                                height: 0.7rem;
                                line-height: 0.7rem;
                                p{
                                    display: inline-block;
                                    input{
                                        width:2rem;
                                        height:0.7rem;
                                        line-height: 0.7rem;
                                        padding:0 0.1rem;
                                        border-radius: 0.069rem;
                                        background-color: #F2F2F2;
                                        color: $color-red;
                                        text-align: center;
                                        &::placeholder{
                                            font-size:.2rem;
                                            color: #727272;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                .add-order{
                    height:1.2rem;
                    padding:0.4rem;
                    .add-order-btn{
                        height:1.2rem;
                        line-height: 1.2rem;
                        border-radius: 0.6rem;
                        text-align: center;
                        font-size: $font-size-large;
                        background: #fff;
                        color: $color-red;
                        .txt{
                            width:3rem;
                            margin: 0 auto;
                            display: flex;
                            align-items: center;
                            .add-circle{
                                font-size: $font-size-large-xx;
                                margin-right: 0.2rem;
                            }
                        }
                    }
                }
            }
        }
        .lottery-bottom{
            position: absolute;
            height:1.45rem;
            width:100%;
            bottom:0;
            line-height: 1.45rem;
            text-align: center;
            background: #474643;
            color:rgb(230, 230, 230);
            .clear-all{
                height:1.15rem;
                width:1.8rem;
                float: left;
                padding:0.22rem 0 0 0.2rem;
                p{
                    width:1.8rem;
                    height:1rem;
                    line-height: 1rem;
                    text-align: center;
                    background:$color-bg-deep-gray;
                    border-radius: 0.1rem;
                }
            }
            .bet-btn{
                height:1.15rem;
                width:1.8rem;
                float: right;
                padding-top:0.22rem;
                margin-right:0.2rem;
                p{
                    width:1.8rem;
                    height:1rem;
                    line-height: 1rem;
                    text-align: center;
                    background:$color-yellow;
                    border-radius: 0.1rem;
                    color:$color-text;
                    font-size: $font-size-medium-x;
                }
            }
            .lhc-bet-count{
                display: inline-block;
                padding:0.2rem 0.3rem;
                color:#fff;
                border: 1px solid #fff;
                border-radius: 0.1rem;
                line-height: 0.4rem;
            }
        }
    }

</style>