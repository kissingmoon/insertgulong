<template>
    <parcel>
        <div class="bet">
            <div v-show="getRecordChoose" class="grayBg" @click="setRecordChoose(false)"></div>
            <top-to-bot>
                <div v-show="getRecordChoose" class="choose-type flex">
                    <div class="choose-item flex flex-center" v-for="(v,k) in chooseList" :key="k">
                        <div @click="chooseType(v)" class="item-content flex flex-center" :class="{'on': currentType==v.status}">{{v.name}}</div>
                    </div>
                </div>
            </top-to-bot>
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
                        <li tag="li" class="item-mode" v-for="(item,index) in betList" :key="index" @click="goDetail(item)">
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
                        </li>
                    </ul>
                </div>
                <data-none v-show="betList && betList.length < 1"></data-none>
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
    import DataNone from 'components/data-none/data-none';
    import {httpUrl,betType} from 'common/js/map';
    import {mapGetters,mapMutations,mapActions} from 'vuex'
    import {headerConfig} from 'common/js/map';
    import TopToBot from 'base/top-to-bot/top-to-bot';

    export default {
        data() {
            return{
                pulldown: false,
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
                betType,
                chooseShow:false,
                currentType:"",
                chooseList:[{
                    name:"全部列表",
                    status:''
                },{
                    name:"未开奖",
                    status:'0'
                },{
                    name:"未中奖",
                    status:'1'
                },{
                    name:"撤销",
                    status:'2'
                },{
                    name:"中奖",
                    status:'3'
                },{
                    name:"异常",
                    status:'4'
                },{
                    name:"追号",
                    status:'5'
                }]
            }
        },
        components:{
            Parcel,
            Scroll,
            SelectTime,
            DataNone,
            TopToBot
        },
        created() {
            this.getBetList();
        },
        beforeDestroy(){
            this.setRecordChoose(false);
        },
        computed: {
            ...mapGetters([
                'show_time',
                'getRecordChoose'
            ])
        },
        methods: {
            goDetail(item){
                if(this.$route.path != '/betroom'){
                    this.$router.push({path:'/bet/detail',query:{id:item.order_number}})
                }else{
                     this.$emit('order',item.order_number)
                     this.setRecordDetail(true)
                     this.setHeader(headerConfig['/bet/detail'])
                }                
            },
            getBetList(type){
                if(type == 'up'){
                    this.loadStatus=true;
                    ++this.betParam.page_no;
                }else if(type == 'down'){
                    this.refreshStatus=true;
                    this.betParam.page_no=1;
                }
                if(this.currentType){
                    this.betParam.status=this.currentType;
                }else{
                    delete this.betParam.status;
                }
                this.$axios.postRequest(httpUrl.info.bet,this.betParam)
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
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
            },
            chooseType(value){
                if(this.currentType == value.status){
                    return;
                }
                this.currentType = value.status;
                this.getBetList();
                this.setRecordChoose(false);
            },
            ...mapMutations({
                setRecordDetail:'SET_RECORD_DETAIL_SHOW',
                setRecordChoose:'SET_RECORD_CHOOSE'
            }),
            ...mapActions([
                "setHeader"
            ]),
        },
        watch:{
            $route(newUrl){
                this.betParam.page_no=1;
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
    z-index: 100;
    background: $color-bg;
    .choose-type{
        position: fixed;
        top:1.2rem;
        background: #ffffff;
        z-index: 100;
        width: 100%;
        flex-shrink: 0;
        flex-wrap: wrap;
        .choose-item{
            width: 33.3%;
            height: 1.1rem;
            .item-content{
                height: 0.8rem;
                width: 2.8rem;
                border: 1px solid #999;
                border-radius: 0.5rem;
            }
            .on{
                border: 1px solid #8f2555;
            }
        }
    }
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
                @include border-bottom-1px(solid,$color-border-gray);
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
    .grayBg{
        position: fixed;
        bottom: 0;
        z-index: 10;
        width: 100%;
        background-color: #000;
        opacity: .7;
        overflow: hidden;
        top: 1.2rem;
    }
}
</style>
