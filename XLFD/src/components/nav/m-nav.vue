<template>
    <div class="nav">
        <router-link tag="div" class="nav-item" to="/home">
            <p class="icon-con icom-home"></p>
            <p class="txt">大厅</p>
        </router-link>
        <router-link tag="div" class="nav-item" to="/pay">
            <p class="icon-con icom-pay"></p>
            <p class="txt">充值</p>
        </router-link>
        <router-link tag="div" class="nav-item" to="/descover">
            <p class="icon-con icom-descover"></p>
            <p class="txt">发现</p>
        </router-link>
        <router-link tag="div" class="nav-item" to="/discount">
            <p class="icon-con icom-discount"></p>
            <p class="txt">活动</p>
        </router-link>
        <router-link tag="div" class="nav-item" to="/info">
            <p class="icon-con icom-info"></p>
            <p class="txt">我的</p>
        </router-link>
    </div>
</template>
<script>
    
</script>
<style lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.nav{
    position:fixed;
    display: flex;
    width:100%;
    bottom:0;
    height:1.44rem;
    text-align: center;
    background:$color-nav-background;
    .nav-item{
        flex: 1;
        text-align: center;
        color: #fff;
        padding-top:0.18rem;
        font-size: $font-size-small-s;
        .icon-con{
            height:0.72rem;
            width:0.7rem;
            margin: 0 auto;
            background-size: 100%;
            background-repeat: no-repeat;
            background-position: center top;
        }
        .icom-home{
            @include bg-image('home');
        }
        .icom-pay{
            @include bg-image('pay');
        }
        .icom-descover{
            @include bg-image('descover');
        }
        .icom-discount{
            @include bg-image('discount');
        }
        .icom-info{
            @include bg-image('info');
        }
        .txt{
            height:0.5rem;
            width:0.72rem;
            margin: 0 auto;
            line-height: 0.5rem;
        }
        &.router-link-active{
            color:#FFE212;
            .icom-home{
            @include bg-image('home-on');
            }
            .icom-pay{
                @include bg-image('pay-on');
            }
            .icom-descover{
                @include bg-image('descover-on');
            }
            .icom-discount{
                @include bg-image('discount-on');
            }
            .icom-info{
                @include bg-image('info-on');
            }
        }

    }
}
</style>
