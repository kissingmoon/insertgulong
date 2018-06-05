<template>
    <parcel>
        <div class="follow">
            <div></div>
            <scroll ref="scroll" class="scroll-content" >
                <order-list></order-list>
            </scroll>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import orderList from 'base/order-list/order-list';
    import {httpUrl} from 'common/js/map';
    export default{
        data() {
            return{
            }
        },
        components:{
            Parcel,
            Scroll,
            orderList
        },
        created() {
        },
        methods: {
        
        }
    }
</script>
<style lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.follow{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    z-index: 103;
    background: $color-bg;
    .scroll-content{
        position: fixed;
        width: 100%;
        top: 1.2rem;
        bottom: 0rem;
        z-index: 103;
        .order-main{
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
