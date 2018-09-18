<template>
<div class="newpay"> 
    <!-- <scroll class="scroll-content"> -->
        
        <router-view></router-view>
        <!-- 数字键盘 -->
        <number-keyboard
                :keyboardShow="keyboardShow"
                 :keyboardType=1
                 :lotteryModes=0
                 @close="showKeyboard(false)"
                 @changeKeyNumber="changeKeyNumber"
                 :oldVal="keyInitVal"
                 :varName="keyName"
        >
        </number-keyboard>
        <div class="div-content">
            <loading v-if="loading&&uId"></loading>
            <div class="model flex flex-center" v-if="showModel">
                <div class="dialog">
                    <p><img src="./loading.gif" alt=""></p>
                    <p>正在跳转中...<br/>请在弹出的页面上完成充值</p>
                </div>
                
                <!-- <div model-content>
                    <p  flex flex-center>正在跳转中...</p>
                    <p flex flex-center>请在弹出的页面上完成充值</p>
                </div> -->
            </div>
            <div v-show="!uId" class="login-tip-wrapper">
                <div class="login-tip">
                    <div class="img">
                    </div>
                    <router-link tag="div" to="/login" class="btn">
                        请登录后进行充值
                    </router-link>
                </div>
            </div>
        <div v-if='mainshow&&uId' class="paywapper flex flex-v ">
            <div class="topbutton flex">
                <div class="orderbutton flex flex-center flex-1" v-for="(value,index) in incomeList" :key="index" v-on:click="disablechooseType&&chooseType(index,value,'incomType')" :class="{active:index==incomType}">{{value.type_name}}<i :style="backImg[index]"></i></div>
            </div>
            <div class="paytype flex">
                <div class="paytypebtn flex flex-center" v-for="(value,index) in payTypeList" :key="index" v-on:click="choosePay(index,value,'payType')" :class="{active:index==payType}">{{value.type_name}}</div>
            </div>
            <div v-if="choosenIncome==0" class="paymoney flex flex-v">
                <div class="paymoneydiv flex">
                    <div class="flex flex-center flex-1">充值金额</div>
                    <div class="flex flex-3 flex-align-start">
                        <input class="flex flex-5" oninput="this.value=this.value.replace(/[^0-9.]+/,'')" :placeholder="fanwei" v-model="onlineMoney" @click="showKeyboard(true,'onlineMoney')"><div class="flex flex-1 zero flex-center">.00</div>
                    </div>
                </div>
                <div class="paymoneydiv flex">
                    <div class="flex flex-center flex-1"></div>
                    <div class="flex flex-align-start flex-3 flex-v">
                        <div style="color:#ffae5e;font-size:0.4rem;">为了更快速到账，存款时，自动生成.00元</div>
                    </div>
                </div>
            </div>
            <div v-if="choosenIncome==0" class="typetitle flex flex-align-center">
                <div style="border:1px solid red;height:0.4rem;margin-right:7px;"></div>选择支付类型
            </div>
            <div  v-if="choosenIncome==0" class="chargetype flex flex-v">
                <div v-for="(value,index) in onlineTypeList.typeDetail" :key="index"   class="chargeList flex  flex flex-v" @click='chooseonline(value,index)'>
                    <div class="chargeList1 flex">
                        <div class="flex flex-1 flex-center"><img :src="value.gate_img" alt=""></div>
                        <div class="flex flex-4 flex-align-center">{{value.gate_name}}</div>
                        <div class="flex flex-1 flex-center">
                            <i v-if="showYes==index" class="yo-icon icon-radio-yes"></i>
                            <i v-if="showYes!=index" class="yo-icon icon-radio-no"></i>
                        </div>
                    </div>
                    <div class="flex" >
                        <div class="flex flex-1 flex-center"></div>
                        <div class="flex flex-4 flex-align-center"> (若充值失败请使用公司入款额外赠送1%)</div>
                        <div class="flex flex-1 flex-center"></div>                  
                    </div>
                </div>
                <div class="chargeList flex  flex flex-v">
                    <div class="chargeList1 flex" @click="chooseType(1,payTypeList[1],'incomType')">
                        <div class="flex flex-1 flex-center"><img src="./images/other.png" alt=""></div>
                        <div class="flex flex-4 flex-align-center">其他方式大额转账</div>
                        <div class="flex flex-1 flex-center"><i class="yo-icon icon-arrows-rightt" ></i></div>
                    </div>
                </div>
            </div>
            <div v-if="choosenIncome==0" class="confirmdiv flex flex-center flex-v">
                <div   class="confirmbtn flex flex-center" @click="onlineSubmit">确认</div>
                
            </div>
            <div v-if="choosenIncome==1" class="companypay flex flex-v">
                <div  class="typetitle flex flex-align-center">
                    <div v-if="choosenIncome==1&&compstep!=4" style="border:1px solid red;height:0.4rem;margin-right:7px;"></div>{{stepTitle}}
                </div>
                <div v-if="choosenIncome==1&&compstep==1" class="flex flex-v flex-align-center">
                    <div class="comppaydiv flex">
                        <div class="flex flex-2 flex-center"><i style="color:red;font-size:0.5rem;width:15px;height:15px;">*</i>充值金额</div>
                        <div class="flex flex-5 flex-align-center"><input oninput="this.value=this.value.replace(/[^0-9.]+/,'')" :placeholder="fanwei" v-model="chargeObj.chargeNum" type="text"  @click="showKeyboard(true,'chargeNum')" ></div>           
                    </div>
                    <div class="comppaydiv flex">
                        <div class="flex flex-2 flex-center"><i style="color:red;font-size:0.5rem;width:15px;height:15px;">*</i>汇款姓名</div>
                        <div class="flex flex-5 flex-align-center"><input v-model="chargeObj.chargename" type="text"></div>
                    </div>
                    <div class="comppaydiv flex">
                        <div class="flex flex-2 flex-center"><i style="width:15px;height:15px;"></i>汇款留言</div>
                        <div class="flex flex-5 flex-align-center"><input v-model="chargeObj.chargeinfo" type="text"></div>
                    </div>
                </div>
                <div v-if="choosenIncome==1&&compstep==2" class="flex flex-v flex-align-center">
                    <div v-for="(v,k) in compayList" :key="k" class="flex flex-v banklist " @click="chooseComp(v,k,'companyType')" :class="{bankactive:k==companyType}">
                        <div class="flex flex-align-center">{{v.type_name}}</div>
                        <div class="flex flex-align-center">收款名称：{{v.sk_people}}</div>
                        <div class="flex flex-align-center" style="position: relative;">收款账号：{{v.account_no}}<i v-if="showCYes==k" style="position: absolute;right: 10px;top:-15px;" class="yo-icon icon-radio-yes"></i>
                            <i v-if="showCYes!=k" style="position: absolute;right: 10px;top:-15px;" class="yo-icon icon-radio-no"></i></div>
                        <div class="flex flex-align-center">开户网点：{{v.account_kh_address}}</div>
                    </div>
                    
                </div>
                <div v-if="choosenIncome==1&&compstep==3" class="flex flex-v bankinfo flex-align-center">
                    <div class="flex flex-align-center" style="color:red">您本次入款信息:</div>
                    <div class="flex flex-align-center">会员账号:{{uId}}</div>
                    <div class="flex flex-align-center">存款金额:{{chargeObj.chargeNum}}</div>
                    <div class="flex flex-align-center">昵称/姓名:{{chargeObj.chargename}}</div>
                    <div class="flex flex-align-center">汇款留言:{{chargeObj.chargeinfo}}</div>
                    <div class="flex flex-align-center" style="color:red">请往以下收款信息付款您要充值的金额:</div>
                    <div class="flex flex-align-center">收款账号:{{choosenCompay.account_no}}</div>
                    <div class="flex flex-align-center">收款名称:{{choosenCompay.sk_people}}</div>
                    <div class="flex flex-align-center" style="color:red">注:请成功付款后再点击【我已付款】</div>
                </div>
                <div class="companybtns flex flex-align-center flex-1">
                    <div v-if="choosenIncome==1&&compstep==3" class="confirmcompany flex flex-1">
                        <div class="flex flex-center flex-1" @click="setStep(2)" >上一步</div>
                        <div class="flex flex-center flex-1 active" @click="companySubmit" >我已付款</div>
                    </div>
                    <div v-if="choosenIncome==1&&compstep==2" class="confirmcompany flex flex-1" >

                        <div class="flex flex-center flex-1" @click="setStep(1)" >上一步</div>
                        <div class="flex flex-center flex-1 active" @click="setStep(3)">下一步</div>
                    </div>
                    <div v-if="choosenIncome==1&&compstep==1" class="confirmcompany flex flex-1" >

                        <div class="flex flex-center flex-1 active" style=" border-radius:40px;" @click="setStep(2)">下一步</div>
                    </div>
                </div>
                
            </div>
        </div> 
        <m-iframe class="paywapper" v-if='!mainshow&&uId' :loadingTip="loadingTip" :url="url"></m-iframe>
        </div>
    <!-- </scroll> -->
</div>
</template>
<script>
import {httpUrl} from 'common/js/map';
import {mapMutations,mapActions,mapGetters} from 'vuex';
import axios from 'axios';
import MIframe from 'base/m-iframe/m-iframe';
import scroll from 'base/scroll/scroll';
import loading from 'base/loading/loading';
import {session} from 'common/js/param';
import numberKeyboard from 'base/number-keyboard/number-keyboard';
import store from 'store';

export default {
    data(){
        return {
            keyboardShow:false,
            keyInitVal:'',
            keyName:'online',
            disablechooseType:false,
            disableonlineSubmit:true,
            disablecompySubmit:true,
            totalpayTypeList:[],
            loading:false,
            mainshow:true,
            companypay:false,
            isActive:true,
            incomType:0,
            payType:0,
            companyType:0,            
            payTypeList:[],
            onlineTypeList:[],
            choosenIncome:0,
            fanwei:"",
            incomeList:[
                {type_name: "在线支付", minMoney: 100, type_flag: 0, maxMoney: 9999},
                {type_name: "公司入款(入款赠送1%)", minMoney: 10, type_flag: 1, maxMoney: 9999}              
            ],
            totalgateflagList:[],
            gateflagList:[],
            compstep:1,
            backImg:[
                {background:'url(' + require('./images/kuai.png') + ') no-repeat',backgroundSize:"100% 100%"},
                {background:'url(' + require('./images/song.png') + ') no-repeat',backgroundSize:"100% 100%"}
            ],
            totalTitle:["第1步：填写您的转账资料，提交成功后等待审核通过","第2步：请给以下账号汇款转账","第3步：确认汇款信息"],        
            stepTitle:"",
            chargeObj:{
                chargeNum:null,
                chargename:null,
                chargeinfo:null
            },
           compayList:[],
           choosenCompay:{},
           submitParms:{
               userId: '',
                money: 0,
                payType: 0,
                gateFlag: 0,
                tradeAccountId: 0,
           },
           onlineMoney:null,
           url:"",
           showYes:0,
           showCYes:0,
           comppayParms:{
                userId: "",
                money: '',
                payUser: '',
                payRemark: '',
                payId: '',
           },
           uId:"",
           jumpConfig:"",
           loadingTip:"前往充值页面中,请不要离开。。。",
           showModel:false
        }
    },
    components:{
            MIframe,
            scroll,
            loading,
            numberKeyboard
        },
    created(){
        
            this.init() 
    },
    watch:{
        compstep(newvalue,oldvalue){
            this.stepTitle=this.totalTitle[newvalue-1]
        }
    },
    computed: {
            ...mapGetters([
                'account'
            ])
    },
    methods: {
        showKeyboard(flag,type){
            document.activeElement.blur() 
            if(flag){
                this.keyName=type;
            }
            this.keyboardShow=flag;  
           
            
        },
        changeKeyNumber(key,val){
                this[key] = val;
                if(key=='chargeNum'){
                    this.chargeObj.chargeNum=val
                }
                this.showKeyboard(false);
            },
        activeClass:function(index,value,type){
                switch(type){
                    case 'payType':   this.payType=index;break;
                    case 'incomType': this.incomType=index;break;
                    case 'companyType': this.companyType=index;break;
                }
           },
        ...mapMutations({
            setTip:'SET_TIP'
        }),
        init(){
            this.uId=this.account.user_id||session("uID")
            this.loading=true
            if(this.uId){
                this.stepTitle=this.totalTitle[0]
                this.intervlPost(httpUrl.pay.getpayTotal,2,[{type:2},{type:1}])                                                 
                this.$axios.postRequest(httpUrl.pay.getCompayList,{type:1})
                .then((res)=> {
                    if(res.data && !res.data.errorCode){                      
                        this.compayList=res.data
                    }
                })
                this.$axios.postRequest(httpUrl.config.getJumpConfig,{domain:document.domain})
                .then((res)=> {
                    if(res.data && !res.data.errorCode){                      
                        this.jumpConfig=res.data.jumpConfig  
                        if(this.jumpConfig.flag=='1'){
                            this.showModel=true;
                            let url=this.jumpConfig.chargeUrl;
                            let user_token=store.getters.user_token||session('user_token');
                            let goBack=this.jumpConfig.chargeParams;
                            let str=`${this.jumpConfig.chargeUrl}?user_token=${user_token}&goBack=${goBack}`; 
                            //正在跳转中... 
                            //请在弹出的页面上完成充值
                            this.setTip("正在跳转中...<br/>请在弹出的页面上完成充值")     
                            setTimeout(()=>{
                                this.$router.push({
                                    path:'/'
                                });
                                context(str);
                            },2500)                   
                            
                        }                       
                    }
                })  
            }
        },
        intervlPost(url,n,parmList){            
            if(n!=0){
                this.$axios.postRequest(url,parmList[n-1])
                .then((res)=> {
                    if(res.data && !res.data.errorCode){                      
                        this.totalpayTypeList.push(res.data)
                        n--;                        
                        this.intervlPost(url,n,parmList)
                    }
                }) 
            }
            else if(n==0){                
                 this.defaultChoose()
                 this.disablechooseType=true;
                 this.loading=false;
            }            
        },
        setSubmitParms(parmvalue){
                this.submitParms.payType=parmvalue.gate_type
                this.submitParms.gateFlag=parmvalue.gate_flag
                this.submitParms.tradeAccountId=parmvalue.id
        },
        defaultChoose(){
                this.payTypeList=this.totalpayTypeList[0]
                this.onlineTypeList=this.payTypeList[0]
                this.setSubmitParms(this.onlineTypeList.typeDetail[0])
                // this.submitParms.payType=this.onlineTypeList.typeDetail[0].gate_type
                // this.submitParms.gateFlag=this.onlineTypeList.typeDetail[0].gate_flag
                // this.submitParms.tradeAccountId=this.onlineTypeList.typeDetail[0].id
                this.fanwei=this.onlineTypeList.typeDetail[0].min_money+'-'+this.onlineTypeList.typeDetail[0].max_money;
        },
        chooseType(index,value,type){
            this.activeClass(index,value,type); 
                this.payTypeList=this.totalpayTypeList[index]               
                this.choosenIncome=index;
                this.payType=0
                this.onlineMoney=null;
                this.chargeObj.chargeNum=null,
                this.chargeObj.chargename=null,
                this.chargeObj.chargeinfo=null;
                if(index==0){
                    this.showYes=0;
                    this.onlineTypeList=this.payTypeList[0]
                    this.setSubmitParms(this.onlineTypeList.typeDetail[0])
                    this.fanwei=this.payTypeList[0].typeDetail[0].min_money+'-'+this.payTypeList[0].typeDetail[0].max_money;
                }
                if(index==1){
                    this.fanwei=this.payTypeList[0].minMoney+'-'+this.payTypeList[0].maxMoney;
                }
        },
        choosePay(index,value,type){
                this.activeClass(index,value,type); 
                this.showYes=0; 
                if(value.typeDetail[0].min_money){
                    this.fanwei=value.typeDetail[0].min_money+'-'+value.typeDetail[0].max_money;
                }    
                else if(value.minMoney){
                    this.fanwei=value.minMoney+'-'+value.maxMoney;
                }                        
                this.onlineTypeList=value;
                //this.onlineMoney=null;
                this.setSubmitParms(this.onlineTypeList.typeDetail[0])
                // this.submitParms.payType=this.onlineTypeList.typeDetail[0].gate_type
                // this.submitParms.gateFlag=this.onlineTypeList.typeDetail[0].gate_flag
                // this.submitParms.tradeAccountId=this.onlineTypeList.typeDetail[0].id
        },
        chooseonline(value,key){
            this.setSubmitParms(value)
            this.fanwei=value.min_money+'-'+value.max_money;
            //this.onlineMoney=null;
            // this.submitParms.payType=value.gate_type
            // this.submitParms.gateFlag=value.gate_flag
            // this.submitParms.tradeAccountId=value.id
            this.showYes=key;
        }, 
        checkfanwei(){

        },       
        checkOnlinePay(){  
            var str=this.fanwei;
            var index = str.indexOf('-');
            var max = str.substr(index + 1,str.length);
            var min= str.substr(0,index);
            console.log(min,max)
            var currentnum=parseInt(this.onlineMoney);      
            if(!currentnum){
                this.setTip("请输入金额")
                return false;
            }
            else if(currentnum<min||currentnum>max){
                let temptip="请输入"+str+"的金额"
                this.setTip(temptip)
                return false;
            }
            else{   
                this.submitParms.userId= this.uId;
                this.submitParms.money=this.onlineMoney;
                return true;
            }
        },
        onlineSubmit(){
                var parms=this.submitParms;
                if(this.jumpConfig){
                    if(this.jumpConfig.flag=='0'){
                        console.log("内部跳转")
                        if(this.checkOnlinePay()&&this.disableonlineSubmit){
                            this.disableonlineSubmit=false;
                            this.$axios.postRequest(httpUrl.pay.toChargeNew,parms)
                            .then((res)=> {
                                if(res.data && res.data.code==0){ 
                                    this.disableonlineSubmit=true;  
                                    //iframe打开
                                    if(this.jumpConfig.isLabel=='0'){                             
                                        this.mainshow=false;
                                        this.url=res.data.info;
                                    }  
                                    //标签页打开
                                    else if(this.jumpConfig.isLabel=='1'){
                                        let payurl=res.data.info;
                                        //window.open(payurl);  
                                        var new_window = window.open();
                                        new_window.location=payurl;
                                    }
                                }
                                else{
                                    this.setTip(res.data.info)
                                }
                            })
                        }
                    }      
                    
                }
        },
        checkStep(currentStep){
            switch(currentStep){
               case 1:{
                    var str=this.fanwei;
                    var index = str.indexOf('-');
                    var max = str.substr(index + 1,str.length);
                    var min= str.substr(0,index);
                    var currentnum=parseInt(this.chargeObj.chargeNum);
                   if(!this.chargeObj.chargeNum||!this.chargeObj.chargename){
                       this.setTip('充值金额和汇款姓名不能为空!')           
                       return false;                       
                   }
                   else if(currentnum<min||currentnum>max){
                       let temptip="请输入"+str+"的金额"
                        this.setTip(temptip)
                        return false;
                   }
                   else{
                       return true;
                   }
               } 
               case 2:{
               } 
            }
        },
        setStep(num){
            var currentStep=this.compstep
            switch(currentStep){
                case 1:{
                    if(this.checkStep(currentStep)){
                        break;
                    }
                    else{
                        return;
                    }                                       
                }
                case 2:{
                     if(!this.choosenCompay.id){
                        this.showCYes=0;                       
                        this.choosenCompay=this.compayList[0]
                        break;
                    } 
               } 
            }
            this.compstep=num;                      
        },
        chooseComp(v,k,type){
            this.activeClass(k,v,type); 
            this.showCYes=k;
            this.choosenCompay=v;
        },
        companySubmit(){
            var parm={}                      
            parm.money=this.chargeObj.chargeNum;
            parm.payId=this.choosenCompay.id;
            parm.payUser=this.chargeObj.chargename;
            parm.payRemark=this.chargeObj.chargeinfo;
            parm.userId=this.uId;
            if(this.disablecompySubmit){
                this.disablecompySubmit=false;
                this.setTip("提交中，请等待。。。")
                this.$axios.postRequest(httpUrl.pay.compaySubmit,parm)
                .then((res)=> {
                    
                    if(res.data && res.data.code==0){        
                        this.setTip("提交成功")
                        this.disablecompySubmit=true;
                        this.clearchargeObj();
                    }
                    else{
                        this.setTip(res.data.info)
                        this.disablecompySubmit=true;
                        this.clearchargeObj();
                    }
                })
            }            
        },
        clearchargeObj(){
            this.compstep=1; 
            this.chargeObj.chargeNum=null;
            this.chargeObj.chargename=null;
            this.chargeObj.chargeinfo=null;
        }
    }
}
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.flex {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
}
.flex-v {
    -webkit-box-orient: vertical;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
}
.flex-1 {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
}
.flex-2 {
    -webkit-box-flex: 2;
    -webkit-flex: 2;
    -ms-flex: 2;
    flex: 2;
}
.flex-3 {
    -webkit-box-flex: 3;
    -webkit-flex: 3;
    -ms-flex: 3;
    flex: 3;
}
.flex-4 {
    -webkit-box-flex: 4;
    -webkit-flex: 4;
    -ms-flex: 4;
    flex: 4;
}
.flex-5 {
    -webkit-box-flex: 5;
    -webkit-flex: 5;
    -ms-flex: 5;
    flex: 5;
}
.flex-6 {
    -webkit-box-flex: 6;
    -webkit-flex: 6;
    -ms-flex: 6;
    flex: 6;
}
.flex-align-center {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}
.flex-align-start {
    -webkit-box-align: flex-start;
    -webkit-align-items: flex-start;
    -ms-flex-align: flex-start;
    align-items: flex-start;
}
.flex-pack-center {
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
}
.flex-pack-justify {
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
}
.flex-center{
    align-items: center;
    justify-content: center;
}
i{
    width: 30px;
    height: 30px;
}
.icon-radio-yes {
    background-image: url(./images/ico-radio-yes.svg);
}
.icon-radio-no {
    background-image: url(./images/ico-radio-no.svg);
}
.icon-arrows-rightt {
    background-image: url(./images/ico-arrows-right.svg);
}
.yo-icon {
    font-style: normal;
    font-weight: 400;
    display: inline-block;
    text-decoration: inherit;
    margin-right: .2em;
    text-align: center;
    font-variant: normal;
    text-transform: none;
    line-height: 1em;
    margin-left: .2em;
    vertical-align: middle;
    background-repeat: no-repeat;
    background-size: contain;
}
.newpay{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 1.44rem;
    background-color: #ececec;  
    // .scroll-content{
    //     height: 100%;
    //     overflow: auto;
        .div-content{
            height: 100%;
            overflow: auto;
            .model{
                top:0;
                left:0;
                position: fixed;
                width: 100%;
                height:100%;
                background: #fff;
                z-index: 10001;
                .dialog{
                    border-radius: .5rem;
                    background-color: #666;
                    padding:.3rem .6rem;
                    border-radius: .3rem;
                    img{
                        display: inline-block;
                        width: 1rem;
                        height: 1rem;                        
                    }
                    p{
                        text-align: center;
                        line-height: .6rem;
                        color:#fff;
                    }
                }
                
            }
        }
    // }
    .login-tip-wrapper{
        position: fixed;
        top: 1.2rem;
        bottom: 1.44rem;
        width: 100%;
        background: #fff;
        z-index: 102;
        .login-tip{
            width:5rem;
            height:auto;
            overflow: hidden;
            margin: 0 auto;
            margin-top:calc((100% - 5rem)/2);
             .img{
                width:5rem;
                height:5rem;
                @include bg-image('icon-em');
                background-position: center bottom;
                background-size: 5rem;
                background-repeat: no-repeat;
            }
            .btn{
                height:1rem;
                width:86%;
                border:1px solid $color-red;
                line-height: 1rem;
                text-align: center;
                font-size: $font-size-medium-x;
                margin: 0 auto;
            }
        }
    }
}
.iframewapper{
    position: fixed;
    width: 100%;
    top:2.6rem;
}
.paywapper{
    background-color: #ececec;  
    //min-height: 100vh;
    
    input{
        border: 1px solid #ececec;
        height: 0.8rem;
    }
    .topbutton{
        width: 100%;
        background: #ffffff;
        box-sizing: border-box;
        padding: 10px;
        .orderbutton{
            height:0.9rem;
            border: 1px solid #ddd;
            font-size: 0.4rem;   
            margin-left: -1px;         
            position: relative;
            i{
                position:absolute;
                right:1px;
                top:-10px;
                width: 20px;
                height: 20px;
            }
        }
        .active{
            background-color: #e83b50;
            border-color: #e83b50;
            color: #ffffff
        }
        .orderbutton:first-child{
            border-radius: 5px 0 0 5px;
        }
        .orderbutton:last-child{
            border-radius: 0 5px 5px 0;
            
        }
    }
    .paytype{
        width: 100%;
        background-color: #ffffff;
        padding: 10px;
        box-sizing: border-box;
        .paytypebtn{
            width: 20%;
            border: 1px solid #ddd;
            margin-left: -1px;
            height:0.9rem;
        }
        .active{
                background-color: #529e45;
                border-color: #529e45;
                color: #ffffff
            }
        .paytypebtn:first-child{
            border-radius: 5px 0 0 5px;
        }
        .paytypebtn:last-child{
            border-radius: 0 5px 5px 0;
        }
    }
    .paymoney{
        background: #ffffff;
        margin-top:15px;
        padding-bottom:10px;
        .paymoneydiv{
            width: 90%;
            margin-top: 5px;
            height: 1rem;
        }
        .zero{
            height: 0.8rem;
            border:1px solid #ececec;
            margin-left: -1px;
            background: #ddd;
        }
    }
    .typetitle{
        background-color: #ececec;
        padding-left: 10px;
        height: 1.2rem;
    }
    .chargetype{
        background-color: #ffffff;
        .chargeList{
            padding:15px 0;
            box-sizing: border-box;
            font-size: 0.35rem;
            border-bottom: 1px solid #ddd;
            .chargeList1{
                height: 1rem;
            }
        }
    }
    .confirmdiv{
        height: 3rem;
        .confirmbtn{
            width:90%;
            height: 1rem;
            background: #e83b50;
            border-radius: 40px;
            color: #ffffff;
            font-size: 0.4rem;
        }
        
    }
    .companypay{
        .comppaydiv{
            background: #ffffff;
            height: 1rem;
            width: 95%;
        }
        .companybtns{
            margin: 10px;
            .confirmcompany{
                font-size: 0.4rem;
                box-sizing: border-box;
                div{
                    background: #ffffff;
                height: 1rem;
                }
                .active{
                        color: #ffffff;
                        background: #e83b50;
                    }
                div:first-child{
                    border-radius: 40px 0 0 40px;               
                }
                div:last-child{
                    border-radius: 0 40px 40px 0;
                }
            }
        }
        
    }
    .banklist{
        width: 95%;
        div{
             width: 100%;
             height: 1rem;
             background: #fafafa;
             padding: 0 5px;
             box-sizing: border-box;
        }
        div:first-child{
             background: #ffffff;
             border-bottom:1px solid #ececec
        }
        div:last-child{
             background: #ffffff;
             border-top:1px solid #ececec
        }
       
    }
    .bankactive{
            border:1px solid #4fb83d
    }
    
    .bankinfo{
        div{
             width: 95%;
             background: #fafafa;
             padding: 3px 10px;
             box-sizing: border-box;
        }
    }
}
</style>

