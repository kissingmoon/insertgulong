<template>
    <parcel>
        <div class="crunchies">
            <scroll ref="scroll" class="scroll-content" :data="crunchiesList" >
                <attention-list :data="crunchiesList" :url="url" :isLink="isLink"></attention-list>
            </scroll>
            <router-view></router-view>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import attentionList from 'base/attention-list/attention-list';
    import {httpUrl} from 'common/js/map';
    export default {
        data() {
            return{
                crunchiesList:[],
                url:'/crunchies/detail',
                isLink:true,
                crunchiesParam:{
                    page_no:1,
                    page_size:5,
                    status:0
                },
            }
        },
        components:{
            Parcel,
            Scroll,
            attentionList
        },
        created() {
            this.getRank();
        },
        methods: {
            getRank(){
                this.$axios.postRequest(httpUrl.descover.rank,this.crunchiesParam)
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.crunchiesList=res.data;
                    }
                });
            },
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.crunchies{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    z-index: 103;
    background: $color-bg;
    .scroll-content{
        height:100%;
        overflow: hidden;
    }
}
</style>
