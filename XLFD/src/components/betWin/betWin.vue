<!-- 中奖公告页面 -->
<template>
    <div class="betWinWrap">
        <scroll ref="scroll" class="scroll-content"
                :data="noticeList" 
                :isAllData="isAllData"
                :pulldown="pulldown"
                :pullup="pullup"
                :refreshStatus="refreshStatus"
                :loadStatus="loadStatus"
                @pulldown="getReport('down')"
                @pullup="getReport('up')"
                >
                <div>
                    <ul class="report-main">
                         <li class="item-mode border-bottom-1px" v-for="(item,index) in noticeList" :key='index'>
                             <span class="ico"></span>
                             <span class="txt">{{item.content}}</span>
                        </li>
                    </ul>
                </div>
                <data-none v-if="isNoData"></data-none>
        </scroll>
    </div>
</template>

<script>
    import Scroll from 'base/scroll/scroll';
    import Calendar from 'base/calendar/calendar';
    import DataNone from 'components/data-none/data-none';
    import {httpUrl} from 'common/js/map';
 export default {
    name:'slider',
    data () {
        return {
            pulldown: true,
            pullup: true,
            refreshStatus:false,
            loadStatus:false,
            isAllData:false,
            noticeList:[],
            reportParam:{
                pageNum:1,
                pageSize:30,
            },
            startTime:{
                display:"",
                show:false,
                zero:true,
            },
            endTime:{
                display:"",
                show:false,
                zero:true,
                
            },
            isNoData:false,
        };
    },

    computed: {},
    created(){
        this.getReport();
    },
    mounted() {
    },
    methods: {
        getReport(type){
            if(type == 'up'){
                this.loadStatus=true;
                ++this.reportParam.pageNum;
            }else if(type == 'down'){
                this.refreshStatus=true;
                this.reportParam.pageNum=1;
            }
            this.reportParam.startTime = this.startTime.display;
            this.reportParam.endTime = this.endTime.display;
            this.$axios.postRequest(httpUrl.bet.notice,this.reportParam)
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    if(type == 'up'){
                        this.loadStatus=false;
                        this.noticeList=this.noticeList.concat(res.data.list);
                        this.isAllData =res.data.list.length < 20 ? true : false;
                    }else{
                        this.refreshStatus=false;
                        this.noticeList=res.data.list;
                        this.isAllData=false;
                        if( res.data.list.length < 1 ){
                            this.isNoData = true
                        }
                    }
                };
            });
        },
    },

    components: {Scroll,DataNone},
}
</script>

<style lang='scss' scoped>
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
    .betWinWrap{
        position: fixed;
        width: 100%;
        top: 1.2rem;
        bottom: 0rem;
        z-index: 201;
        background: #fff;
        overflow: hidden;
        .bscroll{
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .scroll-content{
            height: 100%;
            .report-main{
                height: 100%;
                overflow: hidden;
                .item-mode{
                    display: flex;
                    height:0.8rem;
                    color: #949494;
                    padding-left: .4rem;
                    span{
                        display: inline-block;
                        vertical-align: middle;
                    }
                    .ico{
                        width: .8rem;
                        height: .8rem;
                        margin-right: .1rem;
                        @include bg-image('betwin-icon');
                        background-repeat: no-repeat;
                        background-position: center center;
                        background-size: 0.59rem;
                    }
                    .txt{
                        flex: 1;
                        width: 100%;
                        line-height: .79rem;
                        font-size: $font-size-small;
                        box-sizing: border-box;
                        @include no-wrap();
                        border-bottom: .01rem solid #D8D8D8;
                    }
                }
            }
        }
        
    }
    
</style>