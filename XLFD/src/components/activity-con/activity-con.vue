<template>
    <parcel>
        <div class="activity-con">
            <m-iframe :url="url" :iframeName='iframeName' @LoadComplate="iframeOnload"></m-iframe>
            <!-- <m-object :data="url"></m-object> -->
            <!-- <m-embed :data="url"></m-embed> -->
        </div>
    </parcel>
</template>

<script type="text/ecmascript-6">
    import Parcel from 'base/parcel/parcel';
    import MIframe from 'base/m-iframe/m-iframe';
    import MObject from 'base/m-object/m-object';
    import MEmbed from 'base/m-embed/m-embed';
    import {mapGetters,mapActions} from 'vuex';
    export default {
        data(){
            return{
                header:{
                    title:'活动详情',
                    back:true
                },
                url:'',
                iframeName:"activityIframe"
            }
        },
        components:{
            Parcel,
            MIframe,
            MObject,
            MEmbed
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
            iframeOnload(){
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
    //top: 0rem;
    bottom: 1.4rem;
    z-index: 201;
    background: #fff;
}
</style>
