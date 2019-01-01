<template>
    <div class="bet-detail-wapper">
        <search-input></search-input>
        <Tabs value="name1" class="tab-content" @clickEvent="tabClickedFun">
            <ul slot="TabPane" class="tab-pane flex">
                <li class="flex flex-center flex-1" v-for="(v,k) in tabList" :key="k" :data-index="k"  :class="{ active: k==activeTabIndex}">{{v.name}}</li>
            </ul>
        </Tabs>
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
                activeTabIndex:0,
                selectOption:{
                    itemList:headerConfig['/agency/betDetail'].filterConfig.name,
                    eleClass:"text-center",
                    parent:"agency"
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
            },
            setTimeType(type){
            
            },
            init(){
                network.getAgentOrders(this,{pageNum:0,  pageSize:5, timeSign:1,status:0})
                .then((res)=>{
                    console.log(dataHandle.getResData(res));
                })
            }
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
            .active{
                color: #DA1C36;
            }
        }
    }
}
</style>
