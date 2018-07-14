<template>
    <parcel>
        <div class="login">
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
                <!-- <li>
                    <p class="txt-con code-txt border-bottom-1px">
                        <input type="text" placeholder="验证码" class="input-txt" v-model="loginParam.code"  maxlength="6">
                    </p>
                    <p class="code-img" @click="setCode">
                        <img :src="codeUrl" alt="">
                    </p>
                </li> -->
                <li>
                    <button id="login" class="login-btn" :disabled="btnDisabledType" >登录</button>
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
    import gt from 'common/js/gt';
    import {session,randomWord,removeSession} from 'common/js/param';
    export default {
        data() {
            return{
                loginParam:{
                    code_id:'2154',
                    // code:'',
                    user_id:'',
                    password:''
                },
                // codeUrl:``
            }
        },
        components:{
            Parcel
        },
        created() {
            this.resetAccount();
            this.setCode();
        },
        mounted(){
            this.init();
        },
        computed: {
            ...mapGetters([
                'api_base'
            ]),
            btnDisabledType(){
                let type = this.loginParam.user_id.length < 6 || this.loginParam.password.length < 6;
                return type
            }
        },
        methods: {
            init(){
                this.getBaseData();
            },
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
            setCode(){
                this.loginParam.code_id = randomWord(false,8,10);
                // this.codeUrl=`${this.api_base}/config/generator-code?code_id=${this.loginParam.code_id}`;
            },
            resetAccount(){
                removeSession('user_token');
                removeSession('md5_salt');
                this.resetUser({
                    account:'',
                    token:'',
                    md5:''
                })
            },
            login(result){
                this.loginParam.geetest_challenge = result.geetest_challenge;
                this.loginParam.geetest_validate = result.geetest_validate;
                this.loginParam.geetest_seccode = result.geetest_seccode;
                this.$axios.postRequest(httpUrl.account.login,this.loginParam)
                .then((res)=> {
                    if(!res.data.errorCode){
                        session('user_token',res.data.user_token);
                        session('md5_salt',res.data.md5_salt);
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
                        // this.setCode();
                    }
                });
            },
            ...mapMutations({
                setTip:'SET_TIP',
            }),
            ...mapActions([
                'resetUser',
                'getIsReceived',
                'getUser',
                'getXrkhType'
            ])
        
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
