<template>
    <parcel>
        <div class="activity-con">
            <m-iframe :url="url"></m-iframe>
        </div>
    </parcel>
</template>

<script type="text/ecmascript-6">
    import Parcel from 'base/parcel/parcel';
    import MIframe from 'base/m-iframe/m-iframe';
    import {mapGetters,mapActions} from 'vuex';
    export default {
        data(){
            return{
                header:{
                    title:'活动详情',
                    back:true
                },
                url:''
            }
        },
        components:{
            Parcel,
            MIframe
        },
        created(){
            this.activityInit();
        },
        computed: {
            ...mapGetters([
                'user_token'
            ])
        },
        methods:{
            activityInit(){
                const query=this.$router.history.current.query;
                this.header.title=query.title?query.title:'活动详情';
                this.url=`${query.url}?user_token=${this.user_token}`;
                this.setHeader(this.header);
            },
            ...mapActions([
                'setHeader'
            ])
        }
    }
</script>

<style scoped lang="scss">
.activity-con{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    z-index: 201;
    background: #fff;
}
</style>
