<template>
    <div class="register">
        <ul class="register-wrapper">
            <li>
                <p class="txt-con border-1px">
                    <input type="text" placeholder="账号" class="input-txt" v-model="registerParam.user_id">
                </p>
            </li>
            <li>
                <p class="txt-con border-1px">
                    <input type="password" placeholder="6-16位密码" class="input-txt" v-model="registerParam.password">
                </p>
            </li>
            <li>
                <p class="txt-con border-1px">
                    <input type="password" placeholder="确认密码" class="input-txt" v-model="registerParam.repeat_password">
                </p>
            </li>
            <li>
                <p class="txt-con border-1px">
                    <input type="text" placeholder="手机号码（为了您的顺利出款，请如实填写！）" class="input-txt" v-model="registerParam.phone">
                </p>
            </li>
            <li>
                <p class="txt-con code-txt border-1px">
                    <input type="text" placeholder="验证码" class="input-txt" v-model="registerParam.code">
                </p>
                <p class="code-img">
                    <img :src="codeUrl" alt="">
                </p>
            </li>
            <li>
                <button class="login-btn" @click="register">注册</button>
            </li>
            <li>
                <p class="forget">注册即表示同意<a>《使用协议》</a></p>
            </li>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">
    import {httpUrl} from 'common/js/map';
    import {reData,session,randomWord} from 'common/js/param';
    export default{
        data() {
            return{
                paramData:{},
                registerParam:{
                    code_id:'2154',
                    code:'',
                    user_id:'',
                    password:'',
                    repeat_password:'',
                    phone:''
                },
                codeUrl:'http://www.xlfdapi.com/config/generator-code?code_id=2154'
            }
        },
        created() {
            this.paramData=reData();
            //设置code_id随机数
            //this.code_id = randomWord(false,6,8);
            //this._getGeneratorCode();
        },
        methods: {
            _getGeneratorCode() {
                let param=reData({'code_id':this.loginParam.codeId});
                this.$axios.post(httpUrl.login.generatorCode,param)
                .then((res) => {
                    this.codeUrl=res.data;
                });
            },
            register(){
                let param=reData(this.registerParam);
                this.$axios.post(httpUrl.account.register,param)
                .then((res) => {
                    session('account',res.data);
                    //window.location.href="/home";
                })
                .catch((error) => {
                    if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                    } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                    }
                    console.log(error.config);
                });
            }
        
        }
    }
</script>
<style lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.register{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    .register-wrapper{
        padding:0.56rem;
        .txt-con{
            height: auto;
            overflow: hidden;
            @include border-1px($color-border-gray);
            .input-txt{
                height:1.4rem;
                width:100%;
                line-height: 1.4rem;
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
            background:$color-bg-theme;
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
