<template>
    <div>
        <p @click="shakefun">随机</p>
    </div>
</template>

<script>
import randomBet from 'common/js/randombet.js'
import 'common/js/shake.js'
export default {
    data (){
        return {
            myShakeEvent:'',
            randomList:''
        }
    },
    props: ['wf_flag'],
    methods: {
        vibrate(){
            navigator.vibrate = navigator.vibrate
                        || navigator.webkitVibrate
                        || navigator.mozVibrate
                        || navigator.msVibrate;
                if (navigator.vibrate) {
                    ///中括号里面的值标示[震动时间，停止时间，震动时间，停止时间………..]。没有错就是这种规律，简单明了
                    navigator.vibrate([500, 300]);
                }
                else{
                    alert("设备不支持震动")
                }          
        },
        shakefun(){           
            if (!this.wf_flag) {
                return "";
            }
            switch (this.wf_flag){
                //randomList：一维数组还是二维数组,随机数的最小值,随机数的最大值,是否允许数字相同,第一维数组长度,第二维数组长度
                case "ssc_5xdwd":{
                    this.randomList=randomBet.randomList(2,0,9,false,'5r1',1)
                    this.$emit('selectRandNum',this.randomList)
                    break;
                }
                case "ssc_5xzhix_fs": case "ssc_5xzhix_zh":{
                    this.randomList=randomBet.randomList(2,0,9,false,5,1)
                    this.$emit('selectRandNum',this.randomList)
                    break;
                }
                case "ssc_5xzux_120":{
                    this.randomList=randomBet.randomList(2,0,9,true,1,5)
                    this.$emit('selectRandNum',this.randomList)
                    break;
                }
                case "ssc_5xzux_60":{
                    this.randomList=randomBet.randomList(2,0,9,true,2,[1,3])
                    this.$emit('selectRandNum',this.randomList)
                    break;
                }
                case "ssc_5xzux_30":{
                    this.randomList=randomBet.randomList(2,0,9,true,2,[2,1])
                    this.$emit('selectRandNum',this.randomList)
                    break;
                }
                case "ssc_5xzux_20":{
                    this.randomList=randomBet.randomList(2,0,9,true,2,[1,2])
                    this.$emit('selectRandNum',this.randomList)
                    break;
                }
                case "ssc_5xzux_10":case "ssc_5xzux_5":{
                    this.randomList=randomBet.randomList(2,0,9,true,2,[1,1])
                    this.$emit('selectRandNum',this.randomList)
                    break;
                }
                case "ssc_5xts_yffs":case "ssc_5xts_hscs":case "ssc_5xts_sxbx":case "ssc_5xts_sjfc":
                case "ssc_q3zhix_kd":case "ssc_q3zux_q3zuxbd":case "ssc_z3zhix_kd":case "ssc_z3zux_z3zuxbd":case "ssc_h3zhix_kd":case "ssc_h3zux_h3zuxbd":
                case "ssc_q2zhix_kd":case "ssc_q2zux_bd":case "ssc_h2zhix_kd":case "ssc_h2zux_bd":
                case "ssc_3xbdw_q31":case "ssc_3xbdw_z31":case "ssc_3xbdw_h31":
                case "ssc_4xbdw_h41":{
                    this.randomList=randomBet.randomList(2,0,9,true,1,1)
                    this.$emit('selectRandNum',this.randomList)
                    break;
                }
                case "ssc_4xzhix_qszhixfs":case "ssc_4xzhix_qszhixzh":case "ssc_4xzhix_hszhixfs":case "ssc_4xzhix_hszhixzh":{
                    this.randomList=randomBet.randomList(2,0,9,false,4,1)
                    this.$emit('selectRandNum',this.randomList)
                    break;
                }
                case "ssc_4xzux_qszux24":case "ssc_4xzux_hszux24":{
                    this.randomList=randomBet.randomList(2,0,9,true,1,4)
                    this.$emit('selectRandNum',this.randomList)
                    break;
                }
                case "ssc_4xzux_qszux12":case "ssc_4xzux_hszux12":{
                    this.randomList=randomBet.randomList(2,0,9,true,2,[1,2])
                    this.$emit('selectRandNum',this.randomList)
                    break;
                }
                case "ssc_4xzux_qszux6":case "ssc_4xzux_hszux6":
                case "ssc_3xbdw_q32":case "ssc_3xbdw_z32":case "ssc_3xbdw_h32":
                case "ssc_4xbdw_h42":
                case "ssc_4xbdw_h52":{
                    this.randomList=randomBet.randomList(2,0,9,true,1,2)
                    this.$emit('selectRandNum',this.randomList)
                    break;
                }
                case "ssc_4xbdw_h53":{
                    this.randomList=randomBet.randomList(2,0,9,true,1,3)
                    this.$emit('selectRandNum',this.randomList)
                    break;
                }
                case "ssc_4xzux_qszux4":case "ssc_4xzux_hszux4":{
                    this.randomList=randomBet.randomList(2,0,9,true,2,1)
                    this.$emit('selectRandNum',this.randomList)
                    break;
                }
                case "ssc_q3zhix_fs":case "ssc_q3zhix_zh":case "ssc_z3zhix_fs":case "ssc_z3zhix_zh":case "ssc_h3zhix_fs":case "ssc_h3zhix_zh":{ 
                    this.randomList=randomBet.randomList(2,0,9,false,3,1)
                    this.$emit('selectRandNum',this.randomList)
                    break;
                }
                case "ssc_q3zhix_hz":case "ssc_z3zhix_hz":case "ssc_h3zhix_hz":{
                    this.randomList=randomBet.randomList(2,0,27,false,1,1)
                    this.$emit('selectRandNum',this.randomList)
                    break;
                }
                case "ssc_q3zux_q3zu3fs":case "ssc_z3zux_z3zu3fs":case "ssc_h3zux_h3zu3fs":{
                    this.randomList=randomBet.randomList(2,0,9,true,1,2)
                    this.$emit('selectRandNum',this.randomList)
                    break;
                }
                case "ssc_q3zux_q3zu6fs":case "ssc_q3zux_z3zu6fs":case "ssc_q3zux_h3zu6fs":{
                    this.randomList=randomBet.randomList(2,0,9,true,1,3)
                    this.$emit('selectRandNum',this.randomList)
                    break;
                }
                case "ssc_q3zux_q3zuxhz":case "ssc_z3zux_z3zuxhz":case "ssc_h3zux_h3zuxhz":{
                    this.randomList=randomBet.randomList(2,1,26,true,1,1)
                    this.$emit('selectRandNum',this.randomList)
                    break;
                }
                case "ssc_q2zhix_fs":case "ssc_q2zhix_kd":case "ssc_h2zhix_fs":case "ssc_h2zhix_kd":{
                    this.randomList=randomBet.randomList(2,0,9,false,2,1)
                    this.$emit('selectRandNum',this.randomList)
                    break;
                }
                case "ssc_q2zhix_hz":case "ssc_h2zhix_hz":{
                    this.randomList=randomBet.randomList(2,0,18,true,1,1)
                    this.$emit('selectRandNum',this.randomList)
                    break;
                }
                case "ssc_q2zux_fs":case "ssc_h2zux_fs":{
                    this.randomList=randomBet.randomList(2,0,9,true,1,2)
                    this.$emit('selectRandNum',this.randomList)
                    break;
                }  
                case "ssc_q2zux_hz":case "ssc_h2zux_hz":{
                    this.randomList=randomBet.randomList(2,1,17,true,1,1)
                    this.$emit('selectRandNum',this.randomList)
                    break;
                }           
                case "ssc_r4zux_12":{
                    //this.randomPos=randomBet.randomList(1,0,4,4)
                    this.randomPos=[0,1,2,3]
                    //一定要记住selectNumList的长度应该与当前玩法总共有几位的位数保持一致
                    this.randomList=randomBet.randomList(2,0,9,2,[1,2])
                    //this.$emit('selectRandNum',this.randomList)
                    this.$emit('selectRandPos',this.randomPos,this.randomList)
                    break;
                }
            }
            this.vibrate()
        }
    },
    mounted(){
        var _this=this;
        this.myShakeEvent = new Shake({
            threshold: 15, // optional shake strength threshold
            timeout: 500 // optional, determines the frequency of event generation
        });
        this.myShakeEvent.start();
        window.addEventListener('shake', _this.shakefun);        
    },
    beforeDestroy(){
        var _this=this;
        this.myShakeEvent.stop();
        window.removeEventListener('shake', _this.shakefun);
    }
}
</script>
