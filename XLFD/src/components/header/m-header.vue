<template>
    <div class="header">
        <div class="back" v-show="header.back">
            <i class="icon-arrows-up outer" v-if="header.title == '客服中心'" @click="showServFun(false,'1')"><i class="icon-arrows-up inner"></i></i>
            <i class="icon-arrows-left backIco" v-else  @click="goBack"></i>
        </div>
        <router-link tag="div" :to="{path:'/pay/tip'}" class="recharge-tip" v-show="header.rechargeTip">
            <i class="icon-question-circle"></i>
        </router-link>
        <router-link tag="div" :to="{path:'/descover/explain',query:{flag:'gd_helper_url'}}" class="recharge-tip" v-show="header.followExplain">
            <i class="icon-question-circle"></i>
        </router-link>
        <div class="search" v-show="header.search" @click="searchShow">
            <i class="icon-search"></i>
        </div>
        <div @click="goto('/message')" class="message" v-show="header.message">
            <i class="icon-message change-message"><b class="path1"></b><b class="path2"></b>
                <div v-show="message_count > 0" class="message-count">{{message_count}}</div>
            </i>
        </div>
        <!-- <router-link tag="div" :to="{path:'/service',query:{flag:'customer_service_url'}}"  class="service" v-show="header.service"><i class="icon-diamond"></i><span>客服</span></router-link> -->
        <div  class="service" v-show="header.service" @click="showServFun(true)"><i class="icon-diamond"></i><span>客服</span></div>
        <div class="time-money-wrapper" v-show="header.time || header.moneyType">
            <div class="money" v-show="header.moneyType" @click="pickerShow"><i class="icon-money"></i></div>
            <div class="time" v-show="header.time" @click="timeShow">
                <!-- <i class="icon-clock-02"></i> -->
                <img src="./list.png" alt="">
            </div>
        </div>
        <div @click="betShow" class="bet-history" v-show="header.betHistory">
             <i class="bet-icon"></i>
        </div>
        <div class="record" v-if="header.record" @click="showRecord">
            <i class="recordImg"></i>
        </div>
        <div class="add" v-if="header.add" @click="showAdd">
            <i class="addImg"></i>
        </div>
        <h1 class="title">{{header.title}} <i v-if="header.downDatil" :class="getRecordChoose?'icon-arrows-up':'icon-arrows-below'" @click="emitChooseType"></i>
            <!-- <a href="http://www.baidu.com" target="_blank">文本</a> -->
        </h1>
        <div class="addContent" v-if="getHeaderAdd" >
            <div @click="showServFun(true)"><i class="kefuImg"></i>联系客服</div>
            <!-- <div><i class="huishuiImg"></i>回水规则</div> -->
        </div>
        <div class="close-service" v-if="header.title == '客服中心'" @click="showServFun(false,false)">
            <i class="icon-close"></i>
        </div>
    </div>
</template>
<script>
    import {mapGetters,mapMutations,mapActions} from 'vuex'
    import {httpUrl,headerConfig} from 'common/js/map';

    export default {
        data(){
            return{
                messageCount:0
            }
        },
        mounted(){         
            this.getMessageCount();
        },
        computed: {
            ...mapGetters([
                'header',
                'user_token',
                'message_count',
                'getRecord',
                'getRecordDetail',
                'getRecordChoose',
                'getHeaderAdd',
                'getModelShow'
            ])
        },
        methods:{
            showRecord(){
                this.setRecord(true)
                this.setHeader(headerConfig['/bet']);
            },
            showAdd(){
                this.setHeaderAdd(!this.getHeaderAdd)
                this.setModelShow(!this.getModelShow)
            },
            goBack(){    
                if(this.getRecordDetail){
                    this.setRecordDetail(false);
                    this.setHeader(headerConfig['/bet']);
                    return;
                }   
                if(this.getRecord){
                    this.setRecord(false);
                    let header = {
                        title: this.$route.query.name,
                        back:true,
                        betHistory:false,
                        record:true,
                        add:true
                    }
                    this.setHeader(header);
                    // this.setRecord(true);
                    return;
                }
                this.$router.back();
            },
            emitChooseType(){
                let chooseSwitch =! this.getRecordChoose
                this.setRecordChoose(chooseSwitch);
            },
            ...mapMutations({
                setShowTime:'SET_SHOW_TIME',
                setShowPicker:'SET_SHOW_PICKER',
                setMessageCount:'SET_MESSAGE_COUNT',
                setShowSearch:'SET_SHOW_SEARCH',
                setReflesh:'SET_REFLESH',
                setRecord:'SET_RECORD_SHOW',
                setRecordDetail:'SET_RECORD_DETAIL_SHOW',
                setRecordChoose:'SET_RECORD_CHOOSE',
                setHeaderAdd:'SET_HEARDERADD_SHOW',
                setModelShow:'SET_MODEL_SHOW'
            }),
            ...mapActions([
                'getMessageCount',
                "setHeader"
            ]),
            timeShow(){
                this.setShowTime(true);
            },
            pickerShow(){
                this.setShowPicker(true);
            },
            searchShow(){
                this.setShowSearch(true);
            },
            goto(infoUrl){
                const url = this.user_token ? infoUrl:'/login';
                this.$router.push({
                    path:url
                });
            },
            betShow(){
                this.$emit('showBet')
            },
            showServFun(isShow,isDestroy){   
                
                this.$emit('serverShow',isShow)      //  客服中心 if判断语句 
                if( isDestroy == false ){
                    this.$emit('serverShow',isDestroy)      //  客服中心 if判断语句  
                }
                       
                this.$emit('showServEvent',isShow,isDestroy)
                if( isDestroy == '1' ){
                    this.$emit('serverShow',true)      //  客服中心 if判断语句 
                    this.$emit('showServEvent',isShow,isDestroy)
                }
                this.setModelShow(false)
                if(isShow){
                    this.setHeader(headerConfig['/service']);
                    if(this.$route.path == '/betroom'){
                        this.setHeaderAdd(false)
                    }                    
                }
            }
        },
        watch:{
            user_token(newVal){
                if(newVal){
                    this.getMessageCount();
                }else{
                    this.setMessageCount(0);
                }
            },
        }
    }
</script>
<style scoped lang="scss">
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
        font-size: 0.52rem;
        font-size: $font-size-large-x;
        .outer{
            position:relative;
            top:-.1rem;
                padding: 0 0.5rem 0 0.3rem;
            .inner{
                position:absolute;
                left:.3rem;
                top:.16rem;
            }
        }
        .backIco{
            display: block;
            height: 100%;
            line-height: 1.2rem;
                padding: 0 0.5rem 0 0.3rem;
        }
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
    .record{
        position:absolute;
        height:1.2rem;
        line-height: 1.6rem;
        right:0.8rem;
        padding:0 0.4rem;
        .recordImg{
            display: inline-block;
            width: .7rem;
            height: .7rem;
            @include bg-image('./record');
            background-size: cover;
        }
    }
    .add{
        position:absolute;
        height:1.2rem;
        line-height: 1.4rem;
        right:0;
        padding:0 0.4rem;
        .addImg{
            display: inline-block;
            width: .6rem;
            height: .6rem;
            @include bg-image('./add');
            background-size: cover;
        }
    }
    .recharge-tip,.search{
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
    .close-service{
        position: absolute;
        right: 0.5rem;
        display: inline-block;
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
            img{
                width: .5rem;
                height: 0.6rem;
            }
        }
        .money{
            float:right;
            width:0.8rem;
            height:1.2rem;
            padding-right: 0.2rem;
        }
    }
    .title{
        display: inline-block;
        height:1.2rem;
        line-height: 1.2rem;
        vertical-align: top;
        padding: 0 0.8rem;
        font-size: $font-size-large;
        @include no-wrap();
    }
    .bet-history{
        position:absolute;
        height:1.2rem;
        line-height: 1.2rem;
        right:0;
        padding:0 0.4rem;
        .bet-icon{
            display: inline-block;
            width: 0.8rem;
            height: 0.8rem;
            background-image: url('/static/img/icon-bet@2x.c2f824d.png')
        }
    }
    .addContent{
        background: #ffffff;
        width: 3.8rem;
        position: absolute;
        right: 0.2rem;
        top: 1.38rem;
        color: #979797;
        border-radius: 0.15rem;
        &::after{
            content: '';
            position: absolute;
            border-bottom-width: 0.6rem;
            border-left-width: 0.6rem;
            border-right-width: 0.3rem;
            border-color: transparent transparent #fff transparent;
            border-style: solid;
            top: -0.22rem;
            right: 0.2rem;
        }
        i{
            display: inline-block;
            width: .5rem;
            height: .5rem;
            background-size: cover;
            vertical-align: middle;
            margin-right: 0.3rem;
            margin-top: -0.1rem;
        }
        .kefuImg{
            @include bg-image('kefu');
        }
        .huishuiImg{
            @include bg-image('huishui');
        }
    }
}
</style>
