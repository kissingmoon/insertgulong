<template>
    <parcel>
        <div class="bill">
            <scroll ref="scroll" class="scroll-content" >
                <div>
                    <ul class="bill-main">
                        <li class="item-mode">
                            <div class="title-time">
                                <span class="title">活动奖励</span>
                                <span class="time">201-02-16 16:52:36</span>
                            </div>
                            <div class="money-arrows">
                                <p class="money">
                                    <span class="add-money">
                                        <b class="add">+13.00</b>元
                                    </span>
                                    <span class="surplus-money">
                                        余额：2154875487
                                    </span>
                                </p>
                                <p class="icon"><i class="icon-arrows-right"></i></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </scroll>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import {setHeader} from 'common/js/param';
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import {httpUrl} from 'common/js/map';
    export default {
        data() {
            return{
                header: {
                    title:'账户明细',
                    back:true,
                    time:true,
                    moneyType:true
                }
            }
        },
        components:{
            Parcel,
            Scroll
        },
        created() {
            setHeader(this.header);
        },
        methods: {
        }
    }
</script>
<style lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.bill{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    z-index: 103;
    background: $color-bg;
    .scroll-content{
        height: 100%;
        overflow: hidden;
        .bill-main{
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
                    }
                    .time{
                        display: block;
                        height:0.6rem;
                        line-height: 0.6rem;
                        font-size: $font-size-small-x;
                        color: $color-text-gray;
                    }
                }
                .money-arrows{
                    float:right;
                    display: flex;
                    box-sizing: border-box;
                    align-items: center;
                    height: 1.33rem;
                    font-size: $font-size-medium-x;
                    text-align: right;
                    .money{
                        float:right;
                        .add-money{
                            display: block;
                            height:0.63rem;
                            line-height: 0.63rem;
                            font-size: $font-size-medium-x;
                            .add{
                                color:$color-text-green;
                            }
                        }
                        .surplus-money{
                            display: block;
                            height:0.6rem;
                            line-height: 0.6rem;
                            font-size: $font-size-small-x;
                            color: $color-text-gray;
                        }
                    }
                    .icon{
                        float:right;
                        height: 1.33rem;
                        color:$color-text-gray;
                        line-height: 1.33rem;
                        padding-left:0.3rem;
                    }
                }
            }
        }
    }
}
</style>
