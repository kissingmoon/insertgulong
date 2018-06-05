<template>
    <parcel>
        <div class="login">
            <ul class="login-wrapper">
                <li>
                    <p class="txt-con border-1px">
                        <input type="text" placeholder="账号" autocomplete="off" class="input-txt red" v-model="loginParam.user_id">
                    </p>
                </li>
                <li>
                    <p class="txt-con border-1px">
                        <input type="password" placeholder="密码" autocomplete="off" class="input-txt" v-model="loginParam.password">
                    </p>
                </li>
                <li>
                    <p class="txt-con code-txt border-1px">
                        <input type="text" placeholder="验证码" class="input-txt" v-model="loginParam.code">
                    </p>
                    <p class="code-img">
                        <img :src="codeUrl" alt="">
                    </p>
                </li>
                <li>
                    <button class="login-btn" @click="login">登录</button>
                </li>
                <li>
                    <p class="register">注册</p>
                    <p class="forget">忘记密码</p>
                </li>
            </ul>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import Parcel from 'base/parcel/parcel';
    import {httpUrl} from 'common/js/map';
    import {reData,session,randomWord} from 'common/js/param';
    export default{
        data() {
            return{
                paramData:{},
                loginParam:{
                    code_id:'2154',
                    code:'',
                    user_id:'',
                    password:''
                },
                codeUrl:'http://www.xlfdapi.com/config/generator-code?code_id=2154'
            }
        },
        components:{
            Parcel
        },
        created() {
            this.paramData=reData();
            //设置code_id随机数
            //this.code_id = randomWord(false,6,8);
            //this._getGeneratorCode();
        },
        methods: {
            _getGeneratorCode() {
                this.postRequest(httpUrl.account.generatorCode,{'code_id':this.loginParam.codeId})
                .then((res)=> {
                    this.codeUrl=res.data;
                });
            },
            login(){
                this.postRequest(httpUrl.account.login,this.loginParam)
                .then((res)=> {
                    session('account',res.data);
                    this.$router.push({
                        path:'/info'
                    });
                });
            }
        
        }
    }
</script>
<style lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.login{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    z-index: 101;
    background: $color-bg;
    .login-wrapper{
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
                
                //border-bottom:1px solid $color-border;
            }
            .input-txt::placeholder{
                font-size: $font-size-small-x;
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
            float: right;
            padding-top: 0.6rem;
            color:$color-text-blur;
            font-size:$font-size-medium;
        }
    }
}
</style>
