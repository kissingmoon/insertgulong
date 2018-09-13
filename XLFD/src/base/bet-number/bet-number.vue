<template>
    <div class="lottery-number-content">
        <div class="lottery-option-main" v-for="(posi,p) in numList" :key="p">
            <div class="position-main" v-if="posi.isCanTopFastPick">
                <div class="position-item" @click="selectPosi(0)">
                    <p class="icon-con" :class="{'on': selectPosition && selectPosition.indexOf(0) != -1}"><i class="icon-right"></i></p>
                    <p class="txt">万位</p>
                </div>
                <div class="position-item" @click="selectPosi(1)">
                    <p class="icon-con" :class="{'on': selectPosition && selectPosition.indexOf(1) != -1}"><i class="icon-right"></i></p>
                    <p class="txt">千位</p>
                </div>
                <div class="position-item" @click="selectPosi(2)">
                    <p class="icon-con" :class="{'on': selectPosition && selectPosition.indexOf(2) != -1}"><i class="icon-right"></i></p>
                    <p class="txt">百位</p>
                </div>
                <div class="position-item" @click="selectPosi(3)">
                    <p class="icon-con" :class="{'on': selectPosition && selectPosition.indexOf(3) != -1}"><i class="icon-right"></i></p>
                    <p class="txt">十位</p>
                </div>
                <div class="position-item" @click="selectPosi(4)">
                    <p class="icon-con" :class="{'on': selectPosition && selectPosition.indexOf(4) != -1}"><i class="icon-right"></i></p>
                    <p class="txt">个位</p>
                </div>
            </div>
            <div class="option-wrapper">
                <div class="option-title" v-if="posi.isShowSign&&posi.backgroundType != 4">
                    <p>{{posi.title}}<span class="angle"></span></p>
                </div>
                <div class="k3-tuodan-title flex flex-center" v-if="posi.isShowSign&&posi.backgroundType == 4">
                    <p>{{posi.title}}<span class="k3-tuodan-angle"></span></p>
                </div>
                <div class="option-item-wrapper" :class="{'kuai3':isKuai3,'cq':isCQ,'bj':isbj}" v-if="posi.backgroundType == 1">
                    <div class="option-item" :class="{'mr37':posi.is28OrLhc}" v-for="(item,i) in posi.buyNumberBeanList" @click="selectNum(p,i,item.number_str)" :key="i">
                        <p class="num-con" :class="{'on': selectNumList[p] && selectNumList[p].indexOf(item.number_str) != -1}">{{item.str}}</p>
                        <p class="txt" v-if="posi.isShowOdds">{{item.pl}}</p>
                    </div>
                </div>
                <div class="option-item-wrapper texiao" v-if="posi.backgroundType == 2 && !sebo">
                    <div class="option-item zodiac-item" v-for="(item,i) in posi.buyNumberBeanList" @click="selectNum(p,i,item.number_str)" :key="i">
                        <div class="zodiac-con" :class="{'on': selectNumList[p] && selectNumList[p].indexOf(item.number_str) != -1}">
                            <div class="zodiac-title" v-html="item.number_str"></div>
                            <div class="txt" v-if="posi.isShowOdds">赔率{{item.pl}}</div>
                            <div class="zodiac-num" v-html="item.str"></div>
                        </div>
                    </div>
                </div>
                <div class="option-item-wrapper sebo" v-if="posi.backgroundType == 2 && sebo">
                    <div class="sebo-item" v-for="(item,i) in posi.buyNumberBeanList" @click="selectNum(p,i,item.number_str)" :key="i">
                        <div class="txt" :class="{'redColor': item.pl_flag == 'hongbo', 'greenColor': item.pl_flag == 'lvbo', 'blueColor': item.pl_flag == 'lanbo'}">
                            {{item.number_str}}赔率{{item.pl}}
                        </div>
                        <div class="zodiac-num"
                                :class="{'redColor': item.pl_flag == 'hongbo', 'greenColor': item.pl_flag == 'lvbo', 'blueColor': item.pl_flag == 'lanbo',
                                'on': selectNumList[p] && selectNumList[p].indexOf(item.number_str) != -1}">
                            <span v-for="(num,index) in item.nums" :key="index">
                                {{num}}
                            </span>
                        </div>
                    </div>
                </div>
                
                <!-- <div class="option-item-wrapper texiao" v-else>
                    <div class="option-item zodiac-item" v-for="(item,i) in posi.buyNumberBeanList" @click="selectNum(p,i,item.number_str)" :key="i">
                        <div class="zodiac-con" :class="{'on': selectNumList[p] && selectNumList[p].indexOf(item.number_str) != -1}">
                            <div class="zodiac-title" v-html="item.number_str"></div>
                            <div class="txt" v-if="posi.isShowOdds">赔率{{item.pl}}</div>
                            <div class="zodiac-num" v-html="item.str"></div>
                        </div>
                    </div>
                </div> -->
                <div class="option-item-wrapper other" :class="{'dds': posi.title == '定单双'}" v-if="posi.backgroundType == 3">
                    <div class="option-item" v-for="(item,i) in posi.buyNumberBeanList" @click="selectNum(p,i,item.number_str)" :key="i">
                        <div class="wrap" :class="{'on': selectNumList[p] && selectNumList[p].indexOf(item.number_str) != -1}">
                            <div class="oval-con" v-html="item.str">
                            </div>
                            <div class="txt" v-if="posi.isShowOdds">赔率{{item.pl}}</div>
                        </div>
                    </div>
                </div>
                <div class="option-item-wrapper flex flex-v" v-if="posi.backgroundType == 4&&!posi.isShowSign">
                    <div class="newk3-title">{{posi.wfBean.help}}赔率{{posi.wfBean.wf_pl[0].award_money}}</div>
                    <div class="newk3-body flex">
                        <div class="option-item " v-for="(item,i) in posi.buyNumberBeanList" @click="selectNum(p,i,item.number_str)" :key="i">
                            <div class="newk3-item flex flex-center" :class="{'on': selectNumList[p] && selectNumList[p].indexOf(item.number_str) != -1}">
                                {{item.str}}
                            </div>
                        </div>
                    </div>                    
                </div>
                <div class="option-item-wrapper flex flex-v" v-if="posi.backgroundType == 4&&posi.isShowSign">
                    
                    <div class="tuodan-body flex">
                        <div class="option-item " v-for="(item,i) in posi.buyNumberBeanList" @click="selectNum(p,i,item.number_str)" :key="i">
                            <div class="tuodan flex flex-center" :class="{'on': selectNumList[p] && selectNumList[p].indexOf(item.number_str) != -1}">
                                {{item.str}}
                            </div>
                        </div>
                    </div>                    
                </div>
                <div class="option-item-wrapper flex flex-v" v-if="posi.backgroundType == 5">
                    <div class="newk3-title flex flex-center">{{posi.wfBean.help}}赔率{{posi.wfBean.wf_pl[0].award_money}}</div>
                    <div class="tongxuan-body flex flex-center" >
                        <div class="tongxuan-item flex flex-center" @click="selectKind(p,6)"  :class="{'on': selectNumList[0].length!=0 }"  >
                            {{posi.wfBean.title}}
                        </div>
                    </div>                    
                </div>
                <div class="option-item-wrapper flex flex-v" v-if="posi.backgroundType == 6">
                    <div class="newk3-title flex flex-center">{{posi.wfBean.help}}</div>
                    <div class="hezhi-body flex flex-center" >
                           <div class="hezhi-item flex flex-center" :class="{'on': kindTypeList[p] && kindTypeList[p][1] == 1}" @click="selectKind(p,1)">大</div>
                            <div class="hezhi-item flex flex-center" :class="{'on': kindTypeList[p] && kindTypeList[p][2] == 1}" @click="selectKind(p,2)">小</div>
                            <div class="hezhi-item flex flex-center" :class="{'on': kindTypeList[p] && kindTypeList[p][3] == 1}" @click="selectKind(p,3)">单</div>
                            <div class="hezhi-item flex flex-center" :class="{'on': kindTypeList[p] && kindTypeList[p][4] == 1}" @click="selectKind(p,4)">双</div>                     
                        <div class="hezhi-item flex flex-v flex-center"  v-for="(item,i) in posi.buyNumberBeanList" :key="i" @click="selectNum(p,i,item.number_str)" :class="{'on': selectNumList[p] && selectNumList[p].indexOf(item.number_str) != -1}">
                           <p class="hezhi-item-num flex flex-center">{{item.str}}</p>
                           <p class="hezhi-item-pl">赔率{{item.pl}}</p>   
                        </div>
                    </div>                    
                </div>
            </div>
            <div class="optino-kind border-top-1px  border-bottom-1px" v-if="posi.isCanBottomFastPick">
                <div class="kind-item" :class="{'on': kindTypeList[p] && kindTypeList[p][0] == 1&&posi.backgroundType<4,'on-k3':kindTypeList[p] && kindTypeList[p][0] == 1&&posi.backgroundType>=4}" :data-txt="kindTypeList[p]" @click="selectKind(p,0)">全</div>
                <div class="kind-item" :class="{'on': kindTypeList[p] && kindTypeList[p][1] == 1&&posi.backgroundType<4,'on-k3':kindTypeList[p] && kindTypeList[p][1] == 1&&posi.backgroundType>=4}" @click="selectKind(p,1)">大</div>
                <div class="kind-item" :class="{'on': kindTypeList[p] && kindTypeList[p][2] == 1&&posi.backgroundType<4,'on-k3':kindTypeList[p] && kindTypeList[p][2] == 1&&posi.backgroundType>=4}" @click="selectKind(p,2)">小</div>
                <div class="kind-item" :class="{'on': kindTypeList[p] && kindTypeList[p][3] == 1&&posi.backgroundType<4,'on-k3':kindTypeList[p] && kindTypeList[p][3] == 1&&posi.backgroundType>=4}" @click="selectKind(p,3)">单</div>
                <div class="kind-item" :class="{'on': kindTypeList[p] && kindTypeList[p][4] == 1&&posi.backgroundType<4,'on-k3':kindTypeList[p] && kindTypeList[p][4] == 1&&posi.backgroundType>=4}" @click="selectKind(p,4)">双</div>
                <div class="kind-item" @click="selectKind(p,5)">清</div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    
    export default {
        data(){
            return{
                kindTypeList:new Array(100),
                isKuai3:false,     //  判断是否是快3
                isCQ:false,        //  判断是否是重庆时时彩
                isLHC:false,
                isbj:false,
                sebo:false,         //  色波
            }
        },
        props: {
            numList:{
                type: Array,
                default: []
            },
            selectNumList:{
                type: Array,
                default: new Array(100)
            },
            selectPosition:{
                type: Array,
                default: []
            }
        },
        mounted(){
            this.init();
            this.getType(this.$route.query.type)
        },
        computed: {
        },
        methods:{
            init(){
                // for(var i = 0;i<this.numList.length;i++){
                //     this.kindTypeList=[];
                //     this.kindTypeList.push();
                // }
            },
            getType(type){
                switch (type) {
                    case '1':
                        this.isCQ = true;
                        break;
                    case '6':
                        this.isLHC = true;
                        break;
                    case '9':
                        this.isKuai3 = true;
                        break;
                    case '10':
                        this.isbj = true;
                        break;
                    default:
                        break;
                }
            },
            //  六合彩玩法分类
            getLHtype(name){
                if(name == 'xglhc_sebo_sebo'){
                    this.sebo = true;
                }else{
                    this.sebo = false;
                }
            },
            //  获取色波的数字号码
            getSeboNums(){
                if(this.numList[0] && this.numList[0].wfBean.name == '色波'){
                    let data = this.numList[0].buyNumberBeanList;
                    let numsArr;
                    for(let i = 0; i < data.length; i++){
                        numsArr = data[i].str.replace(/[^0-9]/ig,",").split(',');
                        let str = data[i].str.replace(/[^0-9]/ig,'')
                        numsArr = str.replace(/s/g, '').replace(/(.{2})/g, "$1 ").split(' ');
                        numsArr.pop()
                        this.numList[0].buyNumberBeanList[i].nums = numsArr
                    }
                }
            },
            selectNum(p,i,num){
                this.$emit('selectNum',p,i,num)
            },
            selectPosi(num){
                this.$emit('selectPosi',num)
            },
            selectKind(p,type){
                const arr =[];
                const numberList=this.numList[p].buyNumberBeanList;
                const length=numberList.length;
                switch(type){
                    case 0:
                        this.kindTypeList.splice(p,1,[1,0,0,0,0,0]);
                        numberList.forEach((item,i) => {
                            arr.push(item.number_str);
                        });
                        break;
                    case 1:
                        this.kindTypeList.splice(p,1,[0,1,0,0,0,0]);
                        numberList.forEach((item,i) => {
                            if(i >= Math.floor(length/2)){
                                arr.push(item.number_str);
                            }
                        });
                        break;
                    case 2:
                        this.kindTypeList.splice(p,1,[0,0,1,0,0,0]);
                        numberList.forEach((item,i) => {
                            if(i < Math.floor(length/2)){
                                arr.push(item.number_str);
                            }
                        });
                        break;
                    case 3:
                        this.kindTypeList.splice(p,1,[0,0,0,1,0,0]);
                        numberList.forEach((item,i) => {
                            if(parseInt(item.number_str) % 2 == 1){
                                arr.push(item.number_str);
                            }
                        });
                        break;
                    case 4:
                        this.kindTypeList.splice(p,1,[0,0,0,0,1,0]);
                        numberList.forEach((item,i) => {
                            if(parseInt(item.number_str) % 2 == 0){
                                arr.push(item.number_str);
                            }
                        });
                        break;
                    case 5:
                        this.kindTypeList.splice(p,1,[0,0,0,0,0,1]);
                        break;
                    case 6:
                        if(this.selectNumList[0].length!=0){
                            this.kindTypeList.splice(p,1,[0,0,0,0,0,1]);
                        }else{
                            this.kindTypeList.splice(p,1,[1,0,0,0,0,0]);
                            numberList.forEach((item,i) => {
                                arr.push(item.number_str);
                            });
                        }
                        
                    break;
                }
                this.$emit('selectKind',p,arr);
            },
            clearKind(){
                this.kindTypeList=new Array(100);
            }
        },
        watch:{
            numList(){
                this.kindTypeList=new Array(100);
                this.getSeboNums();
                this.getLHtype(this.numList[0].wfBean.wf_flag)
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "~common/scss/variable";
    @import 'common/scss/mixin.scss';
    .lottery-number-content{
        height: auto;
        overflow: hidden;
        
        .lottery-option-main{
            height: auto;
            overflow: hidden;
            .position-main{
                display: flex;
                height:1.4rem;
                text-align: center;
                overflow: hidden;
                .position-item{
                    flex: 1;
                    text-align: center;
                    color: #A9A9A9;
                    font-size: $font-size-small-x;
                    padding-top:0.15rem;
                    .icon-con{
                        height:0.56rem;
                        width:0.56rem;
                        line-height: 0.56rem;
                        text-align: center;
                        overflow: hidden;
                        margin: 0 auto;
                        border:1px solid #979797;
                        border-radius: 50%;
                        &.on{
                            border-color:$color-red;
                            color:$color-red;
                        }
                    }
                    .txt{
                        color:#A9A9A9;
                        height:0.5rem;
                        width:0.9rem;
                        padding-top:0.1rem;
                        margin: 0 auto;
                        line-height: 0.5rem;
                        font-size: $font-size-medium;
                    }

                }
            }
            .option-wrapper{
                height: auto;
                overflow: hidden;
                display: flex;
                padding: 0 .32rem;
                .sebo{
                    padding: 0 .64rem;
                }
                .texiao{
                    div:nth-child(3n){
                        margin-right:0;
                    }
                }
                .cq{
                    div:nth-child(6n){
                        margin-right:0;
                    }
                }
                .bj{
                    div:nth-child(6n){
                        margin-right:0;
                    }
                }
                .k3-tuodan-title{
                    flex: 1;
                    width:0.8rem;
                    height:0.6rem;
                    margin-top:0.7rem;
                    padding-right: 0.2rem;
                    @include bg-image('bg-option-title');
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    color: #fff;
                }
                .option-title{
                    flex: 1;
                    width:1.35rem;
                    height:0.77rem;
                    padding-top:0.38rem;
                    padding-right: 0.4rem;
                    p{
                        height:0.6rem;
                        width:1.4rem;
                        line-height: 0.6rem;
                        text-align: center;
                        font-size: $font-size-small-x;
                        color:#fff;
                        background-color: #FFBF00;
                        position: relative;
                        .angle{
                            display:block;
                            width:0;
                            height:0;
                            border-width: .3rem .2rem .3rem .2rem;
                            border-style:solid;
                            border-color:transparent transparent transparent #FFBF00;/*透明 透明 透明 黄*/
                            position:absolute;
                            top:0px;
                            right:-.4rem;
                        }
                    }
                }
                
                .option-item-wrapper{
                    flex: 7;
                    &.kuai3{
                        .option-item:nth-child(6n){
                            margin-right: 0;
                        }
                    }
                    &.bgtype1>div:nth-child(6n){
                        margin-right:0;
                    }
                    &.dds{
                        .option-item{
                            .wrap{
                                padding: .5rem 0;
                            }
                        }
                    }
                    .newk3-title{
                        padding:0.4rem 0.2rem 0.2rem 0.2rem;
                        line-height: 0.5rem;
                        color: #fff;
                        text-align: center;
                        font-size: 0.3rem;
                    }
                    .hezhi-body{
                        flex-wrap: wrap;
                        justify-content:flex-start;
                        .hezhi-item{
                            @include bg-image('hezhi');
                            background-repeat: no-repeat;
                            background-size: 100% 100%;
                            width: 2.05rem;
                            height: 1.2rem;
                            margin-left: 0.22rem;
                            margin-top: 0.38rem;
                            &.on{
                                @include bg-image('hezhi-on');
                                background-repeat: no-repeat;
                                background-size: 100% 100%;
                                color:#DEC233;
                                .hezhi-item-pl{
                                    color: #fff;;
                                }
                            }
                            color: #fff;
                            .hezhi-item-num{
                                font-size: 0.42rem;
                                height: 70%;
                            }
                            .hezhi-item-pl{
                                padding-bottom: 0.1rem;
                                font-size: 0.3rem;
                                color: #0B4426;
                            }
                        }
                         
                    }
                    .tongxuan-body{
                        padding-top: 0.4rem;
                        .tongxuan-item{
                            width: 4.5rem;
                            height: 1.2rem;
                            background-size: 100% 100%;
                            @include bg-image('santonghao');
                            background-repeat: no-repeat;
                            background-size: 100% 100%;
                            font-size: 0.42rem;
                            color:#fff;
                            &.on{
                                @include bg-image('santonghao-on');
                                background-repeat: no-repeat;
                                background-size: 100% 100%;
                            }
                        }
                        
                    }
                    .tuodan-body{
                        flex-wrap: wrap;
                        justify-content:flex-start;
                        padding: 0.3rem 0;
                        .option-item{
                            margin: 0.2rem 0;
                            .tuodan{
                                @include bg-image('Rectangle');
                                background-repeat: no-repeat;
                                background-size: 100% 100%;
                                width: 1.1rem;
                                height: 1rem;
                                margin-left:0.22rem; 
                                border-radius: 0.1rem;
                                color: #fff;
                                font-size: 0.42rem;
                                &.on{
                                    @include bg-image('Rectangle-on');
                                    background-repeat: no-repeat;
                                    background-size: 100% 100%;
                                    border-color: #DEC233;
                                    color: #DEC233;
                                }
                            }
                        }
                    }
                    .newk3-body{
                        flex-wrap: wrap;
                         justify-content:flex-start;
                        .option-item{
                            margin:0;                            
                            .newk3-item{
                                @include bg-image('Rectangle');
                                background-repeat: no-repeat;
                                background-size: cover;
                                width: 1.35rem;
                                height: 1.2rem;
                                margin-left:0.18rem; 
                                margin-top:0.2rem; 
                                border-radius: 0.1rem;
                                color: #fff;
                                font-size: 0.42rem;
                                &.on{
                                    @include bg-image('Rectangle-on');
                                    background-repeat: no-repeat;
                                    background-size: 100% 100%;
                                    border-color: #DEC233;
                                    color: #DEC233;
                                }
                            }
                            
                        }
                        
                    }
                    
                    .option-item{
                        display:inline-block;
                        text-align: center;
                        color: #A9A9A9;
                        margin:0.2rem 0.27rem 0.2rem 0;
                        &:nth-child(6n){
                            margin-right:0;
                        }
                        &.mr37{
                            margin-right: 0.366rem;
                            &:nth-child(7n){
                                margin-right:0;
                            }
                        }
                        &.zodiac-item{
                            .zodiac-con{
                                border: none;
                                border-radius: 0;
                                padding-bottom: 0; 
                                border-radius: .1rem;
                                overflow: hidden;
                                border: 1px solid #d2d2d2;
                                // @include border-bottom-1px(solid,#d4d4d4);
                                .zodiac-title{
                                    color: $color-red;
                                }
                                .txt{
                                    width: 100%;
                                    color: #A9A9A9;
                                    margin-bottom: .2rem;
                                    font-size: $font-size-medium;
                                }
                                .zodiac-num{
                                    line-height: .6rem;
                                    color: #A9A9A9;
                                    @include border-top-1px(solid,#d4d4d4);
                                }
                            }
                        }
                        .wrap{
                            border: 1px solid #D4D4D4;
                            border-radius: .1rem;
                            padding: .2rem 0;
                            .txt{
                                width: 100%;
                                color: #A9A9A9;
                                font-size: $font-size-medium;
                            }
                            &.on{
                                background-color: $color-red;
                                border-color: $color-red;
                                .txt{
                                    color: #fff;
                                    font-size: $font-size-medium;
                                }
                                .oval-con{
                                    color: #fff;
                                }
                            }
                        }
                        .num-con{
                            height:0.96rem;
                            width:0.96rem;
                            line-height: 0.96rem;
                            text-align: center;
                            overflow: hidden;
                            margin: 0 auto;
                            color: $color-red;
                            border:1px solid #D2D2D2;
                            border-radius: 50%;
                            font-size: $font-size-large;
                            &.on{
                                color: #fff;
                                border-radius: 50%;
                                border-color:$color-red;
                                background-color: $color-red;
                            }
                        }
                        .oval-con{
                            height:.6rem;
                            width:2.878rem;
                            line-height: .6rem;
                            text-align: center;
                            overflow: hidden;
                            margin: 0 auto;
                            border-radius: 0.8rem;
                            color: $color-red;
                            font-size: 0.45rem;
                            // &.on{
                            //     color: #fff;
                            //     background-color: $color-red;
                            // }
                        }
                        .zodiac-con{
                            height:auto;
                            width:2.87rem;
                            text-align: center;
                            overflow: hidden;
                            margin: 0 auto;
                            border:1px solid $color-red;
                            border-radius: 0.2rem;
                            padding:0.3rem 0;
                            .zodiac-title{
                                padding-bottom:0.15rem;
                                color:#FFD200;
                                font-size: $font-size-large;
                            }
                            .zodiac-num{
                                line-height: 0.5rem;
                            }
                            &.on{
                                background: $color-red;
                                border-color: $color-red;
                                .zodiac-num{
                                    color: #fff;
                                    @include border-top-1px(solid,#fff);
                                }
                                .zodiac-title{
                                    color: #fff;
                                }
                                .txt{
                                    color: #fff;
                                    font-size: $font-size-medium;
                                }
                            }
                        }
                        .txt{
                            width:0.96rem;
                            font-size:.33rem;
                            padding-top:0.2rem;
                            margin: 0 auto;
                            line-height: 0.4rem;
                            word-break:break-all;
                            font-size: $font-size-medium;
                        }
                        
                    }
                    .sebo-item{
                        margin-top: .1rem;
                        .txt{
                            line-height: 1.3rem;
                            font-size: $font-size-medium;
                            &.redColor{
                                color:$color-red;
                            }
                            &.greenColor{
                                color: #028002;
                            }
                            &.blueColor{
                                color: #0100FF;
                            }
                        }
                        &:first-child{
                            span{
                                &:nth-child(n + 9){
                                    margin-bottom: .3rem!important;
                                }
                                &:nth-child(n+17){
                                    margin-bottom: 0!important;
                                }
                            }
                        }
                        .zodiac-num{
                            padding: .3rem .6rem .3rem;
                            border: 1px solid #D2D2D2;
                            border-radius: .1rem;
                            text-align:left;
                            span{
                                display: inline-block;
                                width: .6rem;
                                height: .6rem;
                                color: #fff;
                                margin-right: .286rem;
                                margin-bottom: .3rem;
                                text-align: center;
                                line-height: .62rem;
                                border-radius: 50%;
                                background-color: red;
                                &:nth-child(8n){
                                    margin-right: 0;
                                }
                                &:nth-child(n + 9){
                                    margin-bottom: 0;
                                }
                            }
                            &.redColor{
                                span{
                                    background-color: $color-red;
                                }
                                &.on{
                                    background-color: $color-red;
                                    span{
                                        color:$color-red;
                                        background-color: #fff;
                                    }
                                }
                            }
                            &.greenColor{
                                span{
                                    background-color: #028002;
                                }
                                &.on{
                                    background-color: #028002;
                                    span{
                                        color:#028002;
                                        background-color: #fff;
                                    }
                                }
                            }
                            &.blueColor{
                                span{
                                    background-color: #0100FF;
                                }
                                &.on{
                                    background-color: #0100FF;
                                    span{
                                        color:#0100FF;
                                        background-color: #fff;
                                    }
                                }
                            }
                        }
                        .txt{
                            text-align: center;
                            font-size: $font-size-medium;
                        }
                    }
                    &.other{
                        text-align:left;
                        >div:nth-child(3n){
                            margin-right:0;
                        }
                    }
                }
            }
            .optino-kind{
                height:0.8rem;
                display: flex;
                @include border-top-1px(dashed,#D2D2D2);
                @include border-bottom-1px(dashed,#D2D2D2);
                .kind-item{
                    flex: 1;
                    height:0.8rem;
                    @include border-left-1px(dashed,#D2D2D2);
                    text-align: center;
                    line-height: 0.8rem;
                    color:#A9A9A9;
                    font-size: $font-size-medium-x;
                    &.on{
                        background-color: $color-red;
                        color: #fff;
                        height:0.8rem;
                        line-height: 0.8rem;
                        @include border-left-1px(dashed,$color-red);
                    }
                    &.on-k3{
                        background-color: #164d34;
                    }
                }
                div:first-child{
                    @include border-left-1px(dashed,#fff);
                }
            }
        }
    }

</style>
