<template>
    <div class="header">
        <div class="back" @click="goBack" v-show="header.back"><i class="icon-arrows-left"></i></div>
        <router-link tag="div" :to="{path:'/pay/tip'}" class="recharge-tip" v-show="header.rechargeTip">
            <i class="icon-question-circle"></i>
        </router-link>
        <div @click="goto('/message')" class="message" v-show="header.message">
            <i class="icon-message change-message"><b class="path1"></b><b class="path2"></b>
                <div v-show="message_count > 0" class="message-count">{{message_count}}</div>
            </i>
        </div>
        <router-link tag="div" :to="{path:'/service',query:{flag:'customer_service_url'}}"  class="service" v-show="header.service"><i class="icon-diamond"></i><span>客服</span></router-link>
        <div class="time-money-wrapper" v-show="header.time || header.moneyType">
            <div class="money" v-show="header.moneyType" @click="pickerShow"><i class="icon-money"></i></div>
            <div class="time" v-show="header.time" @click="timeShow"><i class="icon-clock-02"></i></div>
        </div>
        <h1 class="title">{{header.title}}</h1>
    </div>
</template>
<script>
    import {mapGetters,mapMutations,mapActions} from 'vuex'
    import {httpUrl} from 'common/js/map';
    export default {
        data(){
            return{
                messageCount:0
            }
        },
        computed: {
            ...mapGetters([
                'header',
                'user_token',
                'message_count'
            ])
        },
        methods:{
            goBack(){
                this.$router.back();
            },
            ...mapMutations({
                setShowTime:'SET_SHOW_TIME',
                setShowPicker:'SET_SHOW_PICKER',
                setMessageCount:'SET_MESSAGE_COUNT'
            }),
            ...mapActions([
                'getMessageCount'
            ]),
            timeShow(){
                this.setShowTime(true);
            },
            pickerShow(){
                this.setShowPicker(true);
            },
            goto(infoUrl){
                const url = this.user_token ? infoUrl:'/login';
                this.$router.push({
                    path:url
                });
            }
        },
        watch:{
            user_token(newVal){
                if(newVal){
                    this.getMessageCount();
                }else{
                    this.setMessageCount(0);
                }
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
    background:$color-red;
    
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
        .change-message{
            position: relative;
            .message-count{
                position:absolute;
                height:0.4rem;
                width:0.4rem;
                border-radius: 50%;
                background: #FFF700;
                color:$color-text;
                font-size: $font-size-small;
                top:-0.36rem;
                right:-0.2rem;
                line-height: 0.4rem;
                text-align: center;
            }
        }
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
        color:$color-yellow;
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
