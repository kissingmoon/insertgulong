<template>
    <parcel>
        <div class="agency">
            <div v-if="isAgency">
                <div class="agency-info">
                    <div>
                        <p>团队人数</p>
                        <p class="money">{{agencyInfo.count || 0}}</p>
                    </div>
                    <div>
                        <p>团队金额</p>
                        <p class="money">{{agencyInfo.sumTeamFlow || 0}}</p>
                    </div>
                    <div @click="goto">
                        <p class="follow">昨日团队流水</p>
                        <p class="money follow">{{agencyInfo.sumMoney || 0}}</p>
                    </div>
                </div>
                <div class="generalize">
                    <div class="title">我的推广ID</div>
                    <div class="url">
                        <p>{{agencyInfo.agentCode}}</p>
                    </div>
                    <div class="btn">
                        <button class="copy fn-copy-btn" :data-clipboard-text="agencyInfo.agentCode" @click="copy">复制</button>
                    </div>
                </div>
                <div class="generalize">
                    <div class="title">我的推广链接</div>
                    <div class="url">
                        {{agencyInfo.domainUrl}}
                    </div>
                    <div class="btn">
                        <button class="copy fn-copy-btn" :data-clipboard-text="agencyInfo.domainUrl" @click="copy">复制</button>
                        <button @click="share()">分享</button>
                    </div>
                </div>
            </div>
            <div v-else class="apply-agency">
                <button v-show="showBtn" @click="applyAgency">立即申请</button>
            </div>
            <router-view></router-view>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import Clipboard from 'clipboard';
    import NativeShare from 'native-share';
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import SelectTime from 'base/select-time/select-time';
    import DataNone from 'components/data-none/data-none';
    import {httpUrl} from 'common/js/map';
    import {mapGetters,mapMutations,mapActions} from 'vuex'
    export default {
        data() {
            return{
                pulldown: false,
                pullup: true,
                refreshStatus:false,
                loadStatus:false,
                isAllData:false,
                isAgency:false,
                showBtn:false,
                betList:[],
                betParam:{
                    page_no:1,
                    page_size:20,
                    data_type:4
                },
                agencyInfo:{
                    agentCode:'',
                    count:0,
                    sumMoney:0,
                    sumTeamFlow:0,

                }
            }
        },
        components:{
            Parcel,
            Scroll,
            SelectTime,
            DataNone
        },
        created() {
            this.judgeIsAgent();
        },
        computed: {
            ...mapGetters([
                'show_time'
            ])
        },
        methods: {
            ...mapMutations({
                setTip:'SET_TIP',
            }),
            goto(){
                this.$router.push({
                    path:'/info/agency/report'
                });
            },
            copy(){
                let clipboard = new Clipboard('.fn-copy-btn')
                clipboard.on('success', e => {
                    this.setTip('复制成功')
                    clipboard.destroy();
                });

                clipboard.on('error', e => {
                    this.setTip('复制成功')
                    clipboard.destroy()
                })
            },
            //分享
            share(command){
                const url = `${this.agencyInfo.domainUrl}/register`
                var nativeShare = new NativeShare()
                var shareData = {
                    title: '点击链接',
                    desc: '邀请码：85749632',
                    // 如果是微信该link的域名必须要在微信后台配置的安全域名之内的。
                    link: `${this.agencyInfo.domainUrl}/register`,
                    // link: this.agencyInfo.domainUrl+'/register',
                    icon: 'https://www.xlfd.com/img/images/userphoto/3.jpg',
                    // 不要过于依赖以下两个回调，很多浏览器是不支持的
                    success: function() {
                        console.log('success')
                    },
                    fail: function() {
                        console.log('fail')
                    }
                }
                nativeShare.setShareData(shareData)
                try {
                    nativeShare.call(command)
                } catch (err) {
                    // 不支持
                    this.setTip('浏览器不支持<br>请手动复制分享');
                }
            },
            //是否代理
            judgeIsAgent(){
                this.$axios.postRequest(httpUrl.info.isAgent)
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        this.isAgency = (res.data.isAgent == 1);
                        this.showBtn = true;
                        if(this.isAgency){
                            this.getAgentDetail();
                        }
                    };
                });
            },
            //申请代理
            applyAgency(){
                this.$axios.postRequest(httpUrl.info.applyAgent)
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        if(res.data.isCode == 0){
                            this.setTip('申请成功')
                            this.getAgentDetail();
                            this.isAgency = true;
                        }
                    };
                });
            },
            //获取代理数据
            getAgentDetail(){
                this.$axios.postRequest(httpUrl.info.agentDetail)
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        this.agencyInfo = res.data;
                    };
                });
            },
        },
        watch:{
            $route(newUrl){
                this.betParam.page_no=1;
                this.getBetList();
            }
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.agency{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    z-index: 203;
    background: $color-bg-gray;
    overflow: auto;
    .agency-info{
        display: flex;
        height:1.8rem;
        background: #fff;
        text-align: center;
        padding-top:0.2rem;
        div{
            flex:1;
            p{
                height:0.8rem;
                line-height: 0.8rem;
                font-size: $font-size-medium-x;
                &.money{
                    font-size: $font-size-small-x;
                    color:$color-red;
                }
                &.follow{
                    color:#ff9b1b;
                }
            }
        }
    }
    .generalize{
        padding-top:1rem;
        text-align: center;
        .title{
            height:0.8rem;
            line-height: 0.8rem;
            font-size: $font-size-large-m;
            color:$color-text-gray;
        }
        .url{
            padding:0.2rem 0.4rem;
            height:auto;
            overflow: hidden;
            line-height: 0.8rem;
            font-size: $font-size-large-xx;
        }
        .btn{
            padding-bottom:0.2rem;
            button{
                width:1.8rem;
                height:0.8rem;
                border:0px;
                background:#ff9b1b;
                color:#fff;
                font-size: $font-size-medium-x;
                border-radius: 0.1rem;
                padding:0;
                height:0.8rem;
                &.copy{
                    margin-right:0.4rem;
                    background:$color-red;
                }
            }
        }
    }
    .apply-agency{
        height:100%;
        text-align: center;
        button{
            width:8rem;
            height:1.2rem;
            margin-top: 40vh;
            border:0px;
            background:$color-red;
            color:#fff;
            font-size: $font-size-medium-x;
            border-radius: 0.1rem;
            padding:0;
            line-height: 1.2rem;
            
        }

    }
}
</style>
