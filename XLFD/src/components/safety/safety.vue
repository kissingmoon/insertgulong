<template>
    <parcel>
        <div class="safety">
            <scroll ref="scroll" class="scroll-content">
                <div>
                    <div class="func-wrapper">
                        <ul>
                            <li class="item-title">
                                <p>账号保护</p>
                            </li>
                            <router-link tag="li" :to="{path:'/info/safety/edit-password',query:{api:'editLoginPassword'}}" class="item-mode border-bottom-1px border-none">
                                <p class="title icon-login-password">登陆密码</p>
                                <p class="remarks">
                                    <span>建议定期修改<i class="icon-arrows-right icon"></i></span>
                                </p>
                            </router-link>
                            <li class="item-title">
                                <p>资金保护</p>
                            </li>
                            <router-link tag="li" :to="{path:'/info/safety/bank'}" class="item-mode border-bottom-1px">
                                <p class="title icon-withdrawal-password">银行卡<span class="type" v-show="account.bank_status == 1">已绑定</span></p>
                                <p class="remarks">
                                    <span>
                                        <b v-show="account.bank_status == 1">查看</b><b v-show="account.bank_status == 0">绑定</b>银行卡信息
                                        <i class="icon-arrows-right icon"></i>
                                    </span>
                                </p>
                            </router-link>
                            <router-link tag="li" :to="urlParam" class="item-mode border-bottom-1px border-none">
                                <p class="title icon-bank-card">提款密码<span class="type" v-show="account.bank_passwd_status == 1">已设置</span></p>
                                <p class="remarks">
                                    <span>
                                        进入<b v-show="account.bank_passwd_status == 1">修改</b><b v-show="account.bank_passwd_status == 0">设置</b>
                                        <i class="icon-arrows-right icon"></i>
                                    </span>
                                </p>
                            </router-link>
                        </ul>
                    </div>
                </div>
            </scroll>
            <router-view></router-view>
        </div>
    </parcel>
</template>
<script>
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import {httpUrl} from 'common/js/map';
    import {mapGetters} from 'vuex';
    export default {
        data() {
            return{
            }
        },
        components: {
            Parcel,
            Scroll
        },
        created() {
        },
        computed: {
            ...mapGetters([
                'account'
            ]),
            urlParam(){
                let param=this.account.bank_passwd_status == 1? {path:'/info/safety/edit-password',query:{api:'editBankPassword'}}:{path:'/info/safety/set-password'};
                return param
            }
        },
        methods: {
        }
    }
    
</script>
<style lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.safety{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0;
    background:$color-bg-gray;
    .scroll-content{
        height: 100%;
        overflow: hidden;
        .func-wrapper{
            height:auto;
            overflow: hidden;
            .item-title{
                height:1rem;
                line-height: 1rem;
                padding:0 0.4rem;
                font-size: $font-size-medium-x;
            }
            .item-mode{
                height:1.33rem;
                padding:0 0.4rem;
                background: $color-bg;
                @include border-bottom-1px(solid,$color-border-gray);
                .title{
                    float: left;
                    height: 1.33rem;
                    line-height: 1.33rem;
                    padding-left:0.92rem;
                    font-size: $font-size-medium-x;
                    background-position: left center;
                    background-size: 0.7rem;
                    background-repeat: no-repeat;
                    .type{
                        color:$color-red;
                        padding-left: 0.3rem;
                    }
                }
                .icon-login-password{
                    @include bg-image('icon-login-password');
                }
                .icon-withdrawal-password{
                    @include bg-image('icon-withdrawal-password');
                }
                .icon-bank-card{
                    @include bg-image('icon-bank-card');
                }
                .remarks{
                    float:right;
                    display: flex;
                    box-sizing: border-box;
                    align-items: center;
                    height: 1.33rem;
                    line-height: 1.33rem;
                    color:$color-text-gray;
                    font-size: $font-size-medium-x;
                    .icon{
                        height: 1.33rem;
                        line-height: 1.33rem;
                        padding-left:0.2rem;
                    }
                }
                &.border-none{
                    @include border-bottom-1px(solid,$color-bg-white-a0);
                }
            }
        }
        .log-out-wrapper{
            height:1.17rem;
            padding:0.56rem;
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
</style>
