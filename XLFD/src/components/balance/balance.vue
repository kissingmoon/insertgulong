<template>
    <parcel>
        <div class="balance">
            <scroll ref="scroll" class="balance-content" >
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
                                <p class="txt border-1px"><input type="text" v-model.number="balance" placeholder="请输入提现金额" /></p>
                                <p class="tip">提现金额最低100元</p>
                            </div>
                        </div>
                        <div class="form-btn">
                            <button @click="withdrawCash">提交</button>
                        </div>
                    </div>
                </div>
            </scroll>
        </div>
    </parcel>    
</template>
<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex'
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import {httpUrl} from 'common/js/map';
    import {reData,session,randomWord,setHeader} from 'common/js/param';
    export default {
        data() {
            return{
                header:{
                    title:'提现',
                    back:true
                },
                balance:''
            }
        },
        components:{
            Parcel,
            Scroll
        },
        created() {
            setHeader(this.header);
        },
        computed: {
            ...mapGetters([
                'account'
            ])
        },
        watch:{
            balance(newVal,oldVal){
                const regex = /^\d*$/;
                if(!regex.test(newVal)) {
                    this.balance = oldVal 
                }
            }
        },
        methods: {
            withdrawCash(){
                this.$axios.postRequest(httpUrl.info.balance,{balance:this.balance})
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.$api.getUser();
                        this.$router.back();
                    };
                });
            }
        }
    }
</script>
<style lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.balance{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    z-index: 101;
    background:$color-bg-gray;
    .balance-content{
        height: 100%;
        overflow: hidden;
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
                color:$color-text-red;
            }
        }
        .balance-form{
            position:fixed;
            top:1.8rem;
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
                            padding-left: 0.3rem;
                            width:97%;
                            padding-left: 2%;
                            height:1.2rem;
                            line-height: 1.2rem;
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
