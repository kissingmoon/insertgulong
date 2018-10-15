<template>
   <div class="flex flex-v wapper">
       <div class="flex top-wapper">
           <div>
                距{{lotteryInfo.show_qh}}期截止:{{drawCountTime}}
           </div>
           <div>
               余额：
           </div>
       </div>
       <div class="flex-1 main-wapper">
           <div v-for="(v,k) in socketList" :key="k">
               <div>{{v}}</div>
           </div>
       </div>
       <div class="flex footer">
           <div><input style="width:90%" type="text"></div>
            <div>
                <span v-on:click.stop="showBet">投注</span>
            </div>
       </div>
       <bet-board v-if="betKeyboard" class="bet-board">

       </bet-board>
   </div>
</template>
<script>
import {httpUrl} from 'common/js/map';
import {mapMutations,mapActions,mapGetters} from 'vuex';
import {slicer,countTime} from 'common/js/param.js';
import BetBoard from 'components/bet-room/bet-board';

export default {
    data(){
        return {
            header:{
                title:'房间列表',
                back:true
            },
            lotteryInfo:{},
            lotteryId:"",
            drawCountTime:'',
            lockTimes:'',
            socketList:[{
                neirong:"111"
            }],
            drawHistoryList:[],
            betKeyboard:false
        }
    },
    components:{
        BetBoard
    },
    created(){
        this.lotteryId=this.$route.query.id;
        this.header.title =this.$route.query.name;
        this.setHeader(this.header);
        if(this.user_token){
            this.openWebsocket()
            this.getLockTime()
        }
        else{
            this.$router.push({
                path:'/login'
            });
        }
    },
    computed:{
        ...mapGetters([
            'user_token'
        ])
    },
     methods:{
         ...mapMutations({
                setTip:'SET_TIP',
            }),
          //获取玩法封单时间
            getLockTime(){
                this.$axios.postRequest(httpUrl.bet.lockTime,{lottery_id:this.lotteryId})
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        this.lotteryInfo=res.data;
                        this.setCountTime(res.data.lock_time.replace(/-/g,'/'));
                    };
                });
            },
            getDrawHis(){
                this.$axios.postRequest(httpUrl.descover.drawNumber,{lottery_id:this.lotteryId,page_size:20,page_no:1})
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        // this.newDraw=res.data[0];
                        this.drawHistoryList=slicer(res.data,"kj_code",",");
                        //根据最近一期的开奖号码显示不同的颜色
                        // this.newDraw.resultList=showKjCodeByType(res.data[0].kj_code,this.lotteryType,this.xglhc_color)
                    };
                });
            },
            //倒计时功能
            setCountTime(dateStr) {
                const urlHash =this.$route.path;
                this.drawCountTime=countTime(dateStr);
                if(this.drawCountTime == "00:03:00"){
                    this.getDrawHis();
                }
                if (this.drawCountTime == "00:00:00" && urlHash == "/betroom") {
                    this.setTip(`${this.lotteryInfo.lottery_qh}期已封单,<br/>请在${this.lotteryInfo.next_qh}期继续投注`);
                    clearTimeout(this.getLockTimes);
                    this.getLockTimes = setTimeout(() => {
                        this.getLockTime();
                        this.getDrawHis();
                    },2000);
                }
                else if(urlHash == "/betroom"){
                    clearTimeout(this.lockTimes);
                    this.lockTimes=setTimeout(() => {
                        this.setCountTime(dateStr);
                    },1000);
                }
            },
         openWebsocket(){
            var websocket
             if ('WebSocket' in window) {
                 console.log(`${httpUrl.config.webSocket}/${this.$route.query.roomId}/${this.user_token}`)
                    websocket = new WebSocket(`${httpUrl.config.webSocket}/${this.$route.query.roomId}/${this.user_token}`);
                }
            else {
                    alert('当前浏览器 Not support websocket')
                }
            websocket.onopen = function () {
                alert("WebSocket连接成功");
                websocket.send("message");
            }
            //接收到消息的回调方法
            websocket.onmessage = event=> {
                alert("收到服务器消息了")
                // this.socketMessage=event.data;
                
                this.socketList.push(event.data)
            }
        },
        showBet(){
            this.betKeyboard=true;
        },
        hideBet(){
            this.betKeyboard=false;
        },
        ...mapMutations({
            setHeader:'SET_HEADER',
        })
     }
}
</script>
<style lang="scss" scoped>
.wapper{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0;
    z-index: 103;
    background: #ffffff;
    .bet-board{
        position: fixed;
        width: 100%;
        bottom: 0;
        z-index: 104;
        height: 80vh;
        background: #ffffff;
        overflow: auto;
    }
}
</style>


