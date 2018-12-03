<template>
    <div class="nav">
        <router-link tag="div" class="nav-item" to="/home" :class="{'active':getNavActive}">
            <p class="icon-con icon-home"></p>
            <p class="txt">首页</p>
        </router-link>
        <router-link tag="div" class="nav-item" to="/goucaidating">
            <p class="icon-con icon-dating"></p>
            <p class="txt">购彩大厅</p>
        </router-link>
        
        <!-- <router-link tag="div" class="nav-item" to="/draw">
            <p class="icon-con icon-descover"></p>
            <p class="txt">发现</p>
        </router-link> -->
        <router-link tag="div" class="nav-item" to="/discount">
            <p class="icon-con icon-discount"></p>
            <p class="txt">活动</p>
        </router-link>
        <router-link tag="div" class="nav-item" to="/pay">
            <p class="icon-con icon-pay"></p>
            <p class="txt">充值</p>
        </router-link>
        <router-link tag="div" class="nav-item" to="/info">
            <p class="icon-con icon-info"></p>
            <p class="txt">我的</p>
        </router-link>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
    export default({
        name:'',
        computed: {
            ...mapGetters([
                'getNavActive'
            ])
        },
    })
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.nav{
    position: fixed;
    display: flex;
    width:100%;
    bottom:0;
    z-index: 99;
    height:1.44rem;
    text-align: center;    
    background:$color-bg-nav;
    @media only screen and (device-width: 375px) and (device-height:812px) and (-webkit-device-pixel-ratio:3) {
        & {
            padding-bottom: .2rem;
        }
    }
    .nav-item{
        flex: 1;
        text-align: center;
        color: #fff;
        padding-top:0.18rem;
        font-size: $font-size-small;
        .icon-con{
            height:0.72rem;
            width:0.7rem;
            margin: 0 auto;
            background-size: 100%;
            background-repeat: no-repeat;
            background-position: center top;
        }
        .icon-home{
            @include bg-image('home');
        }
        .icon-pay{
            @include bg-image('pay');
        }
        .icon-descover{
            @include bg-image('descover');
        }
        .icon-discount{
            @include bg-image('discount');
        }
        .icon-info{
            @include bg-image('info');
        }
        .icon-dating{
            @include bg-image('dating');
        }
        .txt{
            height:0.5rem;
            width:1.72rem;
            margin: 0 auto;
            line-height: 0.5rem;
        }
        &.active{
            color:#FFE212;
            .icon-home{
                @include bg-image('home-on');
            }
        }
        &.router-link-exact-active{
            color:#FFE212;
            .icon-home{
                @include bg-image('home-on');
            }
            .icon-pay{
                @include bg-image('pay-on');
            }
            .icon-descover{
                @include bg-image('descover-on');
            }
            .icon-discount{
                @include bg-image('discount-on');
            }
            .icon-info{
                @include bg-image('info-on');
            }
            .icon-dating{
                @include bg-image('dating-on');
            }
        }

    }
}
</style>
