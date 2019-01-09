<template>
    <div class="bet-detail-wapper">
        <search-input></search-input>
        <Tabs value="name1" class="tab-content" @clickEvent="tabClickedFun">
            <ul slot="TabPane" class="tab-pane flex">
                <li class="flex flex-center flex-1" v-for="(v,k) in tabList" :key="k" :data-index="k"  :class="{ active: k==activeTabIndex}">{{v.name}}</li>
            </ul>
        </Tabs>
        <ul class="data-content">
            <li class="data-li flex flex-pack-justify" v-for="(v,k) in tabData" :key="k">
                <div>
                    <div class="data-item-top flex flex-align-center">
                        <span>{{v.id}}</span>
                        <span  style="color:#949494;margin-left:0.5rem;">￥{{v.betMoney}}</span>
                    </div>
                    <div class="data-item flex flex-align-center">
                        <span style="color:#949494">{{v.createDate}}</span>
                    </div>
                </div>
                <div class="flex-v"> 
                    <div  class="data-item-top flex flex-align-center flex-pack-end">
                        <span v-if='v.status=="3"' style="color:red;">{{v.winMoney}}</span>
                    </div>
                    <div class="data-item flex flex-align-center flex-pack-end">
                        <span>{{v.statFlag}}</span>
                    </div>
                </div>
            </li>
        </ul>
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
                TabPaneOn:'TabPaneOn',
                tabList:[
                    {
                        name:"全部"
                    },
                    {
                        name:"已中奖"
                    },
                    {
                        name:"未中奖"
                    },
                    {
                        name:"等待开奖"
                    }
                ],
                tabData:[],
                activeTabIndex:0,
                selectOption:{
                    itemList:headerConfig['/agency/betDetail'].filterConfig.name,
                    eleClass:"text-center",
                    parent:"agency"
                },
                AgentOrderParm:{
                    pageNum:0,
                    pageSize:10, 
                    timeSign:"1",
                    status:"",
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
                    case "1":changeType="3";break;
                    case "2":changeType="1";break;
                    case "3":changeType="0";break;
                }
                this.AgentOrderParm.status=changeType;
                network.getAgentOrders(this,this.AgentOrderParm)
                .then((res)=>{
                    this.tabData=dataHandle.handleBetDetail(res);
                })
            },
            setTimeType(indx){
                this.AgentOrderParm.timeSign=indx+1;
                this.setHeader(dataHandle.setTimeHeader(this,headerConfig,indx));
                network.getAgentOrders(this,this.AgentOrderParm)
                .then((res)=>{
                     this.tabData=dataHandle.handleBetDetail(res);
                })
            },
            init(){
                this.setHeader(dataHandle.setTimeHeader(this,headerConfig,0));
                network.getAgentOrders(this,this.AgentOrderParm)
                .then((res)=>{
                    this.tabData=dataHandle.handleBetDetail(res);
                })
            },
            ...mapActions([
                "setHeader"
            ])
        }
}
</script>
<style lang="scss" scoped>
.bet-detail-wapper{
    height: 100%;
    width: 100%;
    background: #F2F2F2;
    position:absolute;
    top:0;
    .tab-content{
        background: #ffffff;
        .tab-pane{
            height: 1.3rem;
            border-bottom: 1px solid #F2F2F2;
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
}
</style>
