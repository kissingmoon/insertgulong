<template>
    <parcel>
        <div class="cash">
            <scroll ref="scroll" class="scroll-content" :data="cashList" >
                <div>
                    <ul class="cash-main">
                        <li class="item-mode" v-for="item in cashList">
                            <div class="title-time">
                                <span class="time">{{item.time_created}}</span>
                                <span class="title">
                                    {{item.coin_change_name}} <b class="divide">|</b> <b class="money">{{item.change_coin}}</b>元
                                </span>
                            </div>
                            <div class="cash-status">
                                <p class="status">
                                    {{cashType[item.flag]}}
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
    import {httpUrl,cashType} from 'common/js/map';
    export default {
        data() {
            return{
                cashType,
                cashList:[],
                cashParam:{
                    page_no:'1',
                    page_size:'20',
                    data_type:'4',
                    status:'06'
                }
            }
        },
        components:{
            Parcel,
            Scroll
        },
        created() {
            this.getCash();
        },
        methods: {
            getCash(){
                this.$axios.postRequest(httpUrl.info.coin,this.cashParam)
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.cashLise=res.data;
                    };
                });
            }
        }
    }
</script>
<style lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.cash{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    z-index: 103;
    background: $color-bg;
    .scroll-content{
        height: 100%;
        overflow: hidden;
        .cash-main{
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
                .cash-status{
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
