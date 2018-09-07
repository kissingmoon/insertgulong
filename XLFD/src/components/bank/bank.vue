<template>
    <parcel>
        <div class="bank">
            <scroll ref="scroll" class="scroll-wrapper" :click="false">
                <div class="txt-wrapper">
                    <ul>
                        <li>
                            <p class="title">真实姓名</p>
                            <p class="txt-con">
                                <input type="text" placeholder="请输入您的真实姓名" autocomplete="off" class="input-txt red" v-model="bankParam.user_name" maxlength="10" :readonly="account.bank_status == 1">
                            </p>
                        </li>
                        <li>
                            <p class="title">银行开户行</p>
                            <p class="txt-con">
                                <input type="text" v-if="account.bank_status == 1" placeholder="请选择您的银行开户行" autocomplete="off" class="input-txt" v-model="bankParam.bank_no" readonly="readonly">
                                <input type="text" v-if="account.bank_status == 0" placeholder="请选择您的银行开户行" autocomplete="off" class="input-txt" v-model="bankName" readonly="readonly" @click="toshow">
                            </p>
                        </li>
                        <li>
                            <p class="title">开户支行</p>
                            <p class="txt-con">
                                <input type="text" placeholder="请输入您的开户支行" class="input-txt" maxlength="20" v-model="bankParam.bank_branch_no" :readonly="account.bank_status == 1">
                            </p>
                        </li>
                        <li>
                            <p class="title">银行卡号</p>
                            <p class="txt-con">
                                <input type="tel" v-if="account.bank_status == 0" placeholder="请输入您的银行卡号" class="input-txt" maxlength="30" v-model="accountNo">
                                <input type="tel" v-if="account.bank_status == 1" placeholder="请输入您的银行卡号" class="input-txt" maxlength="30" v-model="bankParam.account_no" readonly="readonly">
                            </p>
                        </li>
                    </ul>
                    <div class="btn-wrapper" :class="{'show' : account.bank_status == 0 }">
                        <button @click="setBankInfo" :disabled="bankBtnType">确定</button>
                    </div>
                </div>
            </scroll>
            <pickers
                :txtKey="txtKey"
                :valueKey="valueKey"
                :link="link"
                :show="show"
                :columns="columns"
                :defaultData="defaultData"
                :selectData="bankList"
                @cancel="selectBankHide"
                @confirm="confirmFn"></pickers>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import {mapGetters,mapActions,mapMutations} from 'vuex'
    import Parcel from 'base/parcel/parcel';
    import {httpUrl} from 'common/js/map';
    import Scroll from 'base/scroll/scroll';
    import Pickers from 'base/pickers/pickers';
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
                bankName:'',
                accountNo:'',
                show:false,
                link:false,
                columns: 1,
                txtKey:'name',
                valueKey:'flag',
                defaultData: [{name:'中国工商银行',flag:'1'}],
                bankList: {
                    data1: [{name:'中国工商银行',flag:'1'}]
                }
            }
        },
        components:{
            Parcel,
            Scroll,
            Pickers
        },
        created() {
            this.getBankInfo();
        },
        // mounted(){
        //     this.getBankInfo();
        // },
        computed: {
            ...mapGetters([
                'account'
            ]),
            bankBtnType(){
                return this.bankParam.user_name.length < 1 || this.bankName.length  < 1 || this.bankParam.bank_branch_no.length  < 1 || this.accountNo.length  < 16 ;
            }
        },
        methods: {
            getBankInfo() {
                setTimeout(()=>{
                    if(this.account.bank_status == 0){
                        this.$axios.postRequest(httpUrl.info.bankList)
                        .then((res)=> {
                            if(res.data && !res.data.errorCode){
                                this.bankList.data1=res.data;
                            }
                        });
                    }else{
                        this.$axios.postRequest(httpUrl.info.bankInfo)
                        .then((res)=> {
                            if(res.data && !res.data.errorCode){
                                this.bankParam=res.data;
                                this.accountNo=res.data.account_no;
                            }
                        });
                    }
                },500);
                
            },
            setBankInfo(){
                this.bankParam.account_no=this.accountNo
                this.$axios.postRequest(httpUrl.info.bindBank,this.bankParam)
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        this.setTip('设置成功！');
                        this.getUser();
                        this.getBankInfo()
                    }
                });
            },
            ...mapMutations({
                setTip:'SET_TIP',
            }),
            ...mapActions([
                'getUser'
            ]),
            confirmFn(val) {
                this.selectBankHide();
                this.defaultData = [val.select1];
                this.bankParam.bank_no=val.select1.flag;
                this.bankName=val.select1.name;
            },
            selectBankHide(){
                this.show=false;
            },
            toshow(){
                this.show=true;
            }
        },
        watch:{
            // account(){
            //     this.getBankInfo();
            // },
            accountNo(newVal,oldVal){
                const regex = /^\d*$/;
                if(!regex.test(newVal)) {
                    this.accountNo = oldVal ;
                }
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
                display: none;
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
