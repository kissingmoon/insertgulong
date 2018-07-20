<template>
<div>
    <div v-show="xrkhShow && isHasPhone">
        <div class="background" ></div>
        <div class="detail phone">
            <div class="wf-detail-wrapper clearfix">
                <div class="detail-title">
                    <i @click="closeHd" class="icon-close-circle close-circle"></i>
                </div>
                <div class="wf-detail-main">
                    <div class="phone-wrapper">
                        <p class="number">
                             <input placeholder="请输入手机号码" v-model="mobile" type="tel" maxlength="11" >
                        </p>
                        
                    </div>
                    <div class="code-wrapper">
                        <p class="code">
                            <input v-model="code" placeholder="请输入验证码" type="tel" maxlength="6">
                        </p>
                        <p class="code-btn">
                            <button @click="getCode" :disabled="getCodeType || mobile.length < 1">
                                {{codeBtnTxt}}
                            </button>
                        </p>
                    </div>
                </div>
                <div class="wf-detail-close">
                    <button @click="setXrkh" :disabled="code.length  < 1 || mobile.length  < 1" ><span v-show="code.length  < 1 || mobile.length  < 1">确定</span></button>
                </div>
            </div>
        </div>
    </div>
    <div v-show="xrkhShow && !isHasPhone">
        <div class="background" ></div>
        <div class="detail">
            <div class="wf-detail-wrapper clearfix">
                <div class="detail-title">
                    <i @click="closeHd" class="icon-close-circle close-circle"></i>
                </div>
                <div class="wf-detail-main">
                    
                </div>
                <div class="wf-detail-close">
                    <button @click="setXrkh"></button>
                </div>
            </div>
        </div>
    </div>
    <div v-show="successShow">
        <div class="background" ></div>
        <div class="qiandao-suc">
            <div class="wf-detail-wrapper clearfix">
                <div class="detail-title">领取成功!</div>
                <div class="wf-detail-main">
                    恭喜您！获得<span class="yellow">{{receive_money}}</span>元
                </div>
                <div class="wf-detail-close">
                    <button v-show="showBtn" @click="closeHdSuc"></button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script type="text/ecmascript-6">
    import {mapGetters,mapActions,mapMutations} from 'vuex'
    import Parcel from 'base/parcel/parcel';
    import {httpUrl} from 'common/js/map';
    import Scroll from 'base/scroll/scroll';
    import {session,randomWord,removeSession} from 'common/js/param';
    export default {
        data() {
            return{
                xrkhShow:false,
                isHasPhone:false,
                successShow:false,
                showBtn:false,
                getCodeType:false,
                receive_money:0,
                codeBtnTxt:'获取验证码',
                recTime:60,
                mobile:'',
                code:''
            }
        },
        components:{
            Parcel,
            Scroll
        },
        created() {
        },
        computed: {
            ...mapGetters([
                'hd_xrkh',
                'has_phone'
            ])
        },
        methods: {
            closeHd(){
                this.setHdXrkh('1')
            },
            getCode(){
                this.getCodeType = true;
                this.recCodeBtn();
                this.$axios.postRequest(httpUrl.config.sendCode,{mobile:this.mobile})
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        this.getCodeType = true;
                    }else{
                        clearTimeout(this.recCode);
                        this.getCodeType = false;
                        this.codeBtnTxt = '获取验证码';
                        this.recTime = 60;
                    }
                })
                .catch((err) => {
                    clearTimeout(this.recCode);
                    this.getCodeType = false;
                    this.codeBtnTxt = '获取验证码';
                    this.recTime = 60;
                });
            },
            recCodeBtn(){
                this.recTime -= 1;
                clearTimeout(this.recCode);
                this.recCode= setTimeout(()=>{
                    this.codeBtnTxt = `重新获取(${this.recTime})` 
                    if(this.recTime  == 0){
                        this.getCodeType = false;
                        this.codeBtnTxt = '获取验证码';
                        this.recTime = 60;
                    }else{
                        this.recCodeBtn();
                    }
                },1000);
            },
            setXrkh(){
                this.$axios.postRequest(httpUrl.home.xrkh,{mobile:this.mobile,code:this.code})
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        this.mobile= '';
                        this.code='';
                        this.xrkhShow=false;
                        this.getUser();
                        this.successShow = true;
                        setTimeout(() => {
                            this.showBtn= true;
                        }, 2000);
                        this.receive_money= res.data.receive_money;
                    }
                });
            },
            ...mapMutations({
                setHdXrkh:'SET_HD_XRKH',
                setHasPhone:'SET_HAS_PHONE',
            }),
            ...mapActions([
                'getUser'
            ]),
            closeHdSuc(){
                this.setHdXrkh('1');
                this.setHasPhone('1');
                this.successShow=false;
            }
        },
        watch:{
            hd_xrkh(){
                this.xrkhShow = this.hd_xrkh == 1 ? false : true;
            },
            has_phone(){
                this.isHasPhone = this.has_phone == 1 ? false : true;
            },

        }
    }
</script>
<style scoped lang="scss">
    @import 'common/scss/variable.scss';
    @import 'common/scss/mixin.scss';
    .background {
        position:fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 300;
        background:$color-bg-shade-a8;
    }
    .detail{
        position:fixed;
        top:calc((100% - 9rem) / 2);
        left:1.2rem;
        z-index:310;
        width:7.6rem;
        height:9rem;
        overflow: hidden;
        @include bg-image('bg-xrkh');
        background-size: 100%;
        background-position: center bottom;

        .detail-title{
            height:1.2rem;
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center bottom;
            border-top-left-radius: 0.2rem;
            border-top-right-radius: 0.2rem;
            color:#fff;
            line-height: 1.2rem;
            text-align: right;
            font-size: $font-size-large;
            .close-circle{
                font-size: 0.8rem;
            }
        }
        .wf-detail-wrapper{
            min-height:100%;
            .wf-detail-main{
                padding:0rem 0.4rem 0.2rem;
                overflow:auto;
                height:6.2rem;
                .win-money{
                    line-height: 0.5rem;
                    color:#fff;
                    padding-top:0.2rem;
                }
                .item-wrapper{
                    height:auto;
                    overflow: hidden;
                    padding-top: 0.4rem;
                    line-height: 0.5rem;
                    p{
                        height:auto;
                        overflow: hidden;
                        line-height: 0.5rem;
                        &.title{
                            color:$color-yellow;
                        }
                        &.txt{
                            color:#fff;
                        }
                    }

                }
                .phone-wrapper{
                    height:1.2rem;
                    margin-bottom:0.3rem;
                    background: $color-bg-white-a3;
                    border:1px solid $color-bg-white-a5;
                    border-radius: 0.08rem;
                    padding-left:0.2rem;
                    .number{
                        height:1.2rem;
                        input{
                            width:100%;
                            height:0.6rem;
                            padding-top:0.3rem;
                            padding-bottom: 0.3rem;
                            background: none;
                            color:#fff;
                            &::placeholder{
                               color: $color-text;
                            }
                        }
                    }
                }
                .code-wrapper{
                    height:1.2rem;
                    margin-bottom:0.3rem; 
                    background: $color-bg-white-a3;
                    border:1px solid $color-bg-white-a5;
                    border-radius: 0.08rem;
                    padding-left:0.2rem;
                    padding-right:0.2rem;
                    .code{
                        height:1.2rem;
                        float:left;
                        width:60%;
                        input{
                            width:100%;
                            height:0.6rem;
                            padding-top:0.3rem;
                            padding-bottom: 0.3rem;
                            background: none;
                            color: #fff;
                            &::placeholder{
                               color: $color-text;
                            }
                        }
                    }
                    .code-btn{
                        height:1.2rem;
                        float:left;
                        width:40%;
                        line-height: 1.2rem;
                        text-align: center;
                        button{
                            height:0.8rem;
                            line-height: 0.8rem;
                            width:100%;
                            background: #ffe400 !important;
                            padding:0;
                            border:0;
                            color:$color-text;
                            border-radius: 0.4rem;
                            font-size: $font-size-small-x;
                            &:disabled{
                                color: $color-text-gray !important;
                            }
                        }
                    }
                }
            }
            .wf-detail-close{
                position:relative;
                margin:0 auto;
                height:1rem;
                width:100%;
                text-align: center;
                clear:both;
                button{
                    height:0.92rem;
                    width:4rem;
                    border:0;
                    text-align: center;
                    background:none;
                    color: $color-yellow;
                    font-size: $font-size-large-x;
                    padding:0;
                    margin: 0;
                    @include bg-image('btn-xrkh');
                    background-size: 100%;
                    background-position: center bottom;
                    
                }
            }
        }
        &.phone{
            @include bg-image('wd_bg');
            background-size: 100%;
            top:calc((100% - 10.6rem) / 2);
            height:9.44rem;
            background-position: center top;
            overflow:visible;
            .detail-title{
                position: absolute;
                bottom: -1.8rem;
                width:100%;
                text-align: center;
            }
            .wf-detail-main{
                padding-top:4.1rem;
                height:3.2rem;
                
            }
            .wf-detail-close{
                height:1.6rem;
                button{
                    height:1.2rem;
                    width:6.8rem;
                    @include bg-image('btn_n');
                    background-size: 100%;
                    border-radius: 0.6rem;
                    background-position: center top;
                    background-repeat: no-repeat;
                    box-shadow: 0rem 0.1rem 0.2rem rgba(red, $alpha: 0.4);
                    &:disabled{
                        background:#ccc !important;
                        color:$color-text-gray !important;
                        font-size: $font-size-large;
                    }
                }
            }

        }
    }
    .qiandao-suc{
        position:fixed;
        top:calc((100% - 9rem) / 2);
        left:1.2rem;
        z-index:310;
        width:7.6rem;
        height:9rem;
        overflow: hidden;
        @include bg-image('bg-qiandao-cg');
        background-size: 100%;
        background-position: center bottom;
        .detail-title{
            height:1.2rem;
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center bottom;
            border-top-left-radius: 0.2rem;
            border-top-right-radius: 0.2rem;
            color:#fff;
            line-height: 1.2rem;
            text-align: center;
            font-size: $font-size-large-xx;
        }
        .wf-detail-wrapper{
            min-height:100%;
            .wf-detail-main{
                padding:0rem 0.4rem 0.2rem;
                overflow:auto;
                height:5rem;
                color:#fff;
                text-align: center;
                font-size: $font-size-large;
                .yellow{
                    color:$color-yellow;
                }
            }
            .wf-detail-close{
                position:relative;
                margin:0 auto;
                height:1rem;
                width:100%;
                padding-top:0.1rem;
                text-align: center;
                clear:both;
                button{
                    height:0.96rem;
                    width:4rem;
                    border:0;
                    text-align: center;
                    background:none;
                    color: $color-yellow;
                    font-size: $font-size-large-x;
                    padding:0;
                    margin: 0;
                    @include bg-image('btn-qiandao-suc');
                    background-size: 100%;
                    background-position: center bottom;
                }
            }
        }
    }
</style>
