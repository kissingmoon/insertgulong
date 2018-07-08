<template>
    <parcel>
        <div class="bill">
            <scroll ref="scroll" class="scroll-content" 
                :data="billList" 
                :isAllData="isAllData"
                :pulldown="pulldown"
                :pullup="pullup"
                :refreshStatus="refreshStatus"
                :loadStatus="loadStatus"
                @pulldown="getbill('down')"
                @pullup="getbill('up')"
                >
                <div>
                    <ul class="bill-main">
                        <li class="item-mode" v-for="item in billList" @click="showDetail(item)" >
                            <div class="title-time">
                                <span class="title">{{item.coin_change_name}}</span>
                                <span class="time">{{item.time_created}}</span>
                            </div>
                            <div class="money-arrows">
                                <p class="money">
                                    <span class="add-money">
                                        <b class="add">{{item.change_coin}}</b>元
                                    </span>
                                    <span class="surplus-money">
                                        余额：{{item.balance}}元
                                    </span>
                                </p>
                                <p class="icon"><i class="icon-arrows-right"></i></p>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- <loading v-show="billList && !billList.length"></loading> -->
                <data-none v-show="billList && billList.length < 1"></data-none>
            </scroll>
            <div class="detail-content"  v-show="detailShow">
                <div class="background" @click="closeDetail"></div>
                <div class="detail">
                    <div class="detail-wrapper clearfix">
                        <div class="detail-main">
                            <ul>
                                <li class="item-wrapper">
                                    <p>时间</p>
                                    <p class="txt">{{billDetail.time_created}}</p>
                                </li>
                                <li class="item-wrapper">
                                    <p>类型</p>
                                    <p class="txt">{{billDetail.coin_change_name}}</p>
                                </li>
                                <li class="item-wrapper">
                                    <p>变动金额</p>
                                    <p class="txt">{{billDetail.change_coin}}</p>
                                </li>
                                <li class="item-wrapper">
                                    <p>变动后的余额</p>
                                    <p class="txt">{{billDetail.balance}}</p>
                                </li>
                                <li class="item-wrapper">
                                    <p>备注</p>
                                    <p class="txt">{{billDetail.remark}}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="detail-close">
                        <button @click="closeDetail">确定</button>
                    </div>
                </div>
            </div>
            <select-time v-show="show_time" @setTimeType="setTimeType"></select-time>
            <pickers
                :txtKey="txtKey"
                :valueKey="valueKey"
                :link="link"
                :show="show_picker"
                :columns="columns"
                :defaultData="defaultData"
                :selectData="pickData"
                @cancel="pickerHide"
                @confirm="confirmFn"></pickers>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import SelectTime from 'base/select-time/select-time';
    import Loading from 'base/loading/loading';
    import DataNone from 'components/data-none/data-none';
    import {httpUrl,billType} from 'common/js/map';
    import {mapGetters,mapMutations} from 'vuex';
    import Pickers from 'base/pickers/pickers';
    import {regroupPickData} from 'common/js/param'
    export default {
        data() {
            return{
                pulldown: false,
                pullup: true,
                refreshStatus:false,
                loadStatus:false,
                isAllData:false,
                detailShow:false,
                billType,
                billList:[],
                billDetail:{},
                billParam:{
                    page_no:1,
                    page_size:20,
                    data_type:3,
                    type_value:'',
                    detail_value:'',
                    status:''
                },
                link:true,
                columns: 2,
                txtKey:'type_name',
                valueKey:'type_value',
                defaultData: [{type_name:'全部',type_value:'00'}],
                pickData: {
                    data1: [{type_name:'全部',type_value:'00'}],
                    data2:{'00':[{type_name:'全部',type_value:'00'}]}
                }

            }
        },
        components:{
            Parcel,
            Scroll,
            Loading,
            SelectTime,
            Pickers,
            DataNone
        },
        created() {
            this.getbill();
            this.getFlowType();
        },
        computed: {
            ...mapGetters([
                'show_time',
                'show_picker'
            ])
        },
        methods: {
            getbill(type){
                if(type == 'up'){
                    this.loadStatus=true;
                    ++this.billParam.page_no;
                }else if(type == 'down'){
                    this.refreshStatus=true;
                    this.billParam.page_no=1;
                }
                this.$axios.postRequest(httpUrl.info.coin,this.billParam)
                .then((res)=> {
                    if(!res.data.errorCode){
                        if(type == 'up'){
                            this.loadStatus=false;
                            this.billList=this.billList.concat(res.data);
                            this.isAllData =res.data.length < 20 ? true : false;
                        }else if(type == 'down'){
                            this.refreshStatus=false;
                            this.billList=res.data;
                            this.isAllData=false;
                        }else{
                            this.billList=res.data;
                            this.isAllData =res.data.length < 20 ? true : false;
                        }
                    };
                });
            },
            getFlowType(){
                this.$axios.postRequest(httpUrl.info.flowType)
                .then((res) => {
                    if(!res.data.errorCode){
                        console.log(res);
                        this.pickData=regroupPickData(res.data);
                        console.log(this.pickData);
                    }
                })
            },
            showDetail(item){
                this.billDetail=item;
                this.detailShow=true;
            },
            closeDetail(){
                this.detailShow=false;
            },
            setTimeType(type){
                this.billParam.data_type=type;
                this.billParam.page_no=1
                this.getbill();
            },
            confirmFn(val) {
                this.pickerHide();
                this.defaultData = [val.select1];
                this.billParam.type_value=val.select1.type_value == "00"? "":val.select1.type_value;
                this.billParam.detail_value=val.select2.type_value == "00"? "":val.select2.type_value;
                this.billParam.page_no=1
                this.getbill();
            },
            ...mapMutations({
                setShowPicker:'SET_SHOW_PICKER',
            }),
            pickerHide(){
                this.setShowPicker(false);
            }


        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.bill{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    z-index: 103;
    background: $color-bg;
    .scroll-content{
        height: 100%;
        overflow: hidden;
        .bill-main{
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
                        font-size: $font-size-medium-x;
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
                            font-size: $font-size-medium-x;
                            .add{
                                color:$color-text-green;
                            }
                        }
                        .surplus-money{
                            display: block;
                            height:0.6rem;
                            line-height: 0.6rem;
                            font-size: $font-size-small-x;
                            color: $color-text-gray;
                        }
                    }
                    .icon{
                        float:right;
                        height: 1.33rem;
                        color:$color-text-gray;
                        line-height: 1.33rem;
                        padding-left:0.3rem;
                    }
                }
            }
        }
    }
}
.background {
    position:fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 110;
    background:$color-bg-shade-a5;
}
.detail{
    position:fixed;
    top:calc((100% - 9rem) / 2);
    left:1.5rem;
    z-index:120;
    width:7rem;
    height:8.6rem;
    overflow:auto;
    background:$color-bg;
    border-radius: 0.2rem;
    .detail-wrapper{
        min-height:100%;
        .detail-main{
            padding:0.4rem 0.4rem 1.7rem;;
            .item-wrapper{
                height:auto;
                overflow: hidden;
                padding-bottom: 0.2rem;
                line-height: 0.5rem;
                p{
                    height:auto;
                    overflow: hidden;
                    line-height: 0.5rem;
                    &.txt{
                        color:$color-text-gray;
                    }
                }

            }
        }
    }
    .detail-close{
        position:relative;
        margin:-1.5rem auto 0 auto;
        padding: 0 1rem;
        clear:both;
        button{
            height:1rem;
            width:100%;
            text-align: center;
            background:$color-red;
            color: #fff;
            font-size: $font-size-medium-x;
            border-radius: 0.1rem;
            border:0;
        }
    }
}
</style>
