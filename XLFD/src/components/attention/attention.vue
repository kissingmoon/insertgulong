<template>
    <parcel>
        <div class="attention">
            <scroll ref="scroll" class="scroll-content" :data="attention" >
                <attention-list :data="attention" :url="url" :isLink="isLink" @setFans="setFans"></attention-list>
                <data-none v-show="attention && attention.length < 1"></data-none>
            </scroll>
            <router-view></router-view>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import DataNone from 'components/data-none/data-none';
    import attentionList from 'base/attention-list/attention-list';
    import {httpUrl} from 'common/js/map';
    export default {
        data() {
            return{
                attention:[],
                url:'/attention/detail',
                isLink:true
            }
        },
        components:{
            Parcel,
            Scroll,
            attentionList,
            DataNone
        },
        created() {
            this.getAttention();
        },
        methods: {
            getAttention(){
                this.$axios.postRequest(httpUrl.info.attention)
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        this.attention=res.data;
                    };
                });
            },
            setFans(index,status){
                let user_flag=this.attention[index].user_flag;
                this.$axios.postRequest(httpUrl.info.setAttention,{user_flag,status})
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        this.attention[index].has_gz=!this.attention[index].has_gz;
                        this.attention[index].count_fans=status == 1?this.attention[index].count_fans+=1 : this.attention[index].count_fans-=1;
                    };
                });
            }
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.attention{
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
