<template>
    <parcel>
        <div class="bet">
            <scroll ref="scroll" class="scroll-content" >
                <div>
                    <ul class="bet-main">
                        <li class="item-mode">
                            <div class="title-time">
                                <span class="time">201-02-16 16:52:36</span>
                                <span class="title">
                                    重庆时时彩 <b class="divide">|</b> -2.00元
                                </span>
                            </div>
                            <div class="money-arrows">
                                <p class="money">
                                    <span class="surplus-money">余额：2154875487</span>
                                    <span class="add-money">撤销</span>
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
    import {httpUrl} from 'common/js/map';
    import {setHeader} from 'common/js/param';
    export default {
        data() {
            return{
                header:{
                    title:'投注记录',
                    back:true,
                    time:true
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
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.bet{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    z-index: 103;
    background: $color-bg;
    .scroll-content{
        height: 100%;
        overflow: hidden;
        .bet-main{
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
                        font-size: $font-size-medium;
                        .divide{
                            padding: 0 0.2rem;
                            color:$color-border-gray;
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
                            font-size: $font-size-medium;
                        }
                        .surplus-money{
                            display: block;
                            height:0.6rem;
                            line-height: 0.6rem;
                            font-size: $font-size-small-x;
                            color: $color-text-gray;
                        }
                    }
                }
            }
        }
    }
}
</style>
