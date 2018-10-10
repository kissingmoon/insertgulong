<template>
    <div class="wapper">
        <div :style="roomStyle" v-for="(v,k) in trueTatalList" :key="k" v-on:click="openWebsocket(v)">
            {{v}}
        </div>
        <div>
            {{socketMessage}}
        </div>
    </div>
</template>
<script>
import {httpUrl} from 'common/js/map';

export default {
    data(){
        return {
            trueTatalList:[],
            roomStyle:{
                marginTop:"30px"
            },
            socketMessage:""
        }
    },
    computed:{
    },
    created(){
        let parm={lotteryId:"cqssc"}
        this.$axios.postRequest(httpUrl.lottery.getRoomList,parm)    // httpUrl.home.lottery
        .then((res)=> {
            console.log(res.data.list)
            this.trueTatalList=res.data.list.concat();
        })
    },
    methods:{
        openWebsocket(v){
            var websocket
             if ('WebSocket' in window) {
                    websocket = new WebSocket(`${httpUrl.config.webSocket}/${v.roomId}/889798798`);
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
                this.socketMessage=event.data;
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.wapper{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 1.44rem;
}
</style>

