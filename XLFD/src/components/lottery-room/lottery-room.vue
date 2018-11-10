<template>
    <div class="wapper">
        <div class="main-wapper">
            <div class="room-wapper" :style="roomStyle" v-for="(v,k) in trueTatalList" :key="k">
                <div class="room-title flex flex-align-center">
                    {{v.roomGroupName}}
                </div>
                <div class="room-content flex">
                    <div class="room-option" v-for="(v1,k1) in v.list" :key="k1" v-on:click="gotoBetRoom(v1)"> 
                        <div class="option-content flex flex-v">
                            <div class="option-body flex flex-v flex-center">
                                <div class="option-img">
                                    <img v-lazy="v1.roomImage" alt="">
                                </div>
                            </div>
                            <div class="option-footer flex flex-v">
                                <div class="flex-1 flex flex-center">{{v1.roomName}}</div>
                                <div class="flex-1 flex flex-center">
                                    <i class="online-count"></i>
                                    {{v1.onlineCount}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                marginTop:"0.4rem"
            },
            socketMessage:"",
            header:{
                title:'房间列表',
                back:true
            }
        }
    },
    computed:{
        ...mapGetters([
            'user_token'
        ])
    },
    created(){
        // let parm={lotteryId:"cqssc"}
        let parm={lotteryId:this.$route.query.id}
        this.header.title =this.$route.query.name;
        this.setHeader(this.header);
        this.$axios.postRequest(httpUrl.lottery.getRoomList,parm)    // httpUrl.home.lottery
        .then((res)=> {
            this.trueTatalList=res.data.data.concat();
        })
    },
    methods:{
        gotoBetRoom(v){
            this.setFoot(false)
            if(!this.user_token){
                this.$router.push({
                    path:'/login'
                });
            }else{
                var queryObj=this.$route.query;
                queryObj.roomId=v.roomId
                this.$router.push({
                    path: '/betroom',
                    query: queryObj
                });
            }
        },
        
        ...mapMutations({
                setHeader:'SET_HEADER',
                setFoot:'SET_FOOT_SHOW'
            }),
    }
}
</script>
<style lang="scss" scoped>
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.wapper{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0;
    overflow: auto;
    z-index: 103;
    background: #ffffff;
    -webkit-overflow-scrolling : touch;
    .main-wapper{
        height: 100%;
        -webkit-overflow-scrolling : touch;
        overflow: auto;
    }
    .room-wapper{
        .room-title{
            width: 3.9rem;
            height: 0.85rem;
            background-image: linear-gradient(-134deg, #FF5E74 0%, #C86DD7 100%);
            border-radius: 0 87px 87px 0;
            padding-left: 0.5rem;
            box-sizing: border-box;
            color: #ffffff;
            font-size: $font-size-medium;
        }
        .room-content{
            flex-wrap: wrap;
            .room-option{
                width: 50%;
                height: 6rem;
                padding: 0.5rem;
                box-sizing:border-box;
                .option-content{
                    border: 5px solid #CD9E62;
                    justify-content:flex-end;
                    height: 95%;
                    border-top-left-radius: 50% 40%;
                    border-top-right-radius: 50% 40%;
                    .option-body{
                        height: 4rem;
                        .option-img{
                            height: 2.1rem;
                            width: 2.8rem;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                    .option-footer{
                        height: 1.05rem;
                        background: #FFD3A0;
                        .online-count{
                            display: inline-block;
                            width: 0.35rem;
                            height: 0.35rem;
                            @include bg-image('member');
                            background-size: 100% 100%;

                        }
                    }
                }
            }
        }
    }
}
</style>

