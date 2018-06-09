<template>
    <parcel>
        <div class="follow">
            <div class="title-type">
                <p class="border-1px" :class="followType ? 'on':''" @click="getMyJoin">我参与的跟单</p>
                <p class="border-1px" :class="!followType ? 'on':''" @click="getMy">我发起的跟单</p>
            </div>
            <scroll ref="scroll" class="scroll-content" :data="followList" >
                <order-list :data="followList"></order-list>
            </scroll>
            <router-view></router-view>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import orderList from 'base/order-list/order-list';
    import {httpUrl} from 'common/js/map';
    export default {
        data() {
            return{
                followList:[],
                followType:true,
                followParam:{
                    page_no:1,
                    page_size:20
                }
            }
        },
        components:{
            Parcel,
            Scroll,
            orderList
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
                }
                this.$axios.postRequest(httpUrl.info.followMy,this.followParam)
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.followList=res.data;
                    };
                });
            }
        }
    }
</script>
<style lang="scss">
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
                color:$color-text-red;
                @include border-1px($color-border-red);
            }
        }
    }
    .scroll-content{
        height:calc(100% - 0.75rem);
        overflow: hidden;
    }
}
</style>
