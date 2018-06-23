<template>
    <parcel>
        <div class="information">
            <scroll ref="scroll" class="scroll-content">
                <div>
                    <div class="func-wrapper">
                        <ul>
                            <li class="item-mode border-bottom-1px margin-bottom">
                                <p class="title icon-balance">
                                    余额
                                    <b class="money">{{account.balance || 0}}元</b>
                                </p>
                            </li>
                            <li class="item-mode border-bottom-1px">
                                <p class="title icon-portrait">头像</p>
                                <p class="remarks">
                                    <span>更换<i class="icon-arrows-right icon"></i></span>
                                </p>
                            </li>
                            <li class="item-mode border-bottom-1px" @click="toNick">
                                <p class="title icon-nick">昵称</p>
                                <p class="remarks">
                                    <span>立即设置<i class="icon-arrows-right icon"></i></span>
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div class="log-out-wrapper" @click="logOut">
                        <button>退出登录</button>
                    </div>
                </div>
            </scroll>
            <router-view></router-view>
        </div>
    </parcel>
</template>
<script>
    import {mapGetters} from 'vuex'
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import {httpUrl} from 'common/js/map';
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
            ])
        },
        methods: {
            toNick(){
                this.$router.push({
                    path:'/info/information/nick'
                })
            },
            logOut(){
                this.$router.push({
                    path:'/login'
                })
            }
        }
    }
    
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.information{
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
                    .money{
                        color:$color-text-red;
                    }
                }
                .icon-balance{
                    @include bg-image('icon-balance');
                }
                .icon-nick{
                    @include bg-image('icon-nick');
                }
                .icon-portrait{
                    @include bg-image('icon-portrait');
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
                &.margin-bottom{
                    margin-bottom: 0.2rem;
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
