<template>

    <table class="sub-Table">
        
            <!-- <scroll ref="scroll" class="scroll-content" 
                        :data="tableData" 
                        :pulldown="pulldown"
                        :pullup="pullup"
                        :isAllData="isAllData"
                        :refreshStatus="refreshStatus"
                        :loadStatus="loadStatus"
                        @pulldown="getDrawNubmer('down')"
                        @pullup="getDrawNubmer('up')"
                        > -->
        <!-- <thead class="sub-Table-header">
            <tr class="sub-Table-hetr" align="center" valign="middle">
                <td>账号</td>
                <td>类型</td>
                <td>报表人数</td>
                <td>盈利</td>
            </tr>
        </thead>
        <tbody>
            <tr align="center">
                <td>oppo233</td>
                <td>1级代理</td>
                <td>111</td>
                <td>2222.222222</td>
            </tr>
            <tr align="center">
                <td>aa</td>
                <td>1级代理</td>
                <td>111</td>
                <td>222</td>
            </tr>
        </tbody> -->
        <thead class="sub-Table-header">
            <tr class="sub-Table-hetr" align="center" valign="middle">
                <td v-for="(v,k) in tableHeader" :key="k">{{v.name}}</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(v,k) in loadTableData" :key="k" align="center" @click="clickRow(k)">
                <td v-for="(v1,k1,indx) in v" :key="k1" :style="tableHeader[indx].style?v1.style:''">{{tableHeader[indx].style?v1.data:v1}}</td>
            </tr>
        </tbody>
        <!-- </scroll> -->
    </table>
    
</template>
<script>
import Scroll from 'base/scroll/scroll';
export default {
    data(){
        return{
            // loadTableData:{}
            pulldown: true,
            pullup: true,
            refreshStatus:false,
            loadStatus:false,
            isAllData:false,
        }
    },
    props:{
        tableHeader:{
            type:Array,
            default:()=>[]
        },
        tableData:{
            type:Array,
            default:()=>[]
        }
    },
    components:{
        Scroll
    },
    computed:{
        loadTableData(){
            return this.filterByHeader(this.tableData,this.tableHeader);
        }
    },
    created(){
        // this.loadTableData=this.filterByHeader(this.tableData,this.tableHeader)
    },
    methods:{
        filterByHeader(tableData,tableHeader){
            let list=[];
            tableData.map((v,k)=>{
                var obj={};
                tableHeader.map((v1,k1)=>{
                    obj[v1.field]= v[v1.field]
                })
                list.push(obj);
            })
            return list;
        },
        clickRow(rowIndex){
            this.$emit("clickRow",this.tableData[rowIndex],rowIndex);
        },
        getDrawNubmer(type){
            console.log("ssss")
        },
    }
}
</script>
<style lang="scss" scoped>
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.scroll-content{
    height: 15rem;
}
.sub-Table{
    width: 100%;
    background: #ffffff;
        height: 5rem;
    overflow: auto;
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
</style>
