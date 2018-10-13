<template>
    <div class="wapper">
        
        <div :style="roomStyle" v-for="(v,k) in trueTatalList" :key="k" v-on:click="gotoBetRoom(v)">
            {{v}}
        </div>
        <div>
            {{socketMessage}}
        </div>
        
    </div>
</template>
<script>
import {httpUrl} from 'common/js/map';
import {mapMutations,mapActions,mapGetters} from 'vuex';
export default {
    data(){
        return {
            trueTatalList:[],
            roomStyle:{
                marginTop:"30px"
            },
            socketMessage:"",
            header:{
                title:'房间列表',
                back:true
            }
        }
    },
    computed:{
    },
    created(){
        let parm={lotteryId:"cqssc"}
        this.header.title =this.$route.query.name;
        this.setHeader(this.header);
        this.$axios.postRequest(httpUrl.lottery.getRoomList,parm)    // httpUrl.home.lottery
        .then((res)=> {
            console.log(res.data.list)
            this.trueTatalList=res.data.list.concat();
        })
    },
    methods:{
        gotoBetRoom(v){
            var queryObj=this.$route.query;
            queryObj.roomId=v.roomId
            this.$router.push({
                path: '/betroom',
                query: queryObj
            });
        },
        
        ...mapMutations({
                setHeader:'SET_HEADER',
            }),
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

