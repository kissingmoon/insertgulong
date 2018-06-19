<template>
    <parcel>
        <div class="cash">
            <scroll ref="scroll" class="scroll-content" 
                :data="cashList" 
                :isAllData="isAllData"
                :pulldown="pulldown"
                :pullup="pullup"
                :refreshStatus="refreshStatus"
                :loadStatus="loadStatus"
                @pulldown="getCash('down')"
                @pullup="getCash('up')"
                >
                <div>
                    <ul class="cash-main">
                        <li class="item-mode" v-for="item in cashList">
                            <div class="title-time">
                                <span class="time">{{item.time_created}}</span>
                                <span class="title">
                                    {{item.coin_change_name}} <b class="divide">|</b> <b class="money">{{item.change_coin}}</b>元
                                </span>
                            </div>
                            <div class="cash-status">
                                <p class="status">
                                    {{cashType[item.flag]}}
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </scroll>
            <select-time v-show="show_time" @setTimeType="setTimeType"></select-time>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import {httpUrl,cashType} from 'common/js/map';
    import SelectTime from 'base/select-time/select-time';
    import {mapGetters,mapMutations} from 'vuex'
    export default {
        data() {
            return{
                pulldown: true,
                pullup: true,
                refreshStatus:false,
                loadStatus:false,
                isAllData:false,
                cashType,
                cashList:[],
                cashParam:{
                    page_no:1,
                    page_size:20,
                    data_type:4,
                    status:'06'
                }
            }
        },
        components:{
            Parcel,
            Scroll,
            SelectTime
        },
        created() {
            this.getCash();
        },
        computed: {
            ...mapGetters([
                'show_time'
            ])
        },
        methods: {
            getCash(type){
                if(type == 'up'){
                    this.loadStatus=true;
                    ++this.cashParam.page_no;
                }else if(type == 'down'){
                    this.refreshStatus=true;
                    this.cashParam.page_no=1;
                }
                this.$axios.postRequest(httpUrl.info.coin,this.cashParam)
                .then((res)=> {
                    if(!res.data.errorCode){
                        if(type == 'up'){
                            this.loadStatus=false;
                            this.cashLise=this.cashLise.concat(res.data);
                            this.isAllData =res.data.length < 20 ? true : false;
                        }else{
                            this.refreshStatus=false;
                            this.cashLise=res.data;
                            this.isAllData=false;
                        }
                    };
                });
            },
            setTimeType(type){
                this.cashParam.data_type=type;
                this.cashParam.page_no=1
                this.getCash();
            }
        }
    }
</script>
<style lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.cash{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    z-index: 103;
    background: $color-bg;
    .scroll-content{
        height: 100%;
        overflow: hidden;
        .cash-main{
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
                        font-size: $font-size-medium-x;
                        .divide{
                            padding: 0 0.2rem;
                            color:$color-border-gray;
                        }
                        .money{
                            color:$color-text-green;
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
                .cash-status{
                    float:right;
                    display: flex;
                    box-sizing: border-box;
                    align-items: center;
                    height: 1.33rem;
                    font-size: $font-size-medium-x;
                    text-align: right;
                    .status{
                        color:$color-text-green;
                    }
                }
            }
        }
    }
}
</style>
