<template>
    <parcel>
        <div class="order-content">
            <div class="title-content">
                <div class="back" @click="close"><i class="icon-arrows-left"></i></div>
                <h1 class="title">支付</h1>
            </div>
            <div class="unify-money">
                <p class="">请输入统一金额：</p>
                <p><input type="text" v-model="unifyMoney" placeholder="请输入金额" /></p>
            </div>
            <scroll ref="scroll" class="scroll-content" :data="updataNumberList" :click="true">
                <div class="order-main">
                    <ul class="order-wrapper">
                        <li class="order-item" v-for="(item,i) in updataNumberList">
                            <div class="number-wrapper">
                                <div class="code">{{item.numberStr}}</div>
                                <div class="delete-code"><i class="icon-close-circle"></i></div>
                            </div>
                            <div class="pl-wrapper">
                                赔率：{{item.pl}}
                            </div>
                            <div class="money-wrapper">
                                <div class="wf">合肖</div>
                                <div class="code-money">
                                    <p>金额:</p>
                                    <p><input type="text" placeholder="请输入金额" /></p>
                                    <p>元</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="add-order">
                        <div class="add-order-btn">
                            <div class="txt">
                                <i class="icon-add-circle add-circle"></i>
                                添加一注
                            </div>
                        </div>
                    </div>
                </div>
            </scroll>
            <div class="lottery-bottom">
                <div class="clear-all">
                    <p>清空</p>
                </div>
                <div class="bet-btn">
                    <p>投注</p>
                </div>
                <div class="lhc-bet-count">
                    {{updataNumberList.length}}注
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
          unifyMoney:'',
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
        Parcel
    },
    mounted() {
        this.init();
    },
    computed:{

    },
    methods: {
        init(){
        },
        close(){
            this.$emit('close','betOrderListShow');
        }
        
    },
    watch: {
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
        @include bg-image('bg-lottery-deep');
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
        .unify-money{
            height:1.3rem;
            line-height: 1.3rem;
            font-size: $font-size-large;
            padding:0 0.2rem;
            margin-bottom:0.2rem;
            color:#fff;
            @include bg-image('bg-lottery-shallow');
            background-size: 0.8rem;
            p{
                display: inline-block;
                input{
                    width:2.6rem;
                    height:0.64rem;
                    line-height: 0.64rem;
                    padding-left: 0.2rem;
                    border-radius: 0.08rem;
                    background: #13442E ;
                    color:#fff;
                    font-size: $font-size-medium-x;
                }
            }
        }
        .scroll-content{
            height:calc( 100% - 3.85rem);
            overflow: hidden;
            .order-main{
                height:auto;
                overflow: hidden;
                .order-wrapper{
                    height:auto;
                    overflow: hidden;
                    .order-item{
                        height:auto;
                        overflow: hidden;
                        color: #fff;
                        padding:0.3rem 0.4rem;
                        @include bg-image('bg-lottery-shallow');
                        background-size: 0.8rem;
                        margin-bottom:0.2rem;
                        .number-wrapper{
                            height: 0.7rem;
                            line-height: 0.7rem;
                            color:$color-text-yellow;
                            .code{
                                float: left;
                                font-size: $font-size-large;
                                width:7rem;
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
                            height: 0.6rem;
                            line-height: 0.6rem;
                            .wf{
                                float: left;
                            }
                            .code-money{
                                float: right;
                                height: 0.6rem;
                                line-height: 0.6rem;
                                p{
                                    display: inline-block;
                                    input{
                                        width:2rem;
                                        height:0.56rem;
                                        line-height: 0.56rem;
                                        padding:0 0.1rem;
                                        border-radius: 0.069rem;
                                        background: #13442E ;
                                        color:#fff;
                                        text-align: center;
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
                        @include bg-image('bg-lottery-shallow');
                        background-size: 0.8rem;
                        border-radius: 0.6rem;
                        text-align: center;
                        font-size: $font-size-large;
                        color:$color-text-yellow;
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
            height:1.15rem;
            width:100%;
            bottom:0;
            line-height: 1.15rem;
            text-align: center;
            @include bg-image('bg-lottery-bottom');
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center top;
            color:rgb(230, 230, 230);
            .clear-all{
                height:1.15rem;
                width:1rem;
                float: left;
                padding:0.25rem 0.2rem;
                p{
                    width:1rem;
                    height:0.67rem;
                    line-height: 0.67rem;
                    text-align: center;
                    background:$color-bg-deep-gray;
                    border-radius: 0.1rem;
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
            .lhc-bet-count{
                display: inline-block;
                padding:0.15rem 0.3rem;
                color:#fff;
                background: rgb(13, 85, 48);
                border-radius: 0.1rem;
                line-height: 0.4rem;
            }
        }
    }

</style>