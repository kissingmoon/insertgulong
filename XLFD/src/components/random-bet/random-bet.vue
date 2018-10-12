<template>
    <div>
        <p v-if="!hasSelect" @click="startInterval" class="randomBtn">机选</p>
        <div v-if="showmodel" class="lockmodel" v-slience></div>
    </div>
</template>

<script>
import {mapMutations,mapActions,mapGetters} from 'vuex';
import randomBet from 'common/js/randombet.js'
import 'common/js/shake.js'
export default {
    data (){
        return {
            myShakeEvent:'',
            randomList:false,
            selectObjList:false,
            randomPos:false,
            selectObj:false,
            showbtn:true,
            showmodel:false,
            timer:""
        }
    },
    props: ['wf_flag','hasSelect','numList'],
    directives: {
        slience: {
            // 指令的定义
            inserted: function (el) {               
                    el.addEventListener("click",function(oEvent){
                    oEvent.cancelBubble = true;
                    oEvent.stopPropagation();
                })
            }
        }
    },
    methods: {
        ...mapMutations({
            setTip:'SET_TIP',
        }),
        //震动调用函数
        vibrate(){
            navigator.vibrate = navigator.vibrate
                        || navigator.webkitVibrate
                        || navigator.mozVibrate
                        || navigator.msVibrate;
                if (navigator.vibrate) {
                    ///中括号里面的值标示[震动时间，停止时间，震动时间，停止时间………..]。没有错就是这种规律，简单明了
                    navigator.vibrate([500, 500]);
                }
                else{
                    //alert("设备不支持震动")
                }          
        },
        shakefun(emitFlag){           
            if (!this.wf_flag) {
                return "";
            }
            var buyNumIndexMax=this.numList[0].buyNumberBeanList.length-1
            switch (this.wf_flag){
            //randomList：一维数组还是二维数组,随机数的最小值,随机数的最大值,是否允许数字相同,第一维数组长度,第二维数组长度
                case "ssc_5xdwd":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,false,'5r1',1)
                    break;
                }
                case "ssc_5xzhix_fs": case "ssc_5xzhix_zh":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,false,5,1)
                    break;
                }
                case "ssc_5xzux_120":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,5)
                    break;
                }
                case "ssc_5xzux_60":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,2,[1,3])
                    break;
                }
                case "ssc_5xzux_30":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,2,[2,1])
                    break;
                }
                case "ssc_5xzux_20":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,2,[1,2])
                    break;
                }
                case "ssc_5xzux_10":case "ssc_5xzux_5":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,2,[1,1])
                    break;
                }
                case "ssc_5xts_yffs":case "ssc_5xts_hscs":case "ssc_5xts_sxbx":case "ssc_5xts_sjfc":
                case "ssc_q3zhix_kd":case "ssc_q3zux_q3zuxbd":case "ssc_z3zhix_kd":case "ssc_z3zux_z3zuxbd":case "ssc_h3zhix_kd":case "ssc_h3zux_h3zuxbd":
                case "ssc_q2zhix_kd":case "ssc_q2zux_bd":case "ssc_h2zhix_kd":case "ssc_h2zux_bd":
                case "ssc_3xbdw_q31":case "ssc_3xbdw_z31":case "ssc_3xbdw_h31":
                case "ssc_4xbdw_h41":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,1)
                    break;
                }
                case "ssc_4xzhix_qszhixfs":case "ssc_4xzhix_qszhixzh":case "ssc_4xzhix_hszhixfs":case "ssc_4xzhix_hszhixzh":
                {
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,false,4,1)
                    break;
                }
                case "ssc_4xzux_qszux24":case "ssc_4xzux_hszux24":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,4)
                    break;
                }
                case "ssc_4xzux_qszux12":case "ssc_4xzux_hszux12":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,2,[1,2])
                    break;
                }
                case "ssc_4xzux_qszux6":case "ssc_4xzux_hszux6":
                case "ssc_3xbdw_q32":case "ssc_3xbdw_z32":case "ssc_3xbdw_h32":
                case "ssc_4xbdw_h42":
                case "ssc_4xbdw_h52":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,2)
                    break;
                }
                case "ssc_4xbdw_h53":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,3)
                    break;
                }
                case "ssc_4xzux_qszux4":case "ssc_4xzux_hszux4":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,2,1)
                    break;
                }
                case "ssc_q3zhix_fs":case "ssc_q3zhix_zh":case "ssc_z3zhix_fs":case "ssc_z3zhix_zh":case "ssc_h3zhix_fs":case "ssc_h3zhix_zh":{ 
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,false,3,1)
                    break;
                }
                case "ssc_q3zhix_hz":case "ssc_z3zhix_hz":case "ssc_h3zhix_hz":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,false,1,1)
                    break;
                }
                case "ssc_q3zux_q3zu3fs":case "ssc_z3zux_z3zu3fs":case "ssc_h3zux_h3zu3fs":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,2)
                    break;
                }
                case "ssc_q3zux_q3zu6fs":case "ssc_z3zux_z3zu6fs":case "ssc_h3zux_h3zu6fs":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,3)
                    break;
                }
                case "ssc_q3zux_q3zuxhz":case "ssc_z3zux_z3zuxhz":case "ssc_h3zux_h3zuxhz":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,1)
                    break;
                }
                case "ssc_q2zhix_fs":case "ssc_q2zhix_kd":case "ssc_h2zhix_fs":case "ssc_h2zhix_kd":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,false,2,1)
                    break;
                }
                case "ssc_q2zhix_hz":case "ssc_h2zhix_hz":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,1)
                    break;
                }
                case "ssc_q2zux_fs":case "ssc_h2zux_fs":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,2)
                    break;
                }  
                case "ssc_q2zux_hz":case "ssc_h2zux_hz":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,1)
                    break;
                }
                case "ssc_r2zhix_fs":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,false,'5r2',1)
                    break;
                }  
                case "ssc_r2zhix_hz":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,1)
                    this.randomPos=randomBet.randomList(1,0,4,true,2)
                    break;
                }   
                case "ssc_r2zux_fs":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,2)
                    this.randomPos=randomBet.randomList(1,0,4,true,2)
                    break;
                }  
                case "ssc_r2zux_hz":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,1)
                    this.randomPos=randomBet.randomList(1,0,4,true,2)
                    break;
                }    
                case "ssc_r3zhix_fs":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,false,'5r3',1)
                    break;
                }
                case "ssc_r3zhix_hz":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,1)
                    this.randomPos=randomBet.randomList(1,0,4,true,3)
                    break;
                }
                case "ssc_r3zux_z3fs":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,2)
                    this.randomPos=randomBet.randomList(1,0,4,true,3)
                    break;
                }
                case "ssc_r3zux_z6hz":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,3)
                    this.randomPos=randomBet.randomList(1,0,4,true,3)
                    break;
                }
                case "ssc_r3zux_hz":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,1)
                    this.randomPos=randomBet.randomList(1,0,4,true,3)
                    break;
                }                
                case "ssc_r4zhix_fs":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,false,'5r4',1)
                    break;
                }
                case "ssc_r4zux_24":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,4)
                    this.randomPos=randomBet.randomList(1,0,4,true,4)
                    break;
                } 
                case "ssc_r4zux_12":{
                    //一定要记住selectNumList的长度应该与当前玩法总共有几位的位数保持一致
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,2,[1,2])
                    this.randomPos=randomBet.randomList(1,0,4,true,4)
                    break;
                }
                case "ssc_r4zux_6":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,2)
                    this.randomPos=randomBet.randomList(1,0,4,true,4)
                    break;
                }
                case "ssc_r4zux_4":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,2,1)
                    this.randomPos=randomBet.randomList(1,0,4,true,4)
                    break;
                }
                //大小单双                
                case "ssc_dxds_q2":case "ssc_dxds_h2":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,false,2,1)
                    break;
                }
                case "ssc_dxds_q3":case "ssc_dxds_h3":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,false,3,1)
                    break;
                }
                case "ssc_lhd":{
                    let randomList1=randomBet.randomList(1,0,9,true,1)
                    let randomList2=randomBet.randomList(1,0,2,true,1)
                    this.randomList=[randomList1,randomList2];
                    break;
                }
                //11选5
                case "11x5_1m_q1zhix":case "11x5_bdw_q3bdw":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,1)
                    break;
                }
                case "11x5_3m_q3zhixfs":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,3,1)
                    break;
                }
                case "11x5_3m_q3zuxfs":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,3)
                    break;
                }
                case "11x5_3m_q3zuxdt":case "11x5_dt_3":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,2,[1,2])
                    break;
                }
                case "11x5_2m_q2zhixfs":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,2,1)
                    break;
                }
                case "11x5_2m_q2zuxfs":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,2)
                    break;
                }
                case "11x5_2m_q2zuxdt":case "11x5_dt_2":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,2,1)
                    break;
                }
                case "11x5_dt_4":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,2,[1,3])
                    break;
                }
                case "11x5_dt_5":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,2,[1,4])
                    break;
                }
                case "11x5_dt_6":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,2,[1,5])
                    break;
                }
                case "11x5_dt_7":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,2,[1,6])
                    break;
                }
                case "11x5_dwd_q3dwd":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,false,'3r1',1)
                    break;
                }
                case "11x5_qwx_czs":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,false,1,1)
                    break;
                }
                case "11x5_qwx_dds":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,false,1,1)
                    break;
                }
                //快3
                case "k3_2bth_bz":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,2)
                    break;
                }
                case "k3_2bth_dt":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,2,1)
                    break;
                }
                case "k3_3th_thtx":{
                    this.randomList=[[0]]
                    break;
                }
                case "k3_3th_lhtx":{
                    this.randomList=[[0]]
                    break;
                }
                case "k3_3th_dx":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,1)
                    break;
                }
                case "k3_3bth_bz":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,3)
                    break;
                }
                case "k3_3bth_dt":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,2,[1,2])
                    break;
                }
                case "k3_3bth_hz":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,1)
                    break;
                }
                case "k3_hz_hz":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,1)
                    break;
                }
                //北京赛车
                case "pk10_cq1_d1":case "pk10_cq2_d2":case "pk10_cq3_d3":case "pk10_cq4_d4":case "pk10_cq5_d5":
                case "pk10_cq6_d6":case "pk10_cq7_d7":case "pk10_cq8_d8":case "pk10_cq9_d9":case "pk10_cq10_d10":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,1)
                    break;
                }
                case "pk10_cq1_q1":case "pk10_cq2_q2":case "pk10_cq3_q3":case "pk10_cq4_q4":case "pk10_cq5_q5":
                case "pk10_cq6_q6":case "pk10_cq7_q7":case "pk10_cq8_q8":case "pk10_cq9_q9":case "pk10_cq10_q10":{
                    let str=this.wf_flag
                    if(str.substring(str.length-2,str.length-1)=="q")
                    {
                        let listLength=parseInt(str.substring(str.length-1))                        
                        this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,listLength,1)
                    }
                    else if(str=="pk10_cq10_q10"){
                        this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,10,1)
                    }
                    break;
                }
                case "pk10_gp_dwd_child":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,'10r1',1)
                    break;
                }
                case "pk10_dxds_gj":case "pk10_dxds_yj":case "pk10_dxds_jj":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,1)
                    break;
                }
                case "pk10_hz_gy":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,1)
                    break;
                }
                case "pk10_hz_gyj":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,true,1,1)
                    break;
                }
                case "pk10_lhd":{
                    this.randomList=randomBet.randomList(2,0,buyNumIndexMax,false,'5r1',1)
                    break;
                }
               case "xglhc_tema_xuma":case "xglhc_sebo_sebo":case "xglhc_texiao_tx":case "xglhc_tws_tws":case "xglhc_zhma_xm":
               case "xglhc_zhma_qt":
               case "xglhc_zhmat_z1t":case "xglhc_zhmat_z1tdx":case "xglhc_zhmat_z2t":case "xglhc_zhmat_z2tdx":case "xglhc_zhmat_z3t":case "xglhc_zhmat_z3tdx":
               case "xglhc_zhmat_z4t":case "xglhc_zhmat_z4tdx":case "xglhc_zhmat_z5t":case "xglhc_zhmat_z5tdx":case "xglhc_zhmat_z6t":case "xglhc_zhmat_z6tdx":
               case "xglhc_zhma1d6_zm1":case "xglhc_zhma1d6_zm2":case "xglhc_zhma1d6_zm3":case "xglhc_zhma1d6_zm4":case "xglhc_zhma1d6_zm5":case "xglhc_zhma1d6_zm6":
               case "xglhc_wuxing_wx":case "xglhc_pt1xws_1x":case "xglhc_zhxiao_zx":case "xglhc_7sebo_7sb":case "xglhc_zoxiao_zx":
               case "xy28_qthh_hh":case "xy28_qtbs_bs":case "xy28_qtbz_bz":case "xy28_tmtm_tm":case "xglhc_pt1xws_ws":{
                    this.randomList=randomBet.randomList(2,0,this.numList[0].buyNumberBeanList.length-1,true,1,1);
                    this.selectObj={};
                    this.randomList.map((v,k)=>{
                        v.map((v1,k1)=>{
                           this.selectObj[this.numList[k].buyNumberBeanList[v1].number_str]=this.numList[k].buyNumberBeanList[v1]
                        })
                    })
                    break;
                }
                case "xglhc_zxbz_zxbz":{
                    this.randomList=randomBet.randomList(2,0,this.numList[0].buyNumberBeanList.length-1,true,1,6);
                    this.selectObj={};
                    this.randomList.map((v,k)=>{
                        v.map((v1,k1)=>{
                            this.selectObj[this.numList[k].buyNumberBeanList[v1].number_str]=this.numList[k].buyNumberBeanList[v1]
                        })
                    })
                    break;
                }
                case "xglhc_lm_3z2":case "xglhc_lm_3qz":case "xy28_tmb3_b3":{
                    this.randomList=randomBet.randomList(2,0,this.numList[0].buyNumberBeanList.length-1,true,1,3);
                    this.selectObj={};
                    this.randomList.map((v,k)=>{
                        v.map((v1,k1)=>{
                            this.selectObj[this.numList[k].buyNumberBeanList[v1].number_str]=this.numList[k].buyNumberBeanList[v1]
                        })
                    })
                    break;
                }
                case "xglhc_hexiao_hx":case "xglhc_lm_2qz":case "xglhc_lm_2zt":case "xglhc_lm_tc":{
                    this.randomList=randomBet.randomList(2,0,this.numList[0].buyNumberBeanList.length-1,true,1,2);
                    this.selectObj={};
                    this.randomList.map((v,k)=>{
                        v.map((v1,k1)=>{
                            this.selectObj[this.numList[k].buyNumberBeanList[v1].number_str]=this.numList[k].buyNumberBeanList[v1]
                        })
                    })
                    break;
                }
                case "xglhc_lxlw_2lx":case "xglhc_lxlw_3lx":case "xglhc_lxlw_4lx":case "xglhc_lxlw_5lx":
                case "xglhc_lxlw_2lw":case "xglhc_lxlw_3lw":case "xglhc_lxlw_4lw":case "xglhc_lxlw_5lw":
                case "xglhc_lm_4qz":{
                    let num=0;
                    for(let i=1;i++;i<=5){
                        if(this.wf_flag.indexOf(i.toString())!=-1){
                            num=i;
                            break;
                        }
                    }
                    this.randomList=randomBet.randomList(2,0,this.numList[0].buyNumberBeanList.length-1,true,1,num);
                    this.selectObj={};
                    this.randomList.map((v,k)=>{
                        v.map((v1,k1)=>{
                            this.selectObj[this.numList[k].buyNumberBeanList[v1].number_str]=this.numList[k].buyNumberBeanList[v1]
                        })
                    })
                    break;
                }
            }
            var resultObj={}
            if(this.randomPos){
                resultObj.randomList=this.randomList
                resultObj.randomPos=this.randomPos
                this.randomPos=false
                this.randomList=false
                return resultObj
            }
            else if(this.selectObj){
                resultObj.randomList=this.randomList
                resultObj.selectObj=this.selectObj
                this.selectObj=false
                this.randomList=false
                return resultObj
            }
            else{
                resultObj.randomList=this.randomList
                this.randomList=false
                return resultObj
            }          
        },
        startInterval(){
            this.showmodel=true;
            var result=this.shakefun()
            var resultIndexList=result.randomList.concat()
            if(this.wf_flag=="k3_3th_lhtx"){
                resultIndexList=[[3,2,1,0]]
            }
            if(this.wf_flag=="k3_3th_thtx"){
                resultIndexList=[[5,4,3,2,1,0]]
            }
            var resultList=JSON.parse(JSON.stringify(resultIndexList))
            
            resultList.map((v,k)=>{
                v.map((v1,k1)=>{
                    resultList[k][k1]=this.numList[k].buyNumberBeanList[resultIndexList[k][k1]].number_str
                })
            })
            var tempIndexRanList=[]
            var switchs=[]
            var plusIndex=[]
            var circleRound=2;
            var speed=100;
            if(this.numList[0].buyNumberBeanList.length>15){
                speed=50;
            }
            resultIndexList.map((v,k)=>{
                v.sort(function(x, y){
                    return x-y;
                });
            })
            this.numList.map((v,k)=>{
                tempIndexRanList[k]=new Array(resultIndexList[k].length)
                switchs[k]=true
                plusIndex[k]=0
            })
            var len=tempIndexRanList.length
            var countIndex=0;
            var tempResult=JSON.parse(JSON.stringify(resultIndexList))
            this.timer=setInterval(()=>{
               tempIndexRanList=tempIndexRanList.concat()
                if(circleRound==0){
                    this.numList.map((v,k)=>{
                        if(switchs[k]){
                            tempIndexRanList[k][plusIndex[k]]=v.buyNumberBeanList[countIndex].number_str
                        }
                        if(countIndex==tempResult[k][0]){
                            tempResult[k].shift()
                            plusIndex[k]++
                            if(tempResult[k].length==0){
                                switchs[k]=false
                            }
                        }
                    })
                    if(randomBet.judgeTwoArray(tempResult)){
                        tempIndexRanList=resultList
                        clearInterval(this.timer)
                        this.setTip('已选出号码！');
                        this.showmodel=false;
                    }
                }else{
                    this.numList.map((v,k)=>{
                        tempIndexRanList[k][plusIndex[k]]=v.buyNumberBeanList[countIndex].number_str
                    })
                }
                countIndex++
                if(countIndex==this.numList[0].buyNumberBeanList.length){
                    countIndex=0
                    circleRound--
                }
                this.$emit('selectRandNum',tempIndexRanList) 
            },speed)
            if(result.selectObj){
                this.$emit('selectRandObj',result.selectObj)
            }
            if(result.randomPos){
                this.$emit('selectRandPos',result.randomPos)
            }
        },
        addShakeEvent(){
            var _this=this;
            this.myShakeEvent = new Shake({
                threshold: 15, // optional shake strength threshold
                timeout: 500 // optional, determines the frequency of event generation
            });
            this.myShakeEvent.start();
            window.addEventListener('shake', _this.startInterval);  
        },
        removeShakeEvent(){
            var _this=this;
            this.myShakeEvent.stop();
            window.removeEventListener('shake', _this.startInterval);
        }        
    },
    mounted(){  
        this.addShakeEvent() 
    },
    beforeDestroy(){
        this.removeShakeEvent()
    }
}
</script>
<style scoped lang="scss">
    @import 'common/scss/variable.scss';
    @import 'common/scss/mixin.scss';
    .lockmodel{
        filter:alpha(Opacity=10);
        opacity:0.2;
        z-index:9998;
        width: 100vw;
        height: 100vh;
        background: rgb(221, 224, 221);
        position: fixed;  
        bottom: 0;  
        left: 0; 
    }
    .randomBtn{
        width:1.8rem;
        height:1rem;
        line-height: 1rem;
        text-align: center;
        background:#5E5D5B;
        @include bg-image('shake');
        background-repeat: no-repeat;
        background-size: auto 100%;
        border-radius: 0.1rem;
        text-align: right;
        padding-right: 0.3rem;
        box-sizing: border-box;
    }
</style>
