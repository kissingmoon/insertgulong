<template>
    <div class="trad-detail-wapper">
        <search-input></search-input>
        <Tabs value="name1" class="tab-content" @clickEvent="tabClickedFun">
            <ul slot="TabPane" class="tab-pane flex">
                <li class="flex flex-center flex-1" v-for="(v,k) in tabList" :key="k" :data-index="k"  :class="{ active: k==activeTabIndex}">{{v.name}}</li>
            </ul>
        </Tabs>
        <div>
        </div>
        <div class="no-record-div">
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
                TabPaneOn:'TabPaneOn',
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
                    itemList:headerConfig['/agency/betDetail'].filterConfig.name,
                    eleClass:"text-center",
                    parent:"agency"
                },
                currentData:[{
                    pfm_user_id:"",
                    change_money:"",
                    create_date:"",
                    change_type:""
                }]
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
                if(this.activeTabIndex==1){
                    network.getMoneyFlow(this,{pageNum:0,  pageSize:5, timeSign:1,changeType:2})
                    .then((res)=>{
                        console.log(dataHandle.getResData(res));
                    })
                }
            },
            setTimeType(type){
            
            },
            init(){
                network.getMoneyFlow(this,{pageNum:0,  pageSize:5, timeSign:1,changeType:1})
                .then((res)=>{
                    this.currentData = dataHandle.HandleTradDetail(res);
                })
            }
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
}
</style>
