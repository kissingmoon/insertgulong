<template>
    <div class="url-content">
        <m-iframe :url="url"></m-iframe>
    </div>
</template>
<script>
    import {httpUrl,serviceUrl} from 'common/js/map';
    import {mapGetters} from 'vuex';
    import MIframe from 'base/m-iframe/m-iframe';
    export default {
        data(){
            return{
                url:''
            }
        },
        created(){
            this.init();
        },
        components:{
            MIframe,
        },
        computed: {
            ...mapGetters([
                'user_token'
            ])
        },
        methods:{
            init(){
                // this.flag=this.$router.history.current.query.flag;
                this.flag='customer_service_url';
                if(this.flag == 'customer_service_url'){
                    this.url=`${serviceUrl}?user_token=${this.user_token}`
                }else{
                    this.getUrl();
                }
            },
            getUrl(){
                this.$axios.postRequest(httpUrl.config.urlList,{flag:this.flag})
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        this.url=`${res.data[0].url}?user_token=${this.user_token}`
                    }
                });
            }
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
.url-content{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    overflow: hidden;
    z-index: 101;
    background:#fff;
}
</style>
