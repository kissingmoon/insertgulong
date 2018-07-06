<template>
    <parcel>      
        <div class="register">
            <ul class="register-wrapper">
                <li>
                    <p class="txt-con border-bottom-1px">
                        <input type="text" placeholder="账号" class="input-txt" v-model="registerParam.user_id" maxlength="12">
                    </p>
                </li>
                <li>
                    <p class="txt-con border-bottom-1px">
                        <input type="password" placeholder="6-16位密码" class="input-txt" v-model="registerParam.password" maxlength="16">
                    </p>
                </li>
                <li>
                    <p class="txt-con border-bottom-1px">
                        <input type="password" placeholder="确认密码" class="input-txt" v-model="registerParam.repeat_password" maxlength="16">
                    </p>
                </li>
                <li>
                    <p class="txt-con border-bottom-1px">
                        <input type="text" placeholder="手机号码（为了您的顺利出款，请如实填写！）" class="input-txt" v-model="registerParam.phone" maxlength="16">
                    </p>
                </li>
                <li>
                    <p class="txt-con code-txt border-bottom-1px">
                        <input type="text" placeholder="验证码" class="input-txt" v-model="registerParam.code" maxlength="6">
                    </p>
                    <p class="code-img" @click="setCode">
                        <img :src="codeUrl" alt="">
                    </p>
                </li>
                <li>
                    <button class="login-btn" @click="register">注册</button>
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
    import {session,randomWord} from 'common/js/param';
    export default {
        data() {
            return{
                registerParam:{
                    code_id:'2154',
                    code:'',
                    user_id:'',
                    password:'',
                    repeat_password:'',
                    phone:''
                },
                codeUrl:''
            }
        },
        components:{
            Parcel
        },
        created() {
            this.setCode();
        },
        computed: {
            ...mapGetters([
                'api_base'
            ])
        },
        methods: {
            setCode(){
                this.registerParam.code_id = randomWord(false,6,8);
                this.codeUrl=`${this.api_base}/config/generator-code?code_id=${this.registerParam.code_id}`
            },
            register(){
                if(this.registerParam.password !== this.registerParam.repeat_password){
                    this.setTip("确认密码不同");
                    return;
                }
                this.$axios.postRequest(httpUrl.account.register,this.registerParam)
                .then((res)=> {
                    if(!res.data.errorCode){
                        session('user_token',res.data.user_token);
                        session('md5_salt',res.data.md5_salt);
                        this.resetUser({
                            account:res.data,
                            token:res.data.user_token,
                            md5:res.data.md5_salt
                        })
                        this.setTip("注册成功");
                        this.getIsReceived('hd_qiandao');
                        this.$router.push({
                            path:'/info'
                        });
                    }else{
                        this.setCode();
                    }
                });
            },
            ...mapMutations({
                setTip:'SET_TIP',
            }),
            ...mapActions([
                'resetUser',
                'getIsReceived'
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
