<template>
    <parcel>
        <div class="message">
            <scroll ref="scroll" class="scroll-content"
                :data="messageList" 
                :isAllData="isAllData"
                :pullup="pullup"
                :loadStatus="loadStatus"
                @pullup="getRank('up')"
                >
                <div class="message-list">
                    <ul>
                        <li class="item-main border-bottom-1px" v-for="(item,i) in messageList" @click="showDetail(item,i)">
                            <div class="message-icon">
                                <i v-if="item.is_read != 1" class="icon-envelope red-icon"></i>
                                <i v-if="item.is_read == 1" class="icon-envelope-open"></i>
                            </div>
                            <div class="message-info">
                                <div class="title-time">
                                    <p class="title">【{{item.title}}】</p>
                                    <p class="time">{{item.create_time}}</p>
                                </div>
                                <div class="txt">
                                    {{item.content}}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </scroll>
            <div v-show="detailShow" class="background" @click="closeDetail">
            </div>
            <div v-show="detailShow" class="detail">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                       <div class="title border-bottom-1px">
                           {{messageDetail.title}}
                       </div>
                       <div class="info">
                           <div class="txt">
                               {{messageDetail.content}}
                           </div>
                           <div class="time">
                               系统于{{messageDetail.create_time}}寄出
                           </div>
                       </div>
                    </div>
                </div>
                <div class="detail-close">
                    <button @click="closeDetail" class="m-r">关闭</button>
                    <button @click="deleteMessage">删除</button>
                </div>
            </div>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import {httpUrl} from 'common/js/map';
    export default {
        data() {
            return{
                pullup: true,
                loadStatus:false,
                isAllData:false,
                detailShow:false,
                messageDetail:{},
                messageList:[],
                detailIndex:0,
                messageParam:{
                    page_no:1,
                    page_size:20
                },
            }
        },
        components:{
            Parcel,
            Scroll
        },
        created() {
            this.getMessage();
        },
        methods: {
            getMessage(type){
                if(type == 'up'){
                    this.loadStatus=true;
                    ++this.messageParam.page_no;
                }
                this.$axios.postRequest(httpUrl.config.message,this.messageParam)
                .then((res)=> {
                    if(!res.data.errorCode){
                        if(type == 'up'){
                            this.loadStatus=false;
                            this.messageList=this.messageList.concat(res.data);
                            this.isAllData =res.data.length < 20 ? true : false;
                        }else{
                            this.messageList=res.data;
                            this.isAllData =res.data.length < 20 ? true : false;
                        }
                    }
                });
            },
            showDetail(item,index){
                this.messageDetail=item;
                this.detailIndex=index;
                this.detailShow=true;
            },
            closeDetail(){
                this.detailShow=false;
            },
            deleteMessage(){
                this.detailShow=false;
                this.$axios.postRequest(httpUrl.config.messageHandle,{msg_id:this.messageDetail.id,flag:2})
                .then((res)=> {
                    if(!res.data.errorCode){
                        if(res.data.status == 1){
                            this.messageList.splice(this.detailIndex, 1);
                        }
                    }
                });
            }
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.message{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    z-index: 103;
    background: $color-bg;
    .scroll-content{
        height:100%;
        overflow: hidden;
        .message-list{
            height: auto;
            overflow: hidden;
            .item-main{
                height:1.44rem;
                padding:0.2rem 0.3rem;
                @include border-bottom-1px(solid,$color-border-gray);
                .message-icon{
                    float: left;
                    width:1rem;
                    height:1.44rem;
                    line-height: 1.44rem;
                    text-align: center;
                    font-size: $font-size-large-x;
                    .red-icon{
                        color:$color-text-red;
                    }
                }
                .message-info{
                    float:right;
                    width:8.4rem;
                    .title-time{
                        height:0.7rem;
                        line-height: 0.7rem;
                        .title{
                            float: left;
                            font-size: $font-size-medium-x;
                            color:$color-text-red;
                        }
                        .time{
                            float:right;
                            color:$color-text-gray; 
                        }
                    }
                    .txt{
                        height: 0.75rem;
                        line-height: 0.75rem;
                        padding-left:0.2rem;
                        @include no-wrap();
                    }
                }
            }
        }
    }
    .background {
        position:fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        background:$color-bg-shade-a5;
    }
    .detail{
        position:fixed;
        top:calc((100% - 8rem) / 2);
        left:1.5rem;
        z-index:1200;
        width:7rem;
        height:7.8rem;
        overflow:auto;
        background:$color-bg;
        border-radius: 0.2rem;
        .detail-wrapper{
            min-height:100%;
            .detail-main{
                padding-bottom:1.4rem;
                .title{
                    height:1rem;
                    padding:0.2rem 0.4rem;
                    line-height: 1rem;
                    text-align: center;
                    font-size: $font-size-large;
                    color:$color-text-red;
                    @include border-bottom-1px(solid,$color-border-gray);
                    @include no-wrap();
                }
                .info{
                    margin:0.3rem;
                    background:$color-bg-gray;
                    border-radius: 0.1rem;
                    height:4rem;
                    padding:0.3rem 0.2rem 0;
                    
                    .txt{
                        height:3.5rem;
                        overflow-y: auto;
                        line-height: 0.5rem;
                    }
                    .time{
                        height: 0.5rem;
                        text-align: right;
                        font-size: $font-size-small;
                        color:$color-text-gray;
                    }
                }
            }
        }
        .detail-close{
            position:relative;
            margin:-1.4rem auto 0 auto;
            clear:both;
            text-align: center;
            button{
                height:0.8rem;
                width:2.5rem;
                text-align: center;
                background:$color-bg-theme;
                color: #fff;
                font-size: $font-size-medium-x;
                border-radius: 0.1rem;
                border:0;
                &.m-r{
                    margin-right: 0.3rem;
                    background:$color-btn-gray;
                }
            }
        }
    }
}
</style>
