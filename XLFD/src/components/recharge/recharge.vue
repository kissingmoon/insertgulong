<template>
    <parcel>
        <div class="recharge">
            <scroll ref="scroll" class="scroll-content" :data="rechargeList" >
                <div>
                    <ul class="recharge-main">
                         <li class="item-mode" v-for="item in rechargeList">
                            <div class="title-time">
                                <span class="time">{{item.time_created}}</span>
                                <span class="title">
                                    {{item.coin_change_name}} <b class="divide">|</b> <b class="money">{{item.change_coin}}</b>元
                                </span>
                            </div>
                            <div class="recharge-status">
                                <p class="status">
                                    {{rechargeType[item.flag]}}
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </scroll>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import {httpUrl,rechargeType} from 'common/js/map';
    export default {
        data() {
            return{
                rechargeType,
                rechargeList:[],
                rechargeParam:{
                    page_no:'1',
                    page_size:'20',
                    data_type:'4',
                    status:'05'
                }
            }
        },
        components:{
            Parcel,
            Scroll
        },
        created() {
            this.getRecharge();
        },
        methods: {
            getRecharge(){
                this.$axios.postRequest(httpUrl.info.coin,this.rechargeParam)
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.rechargeList=res.data;
                    };
                });
            }
        }
    }
</script>
<style lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.recharge{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    z-index: 103;
    background: $color-bg;
    .scroll-content{
        height: 100%;
        overflow: hidden;
        .recharge-main{
            height: 100%;
            overflow: hidden;
            .item-mode{
                height:1.33rem;
                padding:0.3rem;
                background: $color-bg;
                @include border-1px($color-border-gray);
                .title-time{
                    float: left;
                    height:1.33rem;
                    line-height: 0.62rem;
                    .title{
                        display: block;
                        height:0.63rem;
                        line-height: 0.63rem;
                        font-size: $font-size-medium-x;
                        .divide{
                            padding: 0 0.2rem;
                            color:$color-border-gray;
                        }
                        .money{
                            color:$color-text-green;
                        }
                    }
                    .time{
                        display: block;
                        height:0.6rem;
                        line-height: 0.6rem;
                        font-size: $font-size-small-x;
                        color: $color-text-gray;
                    }
                }
                .recharge-status{
                    float:right;
                    display: flex;
                    box-sizing: border-box;
                    align-items: center;
                    height: 1.33rem;
                    font-size: $font-size-medium-x;
                    text-align: right;
                    .status{
                        color:$color-text-green;
                    }
                }
            }
        }
    }
}
</style>
