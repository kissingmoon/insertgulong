<template>
    <parcel>
        <div class="bet">
            <scroll ref="scroll" class="scroll-content" 
                :data="betList" 
                :isAllData="isAllData"
                :pulldown="pulldown"
                :pullup="pullup"
                :refreshStatus="refreshStatus"
                :loadStatus="loadStatus"
                @pulldown="getBetList('down')"
                @pullup="getBetList('up')"
                >
                <div>
                    <ul class="bet-main">
                        <router-link tag="li" class="item-mode" v-for="(item,index) in betList" :key="index" :to="{path:'/info/bet/detail',query:{id:item.order_number}}">
                            <div class="title-time">
                                <span class="time">第{{item.lottery_qh}}期</span>
                                <span class="title">
                                    {{item.lottery_name}} <b class="divide">|</b> -{{item.bet_money}}元
                                </span>
                            </div>
                            <div class="money-arrows">
                                <p class="money">
                                    <span class="surplus-money">{{item.bet_time}}</span>
                                    <span class="add-money">{{betType[item.status]}}</span>
                                </p>
                            </div>
                        </router-link>
                    </ul>
                </div>
            </scroll>
            <router-view></router-view>
            <select-time v-show="show_time" @setTimeType="setTimeType"></select-time>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import SelectTime from 'base/select-time/select-time';
    import {httpUrl,betType} from 'common/js/map';
    import {mapGetters,mapMutations} from 'vuex'
    export default {
        data() {
            return{
                pulldown: true,
                pullup: true,
                refreshStatus:false,
                loadStatus:false,
                isAllData:false,
                betList:[],
                betParam:{
                    page_no:1,
                    page_size:20,
                    data_type:4
                },
                betType
            }
        },
        components:{
            Parcel,
            Scroll,
            SelectTime
        },
        created() {
            this.getBetList();
        },
        computed: {
            ...mapGetters([
                'show_time'
            ])
        },
        methods: {
            getBetList(type){
                if(type == 'up'){
                    this.loadStatus=true;
                    ++this.betParam.page_no;
                }else if(type == 'down'){
                    this.refreshStatus=true;
                    this.betParam.page_no=1;
                }
                this.$axios.postRequest(httpUrl.info.bet,this.betParam)
                .then((res)=> {
                    if(!res.data.errorCode){
                        if(type == 'up'){
                            this.loadStatus=false;
                            this.betList=this.betList.concat(res.data);
                            this.isAllData =res.data.length < 20 ? true : false;
                        }else{
                            this.refreshStatus=false;
                            this.betList=res.data;
                            this.isAllData=false;
                        }
                    };
                });
            },
            setTimeType(type){
                this.betParam.data_type=type;
                this.betParam.page_no=1
                this.getBetList();
            }
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.bet{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    z-index: 103;
    background: $color-bg;
    .scroll-content{
        height: 100%;
        overflow: hidden;
        .bet-main{
            height: 100%;
            overflow: hidden;
            .item-mode{
                height:1.33rem;
                padding:0.3rem;
                background: $color-bg;
                @include border-1px($color-border-gray);
                .title-time{
                    float: left;
                    height:1.33rem;
                    line-height: 0.62rem;
                    .title{
                        display: block;
                        height:0.63rem;
                        line-height: 0.63rem;
                        font-size: $font-size-medium;
                        .divide{
                            padding: 0 0.2rem;
                            color:$color-border-gray;
                        }
                    }
                    .time{
                        display: block;
                        height:0.6rem;
                        line-height: 0.6rem;
                        font-size: $font-size-small-x;
                        color: $color-text-gray;
                    }
                }
                .money-arrows{
                    float:right;
                    display: flex;
                    box-sizing: border-box;
                    align-items: center;
                    height: 1.33rem;
                    font-size: $font-size-medium-x;
                    text-align: right;
                    .money{
                        float:right;
                        .add-money{
                            display: block;
                            height:0.63rem;
                            line-height: 0.63rem;
                            font-size: $font-size-medium;
                        }
                        .surplus-money{
                            display: block;
                            height:0.6rem;
                            line-height: 0.6rem;
                            font-size: $font-size-small-x;
                            color: $color-text-gray;
                        }
                    }
                }
            }
        }
    }
}
</style>
