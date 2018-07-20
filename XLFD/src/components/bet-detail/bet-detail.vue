<template>
    <parcel>
        <div class="bet-detail">
            <scroll ref="scroll" class="scroll-content" :data="betDetail">
                <div class="func-wrapper">
                    <ul>
                        <li class="item-mode border-bottom-1px border-none special">
                            <div class="title">
                                <p><span class="period">第{{betDetail.lottery_qh}}期</span></p>
                                <p>{{betDetail.lottery_name}}</p>
                            </div>
                            <div class="remarks">
                                <p>{{betType[betDetail.status]}}</p>
                                <p class="win-money"><span>{{betDetail.prof_or_loss}}</span>元</p>
                            </div>
                        </li>
                        <li class="item-mode border-bottom-1px item-title border-none">
                            基本信息
                        </li>
                        <li class="item-mode border-bottom-1px">
                            <p class="title">投注金额</p>
                            <p class="remarks">{{betDetail.bet_money}}元</p>
                        </li>
                        <li class="item-mode border-bottom-1px">
                            <p class="title">订单编号</p>
                            <p class="remarks">{{betDetail.order_number}}</p>
                        </li>
                        <li class="item-mode border-bottom-1px border-none">
                            <p class="title">投注时间</p>
                            <p class="remarks">{{betDetail.bet_time}}</p>
                        </li>
                        <li class="item-mode border-bottom-1px item-title border-none">
                            投注内容
                        </li>
                        <li class="item-mode border-bottom-1px">
                            <p class="title">玩法</p>
                            <p class="remarks">{{betDetail.wf_name}}</p>
                        </li>
                        <li class="item-mode border-bottom-1px border-none">
                            <p class="title">投注号码</p>
                            <p class="remarks">{{betDetail.bet_number}}</p>
                        </li>
                        <li class="item-mode border-bottom-1px item-title border-none">
                            返点信息
                        </li>
                        <li class="item-mode border-bottom-1px">
                            <p class="title">开奖号码</p>
                            <p class="remarks">{{betDetail.kj_number}}</p>
                        </li>
                        <li class="item-mode border-bottom-1px">
                            <p class="title">中奖金额</p>
                            <p class="remarks">{{betDetail.win_money}}元</p>
                        </li>
                        <li class="item-mode border-bottom-1px">
                            <p class="title">盈亏</p>
                            <p class="remarks">{{betDetail.prof_or_loss}}元</p>
                        </li>
                        <li class="item-mode border-bottom-1px">
                            <p class="title">派彩返点</p>
                            <p class="remarks">{{betDetail.max_return_point}}%</p>
                        </li>
                        <li class="item-mode border-bottom-1px border-none">
                            <p class="title">返点金额</p>
                            <p class="remarks">{{betDetail.max_return_money}}元</p>
                        </li>
                        <li v-if="betDetail.status == 0" class="item-mode border-bottom-1px border-none bt">
                            <a class="btn" @click="undoOrder">撤单</a>
                        </li>
                    </ul>
                </div>
            </scroll>
        </div>
    </parcel>
</template>
<script>
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import {httpUrl,betType} from 'common/js/map';
    import {mapMutations} from 'vuex'
    export default {
        data() {
            return{
                betDetail:{},
                betType,
                betBtnType:true
            }
        },
        components: {
            Parcel,
            Scroll
        },
        created() {
            this.getBetDetail();
        },
        computed: {
        },
        methods: {
            getBetDetail(){
                const order_number = this.$router.history.current.query.id;
                this.$axios.postRequest(httpUrl.info.betDetail,{order_number})
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.betDetail=res.data;
                    };
                });
            },
            undoOrder(){
                if(!this.betBtnType){ return; }
                this.betBtnType = false; 
                const order_number = this.$router.history.current.query.id;
                this.$axios.postRequest(httpUrl.bet.undoOrder,{order_number})
                .then((res)=> {
                    this.betBtnType = true; 
                    if(!res.data.errorCode){
                        this.setTip('撤单成功');
                        this.getBetDetail();
                    };
                })
                .catch((err) => {
                    this.betBtnType=true;
                });
            },
            ...mapMutations({
                setTip:'SET_TIP',
            }),
        }
    }
    
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.bet-detail{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0;
    background:$color-bg-gray;
    .scroll-content{
        height: 100%;
        overflow: hidden;
        .func-wrapper{
            height:auto;
            overflow: hidden;
            .item-mode{
                height:auto;
                overflow: hidden;
                padding:0 0.4rem;
                background: $color-bg;
                @include border-bottom-1px(solid,$color-border-gray);
                .title{
                    float: left;
                    line-height: 1.33rem;
                    font-size: $font-size-medium-x;
                    background-position: left center;
                    background-size: 0.7rem;
                    background-repeat: no-repeat;
                    .period{
                        color:$color-text-gray;
                        font-size: $font-size-medium;
                    }
                    
                }
                .remarks{
                    float:right;
                    line-height: 1.33rem;
                    color:$color-text-gray;
                    font-size: $font-size-medium;
                    .win-money{
                        color:$color-red;
                    }
                }
                &.special{
                    padding: 0.2rem 0.4rem;
                    .title{
                        line-height: 0.7rem;
                        .period{
                            color:$color-text-gray;
                            font-size: $font-size-medium;
                        }
                        
                    }
                    .remarks{
                        line-height: 0.7rem;
                        text-align: right;
                        .win-money{
                            font-size: $font-size-medium-x;
                            color:$color-text;
                            span{
                                color:$color-red;
                            }
                        }
                    }
                }
                &.border-none{
                    @include border-bottom-1px(solid,$color-bg-white-a0);
                }
                &.item-title{
                    height:1rem;
                    line-height: 1rem;
                    font-size: $font-size-medium-x;
                    background:$color-bg-gray;
                    color:rgb(168, 0, 0);
                }
                &.bt{
                    padding-bottom:1rem;
                }
                .btn{
                    display: block;
                    height:1.17rem;
                    line-height: 1.17rem;
                    width:100%;
                    text-align: center;
                    background:$color-red;
                    color: #fff;
                    font-size: $font-size-large;
                    border-radius: 0.1rem;
                    border:0;
                    margin-top: 0.6rem;
                }
            }
        }
    }

}
</style>
