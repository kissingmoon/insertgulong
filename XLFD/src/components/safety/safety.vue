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
                            <li class="item-mode border-1px border-none">
                                <p class="title icon-login-password">登陆密码</p>
                                <p class="remarks">
                                    <span>建议定期修改<i class="icon-arrows-right icon"></i></span>
                                </p>
                            </li>
                            <li class="item-title">
                                <p>资金保护</p>
                            </li>
                            <li class="item-mode border-1px">
                                <p class="title icon-withdrawal-password">银行卡<span class="type">已绑定</span></p>
                                <p class="remarks">
                                    <span>查看银行卡信息<i class="icon-arrows-right icon"></i></span>
                                </p>
                            </li>
                            <li class="item-mode border-1px border-none" @click="toNick">
                                <p class="title icon-bank-card">提款密码<span class="type">已设置</span></p>
                                <p class="remarks">
                                    <span>进入修改<i class="icon-arrows-right icon"></i></span>
                                </p>
                            </li>
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
    import {reData,session,randomWord} from 'common/js/param';
    export default{
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
        methods: {
            toNick(){
                this.$router.push({
                    path:'/info/information/nick'
                })
            }
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
                @include border-1px($color-border-gray);
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
                        color:$color-text-red;
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
                    @include border-1px($color-bg-white-a0);
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
                background:$color-bg-theme;
                color: #fff;
                font-size: $font-size-large;
                border-radius: 0.1rem;
                border:0;
            }
        }
    }

}
</style>
