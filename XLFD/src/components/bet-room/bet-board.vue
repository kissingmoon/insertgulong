<template>
    <BotToTop>
        <div class="wapper">
            <loading v-show="loadingShow" :loadingTip="loadingTip"></loading>
            <div class="top-wapper">
                <div class="lottery-title-content">
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
                    <input type="text" class="amount" v-model.number="betTimes">
                    <div class="explain" @click="showWfExplain">玩法说明</div>
                </div>
                <div class="handle">
                    <div>已选:<span>{{betCount || 0}}</span>注<em>|</em>合计:<span>{{totalMoney || 0}}</span>元</div>
                    <button v-if="!is28OrLhc" class="btn" type="button" v-on:click="betExamine">确认投注</button>
                    <button v-if="is28OrLhc" class="btn" type="button" v-on:click="makeBetOrder">确认投注</button>
                </div>
            </div>
            <!-- 玩法 -->
            <div class="wf" v-if="wfKindShow">
                <wf-kind :data="wfList" :currentWF='wfFlag' @close="hide" @selectWf="changeWf"></wf-kind>
            </div> 
        </div>
    </BotToTop>
</template>
<script>
import BotToTop from 'base/bot-to-top/bot-to-top';
import BetNumber from 'base/bet-number/bet-number-room';
import {getBetNumberByBetGroupList} from 'common/js/BetNumber.js';
import {httpUrl,betUnit} from 'common/js/map';
import LotteryWfDetail from 'common/js/Lottery_wf_detail';
import {BaseVM} from 'common/js/BuyCM';
import WfKind from 'components/lottery/wf-kind-room';
import * as CalcBetCount from 'common/js/CalcBetCountUtil.js';
import {mapMutations,mapActions,mapGetters} from 'vuex';
import Loading from 'base/loading/loading';
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
            zodiac:[],
            currentWf:'',
            wfDetail:"",
            wfFlag:'',
            wfKindShow:false,  //玩法种类
            betCount:"",
            betTimes:2,
            totalMoney:"",
            betNumber:"",
            is28OrLhc:false,
            moneyLackShow:false,
            updataNumberList:[],
            selectObj:{},
            canclick:true,
            loadingShow:false,
            loadingTip:"投注中。。。"
        }
    },
    props: {
        lotteryInfo:{
            type: Object,
            default: {}
        },
        lotteryType:{
            type:String
        }
    },
    components:{
        BetNumber,
        WfKind,
        BotToTop,
        Loading
    },
    created() {
        this.is28OrLhc =this.lotteryType == '6' || this.lotteryType == '11'? true:false ;
        this.getBetWF();
        this.getZodiac();
    },
    watch:{
        betTimes(newVal,oldVal){
            const regex = /^\d*$/;
            if(!regex.test(newVal)) {
                this.betTimes = oldVal ;
            }
            if(this.is28OrLhc){
                // this.selectObj.bet_money=this.betTimes
            }
            this.calculateBetMoney()
        }
    },
    computed:{
        ...mapGetters([
            'user_token',
            'account',
            'xglhc_color'
        ])
    },
    methods:{
        ...mapMutations({
            setTip:'SET_TIP',
        }),
        //  显示玩法规则
        showWfExplain(){
            console.log(this.wfDetail)
            this.$emit('wfExplain',this.wfDetail)
        },
        //确认离开
        closeBoard(){
            // if(this.is28OrLhc && this.updataNumberList.length > 0){
            //     this.show('leaveTipShow');
            // }else{
            //     this.hide('wfKindShow')
            // }
            this.$emit('closeBoard','betKeyboard')
        },
        //  显示玩法选择页面
        show(key){
            this.$emit('showWf','wfKindShow')
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
        //获取12生肖
        getZodiac(){
            this.$axios.postRequest(httpUrl.bet.zodiac)
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    this.zodiac=res.data;
                };
            });
        },
         //六和28投注号码生成
        makeBetOrder(){
            if(!this.user_token){
                this.$router.push({
                    path:'/login'
                });
                return;
            }
            const keyLength=Object.keys(this.selectObj).length;
            const plLength=this.currentWf.wf_pl.length;
            let isTrueNumber=true;
            if(this.updataNumberList.length>=0){
                // 号码判断
                if (this.wfFlag=="xglhc_hexiao_hx" && (keyLength < 2 || keyLength > 11)) {
                    if (keyLength < 2) {
                        this.setTip("最少选择2个号码");
                    } else {
                        this.setTip("最多选择11个号码");
                    }
                    return;
                } else if ((this.wfFlag=="xglhc_lm_2qz" || this.wfFlag=="xglhc_lm_2zt"
                        || this.wfFlag=="xglhc_lm_tc" || this.wfFlag=="xglhc_lxlw_2lx"
                        || this.wfFlag=="xglhc_lxlw_2lw")
                        && keyLength != 2) {
                    this.setTip("请选择2个号码");
                    return;
                } else if ((this.wfFlag=="xglhc_lm_3z2" || this.wfFlag=="xglhc_lm_3qz"
                        || this.wfFlag=="xglhc_lxlw_3lx" || this.wfFlag=="xglhc_lxlw_3lw"
                        || this.wfFlag=="xy28_tmb3_b3")
                        && keyLength != 3) {
                    this.setTip("请选择3个号码");
                    return;
                } else if ((this.wfFlag=="xglhc_lm_4qz" || this.wfFlag=="xglhc_lxlw_4lx"
                        || this.wfFlag=="xglhc_lxlw_4lw")
                        && keyLength != 4) {
                    this.setTip("请选择4个号码");
                    return;
                } else if ((this.wfFlag=="xglhc_lxlw_5lx" || this.wfFlag=="xglhc_lxlw_5lw") && keyLength != 5) {
                    this.setTip("请选择5个号码");
                    return;
                } else if (this.wfFlag=="xglhc_zxbz_zxbz" &&  (keyLength < 6 || keyLength > (5+plLength))) {
                    if (keyLength < 6) {
                        this.setTip("最少选择6个号码");
                    } else {
                        this.setTip(`最多选择${5+plLength}个号码`);
                    }
                    return;
                }else if(keyLength == 0){
                    this.setTip("请选择一组号码");
                    return;
                }
            }else{
                // 号码判断
                if (this.wfFlag=="xglhc_hexiao_hx" && (keyLength < 2 || keyLength > 11)) {
                    isTrueNumber=false;
                } else if ((this.wfFlag=="xglhc_lm_2qz" || this.wfFlag=="xglhc_lm_2zt"
                        || this.wfFlag=="xglhc_lm_tc" || this.wfFlag=="xglhc_lxlw_2lx"
                        || this.wfFlag=="xglhc_lxlw_2lw")
                        && keyLength != 2) {
                    isTrueNumber=false;
                } else if ((this.wfFlag=="xglhc_lm_3z2" || this.wfFlag=="xglhc_lm_3qz"
                        || this.wfFlag=="xglhc_lxlw_3lx" || this.wfFlag=="xglhc_lxlw_3lw"
                        || this.wfFlag=="xy28_tmb3_b3")
                        && keyLength != 3) {
                    isTrueNumber=false;
                } else if ((this.wfFlag=="xglhc_lm_4qz" || this.wfFlag=="xglhc_lxlw_4lx"
                        || this.wfFlag=="xglhc_lxlw_4lw")
                        && keyLength != 4) {
                    isTrueNumber=false;
                } else if ((this.wfFlag=="xglhc_lxlw_5lx" || this.wfFlag=="xglhc_lxlw_5lw") && keyLength != 5) {
                    isTrueNumber=false;
                } else if (this.wfFlag=="xglhc_zxbz_zxbz" &&  (keyLength < 6 || keyLength > (5+plLength))) {
                    isTrueNumber=false;
                }else if(keyLength == 0){
                    isTrueNumber=false;
                }
            }
            if(isTrueNumber){
                this.setTotal(keyLength-2)
                switch(this.wfFlag){                        
                    case "xglhc_lm_3z2":case "xglhc_lm_2zt":case "xglhc_lm_3qz":case "xglhc_lm_2qz":
                    case "xglhc_lm_tc":case "xglhc_lm_4qz":case "xglhc_zxbz_zxbz":case "xglhc_hexiao_hx":case "xy28_tmb3_b3":
                    case "xglhc_lxlw_2lx":case "xglhc_lxlw_3lx":case "xglhc_lxlw_4lx":case "xglhc_lxlw_5lx":
                    case "xglhc_lxlw_2lw":case "xglhc_lxlw_3lw":case "xglhc_lxlw_4lw":case "xglhc_lxlw_5lw":
                        const obj={
                            wf_flag:this.currentWf.wf_flag,
                            wf_name:this.currentWf.name,
                            bet_money:'',
                            number_str:'',
                            pl_flag:''
                        }
                        const arr = [];
                        for ( var key in this.selectObj){
                            this.selectObj[key].bet_money=this.betTimes;
                            obj.pl_flag=this.totalPlFlag;
                            arr.push(this.selectObj[key].number_str);
                        };
                        obj.bet_money=this.betTimes;
                        obj.number_str= this.wfFlag == "xglhc_hexiao_hx"? arr.sort().join(''):arr.sort().join(',')
                        obj.pl=this.totalOdds;
                        this.updataNumberList.push(obj);
                        break;
                    default:
                        for ( var key in this.selectObj){
                            this.selectObj[key].bet_money=this.betTimes;
                            this.updataNumberList.push(this.selectObj[key]);
                        };
                        break;
                };
                this.bet()
            }
            // this.show('betOrderListShow');
            // this.allClear();
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
        // 判断余额是否足够
        judgeLackMoney(){
            if(parseFloat(this.totalMoney) > parseFloat(this.account.balance)){
                this.show('moneyLackShow');
                return false;
            }else{
                return true;
            }
        },
        betExamine(){
            if(!this.user_token){
                this.$router.push({
                    path:'/login'
                });
                return;
            }
            if(this.betCount > 0){
                const judge = this.judgeLackMoney();
                if(judge){
                    this.betOrder()
                }else{
                    this.$emit('moneyLackShow',true)
                    // this.setTip("金额不足~")
                }
            }else{
                this.setTip("请选择一组号码")
            }
        },
        //投注
        betOrder(){    
            console.log(parseInt(this.betTimes))
            if(parseInt(this.betTimes)<=0){
                this.setTip('请输入投注金额！')
                return;
            }   
            // this.canclick=false
            const param={
                // lottery_id:this.lotteryId,
                lottery_id:this.lotteryInfo.lottery_id,
                lottery_qh:this.lotteryInfo.lottery_qh,
                wf_flag:this.wfFlag,
                bet_number:this.betNumber,
                by_money:this.betTimes,
                bet_count:this.betCount,
                // lottery_modes:this.lotteryModes
                lottery_modes:0
            }
            this.show('loadingShow')
            this.$axios.postRequest(httpUrl.bet.betOrder,param)
            .then((res)=> {
                // this.canclick=true
                this.hide('loadingShow');
                if(res.data && !res.data.errorCode){
                    // this.allClear();
                    // this.getUser()
                    //this.hide('betAffirmShow');
                    //this.show('betSuccessShow');
                    this.setTip('投注成功！')
                    param.lotteryType=this.lotteryType
                    this.$emit('sendSocketMsg',param)
                    this.closeBoard()
                    this.setTip('投注成功')
                };
            })
            .catch((err) => {
                this.hide('loadingShow');
            });
        },
        //六和28投注
        bet(){
            for(let item of this.updataNumberList){
                if(!item.bet_money){
                    this.setTip('请输入投注金额！')
                    return;
                }
            }
            //this.canclick=false
            var bet_number='';
            var count_money='';
            var wf_flag='';
            var pl_flag='';
            this.updataNumberList.forEach((item,i) => {
                bet_number += item.number_str;
                count_money += item.bet_money;
                wf_flag += item.wf_flag;
                pl_flag += item.pl_flag;
                if(i != this.updataNumberList.length-1){
                    bet_number +=  "#";
                    count_money +=  "#";
                    wf_flag +=  "#";
                    pl_flag +=  "#";
                }
            });
            var param={
                lottery_id:this.lotteryInfo.lottery_id,
                lottery_qh:this.lotteryInfo.lottery_qh,
                bet_number,
                count_money,
                wf_flag,
                pl_flag
            };
            this.loadingShow=true;
            this.$axios.postRequest(httpUrl.bet.betLHC28,param)
            .then((res)=> {
                this.canclick=true
                this.loadingShow=false;
                if(res.data && !res.data.errorCode){
                    // param.lottery_modes=0//元
                    // param.by_money=2
                    // param.bet_count=1
                    param.lottery_type=this.lotteryType
                    param.wfDetail={}
                    param.wfDetail.title=this.currentWf.name
                    param.wfDetail.wf_flag=this.currentWf.wf_flag
                    this.setTip('投注成功！')
                    this.$emit('sendSocketMsg',param)
                    this.closeBoard()
                };
            })
            .catch((err) => {
                this.loadingShow=false;
            });
        },
        recount(){
            this.betNumber=getBetNumberByBetGroupList(this.selectNumList,this.wfFlag,this.selectPosition);
            if(this.is28OrLhc){
                var  funName= this.wfFlag;
                if(this.wfFlag=="xy28_tmb3_b3"){
                    
                    if(this.selectNumList[0].length < 3  ){
                           this.betCount=0;
                        }else if(this.selectNumList[0].length >3 ){
                            this.setTip("请选择3个号码")
                        }
                        else{
                        // this.betCount=CalcBetCount[funName](this.betNumber);
                        this.betCount=1;
                    }
                }else if(this.wfFlag == 'xglhc_lm_tc'){
                    if(this.betNumber.length >= 4){
                        this.betCount = this.betNumber.length/2-1;
                    }else{
                        this.betCount = 0;
                    }                    
                }else if(this.wfFlag == 'xglhc_lxlw_5lw' || this.wfFlag == 'xglhc_lxlw_4lw' || this.wfFlag == 'xglhc_lxlw_3lw' || this.wfFlag == 'xglhc_lxlw_2lw' 
                             || this.wfFlag == 'xglhc_lxlw_5lx' || this.wfFlag == 'xglhc_lxlw_4lx' || this.wfFlag == 'xglhc_lxlw_3lx' || this.wfFlag == 'xglhc_lxlw_2lx'
                             || this.wfFlag == 'xglhc_lm_3z2' || this.wfFlag == 'xglhc_lm_3qz' || this.wfFlag == 'xglhc_lm_2qz' || this.wfFlag == 'xglhc_lm_2zt' 
                             || this.wfFlag == 'xglhc_lm_4qz'  ){
                    // this.betCount=CalcBetCount[funName](this.selectNumList[0]); 
                    this.betCount = CalcBetCount.getZhuShu(funName,this.selectNumList[0])
                }else if( this.wfFlag == 'xglhc_hexiao_hx' ){      //   合肖玩法设置
                    let len = this.selectNumList[0].length;
                    this.betCount = len > 1 ? 1 : 0
                }else if( this.wfFlag == 'xglhc_zxbz_zxbz' ){      //   自选不中玩法设置
                    let len = this.selectNumList[0].length;
                    this.betCount = len > 5 ? 1 : 0
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
            this.calculateBetMoney()
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
        calculateBetMoney(){
            let money=this.betTimes*this.betCount;
            this.totalMoney = money.toFixed(2);
        },
        show(key){
            this[key]=true;
        },
        // 隐藏
        hide(key){
            this[key]=false;
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';

.wapper{
    display: flex;
    overflow: hidden;
    flex-direction: column;
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
    .main-wapper{
        min-height: 57vh;
        flex: auto;
        overflow-y: auto;
    }
    .bet-content{
        font-size: 0.4rem;
        padding: 0 .3rem;
        .inputBox{
            display: flex;            
            border: 1px solid #d9d9d9;
            border-radius: .1rem;
            .amount{
                flex: auto;
                height: .8rem;
                line-height: .3rem;
                margin-left: .2rem;
            }
            .explain{
                color: #DA1C36 ;
                margin-right: .3rem;
                line-height: .8rem;
            }
        }
        .handle{
            display: flex;
            margin: .2rem 0 .1rem;
            >div{
                flex: auto;
                font-size: .34rem;
                line-height: .8rem;
                color: #959595;
                span{
                    color: #DA1C36 ;
                }
                em{
                    font-style: normal;
                    margin: 0 .1rem;
                }
            }
            .btn{
                width: 2.6rem;
                height: .8rem;
                color: #fff;
                font-size: .4rem;
                line-height: .8rem;
                border-radius: .1rem;
                background-color: #3CDA93;
            }
        }
        
    }
    .bet-content:last-child{
        padding: 0rem 0.5rem 0.1rem 0.5rem;
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
