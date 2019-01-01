<template>
    <div class="member-wapper">
        <div v-if="tableData.length>0" class="sub-Table_Docker">
            <v-table :tableHeader="tableHeader" :tableData="tableData" @clickRow="rowHander"></v-table>
        </div>
        <div v-if="tableData.length==0" class="no-record-div">
            <img src="./no-record.png" alt="">
        </div>
    </div>
</template>
<script>
import vTable from 'base/v-table/v-table';
import * as network  from './network.js'
import * as dataHandle  from './dataHandle.js'
import * as dataMaker  from './dataMaker.js'
import data  from "./data.js";
import {mapGetters,mapActions,mapMutations} from 'vuex'
export default {
    data(){
        return {
            tableHeader:[{
                name:"账号",
                field:"usrId",
                style:""
            },{
                name:"类型",
                field:"type",
                style:""
            },{
                name:"登陆时间",
                field:"loginTime",
                style:""
            },{
                name:"下级人数",
                field:"subCount",
                style:""
            }],
            tableData:[],
        }
    },
    components:{
        vTable,
    },
     mounted(){
        this.init();
    },
    methods:{
        init(){
            network.agentOrCustomerDetail(this)
            .then((res)=>{
                if(res.data && !res.data.errorCode){
                    this.tableData=dataHandle.getCurrentTable(res,this.tableHeader)
                }
            })
        },
        rowHander(rowData,rowIndex){
            console.log(rowData)
            this.setValue(true,this.showSwitch,'model')
            this.tableSelectedRow=rowIndex
        },
    }
}
</script>
<style lang="scss" scoped>
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.member-wapper{
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
