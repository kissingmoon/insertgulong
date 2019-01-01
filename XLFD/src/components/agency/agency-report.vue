<template>
    <div class="report-wapper">
        <search-input></search-input>
        <div class="report-List flex">
            <div class="report-item flex flex-v flex-center" v-for="(v,k) in reportObj" :key="k">
                <div class="report-item-count">{{v.val}}</div>
                <div class="report-item-name">{{v.name}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import searchInput from './search-input';
import * as network  from './network.js'
import * as dataHandle  from './dataHandle.js'
import * as dataMaker  from './dataMaker.js'
import data  from "./data.js";
import {mapGetters,mapActions,mapMutations} from 'vuex'

export default {
    data(){
        return {
            reportObj:{}
        }
    },
    components:{
        searchInput,
    },
    created(){
        //写在组件里面的回掉函数链式调用
        // this.reportReview().then((data)=>{
        //     console.log(data)
        //     return this.userInfo()
        // }).then((data)=>{
        //     console.log(data)
        // })
        //调用封装的方法的例子
        // network.getReportReview(this,{timeSign:"1"})
        // .then((res)=>{
        //     dataHandle.handleReport(res)
        //     console.log(dataHandle.handleReport(res))
        //     return network.getUrlList
        // })
        // .then((res)=>{
        //     console.log(res.data)
        // })
        this.init();
    },
    methods:{
        // reportReview(){
        //     return this.$axios.postRequest("/v7/agt/reportReview",{timeSign:"1"})
        // },
        // userInfo(){
        //     return this.$axios.postRequest("/v2/gc/get-cp-type")
        // }
        init(){
            network.reportReview(this,{timeSign:"1"})
            .then((res)=>{
                this.reportObj=dataHandle.fliterAgReport(res);
            })
        }
        
    }
}
</script>
<style lang="scss" scoped>
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';

.report-wapper{
    height: 100%;
    width: 100%;
    background: #F2F2F2;
    position:absolute;
    top:0;
    .report-List{
        flex-wrap:wrap;
        background: #ffffff;
        .report-item{
            flex: 0 0 33%;
            height: 3.3rem;
            box-sizing: border-box;
            font-size: $font-size-medium-x;
            &>div:first-child{
                padding-bottom: 0.3rem;
            }
            .report-item-count{
                color: #CD9E62;
            }
        }
    }
}
</style>
