<template>
    <div class="header">
        <div class="back" @click="goBack" v-show="header.back"><i class="icon-arrows-left"></i></div>
        <div class="recharge-tip" @click="goRechargeTip" v-show="header.rechargeTip"><i class="icon-question-circle"></i></div>
        <router-link tag="div" :to="{path:'/message'}" class="message" v-show="header.message"><i class="icon-message change-message"><b class="path1"></b><b class="path2"></b></i></router-link>
        <router-link tag="div" :to="{path:'/service'}"  class="service" v-show="header.service"><i class="icon-diamond"></i><span>客服</span></router-link>
        <div class="time-money-wrapper" v-show="header.time || header.moneyType">
            <div class="money" v-show="header.moneyType"><i class="icon-money"></i></div>
            <div class="time" v-show="header.time"><i class="icon-clock-02"></i></div>
        </div>
        <h1 class="title">{{header.title}}</h1>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default {
        computed: {
            ...mapGetters([
                'header'
            ])
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
        line-height: 1.4rem;
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
