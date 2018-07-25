<template>
    <parcel>
        <div class="balance">
            <div ref="scroll" class="scroll-content" >
                <div class="balance-main">
                    <div class="balance-num">
                        <p class="remarks">
                            <span>余额：{{account.balance  || 0}}元</span>
                        </p>
                    </div>
                    <div class="balance-form">
                        <div class="form-main">
                            <div class="form-txt">
                                <p class="title">提现金额</p>
                                <p class="txt border-bottom-1px"><input type="text" v-model.number="money" maxlength="10" placeholder="请输入提现金额" tocomplete="off" /></p>
                                <p class="tip">提现金额最低100元</p>
                            </div>
                        </div>
                        <div class="form-btn">
                            <button class="btn" @click="showPassword()"  :disabled="bankBtnDisabled">提交</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 绑定手机号 -->
            <div  v-if="phoneShow">
                <div class="background"></div>
                <div class="password phone-con">
                    <div class="password-wrapper clearfix">
                        <div class="password-main">
                            <ul>
                                <li class="item-wrapper">
                                    绑定手机号
                                </li>
                                <li class="item-wrapper">
                                    <input type="tel" class="phone-txt" v-model="phone" placeholder="请输入手机号"  autocomplete="off" maxlength="11" ><button @click="getCode" class="phone-btn" :disabled="getCodeType || phone.length < 11" >{{codeBtnTxt}}</button>
                                </li>
                                <li class="item-wrapper">
                                    <input type="tel" class="password-txt" v-model="bindCode" placeholder="请输入验证码" tocomplete="off" autocomplete="off" >
                                </li>
                                <li class="item-wrapper">
                                    <button class="margin-right-1rem" @click="hide('phoneShow')">取消</button>
                                    <button @click="bindphone" :disabled="bindCode.length < 1">确认</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 输入提现密码 -->
            <div  v-if="passwordShow">
                <div class="background"></div>
                <div class="password phone-con">
                    <div class="password-wrapper clearfix">
                        <div class="password-main">
                            <ul>
                                <li class="item-wrapper">
                                    <input type="tel" class="phone-txt" :value="phoneNum" placeholder="请输入手机号"  autocomplete="off" maxlength="11" readonly="readonly" ><button @click="getCode" class="phone-btn" :disabled="getCodeType" >{{codeBtnTxt}}</button>
                                </li>
                                <li class="item-wrapper">
                                    <input type="tel" class="password-txt" v-model="cashCode" placeholder="请输入验证码" tocomplete="off" autocomplete="off" maxlength="6" >
                                </li>
                                <li class="item-wrapper">
                                    <input type="password" class="password-txt" v-model="bank_passwd" placeholder="请输入提现密码" tocomplete="off" autocomplete="off"  maxlength="16" >
                                </li>
                                <li class="item-wrapper">
                                    <button class="margin-right-1rem" @click="hide('passwordShow')">取消</button>
                                    <button @click="withdrawCash" :disabled="bank_passwd.length < 1 || cashCode.length < 1">确认</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 设置提现密码提示 -->
            <div  v-if="passworTipShow">
                <div class="background"  @click="hide('passworTipShow')">
                </div>
                <div class="password">
                    <div class="password-wrapper clearfix">
                        <div class="password-main">
                            <ul>
                                <li class="item-wrapper">
                                </li>
                                <li class="item-wrapper">
                                    您还没有设置提现密码，请先设置。
                                </li>
                                <li class="item-wrapper">
                                </li>
                                <li class="item-wrapper">
                                    <button class="margin-right-1rem" @click="hide('passworTipShow')">取消</button>
                                    <button @click="goto('/info/safety/set-password')">确认</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 设置提款账号提示 -->
            <div  v-else-if="bankTipShow">
                <div class="background"  @click="hide('bankTipShow')">
                </div>
                <div class="password">
                    <div class="password-wrapper clearfix">
                        <div class="password-main">
                            <ul>
                                <li class="item-wrapper">
                                </li>
                                <li class="item-wrapper">
                                    您还没有设置提款账号，请先设置。
                                </li>
                                <li class="item-wrapper">
                                </li>
                                <li class="item-wrapper">
                                    <button class="margin-right-1rem" @click="hide('bankTipShow')">取消</button>
                                    <button @click="goto('/info/safety/bank')">确认</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </parcel>    
</template>
<script type="text/ecmascript-6">
    import {mapGetters,mapActions,mapMutations} from 'vuex'
    import md5 from 'js-md5';
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import {httpUrl} from 'common/js/map';
    export default {
        data() {
            return{
                money:'',
                bank_passwd:'',
                passwordShow:false,
                phoneShow:false,
                passworTipShow:false,
                bankTipShow:false,
                phone:'',
                codeBtnTxt:'获取验证码',
                recTime:60,
                getCodeType:false,
                bindCode:'',
                cashCode:''
            }
        },
        components:{
            Parcel,
            Scroll
        },
        created() {
            this.init();
        },
        mounted(){
            this.phone = this.account.phone;
        },
        computed: {
            ...mapGetters([
                'account',
                'has_phone'
            ]),
            bankBtnDisabled(){
                return this.account.bank_passwd_status != 1 || this.account.bank_status != 1 || this.money < 100;
            },
            // 隐藏手机号
            phoneNum(){
                this.phone = this.account.phone;
                return this.account.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
            }
        },
        methods: {
            init(){
                if(this.account.bank_passwd_status){
                    setTimeout(()=>{
                        this.passworTipShow = this.account.bank_passwd_status != 1;
                        this.bankTipShow = this.account.bank_status != 1;
                    },500);
                }
            },
            // 获取验证码
            getCode(){
                this.getCodeType = true;
                this.recCodeBtn();
                this.$axios.postRequest(httpUrl.config.sendCode,{mobile:this.phone,sendFlag:'Y'})
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        this.getCodeType = true;
                    }else{
                        clearTimeout(this.recCode);
                        this.recSetCode();
                    }
                })
                .catch((err) => {
                    clearTimeout(this.recCode);
                    this.recSetCode();
                });
            },
            // 获取验证码按钮倒计时
            recCodeBtn(){
                this.recTime -= 1;
                clearTimeout(this.recCode);
                this.recCode= setTimeout(()=>{
                    this.codeBtnTxt = `重新获取(${this.recTime})` 
                    if(this.recTime  == 0){
                        this.recSetCode();
                    }else{
                        this.recCodeBtn();
                    }
                },1000);
            },
            // 绑定手机号
            bindphone(){
                this.$axios.postRequest(httpUrl.info.bindPhone,{phone:this.phone,code:this.bindCode})
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        this.recSetCode();
                        this.setTip('绑定成功');
                        this.getUser();
                        this.hide('phoneShow');
                        this.show('passwordShow');
                        
                    };
                })
                .catch((err) => {
                    this.recSetCode();
                });
            },
            // 提现
            withdrawCash(){
                this.hide('passwordShow');
                this.$axios.postRequest(httpUrl.info.balance,{money:this.money,bank_passwd:md5(this.bank_passwd),code:this.cashCode})
                .then((res)=> {
                    this.bank_passwd=''
                    this.recSetCode();
                    if(res.data && !res.data.errorCode){
                        this.setTip('提现成功');
                        this.getUser();
                        this.$router.back();
                    };
                })
                .catch((err) => {
                    this.bank_passwd='';
                    this.recSetCode();
                });
            },
            // 重置获取验证码按钮
            recSetCode(){
                this.bindCode='';
                this.cashCode='';
                this.getCodeType = false;
                this.codeBtnTxt = '获取验证码';
                this.recTime = 60;
                clearTimeout(this.recCode);
            },
            hide(type){
                this[type] = false;
            },
            show(type){
                this[type] = true;
            },
            showPassword(){
                if(this.money < 100){
                    this.setTip('提现金额最低100元');
                    return;
                };
                if(this.money > this.account.balance){
                    this.setTip('余额不足');
                    return;
                };
                if(this.account && this.account.phone && this.account.phone.length > 0){
                    this.passwordShow = true;
                }else{
                    this.phoneShow = true;
                }
            },
            ...mapActions([
                'getUser'
            ]),
            ...mapMutations({
                setTip:'SET_TIP',
            }),
            goto(url){
                this.$router.push({
                    path: url
                });
            }
        },
        watch:{
            money(newVal,oldVal){
                const regex = /^\d*$/;
                if(!regex.test(newVal)) {
                    this.money = oldVal ;
                }
            }
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.balance{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    z-index: 101;
    background:$color-bg-gray;
    .scroll-content{
        height: 100%;
        overflow-y: auto;
        .balance-main{
            height: 100%;
            overflow: hidden;
        }
        .balance-num{
            height:1.5rem;
            padding: 0 0.4rem;
            margin-bottom:0.3rem;
            background: $color-bg;
            .remarks{
                height: 1.5rem;
                line-height: 1.5rem;
                padding-left:0.92rem;
                font-size: $font-size-medium-x;
                background-position: left center;
                background-size: 0.7rem;
                background-repeat: no-repeat;
                @include bg-image('icon-balance');
                color:$color-red;
            }
        }
        .balance-form{
            position:fixed;
            top:3rem;
            left:0;
            z-index:102;
            bottom:0;
            width: 100%;
            background:$color-bg;
            .form-main{
                min-height:100%;
                .form-txt{
                    padding:0 0.4rem 2.34rem;
                    .title{
                        height:1.2rem;
                        line-height: 1.2rem;
                        font-size: $font-size-medium-x;
                    }
                    .txt{
                        height:1.2rem;
                        padding-bottom: 0.3rem;
                        input{
                            width:97%;
                            padding:0.3rem 0 ;
                            padding-left: 2%;
                            height:0.6rem;
                            line-height: 0.6rem;
                            background:$color-bg-gray;
                            border-radius: 0.1rem;
                            font-size: $font-size-medium-x;
                        }
                    }
                    .tip{
                        color:$color-text-gray;
                    }
                }

            }
            .form-btn{
                position: relative;
                margin:-1.8rem auto 0 auto;
                height:1.17rem;
                clear: both;
                padding:0 0.56rem;
                .btn{
                    height:1.17rem;
                    line-height: 1.17rem;
                    width:100%;
                    text-align: center;
                    background:$color-red;
                    color: #fff;
                    font-size: $font-size-large;
                    border-radius: 0.1rem;
                    border:0;
                    &.btn-disabled{
                        background:$color-btn-gray;
                        color: $color-text;
                    }
                }
            }
        }
    }
    .background {
        position:fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 110;
        background:$color-bg-shade-a5;
    }
    .password{
        position:fixed;
        top:calc((100% - 4rem) / 2);
        left:1.5rem;
        z-index:120;
        width:7rem;
        height:4rem;
        overflow:auto;
        background:$color-bg;
        border-radius: 0.2rem;
        &.phone-con{
            top:calc((100% - 6rem) / 2);
            height:6rem;
        }
        .password-wrapper{
            min-height:100%;
            .password-main{
                padding:0.8rem 0.4rem 0;
                .item-wrapper{
                    height:auto;
                    overflow: hidden;
                    padding-bottom: 0.5rem;
                    line-height: 0.5rem;
                    text-align: center;
                    .password-txt{
                        width:5.846rem;
                        padding-left: 0.3rem;
                        height:0.7rem;
                        line-height: 0.7rem;
                        border:1px solid $color-border-gray;
                    }
                    .phone-txt{
                        width:3rem;
                        padding-left: 0.3rem;
                        height:0.7rem;
                        line-height: 0.7rem;
                        border:1px solid $color-border-gray;
                    }
                    button{
                        height:0.7rem;
                        line-height: 0.7rem;
                        width:2.2rem;
                        text-align: center;
                        background:$color-red;
                        color: #fff;
                        font-size: $font-size-medium;
                        border-radius: 0.1rem;
                        border:0;
                        &.margin-right-1rem{
                            margin-right:1rem;
                            // background:$color-btn-gray;
                            // color: $color-text;
                        }
                        &.phone-btn{
                            margin-left: 0.2rem;
                            width:2.6rem;
                        }
                    }

                }
            }
        }
    }
}
</style>
