<template>
    <parcel>
        <div class="pay-tip">
            <scroll ref="scroll" class="scroll-content" :click="click">
                <div class="pay-tip-wrapper">
                    <div class="tip">
                        当您充值成功后，请耐心等待几分钟，进入【充值记录】查看充值到账情况
                    </div>
                    <div class="btn-wrapper">
                        <button @click="goBack">继续充值</button>
                        <button @click="toRecharge">充值记录</button>
                    </div>
                </div>
            </scroll>
        </div>
    </parcel>
</template>
<script>
    import {httpUrl} from 'common/js/map';
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    export default {
        data(){
            return{
                click:false
            }
        },
        components:{
            Parcel,
            Scroll
        },
        methods:{
            goBack(){
                this.$router.back();
            },
            toRecharge(){
                this.$router.push({
                    path:'/recharge'
                });
            }
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.pay-tip{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    overflow: hidden;
    z-index: 201;
    background: #fff;
    .scroll-content{
        height: 100%;
        overflow: hidden;
    }
    .pay-tip-wrapper{
        height:auto;
        overflow: hidden;
        padding-top:4rem;
        @include bg-image('icon-remind');
        background-position: center 1.5rem;
        background-size: 5rem;
        background-repeat: no-repeat;
        .tip{
            padding:1.5rem 0.8rem;
            line-height: 0.5rem;
            text-align: center;
            color:$color-text-gray;
        }
        .btn-wrapper{
            padding: 0 0.3rem;
            button{
                height:1.17rem;
                width:100%;
                text-align: center;
                background:$color-bg-theme;
                color: #fff;
                font-size: $font-size-large;
                border-radius: 0.1rem;
                border:0;
                margin-bottom: 0.6rem;
            }
        }
    }
}
</style>
