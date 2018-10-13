<template>
   <div class="wapper">
       <div class="top-wapper">
           这里是开奖信息
       </div>
       <div class="main-wapper">
           中间消息框
       </div>
       <div class="footer">
           这里是输入框
       </div>
   </div>
</template>
<script>
import {httpUrl} from 'common/js/map';
import {mapMutations,mapActions,mapGetters} from 'vuex';

export default {
    data(){
        return {
            header:{
                title:'房间列表',
                back:true
            }
        }
    },
    created(){
        this.header.title =this.$route.query.name;
        this.setHeader(this.header);
        if(this.user_token){
            this.openWebsocket()
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
                this.socketMessage=event.data;
            }
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
    bottom: 1.44rem;
}
</style>


