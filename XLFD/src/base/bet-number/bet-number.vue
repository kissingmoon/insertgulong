<template>
    <div class="lottery-number-content">
        <div class="lottery-option-main" v-for="(posi,p) in numList">
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
                <div class="option-title" v-if="posi.isShowSign">
                    <p>{{posi.title}}</p>
                </div>
                <div class="option-item-wrapper" v-if="posi.backgroundType == 1">
                    <div class="option-item" :class="{'mr37':posi.is28OrLhc}" v-for="(item,i) in posi.buyNumberBeanList" @click="selectNum(p,i,item.number_str)">
                        <p class="num-con" :class="{'on': selectNumList[p] && selectNumList[p].indexOf(item.number_str) != -1}">{{item.str}}</p>
                        <p class="txt" v-if="posi.isShowOdds">{{item.pl}}</p>
                    </div>
                </div>
                <div class="option-item-wrapper" v-if="posi.backgroundType == 2">
                    <div class="option-item" v-for="(item,i) in posi.buyNumberBeanList" @click="selectNum(p,i,item.number_str)">
                        <div class="zodiac-con" :class="{'on': selectNumList[p] && selectNumList[p].indexOf(item.number_str) != -1}">
                            <div class="zodiac-title" v-html="item.number_str"></div>
                            <div class="zodiac-num" v-html="item.str"></div>
                        </div>
                        <div class="txt" v-if="posi.isShowOdds">{{item.pl}}</div>
                    </div>
                </div>
                <div class="option-item-wrapper" v-if="posi.backgroundType == 3">
                    <div class="option-item" v-for="(item,i) in posi.buyNumberBeanList" @click="selectNum(p,i,item.number_str)">
                        <div class="oval-con" :class="{'on': selectNumList[p] && selectNumList[p].indexOf(item.number_str) != -1}" v-html="item.str">
                        </div>
                        <div class="txt" v-if="posi.isShowOdds">{{item.pl}}</div>
                    </div>
                </div>
            </div>
            <div class="optino-kind border-top-1px  border-bottom-1px" v-if="posi.isCanBottomFastPick">
                <div class="kind-item" :class="{'on': kindTypeList[p] && kindTypeList[p][0] == 1}" :data-txt="kindTypeList[p]" @click="selectKind(p,0)">全</div>
                <div class="kind-item" :class="{'on': kindTypeList[p] && kindTypeList[p][1] == 1}" @click="selectKind(p,1)">大</div>
                <div class="kind-item" :class="{'on': kindTypeList[p] && kindTypeList[p][2] == 1}" @click="selectKind(p,2)">小</div>
                <div class="kind-item" :class="{'on': kindTypeList[p] && kindTypeList[p][3] == 1}" @click="selectKind(p,3)">单</div>
                <div class="kind-item" :class="{'on': kindTypeList[p] && kindTypeList[p][4] == 1}" @click="selectKind(p,4)">双</div>
                <div class="kind-item" @click="selectKind(p,5)">清</div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    
    export default {
        data(){
            return{
                kindTypeList:new Array(100)
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
                                console.log(Math.ceil(length/2));
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
                }
                this.$emit('selectKind',p,arr);
                console.log(this.kindTypeList);
            },
            clearKind(){
                this.kindTypeList=new Array(100);
            }
        },
        watch:{
            numList(){
                this.kindTypeList=new Array(100);
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
                    color: #fff;
                    font-size: $font-size-small-x;
                    padding-top:0.15rem;
                    .icon-con{
                        height:0.56rem;
                        width:0.56rem;
                        line-height: 0.56rem;
                        text-align: center;
                        overflow: hidden;
                        margin: 0 auto;
                        border:1px solid $color-border-num;
                        border-radius: 50%;
                        &.on{
                            border-color:$color-yellow;
                            color:$color-yellow;
                        }
                    }
                    .txt{
                        height:0.5rem;
                        width:0.9rem;
                        padding-top:0.1rem;
                        margin: 0 auto;
                        line-height: 0.5rem;
                    }

                }
            }
            .option-wrapper{
                height: auto;
                overflow: hidden;
                display: flex;
                padding-left:0.3rem;
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
                        @include bg-image('bg-option-title');
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                    }
                }
                .option-item-wrapper{
                    flex: 7;
                    .option-item{
                        float: left;
                        text-align: center;
                        color: #fff;
                        margin:0.2rem 0.3rem 0.2rem 0;
                        &.mr37{
                            margin-right: 0.37rem;
                        }
                        .num-con{
                            height:0.96rem;
                            width:0.96rem;
                            line-height: 0.96rem;
                            text-align: center;
                            overflow: hidden;
                            margin: 0 auto;
                            border:1px solid $color-border-num;
                            border-radius: 50%;
                            @include bg-image('bg-num-shallow');
                            background-size: 1rem;
                            &.on{
                                border-color:$color-yellow;
                                @include bg-image('bg-num-deep');
                            }
                        }
                        .oval-con{
                            height:1rem;
                            width:2.87rem;
                            line-height: 1rem;
                            text-align: center;
                            overflow: hidden;
                            margin: 0 auto;
                            border:1px solid $color-border-num;
                            border-radius: 0.8rem;
                            @include bg-image('bg-num-shallow');
                            background-size:  1rem;
                            &.on{
                                border-color:$color-yellow;
                                @include bg-image('bg-num-deep');
                            }
                        }
                        .zodiac-con{
                            height:auto;
                            width:2.87rem;
                            text-align: center;
                            overflow: hidden;
                            margin: 0 auto;
                            border:1px solid $color-border-num;
                            border-radius: 0.2rem;
                            padding:0.3rem 0;
                            @include bg-image('bg-num-shallow');
                            background-size:  1rem;
                            .zodiac-title{
                                padding-bottom:0.15rem;
                                color:#FFD200;
                                font-size: $font-size-medium-x;
                            }
                            .zodiac-num{
                                line-height: 0.5rem;
                            }
                            &.on{
                                border-color:$color-yellow;
                                @include bg-image('bg-num-deep');
                            }
                        }
                        .txt{
                            width:0.96rem;
                            padding-top:0.1rem;
                            margin: 0 auto;
                            line-height: 0.4rem;
                            word-break:break-all;
                        }

                    }
                }
            }
            .optino-kind{
                height:0.8rem;
                display: flex;
                @include border-top-1px(dashed,$color-border-num);
                @include border-bottom-1px(dashed,$color-border-num);
                .kind-item{
                    flex: 1;
                    height:0.8rem;
                    @include border-left-1px(dashed,$color-border-num);
                    text-align: center;
                    line-height: 0.8rem;
                    color:#fff;
                    font-size: $font-size-medium-x;
                    &.on{
                        @include bg-image('bg-num-deep');
                        background-size:  1rem;
                        border:1px solid $color-yellow;
                        height:0.72rem;
                        line-height: 0.72rem;
                    }
                }
                div:first-child{
                    @include border-left-1px(dashed,$color-bg-white-a0);
                }
            }
        }
    }

</style>
