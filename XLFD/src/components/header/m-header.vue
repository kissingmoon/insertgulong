<template>
    <div class="header">
        <div class="back" @click="goBack" v-show="back"><i class="icon-arrows-left"></i></div>
        <div class="recharge-tip" @click="goRechargeTip" v-show="rechargeTip"><i class="icon-question-circle"></i></div>
        <div class="message" @click="goMessage" v-show="message"><i class="icon-message change-message"><b class="path1"></b><b class="path2"></b></i></div>
        <div class="service" @click="goService" v-show="service"><i class="icon-diamond"></i><span>客服</span></div>
        <div class="time-money-wrapper" v-show="time || moneyType">
            <div class="money" v-show="moneyType"><i class="icon-money"></i></div>
            <div class="time" v-show="time"><i class="icon-clock-02"></i></div>
        </div>
        <h1 class="title">{{title}}</h1>
    </div>
</template>
<script>
    export default {
        props:{
            title:{
                type: String,
                default:'小李飞刀'
            },
            back:{
                type: Boolean,
                default:true
            },
            service:{
                type: Boolean,
                default:false
            },
            message:{
                type: Boolean,
                default:false
            },
            rechargeTip:{
                type: Boolean,
                default:false
            },
            time:{
                type: Boolean,
                default:false
            },
            moneyType:{
                type: Boolean,
                default:false
            }
        },
        methods:{
            goBack(){
                this.$router.back();
            },
            goService(){
                this.$router.push({
                    path:'service'
                });
            },
            goMessage(){
                this.$router.push({
                    path:'message'
                });
            },
            goRechargeTip(){
                this.$router.push({
                    path:'message'
                });
            }
        }
    }
</script>
<style lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.header{
    position:relative;
    height:1.2rem;
    line-height: 1.3rem;
    text-align: center;
    color:#fff;
    background:$color-bg-theme;
    
    .back{
        position:absolute;
        height:1.2rem;
        padding: 0 0.5rem 0 0.3rem;
        font-size: 0.52rem;
        font-size: $font-size-large-x;
    }
    .message{
        position:absolute;
        height:1.2rem;
        line-height: 1.5rem;
        right:0;
        padding:0 0.4rem;
        .change-message .path1{
            font-size: $font-size-large-xx;
        }
        .change-message .path2{
            font-size: $font-size-large-xx;
        }
    }
    .recharge-tip{
        position:absolute;
        height:1.2rem;
        line-height: 1.35rem;
        right:0;
        padding:0 0.4rem;
        font-size: 0.6rem;
        font-size: $font-size-large-xx;
    }
    .service{
        position:absolute;
        height:1.2rem;
        line-height: 1.35rem;
        font-size:$font-size-large-x;
        padding-left: 0.4rem;
        vertical-align: bottom;
        color:$color-text-yellow;
        span{
            font-size:$font-size-small-x;
        }
    }
    .time-money-wrapper{
        position:absolute;
        height:1.2rem;
        line-height: 1.35rem;
        right:0;
        font-size:$font-size-large-xx;
        padding-right: 0.2rem;
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
</style>
