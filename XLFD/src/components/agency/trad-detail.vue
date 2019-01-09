<template>
    <div class="trad-detail-wapper">
        <search-input></search-input>
        <Tabs value="name1" class="tab-content" @clickEvent="tabClickedFun">
            <ul slot="TabPane" class="tab-pane flex">
                <li class="flex flex-center flex-1" v-for="(v,k) in tabList" :key="k" :data-index="k"  :class="{ active: k==activeTabIndex}">{{v.name}}</li>
            </ul>
        </Tabs>
        <!-- <ul v-for="(v,k) in currentData" :key="k">
            <li>
                <span :style="v.pfm_user_id.style">{{v.pfm_user_id.data}}</span>
                <span :style="v.change_money.style">{{v.change_money.data}}</span>
            </li>
            <li>
                <span :style="v.create_date.style">{{v.create_date.data}}</span>
                <span :style="v.change_type.style">{{v.change_type.data}}</span>
            </li>
        </ul> -->
        <ul class="data-content">
            <li class="data-li flex flex-pack-justify" v-for="(v,k) in currentData" :key="k">
                <div>
                    <div class="data-item-top flex flex-pack-justify" >
                        <span >{{v.id}}</span>
                        
                    </div>
                    <div class="data-item flex flex-align-center">
                        <span style="color:#949494">{{v.create_date}}</span>
                    </div>
                </div>
                <div>
                    <div class="data-item-top flex flex-align-center flex-pack-end" >
                        <!-- <span >{{v.create_date}}</span> -->
                        <!-- <span >{{v.remark}}</span> -->
                        <span :style="v.change_money.style">{{v.change_money.data}}</span>
                    </div>
                    <div class="data-item flex flex-align-center flex-pack-end">
                        <span style="color:#949494">{{v.remark}}</span>
                    </div>
                </div>
            </li>
        </ul>
        <div v-if="currentData.length==0" class="no-record-div">
            <img src="./no-record.png" alt="">
        </div>
        <select-time v-if="show_time" @setTimeType="setTimeType" :selectOption='selectOption'></select-time>
    </div>
</template>
<script>
import {headerConfig} from 'common/js/map';
import SelectTime from 'base/select-time/select-time';
import searchInput from './search-input';
import * as network  from './network.js'
import * as dataHandle  from './dataHandle.js'
import * as dataMaker  from './dataMaker.js'
import data  from "./data.js";
import {mapGetters,mapActions,mapMutations} from 'vuex'
export default {
    data(){
            return{
                tabList:[
                    {
                        name:"所有类型"
                    },
                    {
                        name:"提现记录"
                    },
                    {
                        name:"充值记录"
                    }
                ],
                activeTabIndex:0,
                selectOption:{
                    itemList:headerConfig['/agency/tradDetail'].filterConfig.name,
                    eleClass:"text-center",
                    parent:"agency"
                },
                currentData:[{
                    pfm_user_id:{
                        data:"oppo233",
                        style:{
                            color:"red"
                        }
                    },
                    change_money:{
                        data:"966",
                        style:{
                        }
                    },
                    create_date:{
                        data:"2018-12-03",
                        style:{
                            color:"grey"
                        }
                    },
                    change_type:{
                        data:"01",
                        style:{
                            color:"grey"
                        }
                    }
                },{
                    pfm_user_id:"oppo233",
                    change_money:"12321",
                    create_date:"2018-012-03",
                    change_type:"01"
                }],
                moneyFlowParm:{
                    pageNum:0,
                    pageSize:10,
                    timeSign:"1",
                    changeType:""
                }
            }
        },
         computed: {
            ...mapGetters([
                'show_time'
            ])
        },
        components:{
            SelectTime,
            searchInput
        },
        mounted(){
            this.init();
        },
        methods:{
            tabClickedFun(target){
                this.activeTabIndex=target.dataset.index;
                let changeType;
                switch(this.activeTabIndex){
                    case "0":changeType="";break;
                    case "1":changeType=2;break;
                    case "2":changeType=1;break;
                }
                this.moneyFlowParm.changeType=changeType;
                network.getMoneyFlow(this,this.moneyFlowParm)
                .then((res)=>{
                    this.currentData = dataHandle.HandleTradDetail(res);
                })
            },
            setTimeType(indx){
                this.moneyFlowParm.timeSign=indx+1;
                this.setHeader(dataHandle.setTimeHeader(this,headerConfig,indx));
                network.getMoneyFlow(this,this.moneyFlowParm)
                .then((res)=>{
                    this.currentData = dataHandle.HandleTradDetail(res);
                })
            },
            init(){
                this.setHeader(dataHandle.setTimeHeader(this,headerConfig,0));
                network.getMoneyFlow(this,this.moneyFlowParm)
                .then((res)=>{
                    this.currentData = dataHandle.HandleTradDetail(res);
                })
            },
            ...mapActions([
                "setHeader"
            ])
        }
}
</script>
<style lang="scss" scoped>
.trad-detail-wapper{
    min-height: 100%;
    width: 100%;
    background: #F2F2F2;
    position:absolute;
    top:0;
    .tab-content{
        background: #ffffff;
        .tab-pane{
            height: 1.3rem;
            .active{
                color: #DA1C36;
            }
        }
    }
    .data-content{
        background-color: #ffffff;
        .data-li{
            padding: 0 0.5rem;
            border-bottom: 1px solid #F2F2F2;
            .data-item{
                height: 0.8rem;
            }
            .data-item-top{
                padding-top:  0.4rem;
            }
        }
    }
    .no-record-div{
        img{
            display: block;
            margin:0 auto;
            width: 4.8rem;
            height: 3.2rem;
        }
    }
}
</style>
