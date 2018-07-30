<template>
    <parcel>
        <div class="attention-detail" :class="{'bottom-2rem': !order.finish_status }">
            <div class="author-wrapper">
                <attention-list :data="author" @setFans="setFans"></attention-list>
            </div>
            <scroll ref="scroll" class="scroll-content"
                :data="order" 
                :isAllData="isAllData"
                :pullup="pullup"
                :loadStatus="loadStatus"
                @pullup="getDetail('up')"
                >
                <div class="order-wrapper">
                    <order-list :data="order" :url="url"></order-list>
                </div>
            </scroll>
            <router-view></router-view>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import OrderList from 'base/order-list/order-list';
    import AttentionList from 'base/attention-list/attention-list';
    import {httpUrl,betType} from 'common/js/map';
    export default {
        data() {
            return{
                pullup: true,
                loadStatus:false,
                isAllData:false,
                author:[],
                order:[],
                url:'/attention/detail/detail',
                param:{
                    page_no:1,
                    page_size:20,
                    user_flag:''
                }
            }
        },
        components:{
            Parcel,
            Scroll,
            AttentionList,
            OrderList
        },
        created() {
            this.init();
            this.getDetail();
        },
        methods: {
            init(){
                const query=this.$router.history.current.query;
                this.param.user_flag = query.flag;
                this.url= query.url?query.url:'/attention/detail/detail';
            },
            getDetail(type){
                if(type == 'up'){
                    this.loadStatus=true;
                    ++this.param.page_no;
                }
                this.$axios.postRequest(httpUrl.info.attentionDatail,this.param)
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        this.author=[];
                        this.author.push(res.data.ds_info);
                        if(type == 'up'){
                            this.loadStatus=false;
                            this.order=this.order.concat(res.data.gd_list);
                            this.isAllData =res.data.gd_list.length < 20 ? true : false;
                        }else{
                            this.order=res.data.gd_list;
                            this.isAllData =res.data.gd_list.length < 20 ? true : false;
                        }
                    };
                });
            },
            setFans(index,status){
                let user_flag=this.author[index].user_flag;
                this.$axios.postRequest(httpUrl.info.setAttention,{user_flag,status})
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        this.author[index].has_gz=!this.author[index].has_gz;
                        this.author[index].count_fans=status == 1?this.author[index].count_fans+=1 : this.author[index].count_fans-=1;
                    };
                });
            }
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.attention-detail{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    z-index: 300;
    background: $color-bg;
    .author-wrapper{
    }
    .scroll-content{
        height:calc(100% - 2rem);
        overflow: hidden;
        .order-wrapper{
            height:auto;
            overflow: hidden;
        }
    }
}
</style>
