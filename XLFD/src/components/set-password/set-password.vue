<template>
    <parcel>
        <div class="set-password">
            <scroll ref="scroll" class="scroll-wrapper" :click="false">
                <div class="txt-wrapper">
                    <ul>
                        <li>
                            <p class="title">设置密码</p>
                            <p class="txt-con">
                                <input type="password" placeholder="请输入您的提款密码" autocomplete="off" class="input-txt red" v-model="bank_passwd" maxlength="20">
                            </p>
                        </li>
                        <li>
                            <p class="title">确认密码</p>
                            <p class="txt-con">
                                <input type="password" placeholder="请再次输入您的提款密码" class="input-txt" v-model="affirm_password" maxlength="20">
                            </p>
                        </li>
                    </ul>
                    <div class="btn-wrapper">
                        <button @click="setBankPassword">确定</button>
                    </div>
                </div>
            </scroll>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import {mapGetters,mapActions,mapMutations} from 'vuex'
    import Parcel from 'base/parcel/parcel';
    import {httpUrl} from 'common/js/map';
    import Scroll from 'base/scroll/scroll';
    export default {
        data() {
            return{
                bank_passwd:'',
                affirm_password:''
            }
        },
        components:{
            Parcel,
            Scroll
        },
        created() {
        },
        methods: {
            setBankPassword() {
                if(this.bank_passwd !== this.affirm_password){
                    this.setTip("确认密码不同");
                    return;
                }
                if(this.bank_passwd.length<6){
                    this.setTip('密码长度不能小于6位');
                    return;
                }
                this.$axios.postRequest(httpUrl.info.setBankPassword,{bank_passwd:this.bank_passwd})
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        this.setTip('设置成功');
                        this.getUser();
                        this.$router.back();
                    }
                });
            },
            ...mapMutations({
                setTip:'SET_TIP',
            }),
            ...mapActions([
                'getUser'
            ]),
        
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.set-password{
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
                            height:0.6rem;
                            width:100%;
                            line-height: 0.6rem;
                            padding-top:0.3rem;
                            padding-bottom:0.3rem;
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
                    background:$color-red;
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
