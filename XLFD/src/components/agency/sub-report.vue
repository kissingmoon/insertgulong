<template>
    <div class="sub-wapper">
        <div class="sub-Table_Docker">
            <v-table :tableHeader="tableHeader" :tableData="tableData[currentLevel].data" @clickRow="rowHander" @pulldown="pulldownEvent" @pullup="pullupEvent"></v-table>
        </div>
        <!-- <div class="no-record-div" v-if="tableData.length==0">
            <img src="./no-record.png" alt="">
        </div> -->
        <select-time v-if="show_time" @setTimeType="setTimeType" :selectOption='selectOption'></select-time>
        <div class="bottom_option" v-if="showSwitch.model" @click="setValue(false,showSwitch,'model')">
            <div class="bottom-model">
                <div class="bottom-item flex flex-center" style="color:rgb(28, 145, 218);">{{tableData[currentLevel].data[tableSelectedRow].usrId.data}}</div>
                <div class="bottom-item flex flex-center" @click="seeReport">查看报表</div>
                <div class="bottom-item flex flex-center" @click="seeNext" v-show="tableData[currentLevel].data[tableSelectedRow].priorNum>1">查看下级</div>
                <div class="bottom-item flex flex-center" @click="backup" v-show="currentLevel!=0">返回上级</div>
                <div class="bottom-item flex flex-center">取消</div>
            </div>
        </div>
    </div>
</template>
<script>
import SelectTime from 'base/select-time/select-time';
import {headerConfig} from 'common/js/map';
import vTable from 'base/v-table/v-table';
import * as network  from './network.js'
import * as dataHandle  from './dataHandle.js'
import * as dataMaker  from './dataMaker.js'
import data  from "./data.js";
import {mapGetters,mapActions,mapMutations} from 'vuex'

export default {
    data(){
        return{
            selectOption:{
                itemList:headerConfig['/agency/subReport'].filterConfig.name,
                eleClass:"text-center",
                parent:"agency"
            },
            tableHeader:[{
                name:"账号",
                field:"usrId",
                style:true
            },{
                name:"类型",
                field:"type",
                style:false
            },{
                name:"报表人数",
                field:"priorNum",
                style:false
            },{
                name:"盈利",
                field:"income",
                style:true
            }],
            tableData:[{
                data:[]
            }],
            tableSelectedRow:0,
            currentLevel:0,
            SubReportParm:{
                pageNum:0,
                pageSize:20, 
                timeSign:"1"
            },
            showSwitch:{
                model:false
            }
        }
    },
    components:{
        vTable,
        SelectTime
    },
    computed: {
        ...mapGetters([
            'show_time'
        ])
    },
    beforeDestroy(){
        
    },
    mounted(){
        this.init();
    },
    methods:{
        rowHander(rowData,rowIndex){
            this.tableSelectedRow=rowIndex
            console.log(rowData.usrId.data)
            this.setValue(true,this.showSwitch,'model')
        },
        init(){
            this.SubReportParm.timeSign=1;
            this.setHeader(dataHandle.setTimeHeader(this,headerConfig,0));
            this.setLoadingShow(true); 
            network.getSubReport(this,this.SubReportParm)
            .then((res)=>{
                this.setLoadingShow(false); 
                let obj = {}
                obj.data = dataHandle.handleSubRept(res).list;
                this.tableData[this.currentLevel] = obj
                this.tableData = this.tableData.concat()
                // this.tableData=dataHandle.handleSubRept(res).list;
            })
        },
        setTimeType(indx){
            this.SubReportParm.timeSign=indx+1;
            this.setHeader(dataHandle.setTimeHeader(this,headerConfig,indx));
            this.setLoadingShow(true); 
            network.getSubReport(this,this.SubReportParm)
            .then((res)=>{
                this.setLoadingShow(false); 
                let obj = {}
                obj.data = dataHandle.handleSubRept(res).list;
                this.tableData[this.currentLevel] = obj
                this.tableData = this.tableData.concat()
                // this.tableData=dataHandle.handleSubRept(res).list;
            })
        },
        pulldownEvent(){
            this.SubReportParm.pageNum=0;
            this.setLoadingShow(true); 
            network.getSubReport(this,this.SubReportParm)
            .then((res)=>{
                this.setLoadingShow(false); 
                this.tableData=dataHandle.handleSubRept(res).list;
            })
        },
        pullupEvent(){
            if(this.tableData.length<this.SubReportParm.pageSize*(this.SubReportParm.pageNum+1)){
                

            }else{
                this.SubReportParm.pageNum++;
                this.setLoadingShow(true); 
                network.getSubReport(this,this.SubReportParm)
                .then((res)=>{
                    this.setLoadingShow(false); 
                    this.tableData= this.tableData.concat(dataHandle.handleSubRept(res).list);
                })
            }
        },
        setValue(bool,obj,key){
            obj[key] = bool;
        },
        seeNext(){
            let uID = this.tableData[this.currentLevel].data[this.tableSelectedRow].usrId.data
            let parm = Object.assign({},{userId:uID},this.SubReportParm)
            this.setLoadingShow(true); 
            network.getSubReptReview(this,parm)
            .then((res)=>{
                this.setLoadingShow(false); 
                let obj = {}
                obj.data = dataHandle.handleSubRept(res).list;
                this.currentLevel++;
                this.tableData[this.currentLevel] = obj
                this.tableData = this.tableData.concat()
            })
        },
        seeReport(){
            this.$router.push({
                path:'/agency/agencyReport',
                query:{uID:this.tableData[this.currentLevel].data[this.tableSelectedRow].usrId.data}
            });
        },
        backup(){
            this.currentLevel--;
        },
        ...mapActions([
            "setHeader"
        ]),
        ...mapMutations({
            setLoadingShow:'SET_LOADING_SHOW'
        })
    }
}
</script>
<style lang="scss" scoped>
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.sub-wapper{
    height: 100%;
    width: 100%;
    background: #F2F2F2;
    position:absolute;
    top:0;
    .sub-Table_Docker{
        width: 100%;
        height: 100%;
        .sub-Table{
        
            width: 100%;
            background: #ffffff;
            thead td{
                height: 1.3rem;
            }
            thead,tr{
                width: 100%;
                border-bottom: 1px solid  #F6F6F6;
            }
            td{
                height: 1.1rem;
                vertical-align: middle;
                font-size: $font-size-medium-x;
            }
        }
    }
    .no-record-div{
        padding-top:2rem; 
        img{
            display: block;
            margin: 0 auto;
            width: 4.8rem;
            height: 3.2rem;
        }
    }
    .bottom_option{
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        z-index: 101;
        background:$color-bg-shade-a5;
        .bottom-model{
            position: absolute;
            bottom: 0;
            width: 100%;
            background: #ffffff;
            .bottom-item{
                height: 1.2rem;
                border-bottom:1px solid #F6F6F6;
                &:last-child{
                    border-top: 5px solid #efeef4;
                }
            }
        }
    }
    
}
</style>


