<template>
    <parcel>
        <div class="follow-detail" :class="{ 'bottom-2rem': order.finish_status == 0}">
            <scroll ref="scroll" class="scroll-content" :data="showTbody" @setFans="setFans" :click="click">
                <div>
                    <div class="author-wrapper">
                        <attention-list :data="author" @setFans="setFans"></attention-list>
                    </div>
                    <div class="order-wrapper border-bottom-1px">
                        <div class="importance">
                            <div class="imp-left">
                                <div class="type">
                                    <span>{{order.lottery_name}}</span>
                                    <span>{{order.wf_name}}</span>
                                </div>
                                <div class="surplus">
                                    <span>追号<b>{{order.zhuih_count_qs}}</b>期</span>
                                    <span>剩<b>{{order.left_qh_count}}</b>期</span>
                                    <span v-show="order.zhuih_win_stop == 1">中奖即停</span>
                                </div>
                            </div>
                            <div class="imp-right">
                                <div class="brokerage">佣金:{{order.commission}}%</div>
                                <div class="rate">预计回报:<b>{{order.back_rate}}倍</b></div>
                            </div>
                            
                        </div>
                        <div class="tip" v-show="order.content && order.content.length > 0">
                            {{order.content}}
                        </div>
                        <div class="minor">
                            <div class="minor-left">
                                <p class="own">自购<b>{{order.user_pay_money}}</b>元</p>
                                <p class="people-num">跟单金额<b>{{order.gd_total_money}}</b>元</p>
                            </div>
                            <div class="minor-right">
                                <span><b>{{order.bet_min_money}}</b>元起投</span>
                            </div>
                        </div>
                        <div class="number-time">
                            <div class="number">
                                单号：{{order.gd_number}}
                            </div>
                            <div class="time">
                                发布时间:{{formatTime(order.create_time,'M-D&h:m')}}
                            </div>
                        </div>
                    </div>
                    <div class="number-wrapper border-bottom-1px">
                        <p v-show="order.show_hm">{{order.bet_number}}</p>
                        <p v-show="!order.show_hm" class="lock-main">跟单后号码可见<i class="icon-lock"></i></p>
                    </div>
                    <div class="title-wrapper">
                        <p :class="{'on':detailType}" @click="showDetail">方案详情</p>
                        <p :class="{'on':!detailType}" @click="showUser">跟单用户({{userList.length}})</p>
                    </div>
                    <div class="detail-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <td class="border-right-1px" v-for="(item,index) in showThead" :class="{'border-right':(1) != showThead.length}" :width="item.width" :key="index">{{item.title}}</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(group,g) in showTbody" :class="{'bg-even':g%2 != 0}" v-if="showTbody[0] !== null" :key="g">
                                    <td v-for="(item,index) in showThead" :key="index">
                                        <span v-if="item.key != 'kj_result'">{{group[item.key]}}</span>
                                        <span v-if="item.key == 'kj_result'">{{betType[group[item.key]]}}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </scroll>
            <div class="bet-content border-top-1px" v-show="order.finish_status == 0">
                <div class="bet-txt">
                    <p class="txt">
                        跟单金额：
                        <!-- <button class="minus" @click="changeGdMoney('minus')"><i class="icon-minus"></i></button> -->
                        <input type="tel" v-model.number="gdMoney" maxlength="6">
                        <!-- <button class="add" @click="changeGdMoney('add')"><i class="icon-add"></i></button> -->
                        元
                    </p>
                    <p class="money">账户余额：{{account.balance || 0}}元</p>
                </div>
                <div class="bet-btn">
                    <button @click="betFollow">立即投注</button>
                </div>
            </div>
            <loading v-show="loadingShow" :loadingTip="loadingTip"></loading>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import {mapMutations,mapActions,mapGetters} from 'vuex';
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import OrderList from 'base/order-list/order-list';
    import Loading from 'base/loading/loading';
    import AttentionList from 'base/attention-list/attention-list';
    import {httpUrl,betType} from 'common/js/map';
    import {timeFormat} from 'common/js/param';
    export default {
        data() {
            return{
                betType,
                detailType:true,
                click:true,
                loadingShow:false,  
                loadingTip:'正在提交...',
                author:[],
                order:{},
                detailList:[],
                userList:[],
                gdMoney:"",
                detailThead:[
                    {
                        title:'期号',
                        key:'lottery_qh',
                        width:'34%'
                    },
                    {
                        title:'开奖号码',
                        key:'kj_code',
                        width:''
                    },
                    {
                        title:'结果',
                        key:'kj_result',
                        width:'20%'
                    }
                ],
                userThead:[
                    {
                        title:'用户',
                        key:'nick_name',
                        width:'25%'
                    },
                    {
                        title:'跟单期数',
                        key:'gd_total_qs',
                        width:'20%'
                    },
                    {
                        title:'金额',
                        key:'gd_total_money',
                        width:'30%'
                    },
                    {
                        title:'跟单时间',
                        key:'create_time',
                        width:'34%'
                    }
                ],
                showThead:[],
                showTbody:[],
                setFansFlag:true
            }
        },
        components:{
            Parcel,
            Scroll,
            AttentionList,
            OrderList,
            Loading
        },
        created() {
            this.getDetail();
            this.showThead=this.detailThead;
        },
        computed: {
            ...mapGetters([
                'account',
                'user_token'
            ])
        },
        methods: {
            ...mapMutations({
                setTip:'SET_TIP',
            }),
            ...mapActions([
                'getUser'
            ]),
            getDetail(){
                const gd_number =this.$route.query.id;
                const user_flag =this.$route.query.flag;
                this.$axios.postRequest(httpUrl.info.followDetail,{gd_number,user_flag})
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        this.author.push(res.data.ds_info);
                        this.order=res.data.gd_info;
                        this.detailList=res.data.gd_detail;
                        this.userList=res.data.gd_user;
                        this.showTbody=res.data.gd_detail;
                        this.$refs.scroll.refresh();
                    };
                });
            },
            showDetail(){
                this.detailType=true;
                this.showThead=this.detailThead;
                this.showTbody=this.detailList;
                this.$refs.scroll.refresh();
            },
            showUser(){
                this.detailType=false;
                this.showThead=this.userThead;
                this.showTbody=this.userList;
                this.$refs.scroll.refresh();
            },
            setFans(index,status){
                if(this.setFansFlag==true){
                    let user_flag=this.author[index].user_flag;
                    this.$axios.postRequest(httpUrl.info.setAttention,{user_flag,status})
                    .then((res)=> {
                        if(res.data && !res.data.errorCode){
                            this.author[index].has_gz=!this.author[index].has_gz;
                            this.author[index].count_fans=status == 1? this.author[index].count_fans += 1 : this.author[index].count_fans -= 1;                            
                            this.setFansFlag=true;
                        };
                    });
                }
                this.setFansFlag=false;
            },
            betFollow(){
                if(!this.user_token){
                    this.$router.push({
                        path:'/login'
                    });
                    return;
                }
                this.loadingShow=true;
                this.$axios.postRequest(httpUrl.descover.betGd,{gd_number:this.order.gd_number,gd_money:this.gdMoney})
                .then((res)=> {
                    this.loadingShow=false;
                    if(res.data && !res.data.errorCode){
                        this.gdMoney="";
                        this.setTip('跟单成功');
                        this.getUser();
                    };
                })
                .catch((err) => {
                    this.loadingShow=false;
                });
            },
            changeGdMoney(type){
                if(!this.gdMoney){
                    this.gdMoney = 1;
                    return;
                }
                this.gdMoney = type == 'add'? this.gdMoney +1 : ((this.gdMoney - 1 <= 0)? 1:this.gdMoney - 1);
            },
            formatTime(times,type){
                return timeFormat(times,type);
            }
        },
        watch:{
            gdMoney(newVal,oldVal){
                const regex = /^\d*$/;
                if(!regex.test(newVal)) {
                    this.gdMoney = oldVal ;
                }
            }
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.follow-detail{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    z-index: 300;
    background: $color-bg;
    &.bottom-2rem{
        bottom:2.2rem;
    }
    
    .scroll-content{
        height:100%;
        overflow: hidden;
        .author-wrapper{
            border-bottom:0.2rem solid $color-bg-gray;
        }
        .order-wrapper{
            padding:0.3rem;
            height:auto;
            overflow: hidden;
            @include border-bottom-1px(solid,$color-border-gray);
            .importance{
                height:auto;
                overflow: hidden;
                .imp-left{
                    float: left;
                    width:6.2rem;
                    height:auto;
                    .type{
                        @include no-wrap();
                    }
                    .surplus{
                        padding: 0.2rem 0;
                        height:0.5rem;
                        line-height: 0.5rem;
                        color:$color-text-gray;
                        @include no-wrap();
                        span{
                            padding-right: 0.4rem;
                            b{
                                color:$color-red;
                            }
                        }
                        
                    }
                }
                .imp-right{
                    float:right;
                    width:3rem;
                    height:auto;
                    text-align: right;
                    .rate{
                        padding: 0.2rem 0;
                        height:0.5rem;
                        line-height: 0.5rem;
                        color:$color-text-gray;
                        b{
                            color:$color-red;
                        }
                    }
                };
                
            }
            .tip{
                padding-bottom: 0.3rem;
                line-height: 0.5rem;
            }
            .minor{
                height:auto;
                overflow: hidden;
                font-size: $font-size-small-x;
                padding-bottom: 0.3rem;
                b{
                    color:$color-red;
                }
                .minor-left{
                    float: left;
                    width:6.4rem;
                    .own{
                        float: left;
                    }
                    .people-num{
                        float:right;
                    }
                    
                }
                .minor-right{
                    float: right;
                    width:2.6rem;
                    text-align: right;
                    @include no-wrap();
                }
            }
            .number-time{
                height:auto;
                overflow: hidden;
                font-size: $font-size-small-x;
                color:$color-text-gray;
                .number{
                    float: left;
                }
                .time{
                    float: right;
                }
            }
        }
        .number-wrapper{
            padding:0.3rem;
            @include border-bottom-1px(solid,$color-border-gray);
            .lock-main{
                text-align: center;
                .icon-lock{
                    color:$color-text-gray;
                    padding-left: 0.2rem;
                }
            }
        }
        .title-wrapper{
            height:0.9rem;
            p{
                float: left;
                width:50%;
                height:0.9rem;
                line-height: 0.9rem;
                text-align: center;
                &.on{
                    color:$color-red;
                    @include border-bottom-1px(solid,$color-red);
                }
            }
        }
        .detail-wrapper{
            height:auto;
            overflow: hidden;
            
            table{
                width:100%;
                height:auto;
                overflow: hidden;
                thead{
                    height:0.6rem;
                    line-height: 0.6rem;
                    background:#E9E9E9 ;
                    tr{
                        font-size: $font-size-medium;
                        color:#6E6E6E;
                        text-align: center;
                        td{
                            padding: 0.1rem;
                            &.border-right{
                                @include border-right-1px(solid, rgb(218, 218, 218));
                            }
                        }
                    }
                }
                tbody{
                    line-height: 0.64rem;
                    background:#fff ;
                    height:auto;
                    overflow: hidden;
                    tr{
                        font-size: $font-size-small-x;
                        color:#6E6E6E;
                        text-align: center;
                        &.bg-even{
                            background:$color-bg-gray;
                        }
                        td{
                            padding: 0.1rem;
                        }
                    }
                }
            }
        }
    }
    .bet-content{
        position:fixed;
        bottom:0;
        height:2.2rem;
        width:100%;
        @include border-top-1px(solid, $color-border-gray);
        background:$color-bg-gray;
        z-index: 330;

        .bet-txt{
            float: left;
            padding-left:0.3rem;
            .txt{
                padding-top:0.45rem;
                height:0.75rem;
                display: flex;
                align-items: center;
                input{
                    height:0.64rem;
                    width:2.4rem;
                    line-height: 0.64rem;
                    text-align: center;
                    border:1px solid $color-border-gray;
                    margin: 0 0.2rem;
                }
                button{
                    height:0.67rem;
                    width:0.67rem;
                    background: #fff;
                    border-radius: 50%;
                    border:1px solid $color-red;
                    color:$color-red;
                    font-size: $font-size-medium-x;
                    padding:0;
                    line-height: 0.74rem;
                    text-align: center;
                }
            }
            .money{
                padding-top:0.3rem;
                font-size: $font-size-medium;
            }
            
        }
        .bet-btn{
            float:right;
            height:2.2rem;
            line-height: 2.2rem;
            padding-right: 0.4rem;
            button{
                height:0.7rem;
                line-height: 0.7rem;
                border-radius:0.08rem;
                background:$color-red;
                font-size: $font-size-medium;
                border:none;
                color:#fff;

            }
        }
    }
}
</style>
