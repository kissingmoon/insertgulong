<template>
    <div class="report-wapper">
        <search-input @searchEvent="searchEvent" :userName="userName" :placText="placText"></search-input>
        <div class="report-List flex">
            <div class="report-item flex flex-v flex-center" v-for="(v,k) in reportObj" :key="k">
                <div class="report-item-count flex flex-center" >￥{{v.val}}</div>
                <div class="report-item-name">{{v.name}}</div>
            </div>
        </div>
        <select-time v-if="show_time" @setTimeType="setTimeType" :selectOption='selectOption'></select-time>
    </div>
</template>
<script>
import SelectTime from 'base/select-time/select-time';
import searchInput from './search-input';
import * as network  from './network.js'
import * as dataHandle  from './dataHandle.js'
import * as dataMaker  from './dataMaker.js'
import data  from "./data.js";
import {mapGetters,mapActions,mapMutations} from 'vuex'
import {headerConfig} from 'common/js/map';

export default {
    data(){
        return {
            reportObj:{},
            selectOption:{
                itemList:headerConfig['/agency/agencyReport'].filterConfig.name,
                eleClass:"text-center",
                parent:"agency"
            },
            agencyRptParm:{
                timeSign:"1"
            },
            userName:"",
            placText:"下级报表查询"
        }
    },
    components:{
        searchInput,
        SelectTime
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
    computed: {
        ...mapGetters([
            'show_time'
        ])
    },
    methods:{
        // reportReview(){
        //     return this.$axios.postRequest("/v7/agt/reportReview",{timeSign:"1"})
        // },
        // userInfo(){
        //     return this.$axios.postRequest("/v2/gc/get-cp-type")
        // }
        init(){
            
            this.setHeader(dataHandle.setTimeHeader(this,headerConfig,0));
            if(this.$route.query.uID){
                let userId=this.$route.query.uID
                this.userName=userId
                let parm = Object.assign({},{userId},this.agencyRptParm)
                this.setLoadingShow(true); 
                network.getSubDinateReport(this,parm)
                .then((res)=>{
                    this.setLoadingShow(false); 
                    this.reportObj=dataHandle.fliterAgReport(res);
                })
            }else{
                this.setLoadingShow(true); 
                network.reportReview(this,this.agencyRptParm)
                .then((res)=>{
                    this.setLoadingShow(false); 
                    this.reportObj=dataHandle.fliterAgReport(res);
                })
            }
        },
        setTimeType(indx){
            let parm ;
            this.setHeader(dataHandle.setTimeHeader(this,headerConfig,indx));
            this.agencyRptParm.timeSign = indx+1
            if(this.userName){
                let userId=this.userName
                parm = Object.assign({},{userId},this.agencyRptParm)
                this.setLoadingShow(true); 
                network.getSubDinateReport(this,parm)
                .then((res)=>{
                    this.setLoadingShow(false); 
                    this.reportObj=dataHandle.fliterAgReport(res);
                })
            }else{
                parm = this.agencyRptParm
                this.setLoadingShow(true); 
                network.reportReview(this,parm)
                .then((res)=>{
                    this.setLoadingShow(false); 
                    this.reportObj=dataHandle.fliterAgReport(res);
                })
            }
        },
        searchEvent(userName){
            let parm ;
            this.userName=userName
            if(this.userName){
                parm = Object.assign({},{userId:userName},this.agencyRptParm)
                this.setLoadingShow(true); 
                network.getSubDinateReport(this,parm)
                .then((res)=>{
                    this.setLoadingShow(false); 
                    this.reportObj=dataHandle.fliterAgReport(res);
                })
            }else{
                parm = this.agencyRptParm
                this.setLoadingShow(true); 
                 network.reportReview(this,parm)
                .then((res)=>{
                    this.setLoadingShow(false); 
                    this.reportObj=dataHandle.fliterAgReport(res);
                })
            }
            
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

.report-wapper{
    height: 100%;
    width: 100%;
    background: #F2F2F2;
    position:absolute;
    top:0;
    .report-List{
        flex-wrap:wrap;
        background: #ffffff;
        padding: 0.2rem 0 0 5px;
        overflow: auto;
        .report-item{
            flex: 0 0 33%;
            height: 3.3rem;
            box-sizing: border-box;
            font-size: $font-size-medium-x;
            border:1px solid #F2F2F2;
            margin-right: -1px;
            margin-bottom: -1px;
            &>div:first-child{
                padding-bottom: 0.3rem;
            }
            .report-item-count{
                color: #CD9E62;
                width: 100%;
                word-break: break-word;
                padding: 0 0.5rem;
                box-sizing: border-box;
            }
        }
    }
}
</style>
