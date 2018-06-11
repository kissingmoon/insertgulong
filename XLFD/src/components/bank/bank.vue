<template>
    <parcel>
        <div class="bank">
            <scroll ref="scroll" class="scroll-wrapper">
                <div class="txt-wrapper">
                    <ul>
                        <li>
                            <p class="title">真实姓名</p>
                            <p class="txt-con">
                                <input type="text" placeholder="请输入您的真实姓名" autocomplete="off" class="input-txt red" v-model="loginParam.user_id">
                            </p>
                        </li>
                        <li>
                            <p class="title">银行开户行</p>
                            <p class="txt-con">
                                <input type="text" placeholder="请选择您的银行开户行" autocomplete="off" class="input-txt" v-model="loginParam.password">
                            </p>
                        </li>
                        <li>
                            <p class="title">开户支行</p>
                            <p class="txt-con">
                                <input type="text" placeholder="请输入您的开户支行" class="input-txt" v-model="loginParam.code">
                            </p>
                        </li>
                        <li>
                            <p class="title">银行卡号</p>
                            <p class="txt-con">
                                <input type="text" placeholder="请输入您的银行卡号" class="input-txt" v-model="loginParam.code">
                            </p>
                        </li>
                    </ul>
                    <div class="btn-wrapper">
                        <button>确定</button>
                    </div>
                </div>
            </scroll>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import {mapActions} from 'vuex';
    import Parcel from 'base/parcel/parcel';
    import {httpUrl} from 'common/js/map';
    import Scroll from 'base/scroll/scroll';
    import {session,randomWord,removeSession} from 'common/js/param';
    export default {
        data() {
            return{
                loginParam:{
                    code_id:'2154',
                    code:'',
                    user_id:'',
                    password:''
                },
                codeUrl:`http://www.xlfdapi.com/config/generator-code?code_id=2154`
            }
        },
        components:{
            Parcel,
            Scroll
        },
        created() {
            //this.resetAccount();
            //this.loginParam.code_id = randomWord(false,6,8);
            //this._getGeneratorCode();
        },
        methods: {
            _getGeneratorCode() {
                this.$axios.postRequest(httpUrl.account.generatorCode,{'code_id':this.loginParam.codeId})
                .then((res)=> {
                    this.codeUrl=res.data;
                });
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
            ...mapActions([
                'resetUser'
            ])
        
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.bank{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    z-index: 101;
    background: $color-bg;
    overflow: hidden;
    .scroll-wrapper{
        height:100%;
        overflow: hidden;
        .txt-wrapper{
            position: relative;
            min-height: calc(100% - 2.4rem);
            height: auto;
            overflow: hidden;
            padding-bottom:2.6rem;
            ul{
                height:auto;
                overflow: hidden;
                li{
                    padding: 0 0.3rem;
                    .title{
                        height:1rem;
                        font-size:$font-size-large;
                        line-height: 1rem;
                        padding-top:0.4rem;
                    }
                    .txt-con{
                        height: auto;
                        overflow: hidden;
                        padding-left:0.2rem;
                        height:1.2rem;
                        border-radius: 0.1rem;
                        background:$color-bg-gray;
                        .input-txt{
                            height:1.2rem;
                            width:100%;
                            line-height: 1.2rem;
                            font-size: $font-size-medium-x;
                            background: none;
                        }
    
                    }
                }
            }
            .btn-wrapper{
                position: absolute;
                height:1.17rem;
                padding:0 0.3rem;
                width:calc(100vw - 0.6rem);
                bottom:0.6rem;
                button{
                    height:1.17rem;
                    width:100%;
                    text-align: center;
                    background:$color-bg-theme;
                    color: #fff;
                    font-size: $font-size-large;
                    border-radius: 0.1rem;
                    border:0;
                }
            }
        }
    }
    
}
</style>
