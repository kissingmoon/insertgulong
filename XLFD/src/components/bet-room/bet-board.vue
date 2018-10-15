<template>
    <div>
        <bet-number 
            ref="betnumberlist"
            :numList="numberList"
            :selectNumList="selectNumList"
            :selectPosition="selectPosition"
            @selectNum="selectNum"
            @selectPosi="selectPosi"
            @selectKind="selectKind"
            >
        </bet-number>
        <div class="bet-content">
            投注
        </div>
    </div>
</template>
<script>
import BetNumber from 'base/bet-number/bet-number';
import {getBetNumberByBetGroupList} from 'common/js/BetNumber.js';
import {httpUrl,betUnit} from 'common/js/map';
import LotteryWfDetail from 'common/js/Lottery_wf_detail';
import {BaseVM} from 'common/js/BuyCM';

export default {
    data(){
        return {
            numberList:[],
            selectNumList:[],
            selectPosition:[],
            tacitWf:{
                    '1':'ssc_5xdwd',
                    '3':'11x5_1m_q1zhix',
                    '6':'xglhc_tema_xuma',
                    '9':'k3_hz_hz',
                    //'10':'pk10_cq1_d1',
                    '10':'pk10_gp_dwd_child',
                    '11':'xy28_qthh_hh'
            },
            wfList:[],
            currentWf:'',
            wfDetail:""
        }
    },
    components:{
        BetNumber
    },
    created() {
            this.getBetWF();
        },
    methods:{
        //选择号码
        selectNum(p,i,num){
            const index=this.selectNumList[p].indexOf(num);
            if(index != -1){
                this.selectNumList[p].splice(index,1);
                if(this.is28OrLhc){
                    delete this.selectObj[num];
                }
            }else{
                this.selectNumList[p].push(num);                    
                if(this.is28OrLhc){
                    this.selectObj[num]=this.numberList[0].buyNumberBeanList[i];
                }
            }
            this.changeTotal();
        },
        //选择位置
        selectPosi(num){
            const index=this.selectPosition.indexOf(num);
            if(index != -1){
                this.selectPosition.splice(index,1);
            }else{
                this.selectPosition.push(num);
            }
        },
        selectKind(p,arr){
            this.selectNumList.splice(p,1,arr);
        },
        getBetWF(){
            const api=this.is28OrLhc ? httpUrl.bet.lotteryWfLHC : httpUrl.bet.lotteryWf;
            this.$axios.postRequest(api,{lottery_id:this.$route.query.id})
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    this.wfList=res.data;
                    this.selectTacitWf();
                    this.makeWfParam();
                };
            });
        },
        selectTacitWf(){
            let tacitWf=this.tacitWf[this.lotteryType];
            this.wfList.forEach((item,i) => {
                item.wf.forEach((sub,s)=>{
                    if( sub.wf_flag == tacitWf ){
                        this.currentWf=this.wfList[i].wf[s];
                        return false;
                    }
                });
            });
            if(Object.keys(this.currentWf).length == 0 && this.wfList.length > 0){
                this.currentWf=this.wfList[0].wf[0];
            }
            this.wfFlag=this.currentWf.wf_flag;
        },
        //生成号码
            makeWfParam(){
                const lottery=this.wfFlag.split('_')[0];
                this.selectNumList=[];
                this.selectPosition=[];
                this.selectObj={};
                if(!this.is28OrLhc){
                    this.wfDetail=LotteryWfDetail[lottery].wf_class[this.wfFlag];
                }
                this.wfDetail=Object.assign({},this.wfDetail,this.currentWf);
                this.numberList=[];
                if(this.is28OrLhc){
                    const detail=BaseVM(this.wfDetail,0,true,this.zodiac);
                    this.numberList.push(detail);
                    this.selectNumList.push([]);
                }else{
                    this.wfDetail.param.titles.forEach((item,i) => {
                        const detail=BaseVM(this.wfDetail,i);
                        detail.title=item;
                        detail.title11="item";
                        this.numberList.push(detail);
                        this.selectNumList.push([]);
                    });
                }
                if(this.numberList[0].wfBean.wf_flag == '11x5_qwx_dds'){
                    this.numberList[0].isShowOdds = false;
                }else{
                    this.isShowOdds=this.numberList[0].isShowOdds;
                }
                
                this.setTotal();
                this.watchInit();
            },
            //设置组合赔率
            setTotal(index){//  totalOdds
                switch(this.wfFlag){
                    case "xglhc_lm_3z2":case "xglhc_lm_2zt":
                        this.totalOdds=this.currentWf.wf_pl[0].award_money+','+this.currentWf.wf_pl[1].award_money;
                        this.totalPlFlag=this.currentWf.wf_pl[0].pl_flag;
                        break;
                    case "xglhc_hexiao_hx":
                        if(index){
                            this.totalOdds=this.currentWf.wf_pl[index].award_money;
                            this.totalPlFlag=this.currentWf.wf_pl[index].pl_flag;
                        }else{
                            this.totalOdds=this.currentWf.wf_pl[0].award_money;
                            this.totalPlFlag=this.currentWf.wf_pl[0].pl_flag;
                        }
                        break;
                    case "xglhc_lm_3qz":case "xglhc_lm_2qz":case "xglhc_lm_tc":case "xglhc_lm_4qz":case "xy28_tmb3_b3":case "xglhc_zxbz_zxbz":
                    
                    case "xglhc_lxlw_2lx":case "xglhc_lxlw_3lx":case "xglhc_lxlw_4lx":case "xglhc_lxlw_5lx":
                    case "xglhc_lxlw_2lw":case "xglhc_lxlw_3lw":case "xglhc_lxlw_4lw":case "xglhc_lxlw_5lw":
                        this.totalOdds=this.currentWf.wf_pl[0].award_money;
                        this.totalPlFlag=this.currentWf.wf_pl[0].pl_flag;
                        break;
                    default:
                        this.totalOdds='';
                        this.totalPlFlag='';
                    break;
                };
            },
            //修改组合赔率
            changeTotal(){
                switch(this.wfFlag){
                    case "xglhc_zxbz_zxbz":
                        const n=this.selectNumList[0].length-6;
                        if(n >= 0 && n <= 5){
                            this.totalOdds=this.currentWf.wf_pl[n].award_money;
                            this.totalPlFlag=this.currentWf.wf_pl[n].pl_flag;
                        }else{
                            this.totalOdds='';
                            this.totalPlFlag='';
                        }
                        break;
                    case "xglhc_hexiao_hx":
                        const m=this.selectNumList[0].length-2;
                        if(m >= 0 && m <= 9){
                            this.totalOdds=this.currentWf.wf_pl[m].award_money;
                            this.totalPlFlag=this.currentWf.wf_pl[m].pl_flag;
                        }else{
                            this.totalOdds='';
                            this.totalPlFlag='';
                        }
                        break;
                }
            },
            watchInit(){
                const _this=this;                
                this.$watch('selectNumList',(newVal,oldVal) => {
                    this.hasSelect=false;
                    newVal.map((v,k)=>{
                       if(v.length!=0){
                            this.hasSelect=true;
                       }
                    })
                    this.recount();
                });
                this.$watch('selectPosition',() => {
                    this.recount();
                });
                this.$watch('commissionCopy',(newVal,oldVal) => {
                    const regex = /^\d*$/;
                    if(!regex.test(newVal)) {
                        this.commissionCopy = oldVal ;
                    }
                    if(this.commissionCopy > 10){
                        this.commissionCopy =10;
                    }
                    this.gdParam.commission = this.commissionCopy;
                });
                this.$watch('backRateCopy',(newVal,oldVal) => {
                    const regex = /^\d*$/;
                    if(!regex.test(newVal)) {
                        this.backRateCopy = oldVal;
                    }
                    if(this.backRateCopy > 100){
                        this.backRateCopy =100;
                    }
                    this.gdParam.back_rate = this.backRateCopy;
                });
            },
            recount(){
                this.betNumber=getBetNumberByBetGroupList(this.selectNumList,this.wfFlag,this.selectPosition);
                if(this.is28OrLhc){
                    if(this.wfFlag=="xy28_tmb3_b3"){
                        const funName= this.wfFlag;
                        if(this.betNumber.length == 3){
                            this.betCount = 1;
                        }
                        // this.betCount=CalcBetCount[funName](this.betNumber);
                    }else if(this.wfFlag == 'xglhc_lm_tc'){
                        if(this.betNumber.length >= 4){
                            this.betCount = this.betNumber.length/2-1;
                        }else{
                            this.betCount = 0;
                        }
                        
                    }
                    else{
                        this.betCount=this.selectNumList[0].length;
                    }
                }else{
                    const funName= this.lotteryType == 3 ? "m"+this.wfFlag : this.wfFlag;
                    try{
                        this.betCount=CalcBetCount[funName](this.betNumber);
                    }
                    catch(err){
                        this.betCount=0;
                    }
                }
            }
    }
}
</script>
<style lang="scss" scoped>
    .bet-content{
        height: 2rem;
        font-size: 0.4rem;
    }
</style>
