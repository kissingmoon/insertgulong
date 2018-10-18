<template>
    <parcel>
        <div class="wapper">
            <div class="top-wapper">
                <!-- <p class="txt" @click="show('wfKindShow')">
                    <span class="kind">玩<br>法</span>
                    {{currentWf.name}}
                    <i class="angle"></i>
                </p> -->
                <div class="lottery-title-content">
                    <!-- <div class="back" @click="closeBoard"><i class="icon-arrows-left"></i></div> -->
                    <h1 class="title">
                        <p class="txt" @click="show('wfKindShow')">
                            <span class="kind">玩<br>法</span>
                            {{currentWf.name}}
                            <i class="angle"></i>
                        </p>
                    </h1>
                </div>
            </div>
            <div class="main-wapper">
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
            </div>
            <div class="bet-content">
                <div class="inputBox">
                    <input type="number" class="amount" v-model="amount">
                    <div class="explain">赔率说明</div>
                </div>
                <div class="handle">
                    <div>已投注：<span>9</span>注 <em>|</em> 合计：<span>9</span>元</div>
                    <button class="btn" type="button">确认投注</button>
                </div>
            </div>
            <!-- 玩法 -->
            <div class="wf" v-if="wfKindShow">
                <wf-kind :data="wfList" :currentWF='wfFlag' @close="hide" @selectWf="changeWf"></wf-kind>
            </div>        
        </div>
        <div class="main-wapper">
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
        </div>
        <div class="bet-content flex flex-align-center flex-pack-justify">
            <div>已选择</div>
            <div class="bet-button flex flex-center">确认投注</div>
        </div>
        <!-- 玩法 -->
        <div class="wf" v-if="wfKindShow">
            <wf-kind :data="wfList" :currentWF='wfFlag' @close="hide" @selectWf="changeWf"></wf-kind>
        </div>        
    </div>
</template>
<script>
import Parcel from 'base/parcel/parcel';
import BetNumber from 'base/bet-number/bet-number-room';
import {getBetNumberByBetGroupList} from 'common/js/BetNumber.js';
import {httpUrl,betUnit} from 'common/js/map';
import LotteryWfDetail from 'common/js/Lottery_wf_detail';
import {BaseVM} from 'common/js/BuyCM';
import WfKind from 'components/lottery/wf-kind-room';

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
            wfDetail:"",
            wfFlag:'',
            wfKindShow:false,  //玩法种类
            amount:1,
        }
    },
    components:{
        BetNumber,
        WfKind,
        Parcel
    },
    created() {
            this.getBetWF();
        },
    methods:{
        //确认离开
        closeBoard(){
            // if(this.is28OrLhc && this.updataNumberList.length > 0){
            //     this.show('leaveTipShow');
            // }else{
            //     this.hide('wfKindShow')
            // }
            this.$emit('closeBoard','betKeyboard')
        },
        show(key){
            this[key]=true;
        },
        // 隐藏
        hide(key){
            this[key]=false;
        },
        //修改玩法
        changeWf(i,s){
            this.betCount = 0;
            this.currentWf=this.wfList[i].wf[s];
            this.wfFlag=this.wfList[i].wf[s].wf_flag;
            // console.log(this.wfFlag)
            // this.$emit('getWFflag',this.wfFlag)
            this.makeWfParam();
            this.hide('wfKindShow');
        },
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
            console.log(this.selectNumList)
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
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.wapper{
    .top-wapper{
        .lottery-title-content{
            position:relative;
            height:1.2rem;
            line-height: 1.2rem;
            text-align: center;
            color:#fff;
            background: #DA1C36;            
            .back{
                position:absolute;
                height:1.2rem;
                line-height: 1.4rem;
                padding: 0 0.5rem 0 0.3rem;
                font-size: 0.52rem;
                font-size: $font-size-large-x;
            }
            .time-money-wrapper{
                position:absolute;
                height:1.2rem;
                line-height: 1.35rem;
                right:0;
                font-size:$font-size-small;
                padding-right: 0.4rem;
                color:#fff;
                .rule{
                    float:right;
                    height:0.9rem;
                    padding-top:0.3rem;
                    padding-right: 0.39rem;
                    padding-left: 0.2rem;
                    width:0.5rem;
                    line-height: 0.32rem;
                    @include bg-image('icon-wf-rule');
                    background-repeat: no-repeat;
                    background-size:0.4rem;
                    background-position: right center;
                }
                .kind{
                    float:right;
                    width:0.5rem;
                    height:0.9rem;
                    padding-top:0.3rem;
                    padding-right: 0.47rem;
                    padding-left: 0.2rem;
                    line-height: 0.32rem;
                    @include bg-image('icon-wf-kind');
                    background-repeat: no-repeat;
                    background-size: 0.5rem;
                    background-position: right center;
                }
            }
            .title{
                display: inline-block;
                height:1.2rem;
                line-height: 1.2rem;
                vertical-align: top;
                padding: 0 2.4rem;
                font-size: $font-size-large;
                @include no-wrap();
                text-align: center;
                .txt{
                    position: relative;
                    display: inline-block;
                    font-size:.4rem;
                    padding:0 0.6rem 0 .2rem;
                    height: 0.66rem;
                    line-height: 0.66rem;
                    border:1px solid #fff;
                    border-radius: 0.1rem;
                    align-items: center;
                    .kind{
                        position: absolute;
                        left:-0.5rem;
                        height:0.66rem;
                        line-height: 0.33rem;
                        font-size: $font-size-small;
                    }
                    .angle{
                        display: block;
                        width: 0;
                        height: 0;
                        border-width: .22rem .22rem .22rem .22rem;
                        border-style: solid;
                        border-color: transparent transparent transparent #fff;
                        position: absolute;
                        bottom: -.1rem;
                        right: -.1rem;
                        transform: rotate(45deg)
                    }
                }
            }
        }
    }
    .main-wapper{}
    .bet-content{
        height: 2rem;
        font-size: 0.4rem;
        padding: 0 .3rem;
        .inputBox{
            display: flex;            
            border: 1px solid #d9d9d9;
            border-radius: .1rem;
            .amount{
                flex: auto;
                height: 1rem;
                line-height: .4rem;
                margin-left: .2rem;
            }
            .explain{
                color: #DA1C36 ;
                margin-right: .3rem;
                line-height: 1rem;
            }
        }
        .handle{
            display: flex;
            margin: .3rem 0 .2rem;
            >div{
                flex: auto;
                line-height: 1rem;
                color: #959595;
                span{
                    color: #DA1C36 ;
                }
                em{
                    margin: 0 .1rem;
                }
            }
            .btn{
                width: 2.8rem;
                height: 1rem;
                color: #fff;
                line-height: 1rem;
                border-radius: .1rem;
                background-color: #3CDA93;
            }
        }
        
    }
    .wf{
        position: absolute;
        width: 100%;
        top: 0rem;
        bottom: 0rem;
        z-index: 503;
        background-color: #fff;
    }
}
</style>
