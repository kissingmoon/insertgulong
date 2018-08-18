<template>
    <div class="discount">
        <div class="kind-wrapper border-bottom-1px">
            <div class="kind-item" @click="changeActivityType('00')">
                <p class="icon-con icon-all"></p>
                <p class="txt">所有活动</p>
            </div>
            <div class="kind-item" @click="changeActivityType('01')">
                <p class="icon-con icon-limit"></p>
                <p class="txt">限时优惠</p>
            </div>
            <div class="kind-item" @click="changeActivityType('02')">
                <p class="icon-con icon-free"></p>
                <p class="txt">免费活动</p>
            </div>
            <div class="kind-item" @click="changeActivityType('03')">
                <p class="icon-con icon-vip"></p>
                <p class="txt">VIP专享</p>
            </div>
        </div>
        <div class="title-wrapper border-bottom-1px">
            <div class="title">
                {{activityKind[kind]}}
            </div>
            <div class="sort">
                <span class="time" :class="{'on':activityParam.order_by == 1}" @click="changeSort(1)">时间排序</span>
                <span class="hot" :class="{'on':activityParam.order_by == 2}" @click="changeSort(2)">热度排序</span>
            </div>
        </div>
        <scroll ref="scroll" class="scroll-content" :data="activityList" >
            <div class="activity-list">
                <ul>
                    <router-link tag="li" :to="{path:'/discount/activity',query:{title:item.title,url:item.turn_url}}" class="border-bottom-1px" v-for="(item,index) in activityList" :key="index">
                        <div class="img-wrapper">
                            <img v-lazy="item.image_url" alt="">
                        </div>
                        <div class="txt-wrapper">
                            <p>{{item.title}}</p>
                        </div>
                    </router-link>
                </ul>
            </div>
            <!-- <data-none v-show="activityList && activityList.length < 1"></data-none> -->
        </scroll>
        <router-view></router-view>
    </div>
</template>
<script>
    import Scroll from 'base/scroll/scroll';
    import DataNone from 'components/data-none/data-none';
    import {httpUrl,activityKind} from 'common/js/map';
    import Loading from 'base/loading/loading';
    export default {
        data(){
            return{
                kind:'00',
                activityList:[],
                activityParam:{
                    order_by:1,
                },
                activityKind
            }
        },
        components:{
            Scroll,
            Loading,
            DataNone
        },
        created(){
            this.getDiscount();
        },
        mounted(){
            // document.body.addEventListener('touchmove', function (e) {
            //     e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
            // }, {passive: false}) // passive 参数不能省略，用来兼容ios和android
        },
        methods:{
            getDiscount(){
                this.$axios.postRequest(httpUrl.discount.activity,this.activityParam)
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        this.activityList=res.data;
                    }
                });
            },
            changeActivityType(type){
                this.kind=type;
                if(type === '00'){
                    this.$delete(this.activityParam,"activity_type");
                }else{
                    this.$set(this.activityParam, 'activity_type', type);
                }
                this.activityList=[];
                this.getDiscount();
            },
            changeSort(num){
                this.activityParam.order_by=num;
                this.getDiscount();
            }
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.discount{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 1.44rem;
    background: #F9F8F0;
    .kind-wrapper{
        display: flex;
        width:100%;
        height:2.2rem;
        text-align: center;
        background: $color-bg;
        @include border-bottom-1px(solid,$color-border-gray);
        .kind-item{
            flex: 1;
            text-align: center;
            padding-top:0.2rem;
            font-size: $font-size-small-x;
            .icon-con{
                height:1.2rem;
                width:1.2rem;
                margin: 0 auto;
                background-size: 100%;
                background-repeat: no-repeat;
                background-position: center top;
            }
            .icon-all{
                @include bg-image('icon-all-discount');
            }
            .icon-limit{
                @include bg-image('icon-limit-discount');
            }
            .icon-free{
                @include bg-image('icon-free-discount');
            }
            .icon-vip{
                @include bg-image('icon-vip-discount');
            }
            .txt{
                height:0.7rem;
                width:1.4rem;
                margin: 0 auto;
                line-height: 0.7rem;
            }
        }
    }
    .title-wrapper{
        height:0.9rem;
        background:$color-bg;
        @include border-bottom-1px(solid,$color-border-gray);
        margin-top:0.3rem;
        border-left:0.1rem solid #FC9721;
        line-height: 0.92rem;
        padding:0 0.2rem;
        .title{
            float: left;
            font-size: $font-size-medium;
        }
        .sort{
            float:right;
            text-align: right;
            .time{
                margin-right: 0.4rem;
            }
            .hot{
                padding-right: 0.2rem;
            }
            .on{
                color:#938008;
            }
        }
    }
    .scroll-content{
        height:calc(100% - 3.4rem);
        overflow: hidden;
        width:100%;
        background: #fff;
        .activity-list{
            height:auto;
            overflow: hidden;
            li{
                height:1.47rem;
                padding:0.3rem 0.3rem;
                background: #fff;
                @include border-bottom-1px(solid,$color-border-gray);
                .img-wrapper{
                    float: left;
                    height:1.47rem;
                    width:1.47rem;
                    border-radius: 50%;
                    img{
                        display: block;
                        width:100%;
                    }
                }
                .txt-wrapper{
                    margin-left: 1.7rem;
                    line-height: 1.47rem;
                    height:1.47rem;
                    p{
                        width:100%;
                        @include no-wrap();
                        font-size: $font-size-medium-x;
                    }
                }
            }
        }
    }
}
</style>
