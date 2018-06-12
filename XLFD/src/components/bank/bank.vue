<template>
    <parcel>
        <div class="bank">
            <scroll ref="scroll" class="scroll-wrapper" :click="false">
                <div class="txt-wrapper">
                    <ul>
                        <li>
                            <p class="title">真实姓名</p>
                            <p class="txt-con">
                                <input type="text" placeholder="请输入您的真实姓名" autocomplete="off" class="input-txt red" v-model="bankParam.user_name" maxlength="20">
                            </p>
                        </li>
                        <li>
                            <p class="title">银行开户行</p>
                            <p class="txt-con">
                                <input type="text" placeholder="请选择您的银行开户行" autocomplete="off" class="input-txt" v-model="bankParam.bank_no">
                            </p>
                        </li>
                        <li>
                            <p class="title">开户支行</p>
                            <p class="txt-con">
                                <input type="text" placeholder="请输入您的开户支行" class="input-txt" v-model="bankParam.bank_branch_no">
                            </p>
                        </li>
                        <li>
                            <p class="title">银行卡号</p>
                            <p class="txt-con">
                                <input type="text" placeholder="请输入您的银行卡号" class="input-txt" v-model="bankParam.account_no">
                            </p>
                        </li>
                    </ul>
                    <div class="btn-wrapper" :class="account.bank_status == 0 ? 'show':''">
                        <button @click="setBankInfo">确定</button>
                    </div>
                </div>
            </scroll>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import {mapGetters,mapActions} from 'vuex';
    import Parcel from 'base/parcel/parcel';
    import {httpUrl} from 'common/js/map';
    import Scroll from 'base/scroll/scroll';
    import {session,randomWord,removeSession} from 'common/js/param';
    export default {
        data() {
            return{
                bankParam:{
                    user_name:'',
                    bank_no:'',
                    bank_branch_no:'',
                    account_no:''
                },
                bankList:[]
            }
        },
        components:{
            Parcel,
            Scroll
        },
        created() {
            this.getBankInfo();
        },
        computed: {
            ...mapGetters([
                'account'
            ])
        },
        methods: {
            getBankInfo() {
                if(this.account.bank_status == 0){
                    this.$axios.postRequest(httpUrl.info.bankList)
                    .then((res)=> {
                        if(!res.data.errorCode){
                            console.log(res.data);
                            this.bankList=res.data;
                        }
                    });
                }else{
                    this.$axios.postRequest(httpUrl.info.bankInfo)
                    .then((res)=> {
                        if(!res.data.errorCode){
                            this.bankParam=res.data;
                        }
                    });
                }
                
            },
            setBankInfo(){
                this.$axios.postRequest(httpUrl.info.bindBank,this.bankParam)
                .then((res)=> {
                    if(!res.data.errorCode){
                        console.log('设置成功！');
                        this.getUser();
                    }
                });
            },
            ...mapActions([
                'getUser'
            ])
        },
        watch:{
            account(){
                this.getBankInfo();
            }
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
            padding-bottom:2.4rem;
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
                display: none;
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
