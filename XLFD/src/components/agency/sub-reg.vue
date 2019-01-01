<template>
    <div class="sub-reg">
        <div class="reg-register flex">
            <!-- <div class="reg-register-item flex-1 flex flex-center">下级开户</div>
            <div class="reg-register-item flex-1 flex flex-center">邀请码</div> -->
            <div class="reg-register-item flex-1 flex flex-center" :class="{ active: k==activePointer[v.level].activeindx }" 
                v-for="(v,k) in titleSort" :key="k" @click="choose_level_0(v.level,k)">
                {{v.name}}
            </div>
        </div>
        <div class="reg-code">
            <div class="sub-reg-type flex">
                <div class="sub-reg-item flex-2 flex flex-align-center">开户类型</div>
                <!-- <div class="sub-reg-item flex-3 flex flex-align-center">
                    <div class="sub-reg-circle">
                        <div class="sub-circle-center"></div>
                    </div>
                    <span>&nbsp;代理类型</span>
                </div>
                <div class="sub-reg-item flex-3 flex flex-align-center">
                    <div class="sub-reg-circle">
                        <div class=""></div>
                    </div>
                    <span>&nbsp;玩家类型</span>
                </div> -->
                <div class="sub-reg-item flex-3 flex flex-align-center"
                    v-for="(v,k) in titleSort[activePointer[0].activeindx].subSort" :key="k" @click="choose_level_1(v.level,k)">
                    <div class="sub-reg-circle">
                        <div v-if="k==activePointer[v.level].activeindx" class="sub-circle-center"></div>
                    </div>
                    <span>&nbsp;{{v.name}}</span>
                </div>
            </div>
            <div class="sub-reg-type flex flex-align-center">
                请先为下级设置返点，<b style="color:#DA1C36">点击查看返点赔率表</b>
            </div>
        </div>
        <div class="reb-table" v-if="activePointer[0].activeindx==1">
            <v-table :tableHeader="tableHeader" :tableData="tableData" @clickRow="rowHander"></v-table>
        </div>
        <div class="fandian-list" v-if="activePointer[0].activeindx==0">
            <div class="fandian-item flex flex-align-center flex-pack-justify" v-for="(v,k) in fandianObj" :key="k" v-if="v.name">
                <div>{{v.name}}</div>
                <div><input type="text" :placeholder="'自身返点'+v.fandian+',可设置返点0.0-'+v.fandian" v-model="v.subFandian"></div>
            </div>
            <div class="createcode-div flex flex-center">
                <button class="createcode-btn" @click="createCode">生成邀请码</button>
            </div>
        </div>
        <div class="bottom_option" v-show="showSwitch.model" @click="setValue(false,showSwitch,'model')">
            <div class="option-content">
                <div v-for="(v,k) in bottomOption" :key="k" class="option-item" @click="handleItem(k)">
                    {{v.name}}
                </div>
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

export default {
    data(){
        return{
            tableHeader:[{
                name:"邀请码",
                field:"inviteCode",
                style:""
            },{
                name:"生成时间",
                field:"create_time",
                style:""
            },{
                name:"状态",
                field:"priorNum",
                style:""
            }],
            tableData:[],
            tableSelectedRow:0,
            titleSort:[
                {
                    index:0,
                    name:"下级开户",
                    level:0,
                    subSort:[{
                        index:0,
                        name:"代理类型",
                        accType:"1",
                        level:1
                    },{
                        index:1,
                        name:"玩家类型",
                        accType:"0",
                        level:1
                    }]
                },
                {
                    index:1,
                    name:"邀请码",
                    level:0,
                    subSort:[{
                        index:0,
                        name:"代理类型11",
                        accType:"1",
                        level:1
                    },{
                        index:1,
                        name:"玩家类型11s",
                        accType:"0",
                        level:1
                    }]
                }
            ],
            activePointer:[{
                activeindx:0
            },{
                activeindx:0
            }],
            fandianObj:[],
            bottomOption:[{
                name:"生成二维码图片",
                type:1
            },{
                name:"复制推广链接",
                type:1
            },{
                name:"查看返点",
                type:1
            },{
                name:"删除邀请码",
                type:1
            },{
                name:"取消",
                type:0
            }],
            showSwitch:{
                model:false
            }
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
            network.getSelfRebate(this)
            .then((res)=>{
                this.fandianObj=dataHandle.createSelfRebate(res)
            })
        },
        choose_level_0(level,activeIndx){
            this.choose(level,activeIndx);
            if(activeIndx==1){
                let param={};
                param.accType=dataMaker.getAccType(this);
                network.getInviteCodeList(this,param)
                .then((res)=>{
                     this.tableData=dataHandle.getCurrentTable(res,this.tableHeader)
                })
            }
        },
        choose_level_1(level,activeIndx){
            this.choose(level,activeIndx);
            let level_0_activeIndx=dataMaker.getPointer(this,0);
            if(level_0_activeIndx==1){
                let param={};
                param.accType=dataMaker.getAccType(this);
                network.getInviteCodeList(this,param)
                .then((res)=>{
                    this.tableData=dataHandle.getCurrentTable(res,this.tableHeader)
                })
            }
        },
        createCode(){
            let param=dataMaker.makeCode(this)
            network.getInviteCode(this,param)
            .then((res)=>{
                this.setTip({message:"成功生成邀请码！",flag:1});
            })
        },
        choose(level,activeIndx){
            this.activePointer[level].activeindx = activeIndx;
        },
        rowHander(rowData,rowIndex){
            console.log(rowData)
            this.setValue(true,this.showSwitch,'model')
            this.tableSelectedRow=rowIndex
        },
        handleItem(key){
            if(key==3){
                let param={};
                let tabActIndex=this.tableSelectedRow
                param.id=this.tableData[tabActIndex].id;
                network.deleteInviteCode(this,param)
                .then((res)=>{
                    this.setTip({message:"成功删除邀请码！",flag:1});
                    this.choose_level_1(1,this.activePointer[1].activeindx)
                })
            }
        },
        setValue(bool,obj,key){
            obj[key] = bool;
        },
        ...mapMutations({
            setTip:'SET_TIP'
        })
    }
}
</script>
<style lang="scss" scoped>
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.sub-reg{
    min-height: 101%;
    width: 100%;
    background: #F2F2F2;
    position:absolute;
    top:0;
    .reg-register{
        padding: 0.3rem 0.5rem;
        .reg-register-item{
            background: #ffffff;
            font-size: $font-size-medium-x;
            height: 0.99rem;
            &:first-child{
                border-radius: 0.2rem 0 0 0.2rem;
            }
            &:last-child{
                border-radius: 0 0.2rem 0.2rem 0;
            }
            &.active{
                background: #DA1C36;
                color: #ffffff;
            }
        }
    }
    .reg-code{
        .sub-reg-type{
            background: #ffffff;
            height: 1.2rem;
            font-size: $font-size-medium-x;
            padding-left: 0.5rem;
            .sub-reg-circle{
                border-radius:50%; 
                border:1px solid  #DA1C36;
                width: 0.3rem;
                height: 0.3rem;
                padding: 0.08rem;
                .sub-circle-center{
                    background: #DA1C36;
                    width: 100%;
                    height: 100%;
                    border-radius:50%;
                }
            }
        }
    }
    .reb-table{
        margin-top: 0.3rem;
    }
    .fandian-list{
        margin-top: 0.3rem;
        background: #ffffff;
        .fandian-item{
            height: 1.2rem;
            border-bottom: 1px solid #F6F6F6;
            padding: 0 0.5rem;
        }
    }
    .createcode-div{
        padding: 0.2rem 0;
        .createcode-btn{
            background: #DA1C36;
            height: 1.2rem;
            width: 90%;
            border-radius: 0.1rem;
            color: #ffffff;
            font-size: $font-size-medium-x;
        }
    }
    .bottom_option{
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        z-index: 101;
        background:$color-bg-shade-a5;
        .option-content{
            position: fixed;
            bottom: 0;
            width: 100%;
            background: #ffffff;
            .option-item{
                text-align: center;
                height: 1.5rem;
                line-height: 1.5rem;
                border-bottom: 1px solid #F2F2F2;
                font-size: $font-size-large;
                &:last-child{
                    border-top: 9px solid #F2F2F2;
                }
            }
        }
    }
}
</style>
