<template>
    <div class="descover">
        <scroll ref="scroll" class="scroll-content"
            :data="orderList" 
            :isAllData="isAllData"
            :pullup="pullup"
            :loadStatus="loadStatus"
            @pullup="getOrder('up')"
            >
            <div>
                <div class="kind-wrapper border-1px">
                    <router-link tag="div" :to="{path:'/follow'}" class="kind-item">
                        <p class="icon-con icon-draw"></p>
                        <p class="txt">开奖信息</p>
                    </router-link>
                    <router-link tag="div" :to="{path:'/crunchies'}" class="kind-item">
                        <p class="icon-con icon-crunchies"></p>
                        <p class="txt">大神榜</p>
                    </router-link>
                    <router-link tag="div" :to="{path:'/follow'}" class="kind-item">
                        <p class="icon-con icon-flag"></p>
                        <p class="txt">我的跟单</p>
                    </router-link>
                </div>
                <div class="crunchies-wrapper">
                    <div class="title-wrapper border-1px cup-con">
                        <div class="title">
                            大神榜
                        </div>
                        <div class="sort">
                            <router-link tag="span" :to="{path:'/crunchies'}" class="hot">查看更多</router-link>
                        </div>
                    </div>
                    <div class="list-wrapper">
                        <router-link tag="div" :to="{path:'/descover/ds-detail',query:{flag:item.user_flag,url:attentionDetailUrl}}" class="list-item" v-for="(item,index) in crunchiesList" :key="index" v-show="index < 5">
                            <p class="icon-con">
                                <img v-lazy="item.image_url" alt="">
                            </p>
                            <p class="nick">{{item.nick_name}}</p>
                            <p class="rate">{{item.win_rate}}%</p>
                        </router-link>
                    </div>
                </div>
                <div class="order-wrapper">
                    <div class="title-wrapper border-1px hot-con">
                        <div class="title">全部跟单</div>
                        <div class="sort">
                            <p class="Lottery">全部彩种</p>
                            <p class="brokerage">按佣金排序<i class="icon-arrows-below-wire"></i></p>
                        </div>
                    </div>
                    <div class="order-main">
                        <all-order-list :data="orderList" :url="allOrderuUrl"></all-order-list>
                    </div>
                </div>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>
<script>
    import {httpUrl,activityKind} from 'common/js/map';
    import Scroll from 'base/scroll/scroll';
    import Loading from 'base/loading/loading';
    import AllOrderList from 'base/all-order-list/all-order-list';
    export default {
        data(){
            return{
                pullup: true,
                loadStatus:false,
                isAllData:false,
                allOrderuUrl:'/descover/detail',
                attentionDetailUrl:'/descover/ds-detail/detail',
                crunchiesList:[],
                orderList:[],
                crunchiesParam:{
                    page_size:5,
                    status:0
                },
                orderParam:{
                    page_no:1,
                    page_size:20,
                    order_by:0
                }

            }
        },
        components:{
            Scroll,
            Loading,
            AllOrderList
        },
        created(){
            this.getRank();
            this.getOrder();
        },
        methods:{
            getRank(){
                this.$axios.postRequest(httpUrl.descover.rank,this.crunchiesParam)
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.crunchiesList=res.data;
                    }
                });
            },
            getOrder(type){
                if(type == 'up'){
                    this.loadStatus=true;
                    ++this.orderParam.page_no;
                }
                this.$axios.postRequest(httpUrl.descover.order,this.orderParam)
                .then((res)=> {
                    if(!res.data.errorCode){
                        if(type == 'up'){
                            this.loadStatus=false;
                            this.orderList=this.orderList.concat(res.data);
                            this.isAllData =res.data.length < 20 ? true : false;
                        }else{
                            this.orderList=res.data;
                            this.isAllData =res.data.length < 20 ? true : false;
                        }
                    }
                });
            },
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.descover{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 1.44rem;
    overflow: hidden;
    z-index: 101;
    .scroll-content{
        height:100%;
        overflow: hidden;
    }
    .kind-wrapper{
        display: flex;
        width:100%;
        height:2.35rem;
        text-align: center;
        background: $color-bg;
        border-bottom:0.12rem solid $color-bg-gray;
        .kind-item{
            flex: 1;
            text-align: center;
            padding-top:0.3rem;
            font-size: $font-size-medium;
            .icon-con{
                height:1.2rem;
                width:1.1rem;
                margin: 0 auto;
                background-repeat: no-repeat;
                background-position: center bottom;
                background-size: 100%;
            }
            .icon-flag{
                @include bg-image('icon-flag');
            }
            .icon-draw{
                @include bg-image('icon-draw');
                width:1.9rem;
            }
            .icon-crunchies{
                @include bg-image('icon-crunchies');
            }
            .txt{
                height:0.8rem;
                width:1.8rem;
                margin: 0 auto;
                line-height: 0.8rem;
            }
        }
    }
    .title-wrapper{
        height:0.9rem;
        @include border-1px($color-border-gray);
        line-height: 0.92rem;
        padding:0 0.2rem 0 0.6rem;
        overflow: hidden;
        &.cup-con{
            @include bg-image('icon-cup');
            background-size: 0.29rem 0.53rem;
            background-position: 0.2rem center;
            background-repeat: no-repeat;
        }
        &.hot-con{
            @include bg-image('icon-hot');
            background-size: 0.4rem 0.4rem;
            background-position: 0.15rem center;
            background-repeat: no-repeat;
        }
        .title{
            float: left;
            font-size: $font-size-medium-x;
        }
        .sort{
            display: flex;
            float:right;
            text-align: right;
            .Lottery,.brokerage{
                height:0.5rem;
                margin-right: 0.2rem;
                margin-top: 0.2rem;
                line-height: 0.55rem;
                padding: 0 0.2rem;
                background: #9F9F9F;
                color:#fff;
                border-radius: 0.06rem;
            }
            .brokerage{
                padding-right: 0.05rem;
                align-items: center;
                margin-right: 0;
                i{
                    font-size: 0.32rem;
                }
            }
            .hot{
                padding-right: 0.2rem;
            }
        }
    }
    .crunchies-wrapper{
        height:auto;
        overflow: hidden;
        background: $color-bg;
        border-bottom:0.12rem solid $color-bg-gray;
        
        .list-wrapper{
            display: flex;
            width:100%;
            height:2.69rem;
            text-align: center;
            .list-item{
                flex: 1;
                text-align: center;
                padding-top:0.2rem;
                .icon-con{
                    height:1.41rem;
                    width:1.41rem;
                    margin: 0 auto;
                    border-radius: 50%;
                    overflow: hidden;
                    background: $color-bg-gray;
                    img{
                        display: block;
                        width: 100%;
                    }
                }
                .nick,.rate{
                    height:0.45rem;
                    line-height: 0.45rem;
                    padding:0 0.1rem;
                    font-size: $font-size-small-x;
                    @include no-wrap();
                }
                .rate{
                    font-size: $font-size-small;
                    color:$color-text-red;
                }
            }
        }
    }
    .order-wrapper{
        height:auto;
        overflow: hidden;
        background: $color-bg;
        .order-main{
            height:auto;
            overflow: hidden;
        }
    }
}
</style>
