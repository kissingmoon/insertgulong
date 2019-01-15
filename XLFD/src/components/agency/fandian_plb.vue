<template>
    <div class="plb-wapper">
        <Tabs value="name1" class="tab-content" @clickEvent="tabClickedFun">
            <ul slot="TabPane" class="tab-pane flex">
                <li class="flex flex-center tab-pane-li" v-for="(v,k) in tabList" :key="k" :data-index="k"  :class="{ active: k==activeTabIndex}">{{v.lottery_label}}</li>
            </ul>
        </Tabs>
        <div class="flex by-main-content">
            <div class="by-left" v-if="hasData.tabList">
                <div class="by-header flex flex-align-center ">
                    <span>玩法</span>
                    <span>             返点</span>
                </div>
                <ul>
                    <li  v-for="(v,k) in tabList[activeTabIndex].bypoint" :key="k">
                        <div class="by-left-item flex flex-align-center" v-for="(v1,k1) in v.wf" :key="k1">
                                {{v1.name}}
                        </div>
                    </li>
                </ul>
            </div>
            <div class="by-right" v-if="hasData.tabList">
                <div class="by-header flex flex-center">
                    <vSelect @change="selectFun" :selections="fandianList"></vSelect>
                </div>
                <ul>
                    <li  v-for="(v,k) in tabList[activeTabIndex].bypoint" :key="k">
                        <div class="by-right-item flex flex-center" v-for="(v1,k1) in v.wf" :key="k1">
                                {{v1.wf_pl[0].base_award_money+v1.wf_pl[0].agent_rebate_money*currentFandian}}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        
    </div>
</template>
<script>
import {httpUrl} from 'common/js/map';
import data  from "./data.js";
import vSelect from 'base/v-select/v-select';

export default {
    data(){
        return{
            tabList:[],
            activeTabIndex:0,
            fandianObj:{},
            hasData:{
                tabList:false,
                selfRebate:false
            },
            rebate:"",
            fandianList:[{
                label: 'test',
                value: 0
            }],
            currentFandian:0
        }
    }, 
    components:{
        vSelect
    },
    computed:{
        is28OrLhc(){
            return this.tabList[this.activeTabIndex].lottery_type == '6' || this.tabList[this.activeTabIndex].lottery_type == '11'? true:false ;
        }
    },
    created(){
        this.fandianList=this.makeFandianList(0,90);
        this.getTypeList().then((res)=>{
            if(res.data && !res.data.errorCode){
                this.tabList=res.data
                let lottery_id = this.tabList[0].sub_lottery[0].lottery_id
                this.hasData.tabList=true
                return this.getBypoint(lottery_id)
            }
        }).then((res)=>{
            if(res.data && !res.data.errorCode){
                let obj = {bypoint:res.data}
                this.tabList[0] = Object.assign({},this.tabList[0],obj)
                this.tabList = this.tabList.concat()
            }
        })
        this.getSelfRebate().then((res)=>{
            if(res.data && !res.data.errorCode){
                this.fandianObj=res.data
                this.hasData.selfRebate=true
            }
        })
    },
     methods:{
        tabClickedFun(target){
            this.activeTabIndex=target.dataset.index;
            if(this.tabList[this.activeTabIndex].bypoint){
                if(this.hasData.selfRebate){ 
                    if(this.tabList[this.activeTabIndex].fandian){

                    }else{   
                        let lottery_type = "cp" + this.tabList[this.activeTabIndex].lottery_type
                        let flag = data.cp_name_ref[lottery_type]
                        this.tabList[this.activeTabIndex].fandian = this.fandianObj[flag]
                    }
                }
            }else{
                let lottery_id = this.tabList[this.activeTabIndex].sub_lottery[0].lottery_id
                this.getBypoint(lottery_id).then((res)=>{
                    if(res.data && !res.data.errorCode){
                        this.tabList[this.activeTabIndex].bypoint=res.data
                        this.tabList = this.tabList.concat()
                    }
                })
            }
        },
        getSelfRebate(){
            return this.$axios.postRequest(httpUrl.agency.selfRebate)  
        },
        getTypeList(){
            var parm={}
            var pattern=/^www./
            var dm="www.test.weinisi01.com"
            if(pattern.test(document.domain)){
                parm.agent=document.domain.substring(4)
            }else{
                parm.agent=document.domain
            }
            return this.$axios.postRequest(httpUrl.lottery.getTypeList,parm)   
            
        },
        getBypoint(lottery_id){
            const api=this.is28OrLhc?httpUrl.lottery.lhc28Bypoint:httpUrl.lottery.bypoint
            return this.$axios.postRequest(api,{lottery_id}) 
        },
        makeFandianList(min,max){
            
            let List=[]
            for(let i=min;i<=max;i++){
                let obj={}
                obj.value=i/10
                obj.label=i/10
                List.push(obj)
            }
            return List;
        },
        changeToFd(){
            for(var i in data.cp_name_ref) {

            }
            
        },
        selectFun(indx){
            console.log(indx.value)
            this.currentFandian=indx.value
        }
     }
}
</script>

<style lang="scss" scoped>
.plb-wapper{
    min-height: 101%;
    width: 100%;
    background: #F2F2F2;
    position:absolute;
    top:0;
    .tab-content{
            overflow: auto;
        .tab-pane{
            .tab-pane-li{
                min-width: 2rem;
                height: 1.5rem;
                flex-shrink: 0;
            }
        }
    }
    .by-main-content{
        background-color: #FFFFFF;
        .by-left{
            width: 5rem;
            .by-header{
                 height: 1rem;
                 padding-left: 0.5rem;
            }
            .by-left-item{
                height: 1rem;
                padding-left: 0.5rem;
            }
        }
        .by-right{
            .by-header{
                height: 1rem;
            }
            .by-right-item{
                height: 1rem;
            }
        }
    }
}
</style>
