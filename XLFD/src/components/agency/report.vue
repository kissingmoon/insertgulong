<template>
    <parcel>
        <div class="report">
            <scroll ref="scroll" class="scroll-content"
                :data="reportList" 
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
                         <li class="item-mode border-bottom-1px" v-for="item in reportList">
                            <div class="title-time">
                                <span class="title">{{item.pfmUserId}}</span>
                                <span class="time">{{item.createDate}}</span>
                            </div>
                            <div class="report-money">
                                <p>
                                    <span class="money">{{item.betValidMoney}}</span>元
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <data-none v-show="reportList && reportList.length < 1"></data-none>
            </scroll>
            <div v-show="show_search">
                <div class="background"></div>
                <div class="detail">
                    <div class="detail-wrapper clearfix">
                        <div class="detail-main">
                            <div class="title">
                                会员查询
                            </div>
                            <div class="user-id border-bottom-1px">
                                <p>
                                    <input type="text" maxlength="20" v-model="reportParam.userId" placeholder="请输入会员">
                                </p>
                            </div>
                            <div class="title">
                                选择日期
                            </div>
                            <div class="time-wrapper">
                                <p class="start-time">
                                    <input type="text" @click="selectStartTime($event)" v-model="startTime.display" placeholder="请选择日期" readonly>
                                </p>
                                <p>至</p>
                                <p class="end-time">
                                    <input type="text" @click="selectEndTime($event)" v-model="endTime.display" placeholder="请选择日期" readonly>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="detail-close">
                        <button class="m-r" @click="closeSearch">取消</button>
                        <button @click="search">确定</button>
                    </div>
                </div>
            </div>
            <transition name="fade">
                <div class="calendar-dropdown" v-if="startTime.show">
                    <calendar :zero="startTime.zero" 
                        :lunar="startTime.lunar" 
                        :value="startTime.value" 
                        :begin="startTime.begin" 
                        :end="startTime.end" 
                        @select="startTime.select">
                    </calendar>
                </div>
            </transition>
            <transition name="fade">
                <div class="calendar-dropdown" v-if="endTime.show">
                    <calendar :zero="endTime.zero" 
                        :lunar="endTime.lunar" 
                        :value="endTime.value" 
                        :begin="endTime.begin" 
                        :end="endTime.end" 
                        @select="endTime.select">
                    </calendar>
                </div>
            </transition>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import DataNone from 'components/data-none/data-none';
    import {httpUrl} from 'common/js/map';
    import {mapGetters,mapMutations} from 'vuex';
    import Calendar from 'base/calendar/calendar';
    export default {
        data() {
            return{
                pulldown: false,
                pullup: true,
                refreshStatus:false,
                loadStatus:false,
                isAllData:false,
                reportList:[],
                reportParam:{
                    pageNum:1,
                    pageSize:20,
                    userId:'',
                    startTime:'',
                    endTime:'',
                },
                startTime:{
                    display:"",
                    show:false,
                    zero:true,
                    value:[2018,8,1], //默认日期
                    lunar:false, //显示农历
                    select:(value)=>{
                        this.startTime.show=false;
                        this.startTime.value=value;
                        this.startTime.display=value.join("-");
                    }
                },
                endTime:{
                    display:"",
                    show:false,
                    zero:true,
                    value:[2018,8,1], //默认日期
                    lunar:false, //显示农历
                    select:(value)=>{
                        this.endTime.show=false;
                        this.endTime.value=value;
                        this.endTime.display=value.join("-");
                    }
                },
            }
        },
        components:{
            Parcel,
            Scroll,
            DataNone,
            Calendar
        },
        created() {
            this.getReport();
        },
        computed: {
            ...mapGetters([
                'show_search'
            ])
        },
        methods: {
            ...mapMutations({
                setShowSearch:'SET_SHOW_SEARCH',
            }),
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
                this.$axios.postRequest(httpUrl.info.orderByAgent,this.reportParam)
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        if(type == 'up'){
                            this.loadStatus=false;
                            this.reportList=this.reportList.concat(res.data.list);
                            this.isAllData =res.data.list.length < 20 ? true : false;
                        }else{
                            this.refreshStatus=false;
                            this.reportList=res.data.list;
                            this.isAllData=false;
                        }
                    };
                });
            },
            setTimeType(type){
                this.reportParam.data_type=type;
                this.reportParam.pageNum=1
                this.getReport();
            },
            // 显示
            show(key){
                this[key]=true;
            },
            // 隐藏
            hide(key){
                this[key]=false;
            },
            closeSearch(){
                this.setShowSearch(false);
            },
            selectStartTime(e){
                this.endTime.show=false;
                this.startTime.show=true;
                this.startTime.left=e.target.offsetLeft+19;
                this.startTime.top=e.target.offsetTop+140;
            
                e.stopPropagation();
                window.setTimeout(()=>{
                    document.addEventListener("click",(e)=>{
                        this.startTime.show=false;
                        document.removeEventListener("click",()=>{},false);
                    },false);
                },1000)
            },
            selectEndTime(e){
                this.startTime.show=false;
                this.endTime.show=true;
                this.endTime.left=e.target.offsetLeft+19;
                this.endTime.top=e.target.offsetTop+140;
            
                e.stopPropagation();
                window.setTimeout(()=>{
                    document.addEventListener("click",(e)=>{
                        this.endTime.show=false;
                        document.removeEventListener("click",()=>{},false);
                    },false);
                },1000)
            },
            search(){
                this.setShowSearch(false);
                this.reportParam.pageNum=1;
                this.getReport();
            }
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.report{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    z-index: 303;
    background: $color-bg;
    .scroll-content{
        height: 100%;
        overflow: hidden;
        .report-main{
            height: 100%;
            overflow: hidden;
            .item-mode{
                height:1.33rem;
                padding:0.3rem;
                background: $color-bg;
                @include border-bottom-1px(solid,$color-border-gray);
                .title-time{
                    float: left;
                    height:1.33rem;
                    line-height: 1.33rem;
                    .title{
                        float: left;
                        display: block;
                        height:1.33rem;
                        width:3rem;
                        font-size: $font-size-medium-x;
                        @include no-wrap();
                    }
                    .time{
                        float: left;
                        display: block;
                        height:1.33rem;
                        width:3rem;
                        text-align: center;
                        font-size: $font-size-medium;
                        color: $color-text-gray;
                    }
                }
                .report-money{
                    float:right;
                    display: flex;
                    box-sizing: border-box;
                    align-items: center;
                    height: 1.33rem;
                    font-size: $font-size-medium-x;
                    text-align: right;
                    .money{
                        color:$color-red;
                    }
                }
            }
        }
    }
    .background {
        position:fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 400;
        background:$color-bg-shade-a5;
    }
    .detail{
        position:fixed;
        top:calc((100% - 10rem) / 2);
        left:1rem;
        z-index:1200;
        width:8rem;
        height:7.8rem;
        overflow:auto;
        background:$color-bg;
        border-radius: 0.2rem;
        .detail-wrapper{
            min-height:100%;
            .detail-main{
                padding-bottom:1.4rem;
                .title{
                    height:1rem;
                    padding:0.4rem 0.4rem 0;
                    line-height: 1rem;
                    text-align: center;
                    font-size: $font-size-large;
                }
                .user-id{
                    height:1rem;
                    margin: 0rem 0.6rem;
                    padding-bottom:0.7rem;
                    @include border-bottom-1px(solid,$color-border-gray);
                    p{
                        height:1rem;
                        border:1px solid $color-border-gray;
                        border-radius: 0.16rem;
                        padding-left:0.9rem;
                        @include bg-image('icon-user');
                        background-position: 0.1rem center;
                        background-size: 0.7rem;
                        background-repeat: no-repeat;
                        input{
                            height:0.6rem;
                            background:none;
                            border: 0;
                            width:100%;
                            padding:0.2rem 0;
                        }
                    }
                    
                }
                .time-wrapper{
                    height:1rem;
                    margin: 0rem 0.6rem;
                    p{
                        float: left;
                        height:1rem;
                        line-height: 1rem;
                        &.start-time{
                            width:2.94rem;
                            border:1px solid $color-border-gray;
                            border-radius: 0.16rem;
                            margin-right:0.2rem; 
                        }
                        &.end-time{
                            float: right;
                            width:2.94rem;
                            border:1px solid $color-border-gray;
                            border-radius: 0.16rem;
                            margin-left:0.2rem;
                        }
                        input{
                            height:0.6rem;
                            background:none;
                            border: 0;
                            width:100%;
                            padding:0.2rem 0;
                            text-align: center
                        }
                    }
                }
            }
        }
        .detail-close{
            position:relative;
            margin:-1.4rem auto 0 auto;
            clear:both;
            text-align: center;
            button{
                height:0.8rem;
                width:2.5rem;
                text-align: center;
                background:$color-red;
                color: #fff;
                font-size: $font-size-medium-x;
                border-radius: 0.1rem;
                border:0;
                &.m-r{
                    margin-right: 0.5rem;
                    background:$color-yellow;
                    color:$color-text;
                }
            }
        }
    }
}
.flex{
    box-sizing: border-box;

    display: -webkit-box;
    -webkit-box-pack: start;
    -webkit-box-align: start;

    display: -webkit-flex;
    -webkit-justify-content: space-between;
    -webkit-align-items: top;

    display: flex;
    justify-content: space-between;
    align-items: top;
    flex-flow:row wrap
}
.flex>div{
    margin:0.27rem;
    padding:0.53rem;
    width:25%;
    min-width:8rem;
    border: 1px solid #eee;
    border-radius: 0.05rem;
    position: relative;
}
.flex>div>span{
    position: absolute;
    left:0px;
    top:0px;
    padding:0.05rem 0.27rem;
    font-size:0.27rem;
    border-radius:0 0 0.05rem 0;
    background:#ea6151;
    color:#fff;
}
.flex>div>input{
    box-sizing: border-box;
    width:100%;
    margin-top:0.53rem;
    border-radius: 0.05rem;
    border:1px solid #dedede;
    padding:0.27rem;
    font-size: 0.426rem;
    background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWwpAZm9udC1mYWNlIHsgZm9udC1mYW1pbHk6IGlmb250OyBzcmM6IHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUuZW90PyNpZWZpeCIpIGZvcm1hdCgiZW1iZWRkZWQtb3BlbnR5cGUiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS53b2ZmIikgZm9ybWF0KCJ3b2ZmIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUudHRmIikgZm9ybWF0KCJ0cnVldHlwZSIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LnN2ZyNpZm9udCIpIGZvcm1hdCgic3ZnIik7IH0KCl1dPjwvc3R5bGU+PC9kZWZzPjxnIGNsYXNzPSJ0cmFuc2Zvcm0tZ3JvdXAiPjxnIHRyYW5zZm9ybT0ic2NhbGUoMC4wMTU2MjUsIDAuMDE1NjI1KSI+PHBhdGggZD0iTTcxMS4zMDYyIDI5MC42OTcyYzI0LjI4MjEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTU0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMjYgMC00My45ODggMTkuNzI4NC00My45ODggNDQuMDUzNXYyMDAuMTA0OTZDNjY3LjMxODMgMjcwLjk5MDMgNjg3LjAwMzYgMjkwLjY5NzIgNzExLjMwNjIgMjkwLjY5NzJ6TTYyMy40ODA4IDExMy40MjAzSDQwMC43NjQ5Mjh2NjYuNTEzOTJoMjIyLjcxNTkwNDAwMDAwMDAyVjExMy40MjAyODh6TTg4NC4wNTMgMTEzLjQyMDNoLTgyLjc3NDAxNnY2Ni4xNDUyOGg4NS45NDAyMjRjMjUuMjc4NSAwIDQ2LjYxMTUgMjEuMzc2IDQ2LjYxMTUgNDYuNjc3djE1My45Mjc2OEg5MC40Mzg2NTYwMDAwMDAwMXYtMTUzLjkyNzY4YzAtMjUuMyAyMS4zMzMtNDYuNjc3IDQ2LjYxMTUtNDYuNjc3aDg2LjUwMzQyNFYxMTMuNDIwMjg4aC04Mi42NDI5NDRjLTY0LjA4NiAwLTExNi41MDc2IDUyLjUwODctMTE2LjUwNzYgMTE2LjcwMzJ2Njc2LjgwMTUzNTk5OTk5OTljMCA2NC4xNzQxIDUwLjQ5MTQgMTE2LjY4MDcgMTE0LjU3NzQgMTE2LjY4MDdIODg0LjA1Mjk5MmM2NC4wNjI1IDAgMTE2LjUwNjYtNTIuNTA2NiAxMTYuNTA2Ni0xMTYuNjgwN1YyMzAuMTIzNTE5OTk5OTk5OThDMTAwMC41NTk2IDE2NS45MjkgOTQ4LjExNDQgMTEzLjQyMDMgODg0LjA1MyAxMTMuNDIwM3pNOTMzLjgyOTYgOTEwLjM1MTRjMCAyNS4zLTIxLjMzMyA0Ni42NzYtNDYuNjExNSA0Ni42NzZIMTM3LjA1MDExMTk5OTk5OTk4Yy0yNS4yNzg1IDAtNDYuNjExNS0yMS4zNzYtNDYuNjExNS00Ni42NzZWNDQ2LjQ0NTU2OEg5MzMuODI5NjMyVjkxMC4zNTEzNnpNMjY3LjEwODQgNjQ2LjE4MTljMzYuODc3MyAwIDY2Ljc1MjUtMjkuOTM5NyA2Ni43NTI1LTY2Ljg4MTUgMC0zNi45MjI0LTI5Ljg3NTItNjYuODYxMS02Ni43NTI1LTY2Ljg2MTEtMzYuODU0OCAwLTY2Ljc1MjUgMjkuOTM5Ny02Ni43NTI1IDY2Ljg2MTFDMjAwLjM1NTggNjE2LjI0MjIgMjMwLjI1MjUgNjQ2LjE4MTkgMjY3LjEwODQgNjQ2LjE4MTl6TTUxMS41NDg0IDY0Ni4xODE5YzM2Ljg1NTggMCA2Ni43NTI1LTI5LjkzOTcgNjYuNzUyNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTU3LTY2Ljg2MTEtNjYuNzUyNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzQ0NC43OTU5IDYxNi4yNDIyIDQ3NC42NzExIDY0Ni4xODE5IDUxMS41NDg0IDY0Ni4xODE5ek0yNjUuOTE2NCA4OTAuNzA5YzM2Ljg3NzMgMCA2Ni43NTE1LTI5LjkzOTcgNjYuNzUxNS02Ni44NjExIDAtMzYuOTQyOC0yOS44NzQyLTY2Ljg4MjYtNjYuNzUxNS02Ni44ODI2LTM2Ljg1NTggMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44ODI2QzE5OS4xNjM5IDg2MC43NjkzIDIyOS4wNTk2IDg5MC43MDkgMjY1LjkxNjQgODkwLjcwOXpNNTExLjU0ODQgODkwLjcwOWMzNi44NTU4IDAgNjYuNzUyNS0yOS45Mzk3IDY2Ljc1MjUtNjYuODYxMSAwLTM2Ljk0MjgtMjkuODk1Ny02Ni44ODI2LTY2Ljc1MjUtNjYuODgyNi0zNi44NzczIDAtNjYuNzUyNSAyOS45Mzk3LTY2Ljc1MjUgNjYuODgyNkM0NDQuNzk1OSA4NjAuNzY5MyA0NzQuNjcxMSA4OTAuNzA5IDUxMS41NDg0IDg5MC43MDl6TTc1NS42NDEzIDY0Ni4xODE5YzM2Ljg1NjggMCA2Ni43NTM1LTI5LjkzOTcgNjYuNzUzNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTY3LTY2Ljg2MTEtNjYuNzUzNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzY4OC44ODk5IDYxNi4yNDIyIDcxOC43NjQgNjQ2LjE4MTkgNzU1LjY0MTMgNjQ2LjE4MTl6TTMxMS43MDM2IDI5MC42OTcyYzI0LjI4MTEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTQ0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMTYgMC00My45ODkgMTkuNzI4NC00My45ODkgNDQuMDUzNXYyMDAuMTA0OTZDMjY3LjcxNDYgMjcwLjk5MDMgMjg3LjQwMiAyOTAuNjk3MiAzMTEuNzAzNiAyOTAuNjk3MnoiIGZpbGw9IiM1ZTdhODgiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==) no-repeat 8px 0.27rem;
        padding-left: 0.96rem;
        color:#666;
}

/*transition*/
.fade-enter-active,
.fade-leave-active {
    transition: all .5s ease-in-out;
}
.fade-enter,.fade-leave-active{
    opacity: 0;
    transform: translateY(-0.27rem);

}

/*下拉框*/
.calendar-dropdown{
    background: #fff;
    position: absolute;
    left:0.9rem;
    top:50%;
    padding:0.1rem;
    border: 1px solid #eee;
    border-radius: 0.05rem;
    z-index: 10000;
}
// .calendar-dropdown:before {
//     position: absolute;
//     left:0.8rem;
//     top: -0.27rem;
//     content: "";
//     border:0.133rem solid rgba(0, 0, 0, 0);
//     border-bottom-color: #DEDEDE;
// }
// .calendar-dropdown:after {
//     position: absolute;
//     left:0.8rem;
//     top: -0.26rem;
//     content: "";
//     border:0.133rem solid rgba(0, 0, 0, 0);
//     border-bottom-color: #fff;
// }

/*弹出框*/
.calendar-dialog{
    position: absolute;
    left:1rem;
    top:calc(104% / 2);
    right:1rem;
    height: auto;
    overflow: hidden;
    z-index: 10000;
    border:1px solid #ccc;
    background: #fff;
}

.calendar-dialog-mask{
    background:rgba(255,255,255,.5);
    width:100%;
    height:100%;
}

.calendar-dialog-body{
    background: #fff;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    padding:0.53rem;
    border: 1px solid #eee;
    border-radius: 0.05rem;
}

</style>
