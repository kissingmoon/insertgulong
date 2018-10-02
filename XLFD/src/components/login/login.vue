<template>
    <parcel>
        <div class="login">  
            <m-iframe v-if="showsc" :url="initsrc" style="display:none"></m-iframe> 
            <ul class="login-wrapper">
                <li>
                    <p class="txt-con border-bottom-1px">
                        <input type="text" placeholder="以字母开头6-11位用户账号" autocomplete="off" class="input-txt red" v-model="loginParam.user_id" maxlength="12">
                    </p>
                </li>
                <li>
                    <p class="txt-con border-bottom-1px">
                        <input type="password" placeholder="密码" autocomplete="off" class="input-txt" v-model="loginParam.password" maxlength="20">
                    </p>
                </li>
                <li>
                    <p class="txt-con code-txt border-bottom-1px">
                        <input type="text" placeholder="验证码" class="input-txt" v-model="loginParam.code"  maxlength="6">
                    </p>
                    <p class="code-img" @click="setCode">
                        <img :src="codeUrl" alt="">
                    </p>
                </li>
                <li>
                    <!-- <button id="login" class="login-btn" :disabled="btnDisabledType" >登录</button> -->
                    <button id="login" @click="login" class="login-btn" :disabled="btnDisabledType" >登录</button>
                </li>
                <li>
                    <router-link tag="p" to="/register" class="register">注册</router-link>
                    <router-link tag="p" :to="{path:'/service',query:{flag:'customer_service_url'}}" class="forget">忘记密码</router-link>
                </li>
            </ul>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import {mapMutations,mapActions,mapGetters} from 'vuex';
    import Parcel from 'base/parcel/parcel';
    import {httpUrl} from 'common/js/map';
    //import gt from 'common/js/gt.sense';
    //import 'common/js/tcaptcha.js';
    import remoteJs from 'base/remote-js/remote-js'
    import mIframe from 'base/m-iframe/m-iframe'
    import {local,session,randomWord,removeSession,removeLocal,objToStr} from 'common/js/param';
    export default {
        data() {
            return{
                loginParam:{
                    code_id:'',
                    code:'',
                    user_id:'',
                    password:''
                },
                codeUrl:``,
                showsc:false
            }
        },
        components:{
            Parcel,
            mIframe,
            remoteJs
        },
        created() {
           
            this.resetAccount();
        },
        mounted(){
            this.init();
        },
        computed: {
            ...mapGetters([                
                'hd_qiandao',
                'api_base',
                'href_type'
            ]),
            btnDisabledType(){
                let type = this.loginParam.user_id.length < 6 || this.loginParam.password.length < 6;
                return type
            },
            initsrc () {
                return objToStr(this.loginParam)
            }  
        },
        methods: {
            ...mapMutations({
                setTip:'SET_TIP',
                setQiandao:'SET_HD_QIANDAO'
            }),
            ...mapActions([
                'resetUser',
                'getIsReceived',
                'getUser',
                'getXrkhType'
            ]),
            init(){
                this.getloginParam();
                 this.setCode();
                // this.setCode();
                // this.getBaseData();
                //this.makeVerify();
                //this.verific();
            },
            /*
            //极验验证码初始化
            makeVerify(){
                let _this = this;
                initSense({
                    id:'baa56257af49111e99feb1aa1a13cdd3',        
                    onError:(err) => {
                        _this.setTip('验证码初始化错误');
                    }
                }, (sense) => {
                    document.getElementById('login').addEventListener('click',() => {
                        sense.sense()
                    });
                    sense.setInfos( () => {
                        //设置可上传数据。请务必按照字段规范填写，否则会在服务验证时出错，导致程序无法运行或者后续数据分析出现混乱，参数需求参考api文档。
                        return {
                            interactive: 1
                        }
                    }).onSuccess( (data) => {
                        this.login(data);
                    }).onClose(() => {
                        //关闭回调
                    }).onError((err) => {
                        //错误回调
                    })
                });
            },
            */
           //腾讯验证码的回调函数
        //    verific(){ 
        //        let _this=this;           
        //         //绑定一个元素并手动传入场景Id和回调
        //         new TencentCaptcha(
        //             document.getElementById('login'),
        //             '2071577376',
        //             function(res) {
        //                 _this.loginParam.ticket=res.ticket
        //                 _this.loginParam.randStr=res.randstr
        //                 _this.login()
        //                  // res（未通过验证）= {ret: 1, ticket: null}
        //                 // res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
        //                 // if(res.ret === 0){
        //                 //     _this.$axios.getRequest(verparm)
        //                 //     .then((res)=> {
        //                 //         console.log(res)
        //                 //         })
        //                 // }lo
        //             },
        //             { bizState: '自定义透传参数' }
        //         );
        //    },
            // 获取本地储存的账号密码
            getloginParam(){
                let loginParam = local('loginParam');
                if(loginParam){
                    this.loginParam = loginParam;
                }
            },
            // 随机生成8-10位的code_id
            setCode(){                
                this.loginParam.code_id = 'H' + randomWord(false,8,10);
                // this.codeUrl=`${this.api_base}/config/generator-code?code_id=${this.loginParam.code_id}`;
                this.codeUrl=`${this.api_base}/config/generator-code?code_id=${this.loginParam.code_id}`;
            },
            // 获取验证配置信息
            getBaseData(){
                var _this = this;
                this.$axios.postRequest(httpUrl.config.geetestCode,{code_id:this.loginParam.code_id})
                .then((res)=> {
                    let data=res.data;
                    if(data.success == 1){
                        initGeetest({
                            gt: data.gt,
                            challenge: data.challenge,
                            offline: !data.success,
                            new_captcha: true,
                            product: 'bind',
                            width:'7rem'
                        }, function(captchaObj){
                            captchaObj.onReady(() => {
                                //验证码ready之后才能调用verify方法显示验证码
                                document.getElementById('login').addEventListener('click',() => {
                                    captchaObj.verify();
                                });
                            }).onSuccess(() => {
                                let result = captchaObj.getValidate();
                                if(!result){
                                    _this.setTip('校验未通过');
                                }else{
                                    _this.login(result);
                                }
                            }).onError(() => {
                                //your code
                            });
                        });
                    }
                });
            },
            // 重置用户信息
            resetAccount(){
                removeSession('user_token');
                removeSession('md5_salt');
                removeSession('uID');
                this.resetUser({
                    account:'',
                    token:'',
                    md5:''
                })
            },
            judgeType(){
                if(this.href_type){
                    return true;
                }
                else{
                    return false;
                }
            },
            // 用户登录
            login(data){
                this.showsc=true; 
                //this.loginParam.challenge = data.challenge;
                //this.loginParam.idType = 4;
                this.loginParam.idValue = this.loginParam.user_id;
                this.loginParam.agent_domain= window.document.domain;
                this.$axios.postRequest(httpUrl.account.login,this.loginParam)
                .then((res)=> {
                    if(res.data && !res.data.errorCode){ 
                        // delete this.loginParam.code_id;           
                        delete this.loginParam.code;           
                        local('loginParam',this.loginParam);
                        session('user_token',res.data.user_token);
                        session('md5_salt',res.data.md5_salt);
                        session('uID',res.data.user_id);
                        this.resetUser({
                            account:res.data,
                            token:res.data.user_token,
                            md5:res.data.md5_salt
                        })
                        this.getXrkhType('hd_xrkh');                        
                        setTimeout(() => {
                            this.getIsReceived('hd_qiandao');
                            this.getUser();
                        },1000)
                        this.$router.push({
                            path:'/'
                        });
                    }else{
                        this.init();
                        this.loginParam.code = '';
                    }
                });
            }
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.login{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    z-index: 101;
    overflow: hidden;
    background: $color-bg;
    .login-wrapper{
        padding:0.56rem;
        li{
            height:auto;
            overflow: hidden;
            .txt-con{
                height: auto;
                overflow: hidden;
                @include border-bottom-1px(solid,$color-border-gray);
                
                .input-txt{
                    padding-top:0.4rem;
                    padding-bottom:0.4rem;
                    height:0.6rem;
                    width:100%;
                    line-height: 0.6rem;
                    font-size: $font-size-medium-x;
                }

            }
            .code-txt{
                width:5.36rem;
                float: left;
            }
            .code-img{
                width:3.3rem;
                height:1.1rem;
                float: right;
                padding-top: 0.3rem;
                img{
                    width: 100%;
                }
            }
            .login-btn{
                height:1.17rem;
                width:100%;
                text-align: center;
                background:$color-red;
                color: #fff;
                font-size: $font-size-large;
                border-radius: 0.1rem;
                border:0;
                margin-top: 0.6rem;
            }
            .register{
                float: left;
                padding-top: 0.6rem;
                color:$color-text-blur;
                font-size:$font-size-medium;
            }
            .forget{            
                float: right;
                padding-top: 0.6rem;
                color:$color-text-blur;
                font-size:$font-size-medium;
            }
            &.btn-wrapper{
                padding-top:0;
                padding-bottom: 0;
                height: auto;
            }
        }
    }
}
</style>
