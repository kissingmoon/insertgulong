<template>
    <div>
        <div v-show="keyboardShow" class="background" @click="close"></div>
        <transition name="keyboard">
            <div v-show="keyboardShow" class="keyboard-con">
               <div class="txt-wrapper">
                   <div class="close-btn" @click="close">
                       <i class="icon-arrows-below"></i>
                   </div>
                   <div class="txt-main">
                       <span class="txt">{{newVal}}</span>
                       <span v-if="keyboardType == 1" class="unit">{{betUnit[lotteryModes]}}</span>
                       <span v-else class="unit">{{unit[keyboardType]}}</span>
                   </div>
               </div>
               <div class="fast-wrapper">
                   <div class="border-right-1px" v-for="(item,i) in fastNumber[keyboardType]" @click="fastSelect(i)">
                       {{item}}<span v-if="keyboardType == 1">{{betUnit[lotteryModes]}}</span><span v-else>{{unit[keyboardType]}}</span>
                   </div>
               </div>
               <div class="key-wrapper">
                   <div class="number-key">
                       <p class="number border-right-1px border-bottom-1px " v-for="(item,i) in keyVal[keyboardType]" @click="changeStr(i)">{{item}}</p>
                   </div>
                   <div class="func-key">
                       <p class="func delete border-bottom-1px" @click="numberDelete">删除</p>
                       <p class="func confirm" @click="confirmNumber">确定</p>
                   </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
    import {betUnit} from 'common/js/map';
    export default {
        data() {
            return{
                betUnit,
                unit:{
                    1:'元',
                    2:'倍',
                    3:'期',
                },
                maxNumber:{
                    1:99999,
                    2:9999,
                    3:20,
                },
                fastNumber:{
                    1:['10','50','100','1000'],
                    2:['1','2','5','10','20'],
                    3:['1','2','5','10','20'],
                },
                keyVal:{
                    1:['1','2','3','4','5','6','7','8','9','0','+10','-10'],
                    2:['1','2','3','4','5','6','7','8','9','0','+1','-1'],
                    3:['1','2','3','4','5','6','7','8','9','0','+1','-1'],
                },
                newVal:''

            }
        },
        props:{
            lotteryModes: {
                type: Number,
                default: 0
            },
            keyboardType: {
                type: Number,
                default: 1
            },
            keyboardShow: {
                type: Boolean,
                default: 1
            },
            oldVal: {
                type: [String,Number],
                default: 1
            },
            varName: {
                type: String,
                default: 1
            },
        },
        created(){
            //this.newVal = this.oldVal + '';
        },
        methods:{
            close(){
                //this.newVal = this.oldVal + '';
                this.$emit('close','keyboardShow');
            },
            confirmNumber(){
                this.$emit('changeKeyNumber',this.varName,this.newVal);
            },
            changeStr(i){
                const keyNum = this.keyVal[this.keyboardType];
                const maxNum = this.maxNumber[this.keyboardType];
                const baseNum = this.keyboardType == 1 ? 10 : 1;
                if(i < 9){
                    const newNumber = this.newVal + '' + keyNum[i];
                    this.newVal = newNumber > maxNum ? maxNum + '' : newNumber;
                }else if(i == 9){
                    if(this.newVal.length == 0){
                        this.newVal = ""
                    }else{
                        const newNumber = this.newVal + '' + keyNum[i];
                        this.newVal = newNumber > maxNum ? maxNum + '' : newNumber;
                    }
                }else if (i == 10){
                    const newNumber = this.newVal - 0 + baseNum;
                    this.newVal = newNumber > maxNum ? maxNum + '' : newNumber.toFixed(0) + '';
                }else{
                    const newNumber = this.newVal - baseNum;
                    this.newVal = newNumber < 1 ? '1' :newNumber.toFixed(0) + '';
                }
            },
            numberDelete(){
                const length = this.newVal.length - 1;
                this.newVal=this.newVal.substr(0,length);
            },
            fastSelect(i){
                this.newVal = this.fastNumber[this.keyboardType][i];
            }
        },
        watch:{
            oldVal(val){
                //this.newVal = this.oldVal + '';
            }
        }
    }
</script>

<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
    .background {
        position:fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        background:$color-bg-shade-a5;
    }
    .keyboard-con{
        position: fixed;
        height:8rem;
        width:100%;
        bottom:0;
        background:#fff;
        z-index: 1001;
        color:$color-text;
        overflow: hidden;
        font-size: $font-size-medium-x;
        .txt-wrapper{
            padding-top:0.37rem;
            height:1.07rem;
            .close-btn{
                float: left;
                margin-left: 0.3rem;
                height:0.7rem;
                width:0.7rem;
                line-height: 0.7rem;
                text-align: center;
                border:1px solid $color-border-gray;
                border-radius: 0.1rem;
                font-size: $font-size-large;
            }
            .txt-main{
                float: right;
                margin-right: 0.3rem;
                height:0.7rem;
                line-height: 0.7rem;
                span{
                    display: inline-block;
                    
                    float: left;
                    &.txt{
                        height:0.7rem;
                        line-height: 0.7rem;
                        width:2.6rem;
                        text-align: center;
                        border:1px solid $color-border-gray;
                        border-radius: 0.1rem;
                    }
                    &.unit{
                        height:0.75rem;
                        line-height: 0.75rem;
                        width:0.6rem;
                        text-align: right;
                    }
                }
            }
        }
        .fast-wrapper{
            display: flex;
            height:1.2rem;
            border-top:0.12rem solid $color-bg-gray;
            border-bottom:0.12rem solid $color-bg-gray;
            div{
                flex:1;
                text-align: center;
                line-height: 1.2rem;
                @include border-right-1px(solid,#ccc);
                &:last-child{
                    @include border-right-1px(solid,$color-bg-white-a0);
                }
            }

        }
        .key-wrapper{
            height:5.2rem;
            .number-key{
                float: left;
                width:8.4rem;
                .number{
                    float: left;
                    width:2.8rem;
                    text-align: center;
                    line-height: 1.3rem;
                    height:1.3rem;
                    @include border-right-1px(solid,#ccc);
                    @include border-bottom-1px(solid,#ccc);
                }
            }
            .func-key{
                float: left;
                width:1.6rem;
                .func{
                    height:2.58rem;
                    line-height: 2.58rem;
                    color:#fff;
                    text-align: center;
                    @include border-bottom-1px(solid,#ccc);
                    &.delete{
                        background-color: $color-btn-gray;
                    }
                    &.confirm{
                        background-color: rgb(204, 0, 0);
                    }
                }
            }
        }
    }
    .keyboard-enter-active, .keyboard-leave-active{
        transition: all 0.3s;
    }

    .keyboard-enter, .keyboard-leave-to{
        transform: translate3d(0, 8rem, 0);
    }
</style>
