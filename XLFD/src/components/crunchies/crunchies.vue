<template>
    <parcel>
        <div class="crunchies">
            <scroll ref="scroll" class="scroll-content"
                :click="click"
                :data="crunchiesList" 
                :isAllData="isAllData"
                :pullup="pullup"
                :loadStatus="loadStatus"
                @pullup="getRank('up')"
                >
                <attention-list :data="crunchiesList" :url="url" :isLink="isLink" :childurl="childurl" @setFans="setFans"></attention-list>
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
                pullup: true,
                loadStatus:false,
                isAllData:false,
                click:true,
                crunchiesList:[],
                url:'/crunchies/detail',
                childurl:'/crunchies/detail/detail',
                isLink:true,
                crunchiesParam:{
                    page_no:1,
                    page_size:20
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
            getRank(type){
                if(type == 'up'){
                    this.loadStatus=true;
                    ++this.crunchiesParam.page_no;
                }
                this.$axios.postRequest(httpUrl.descover.rank,this.crunchiesParam)
                .then((res)=> {
                    if(!res.data.errorCode){
                        if(type == 'up'){
                            this.loadStatus=false;
                            this.crunchiesList=this.crunchiesList.concat(res.data);
                            this.isAllData =res.data.length < 20 ? true : false;
                        }else{
                            this.crunchiesList=res.data;
                            this.isAllData =res.data.length < 20 ? true : false;
                        }
                    }
                });
            },
            setFans(index,status){
                let user_flag=this.crunchiesList[index].user_flag;
                this.$axios.postRequest(httpUrl.info.setAttention,{user_flag,status})
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.crunchiesList[index].has_gz=!this.crunchiesList[index].has_gz;
                        this.crunchiesList[index].count_fans=status == 1?this.crunchiesList[index].count_fans+=1 : this.crunchiesList[index].count_fans-=1;
                    };
                });
            }
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
