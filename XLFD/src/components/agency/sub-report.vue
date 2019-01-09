<template>
    <div class="sub-wapper">
        <div class="sub-Table_Docker">
            <v-table :tableHeader="tableHeader" :tableData="tableData" @clickRow="rowHander"></v-table>
        </div>
        <div class="no-record-div" v-if="tableData.length==0">
            <img src="./no-record.png" alt="">
        </div>
        <select-time v-if="show_time" @setTimeType="setTimeType" :selectOption='selectOption'></select-time>
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
            tableData:[],
            currentTime:""
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
        },
        init(){
            this.currentTime=1;
            this.setHeader(dataHandle.setTimeHeader(this,headerConfig,0));
            network.getSubReport(this,{pageNum:0,  pageSize:10, timeSign:this.currentTime})
            .then((res)=>{
                this.tableData=dataHandle.handleSubRept(res).list;
            })
        },
        setTimeType(indx){
            this.currentTime=indx+1;
            this.setHeader(dataHandle.setTimeHeader(this,headerConfig,indx));
            network.getSubReport(this,{pageNum:0,  pageSize:10, timeSign:this.currentTime})
            .then((res)=>{
                this.tableData=dataHandle.handleSubRept(res).list;
            })
        },
        ...mapActions([
            "setHeader"
        ]),
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
        overflow: hidden;
        img{
            display: block;
            margin: 0 auto;
            width: 4.8rem;
            height: 3.2rem;
        }
    }
}
</style>


