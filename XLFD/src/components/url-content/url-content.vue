<template>
    <div class="url-content">
        <m-iframe :url="url" iframeName='serviceIframe'>
        </m-iframe>
    </div>
</template>
<script>
    import {httpUrl,serviceUrl} from 'common/js/map';
    import {mapGetters} from 'vuex';
    import MIframe from 'base/m-iframe/m-iframe';
    import {slicer,countTime,session} from 'common/js/param.js';
    export default {
        data(){
            return{
                uId:"",
                url:""
            }
        },
        mounted(){
            this.init();
        },
        components:{
            MIframe,
        },
        watch:{
            'account.user_id':{
                handler(newvalue,oldvalue){
                    this.uId = this.account.user_id||session("uID");
                    this.url = `${serviceUrl}?visiter_id=${this.uId?this.uId:""}`;
                }
            }
        },
        computed: {
            ...mapGetters([
                'user_token',
                'account'
            ]),
            // url(){
            //     this.uId=this.account.user_id||session("uID");
            //     return `${serviceUrl}?visiter_id=${this.uId?this.uId:""}`;
            // }
        },
        methods:{
            init(){
                window.onmessage = (e)=>{ 
                    var reg =/^http/;
                    if(reg.test(e.data)){
                        this.url = e.data
                    }
                }
                this.getUrl();
                // this.flag=this.$router.history.current.query.flag;
                // this.flag='customer_service_url';
                // if(this.flag == 'customer_service_url'){
                //     // this.url=`${serviceUrl}?user_token=${this.user_token}`
                //     // this.url=`${serviceUrl}?visiter_id=${this.account.user_id?this.account.user_id:""}`
                // }else{
                //     this.getUrl();
                // }
                // this.url=`${serviceUrl}?user_token=${this.user_token}`
                // this.getUrl();
            },
            getUrl(){
                // this.$axios.postRequest(httpUrl.config.urlList,{flag:this.flag})
                // .then((res)=> {
                //     if(res.data && !res.data.errorCode){
                //         this.url=`${res.data[0].url}?user_token=${this.user_token}`
                //     }
                // });
                this.uId=this.account.user_id||session("uID");
                this.url= `${serviceUrl}?visiter_id=${this.uId?this.uId:""}`;
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
    z-index: 100;
    background:#fff;
}
</style>
