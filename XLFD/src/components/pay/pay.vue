<template>
    <div class="pay">
        <iframe :src="url" frameborder="0" class="pay-wrapper">

        </iframe>
    </div>
</template>
<script>
    import {httpUrl} from 'common/js/map';
    import {mapGetters} from 'vuex';
    export default {
        data(){
            return{
                url:''
            }
        },
        created(){
            this.getPayUrl();
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
<style lang="scss">
@import 'common/scss/variable.scss';
.pay{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 1.44rem;
    overflow: hidden;
    .pay-wrapper{
        width:100%;
        height:100%;
    }
}
</style>
