<template>
    <parcel>
        <div class="follow">
            <div class="title-type">
                <p class="border-bottom-1px" :class="followType ? 'on':''" @click="getMyJoin">我参与的跟单</p>
                <p class="border-bottom-1px" :class="!followType ? 'on':''" @click="getMy">我发起的跟单</p>
            </div>
            <scroll ref="scroll" class="scroll-content" 
                :data="followList" 
                :isAllData="isAllData"
                :pulldown="pulldown"
                :pullup="pullup"
                :refreshStatus="refreshStatus"
                :loadStatus="loadStatus"
                @pulldown="refreshData"
                @pullup="loadData"
                >
                <order-list :data="followList"></order-list>
                <data-none v-show="followList && followList.length < 1"></data-none>
            </scroll>
            <router-view></router-view>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import orderList from 'base/order-list/order-list';
    import DataNone from 'components/data-none/data-none';
    import {httpUrl} from 'common/js/map';
    export default {
        data() {
            return{
                followList:[],
                followType:true,
                followParam:{
                    page_no:1,
                    page_size:20
                },
                pulldown: false,
                pullup: true,
                refreshStatus:false,
                loadStatus:false,
                isAllData:false
            }
        },
        components:{
            Parcel,
            Scroll,
            orderList,
            DataNone
        },
        created() {
            this.getMyJoin();
        },
        methods: {
            getMyJoin(){
                if(!this.followType){
                    this.followType=true;
                    this.followParam.page_no=1;
                    this.followList=[];
                    this.isAllData =false;
                }
                this.$axios.postRequest(httpUrl.info.followMyJoin,this.followParam)
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.followList=res.data;
                    };
                });
            },
            getMy(){
                if(this.followType){
                    this.followType=false;
                    this.followParam.page_no=1;
                    this.followList=[];
                    this.isAllData =false;
                }
                this.$axios.postRequest(httpUrl.info.followMy,this.followParam)
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.followList=res.data;
                    };
                });
            },
            refreshData() {
                const api = this.followType? httpUrl.info.followMyJoin:httpUrl.info.followMy;
                this.followParam.page_no = 1;
                this.refreshStatus=true;
                this.$axios.postRequest(api,this.followParam)
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.followList=res.data;
                        this.refreshStatus=false;
                        this.isAllData =false;
                    };
                });
            },
            loadData() {
                const api = this.followType? httpUrl.info.followMyJoin:httpUrl.info.followMy;
                ++this.followParam.page_no;
                this.loadStatus=true;
                this.$axios.postRequest(api,this.followParam)
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.isAllData =res.data.length < 20 ? true : false;
                        this.followList=this.followList.concat(res.data);
                        console.log(this.followList);
                        this.loadStatus=false;
                    };
                });
            }
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.follow{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    z-index: 103;
    background: $color-bg;
    .title-type{
        height:0.75rem;
        p{
            float: left;
            width:50%;
            height:0.75rem;
            line-height: 0.75rem;
            text-align: center;
            &.on{
                color:$color-red;
                @include border-bottom-1px(solid,$color-red);
            }
        }
    }
    .scroll-content{
        height:calc(100% - 0.75rem);
        overflow: hidden;
    }
}
</style>
