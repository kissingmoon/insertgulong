<template>
    <div class="pay">
        <m-iframe :url="url"></m-iframe>
        <div v-show="!user_token.length" class="login-tip-wrapper">
            <div class="login-tip">
                <div class="img">

                </div>
                <router-link tag="div" to="/login" class="btn">
                    请登录后进行充值
                </router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    import {httpUrl} from 'common/js/map';
    import {mapGetters} from 'vuex';
    import MIframe from 'base/m-iframe/m-iframe';
    export default {
        data(){
            return{
                url:''
            }
        },
        created(){
            this.getPayUrl();
        },
        components:{
            MIframe
        },
        computed: {
            ...mapGetters([
                'user_token'
            ])
        },
        methods:{
            getPayUrl(){
                this.$axios.postRequest(httpUrl.config.urlList,{flag:'recharge_url'})
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.url=`${res.data[0].url}?user_token=${this.user_token}`
                    }
                });
            }
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.pay{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 1.44rem;
    overflow: hidden;
    z-index: 101;
    background: #fff;
    .login-tip-wrapper{
        position: fixed;
        top: 1.2rem;
        bottom: 1.44rem;
        width: 100%;
        background: #fff;
        z-index: 102;
        .login-tip{
            width:5rem;
            height:auto;
            overflow: hidden;
            margin: 0 auto;
            margin-top:calc((100% - 5rem)/2);
            .img{
                width:5rem;
                height:5rem;
                @include bg-image('icon-em');
                background-position: center bottom;
                background-size: 5rem;
                background-repeat: no-repeat;
            }
            .btn{
                height:1rem;
                width:86%;
                border:1px solid $color-red;
                line-height: 1rem;
                text-align: center;
                font-size: $font-size-medium-x;
                margin: 0 auto;
            }
        }
    }
    
}
</style>
