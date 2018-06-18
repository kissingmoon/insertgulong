<template>
    <div class="pay">
        <m-iframe :url="url"></m-iframe>
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
.pay{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 1.44rem;
    overflow: hidden;
    z-index: 101;
}
</style>
