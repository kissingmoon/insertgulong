<template>
    <parcel>
        <div class="lottery">
            <div class="lottery-content">
                <div class="lottery-title-content">
                    <div class="back" @click="goBack"><i class="icon-arrows-left"></i></div>
                    <div class="time-money-wrapper">
                        <div class="money"><i class="icon-money"></i></div>
                        <div class="time"><i class="icon-clock-02"></i></div>
                    </div>
                    <h1 class="title">时时彩</h1>
                </div>
                <scroll ref="scroll" class="scroll-content">

                </scroll>
                <div class="lottery-bottom">
                    
                </div>
            </div>
            
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import {httpUrl,betType} from 'common/js/map';
    export default {
        data() {
            return{
            }
        },
        components:{
            Parcel,
            Scroll
        },
        created() {
            //this.getBetList();
        },
        computed: {
        },
        methods: {
            goBack(){
                this.$router.back();
            },
            getBetList(type){
                this.$axios.postRequest(httpUrl.info.bet,this.betParam)
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.betList=res.data;
                    };
                });
            }
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.lottery{
    position: fixed;
    width: 100%;
    top: 0rem;
    bottom: 0rem;
    z-index: 103;
    @include bg-image('bg-lottery-shallow');
    background-size: 0.6rem;
    .lottery-content{
        position: relative;
        width: 100%;
        height:100%;
        overflow: hidden;
        .lottery-title-content{
            position:relative;
            height:1.2rem;
            line-height: 1.3rem;
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
            .time-money-wrapper{
                position:absolute;
                height:1.2rem;
                line-height: 1.35rem;
                right:0;
                font-size:$font-size-large-xx;
                padding-right: 0.2rem;
                color:$color-text-yellow;
                .time{
                    float:right;
                    height:1.2rem;
                    padding:0 0.2rem;
                }
                .money{
                    float:right;
                    width:0.8rem;
                    height:1.2rem;
                    padding-right: 0.2rem;
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
        .lottery-bottom{
            position: absolute;
            height:1.15rem;
            width:100%;
            bottom:0;
            line-height: 1.15rem;
            color:#fff;
            @include bg-image('bg-lottery-bottom');
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center top;

        }
        .scroll-content{
            height: 100%;
            overflow: hidden;
        }
    }
    
}
</style>
