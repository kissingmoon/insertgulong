<!-- 新的活动页面 -->
<template>
    <div class="wrap">
        <div class="items">
            <div class="item" v-for="(item,index) in activityList" :key="index" @click="goPage(item)">
                <div class="img">
                    <img :src="item.image_url" alt="">
                </div>
                <div class="con">
                    <p class="txt">{{item.title}}</p>
                    <p class="time">2018-01-01</p>
                </div>
            </div>  
        </div> 
        <router-view></router-view> 
    </div>
</template>

<script>
import {httpUrl,activityKind} from 'common/js/map';
import {mapActions,mapGetters,mapMutations} from 'vuex';
 export default {
    name:'',
    data () {
        return {
            activityParam:{
                order_by:1,
            },
            activityList:[],
        };
    },

    computed: {
        ...mapGetters([
            'user_token',
            'href_type'
        ])
    },
    created(){
        this.getDiscount();
    },
    methods: {
        getDiscount(){
            this.$axios.postRequest(httpUrl.discount.activity,this.activityParam)
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    this.activityList=res.data;
                }
            });
        },
        goPage(item){
            if(item.title=="欢乐中秋"){
                if(this.href_type){
                    context(item.turn_url);
                }else{
                    window.open(item.turn_url)
                }
            }
            else{
                this.$router.push({
                    path: '/discount/activity',
                    query: {title:item.title,url:item.turn_url}
                });
            }
        }
    },
    components: {},
}
</script>

<style lang='scss' scoped>
.wrap{    
    overflow: hidden;
    .items{
        padding: 1.7rem .3rem 1.44rem;
    }
    .item{
        padding: .3rem;
        display: flex;
        margin-bottom: .3rem;
        border: 1px solid #DA1C36;
        border-radius: .2rem;
        .img{
            width: 6rem;
            height: 2.7rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .con{
            width: 3rem;
            padding-left: .3rem;
            position: relative;
            .conTit{
                font-size: .4rem;
                font-weight: 700;
                line-height: .7rem;
                color: #000;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .txt{
                font-size: .4rem;
                color: #949494;
                line-height: .56rem;
                height: 1.6rem;
                margin-top: .3rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
            }
            .time{
                text-align: right;
                color: #949494;
                position: absolute;
                bottom: .2rem;
                left: 0;
                right: 0;
            }
        }
    }
}
</style>