<template>
    <parcel>      
        <div class="register">
            <ul class="register-wrapper">
                <li>
                    <p class="txt-con border-bottom-1px">
                        <input type="text" placeholder="以字母开头6-11位用户账户" class="input-txt" v-model="registerParam.user_id" maxlength="12">
                    </p>
                </li>
                <li>
                    <p class="txt-con border-bottom-1px">
                        <input type="password" placeholder="6-16位密码" class="input-txt" v-model="registerParam.password" maxlength="16" autocomplete="off">
                    </p>
                </li>
                <li>
                    <p class="txt-con border-bottom-1px">
                        <input type="password" placeholder="确认密码" class="input-txt" v-model="registerParam.repeat_password" maxlength="16" autocomplete="off">
                    </p>
                </li>
                <li>
                    <p class="txt-con border-bottom-1px">
                        <input placeholder="填写邀请码(可以不填)" class="input-txt" v-model="registerParam.agentCode" maxlength="16" autocomplete="off">
                    </p>
                </li>
                <!-- <li>
                    <p class="txt-con border-bottom-1px">
                        <input type="text" placeholder="手机号码（为了您的顺利出款，请如实填写！）" class="input-txt" v-model="registerParam.phone" maxlength="16">
                    </p>
                </li> -->
                <!-- <li>
                    <p class="txt-con code-txt border-bottom-1px">
                        <input type="text" placeholder="验证码" class="input-txt" v-model="registerParam.code" maxlength="6">
                    </p>
                    <p class="code-img" @click="setCode">
                        <img :src="codeUrl" alt="">
                    </p>
                </li> -->
                <li>
                    <button id="register" class="login-btn" :disabled="btnDisabledType">注册</button>
                </li>
                <li>
                    <p class="forget">注册即表示同意<router-link :to="{path:'/protocol',query:{flag:'register_protocol'}}">《使用协议》</router-link></p>
                </li>
            </ul>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import {mapMutations,mapActions,mapGetters} from 'vuex';
    import Parcel from 'base/parcel/parcel';
    import {httpUrl} from 'common/js/map';
    import gt from 'common/js/gt.sense';
    import {session,randomWord} from 'common/js/param';
    export default {
        data() {
            return{
                registerParam:{
                    // code_id:'2154',
                    // code:'',
                    user_id:'',
                    password:'',
                    repeat_password:'',
                    phone:'',
                    agentCode:''
                },
                // codeUrl:''
            }
        },
        components:{
            Parcel
        },
        created() {
        },
        mounted(){
            this.init();
            if(this.$route.query.promoteID){
                this.registerParam.agentCode=this.$route.query.promoteID;
            }
        },
        computed: {
            ...mapGetters([
                'api_base'
            ]),
            btnDisabledType(){
                let type = this.registerParam.user_id.length < 6 || this.registerParam.password.length < 6 || this.registerParam.repeat_password.length < 6;
                return type
            }
        },
        methods: {
            init(){
                // this.setCode();
                // this.getBaseData();
                //this.makeVerify();
                this.verific();
            },
            // 生成随机id
            setCode(){
                this.registerParam.code_id = randomWord(false,6,8);
                // this.codeUrl=`${this.api_base}/config/generator-code?code_id=${this.registerParam.code_id}`
            },
            //腾讯验证码的回调函数
           verific(){ 
               let _this=this;           
                // 绑定一个元素并手动传入场景Id和回调
                new TencentCaptcha(
                    document.getElementById('register'),
                    '2071577376',
                    function(res) {
                        console.log(res);
                        _this.registerParam.ticket=res.ticket
                        _this.registerParam.randStr=res.randstr
                        _this.register()
                         // res（未通过验证）= {ret: 1, ticket: null}
                        // res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
                        // if(res.ret === 0){
                        //     _this.$axios.getRequest(verparm)
                        //     .then((res)=> {
                        //         console.log(res)
                        //         })
                        // }lo
                    },
                    { bizState: '自定义透传参数' }
                );
                console.log("新建对象完成")
           },
            // //极验验证码初始化
            // makeVerify(){
            //     let _this = this;
            //     initSense({
            //         id:'baa56257af49111e99feb1aa1a13cdd3',        
            //         onError:(err) => {
            //             _this.setTip('验证码初始化错误');
            //         }
            //     }, (sense) => {
            //         document.getElementById('register').addEventListener('click',() => {
            //             sense.sense()
            //         });
            //         sense.setInfos( () => {
            //             //设置可上传数据。请务必按照字段规范填写，否则会在服务验证时出错，导致程序无法运行或者后续数据分析出现混乱，参数需求参考api文档。
            //             return {
            //                 interactive: 1
            //             }
            //         }).onSuccess( (data) => {
            //             this.register(data);
            //         }).onClose(() => {
            //             //关闭回调
            //         }).onError((err) => {
            //             //错误回调
            //         })
            //     });
            // },
            // 初始化验证码
            getBaseData(){
                var _this = this;
                this.$axios.postRequest(httpUrl.config.geetestCode,{code_id:this.registerParam.code_id})
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
                                document.getElementById('register').addEventListener('click',() => {
                                    if(!_this.registerParam.password || !_this.registerParam.repeat_password){
                                        _this.setTip("请输入密码和确认密码");
                                        return;
                                    }else if(_this.registerParam.password !== _this.registerParam.repeat_password){
                                        _this.setTip("确认密码不同");
                                        return;
                                    }else{
                                        captchaObj.verify();
                                    }
                                });
                            }).onSuccess(() => {
                                let result = captchaObj.getValidate();
                                if(!result){
                                    _this.setTip('校验未通过');
                                }else{
                                    _this.register(result);
                                }
                            }).onError(() => {
                                //your code
                            });
                        });
                    }
                });
            },
            register(data){
                // this.registerParam.geetest_challenge = result.geetest_challenge;
                // this.registerParam.geetest_validate = result.geetest_validate;
                // this.registerParam.geetest_seccode = result.geetest_seccode;
                //this.registerParam.challenge = data.challenge;
                this.registerParam.idType = 4;
                this.registerParam.idValue = this.registerParam.user_id;
                this.$axios.postRequest(httpUrl.account.register,this.registerParam)
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        session('user_token',res.data.user_token);
                        session('md5_salt',res.data.md5_salt);
                        this.resetUser({
                            account:res.data,
                            token:res.data.user_token,
                            md5:res.data.md5_salt
                        })
                        this.setTip("注册成功");
                        this.getXrkhType('hd_xrkh');
                        setTimeout(() => {
                            this.getIsReceived('hd_qiandao');
                        },1000)
                        this.$router.push({
                            path:'/'
                        });
                    }else{
                        // this.init();
                    }
                });
            },
            ...mapMutations({
                setTip:'SET_TIP',
            }),
            ...mapActions([
                'resetUser',
                'getIsReceived',
                'getXrkhType'
            ])
        
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.register{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    background:$color-bg;
    .register-wrapper{
        padding:0.56rem;
        .txt-con{
            height: auto;
            overflow: hidden;
            @include border-bottom-1px(solid,$color-border-gray);
            .input-txt{
                height:0.6rem;
                padding-top:0.4rem;
                padding-bottom:0.4rem;
                width:100%;
                line-height: 0.6rem;
                font-size: $font-size-medium-x;
            }
            .input-txt::placeholder{
                font-size: $font-size-medium
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
            padding-top: 0.4rem;
            font-size:$font-size-medium;
            a{
                color:$color-text-blur;
            }
        }
    }
}
</style>
