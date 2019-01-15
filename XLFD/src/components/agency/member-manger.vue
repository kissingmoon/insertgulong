<template>
    <div class="member-wapper">
        <div class="sub-Table_Docker">
            <v-table :tableHeader="tableHeader" :tableData="tableData[currentLevel].data" @clickRow="rowHander" @pulldown="pulldownEvent" @pullup="pullupEvent"></v-table>
        </div>
        <!-- <div v-if="tableData.length==0" class="no-record-div">
            <img src="./no-record.png" alt="">
        </div> -->
        <div class="bottom_option" v-if="showSwitch.model" @click="setValue(false,showSwitch)">
            <div class="bottom-model" @click.stop="setValue(false,showSwitch,'fisrtmodel')">
                <div class="bottom-item flex flex-center" style="color:rgb(28, 145, 218);">{{tableData[currentLevel].data[tableSelectedRow].usrId.data}}</div>
                <div class="bottom-item flex flex-center" @click="setValue(true,showSwitch,'fandian')">查看返点</div>
                <div class="bottom-item flex flex-center" @click="seeNext" v-show="tableData[currentLevel].data[tableSelectedRow].subCount>0" >查看下级</div>
                <div class="bottom-item flex flex-center" @click="backup" v-show="currentLevel!=0">返回上级</div>
                <div class="bottom-item flex flex-center">取消</div>
            </div>
            <div class="fandian_model" v-if="showSwitch.fandian">
                <fandian :uID="tableData[currentLevel].data[tableSelectedRow].usrId.data" :byNetwork="true" @closeFandian="closeFandian"></fandian>
            </div>
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
import fandian from './fandian';

export default {
    data(){
        return {
            tableHeader:[{
                name:"账号",
                field:"usrId",
                style:true
            },{
                name:"类型",
                field:"type",
                style:false
            },{
                name:"登陆时间",
                field:"loginTime",
                style:false
            },{
                name:"下级人数",
                field:"subCount",
                style:false
            }],
            tableData:[{
                data:[]
            }],
            currentLevel:0,
            tableSelectedRow:0,
            MemberParm:{
                pageNum:0,
                pageSize:10
            },
            showSwitch:{
                model:false,
                fisrtmodel:false,
                fandian:false
            }
        }
    },
    components:{
        vTable,
        fandian
    },
     mounted(){
        this.init();
    },
    methods:{
        init(){
            network.agentOrCustomerDetail(this,this.MemberParm)
            .then((res)=>{
                if(res.data && !res.data.errorCode){
                    let obj = {}
                    obj.data = dataHandle.handleMember(res);
                    this.tableData[this.currentLevel] = obj
                    this.tableData = this.tableData.concat()
                }
            })
        },
        rowHander(rowData,rowIndex){
            console.log(rowData)
            this.setValue(true,this.showSwitch,'model')
            this.tableSelectedRow=rowIndex
        },
        pulldownEvent(){
            this.MemberParm.pageNum=0;
            network.agentOrCustomerDetail(this,this.MemberParm)
            .then((res)=>{
                let obj = {}
                obj.data = dataHandle.handleMember(res);
                this.tableData.push(obj)
                // this.tableData=dataHandle.getCurrentTable(res);
            })
        },
        pullupEvent(){
            if(this.tableData.length<this.MemberParm.pageSize*(this.MemberParm.pageNum+1)){
                

            }else{
                this.MemberParm.pageNum++;
                network.agentOrCustomerDetail(this,this.MemberParm)
                .then((res)=>{
                    this.tableData= this.tableData.concat(dataHandle.getResData(res));
                })
            }
        },
        seeNext(){
            let uID = this.tableData[this.currentLevel].data[this.tableSelectedRow].usrId.data
            let parm = Object.assign({},{userId:uID},this.SubReportParm)
            network.viewSubordinate(this,parm)
            .then((res)=>{
                let obj = {}
                obj.data = dataHandle.handleMember(res);
                this.currentLevel++;
                this.tableData[this.currentLevel] = obj
                this.tableData = this.tableData.concat()
                this.setValue(false,this.showSwitch) 
            })
        },
        backup(){
            this.currentLevel--;
            this.setValue(false,this.showSwitch) 
        }, 
        closeFandian(){
            this.setValue(false,this.showSwitch) 
        },
        setValue(bool,obj,key){
            if(key){
                obj[key] = bool;
            }
            else{
                for(let k in obj){
                    obj[k]=false
                }
            }
        }
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
        overflow: hidden;
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
        .fandian_model{
            position: fixed;
            bottom: 0;
            width: 100%;
            background: #ffffff;
        }
    }
}
</style>
