<template>
    <div class="draw-list">
        <ul v-show="isLink">
            <router-link tag="li" :to="{path:url,query:{id:item.lottery_id,name:item.lottery_name}}" class="item-mode border-bottom-1px" v-for="(item,index) in data" :key="index">
                <div class="left">
                    <div class="information">
                        <span>{{item.lottery_name}}</span>
                        <span class="txt-gray">第{{item.lottery_qh}}期</span>
                        <span class="txt-gray">{{item.real_kj_time}}</span>
                    </div>
                    <div v-if="item.show_type == 1" class="number show_type1">
                        <span v-for="(num,n) in item.kj_code">{{num}}</span>
                    </div>
                    <div v-if="item.show_type == 2 || item.show_type == 5" class="number show_type2">
                        <span v-for="(num,n) in item.kj_code" :class="{'blue':n == (item.kj_code.length-1)}">{{num}}</span>
                    </div>
                    <div v-if="item.show_type == 3" class="number show_type3">
                        <span v-for="(num,n) in item.kj_code" :class="{'blue':n == (item.kj_code.length-2)}">{{num}}</span>
                    </div>
                    <div v-if="item.show_type == 4" class="number show_type4">
                        <span v-for="(num,n) in item.kj_code">{{num}}</span>
                    </div>
                </div>
                <div class="right">
                    <i class="icon-arrows-right"></i>
                </div>
            </router-link>
        </ul>
        <ul v-show="!isLink">
            <li class="item-mode border-bottom-1px" v-for="(item,index) in data" :key="index">
                <div class="left">
                    <div class="information">
                        <span>{{item.lottery_name}}</span>
                        <span class="txt-gray">第{{item.lottery_qh}}期</span>
                        <span class="txt-gray">{{item.real_kj_time}}</span>
                    </div>
                    <div v-if="item.show_type == 1" class="number show_type1">
                        <span v-for="(num,n) in item.kj_code">{{num}}</span>
                    </div>
                    <div v-if="item.show_type == 2 || item.show_type == 5" class="number show_type2">
                        <span v-for="(num,n) in item.kj_code" :class="{'blue':n == (item.kj_code.length-1)}">{{num}}</span>
                    </div>
                    <div v-if="item.show_type == 3" class="number show_type3">
                        <span v-for="(num,n) in item.kj_code" :class="{'blue':n == (item.kj_code.length-2)}">{{num}}</span>
                    </div>
                    <div v-if="item.show_type == 4" class="number show_type4">
                        <span v-for="(num,n) in item.kj_code">{{num}}</span>
                    </div>
                </div>
                <div class="right">
                    
                </div>
            </li>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">
    import {httpUrl} from 'common/js/map';
    export default {
        data() {
            return{
                query:{}
            }
        },
        props:{
            data: {
                type: [Array,Object,String],
                default: null
            },
            isLink: {
                type:Boolean,
                defaule:false
            },
            url: {
                type:String,
                defaule:'/draw/number'
            }
        },
        created() {

        },
        computed:{
        },
        methods: {
            
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.draw-list{
    height: auto;
    overflow: hidden;
    .item-mode{
        position: relative;
        height:auto;
        overflow: hidden;
        padding:0.2rem 0.4rem;
        height:1.8rem;
        background: $color-bg;
        @include border-bottom-1px(solid,$color-border-gray);
        .left{
            float: left;
            height:auto;
            overflow: hidden;
            .information{
                height:0.6rem;
                line-height: 0.6rem;
                span{
                    margin-right: 0.2rem;
                }
                .txt-gray{
                    font-size:$font-size-small-x;
                    color:$color-text-gray;
                }

            }
            .number{
                height:1.2rem;
                line-height: 1.2rem;
                &.show_type1{
                    span{
                        display: inline-block;
                        height:0.9rem;
                        width:0.9rem;
                        line-height: 0.9rem;
                        text-align: center;
                        color:#fff;
                        font-size:$font-size-large;
                        border-radius: 50%;
                        background: $color-red;
                        margin-right: 0.1rem;
                    }
                }
                &.show_type2,&.show_type3{
                    span{
                        display: inline-block;
                        height:0.9rem;
                        width:0.9rem;
                        line-height: 0.9rem;
                        text-align: center;
                        color:#fff;
                        font-size:$font-size-large;
                        border-radius: 50%;
                        background: $color-red;
                        margin-right: 0.1rem;
                        &.blue{
                            background:#1b6197;
                        }
                    }
                }
                &.show_type4{
                    span{
                        display: inline-block;
                        height:0.9rem;
                        width:0.7rem;
                        line-height: 0.9rem;
                        text-align: center;
                        color:#fff;
                        font-size:$font-size-large;
                        background: #077107;
                        margin-right: 0.1rem;
                    }
                }
                &.show_type5{
                    span{
                        display: inline-block;
                        height:0.9rem;
                        width:0.9rem;
                        line-height: 0.9rem;
                        text-align: center;
                        color:#fff;
                        font-size:$font-size-large;
                        border-radius: 50%;
                        background: $color-red;
                        margin-right: 0.1rem;
                    }
                }

            }
        }
        .right{
            float: right;
            text-align: right;
            height:1.8rem;
            line-height: 1.8rem;
            font-size: $font-size-large;
            color:$color-text-gray;
        }
    }
}
</style>

