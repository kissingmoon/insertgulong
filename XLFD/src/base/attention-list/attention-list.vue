<template>
    <div class="attention-list">
        <ul v-show="isLink">
            <router-link tag="li" :to="{path:url,query:{flag:item.user_flag,url:childurl}}" class="item-mode border-bottom-1px" v-for="(item,index) in data" :key="index">
                <div class="left">
                    <div class="portrait">
                        <img v-lazy="item.image_url" alt="">
                    </div>
                    <div class="information-main">
                        <p class="nick">{{item.nick_name}}</p>
                        <p class="rate">
                            胜率:<span class="txt-red">{{item.win_rate}}%</span>
                            江湖排名:<span class="txt-red">{{item.ds_ranking}}</span>
                        </p>
                        <p class="win">
                            创造价值:<span class="txt-red">{{item.create_value}}</span>元
                        </p>
                    </div>
                </div>
                <div class="right">
                    <div class="btn">
                        <button v-if="item.has_gz == 0" @click.stop="changeConcern(index,'1')">关注+</button>
                        <button v-if="item.has_gz == 1" class="cancel" @click.stop="changeConcern(index,'2')">取消关注</button>
                    </div>
                    <div class="fans">
                        粉丝数:<span class="txt-red">{{item.count_fans}}</span>
                    </div>
                </div>
            </router-link>
        </ul>
        <ul v-show="!isLink">
            <li class="item-mode border-bottom-1px" v-for="(item,index) in data" :key="index">
                <div class="left">
                    <div class="portrait">
                        <img v-lazy="item.image_url" alt="">
                    </div>
                    <div class="information-main">
                        <p class="nick">{{item.nick_name}}</p>
                        <p class="rate">
                            胜率:<span class="txt-red">{{item.win_rate}}%</span>
                            江湖排名:<span class="txt-red">{{item.ds_ranking}}</span>
                        </p>
                        <p class="win">
                            创造价值:<span class="txt-red">{{item.create_value}}</span>元
                        </p>
                    </div>
                </div>
                <div class="right">
                    <div class="btn">
                        <button v-if="item.has_gz == 0" @click.stop="changeConcern(index,'1')">关注+</button>
                        <button v-if="item.has_gz == 1" class="cancel" @click.stop="changeConcern(index,'2')">取消关注</button>
                    </div>
                    <div class="fans">
                        粉丝数:<span class="txt-red">{{item.count_fans}}</span>
                    </div>
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
                defaule:'/attention/detail'
            },
            childurl: {
                type:String,
                defaule:'/attention/detail/detail'
            }
        },
        created() {

        },
        computed:{
        },
        methods: {
            changeConcern(index,status){
                console.log(1);
                this.$emit('setFans',index,status);
            }
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.attention-list{
    height: auto;
    overflow: hidden;
    .item-mode{
        position: relative;
        height:auto;
        overflow: hidden;
        padding:0.2rem 0.3rem;
        background: $color-bg;
        @include border-bottom-1px(solid,$color-border-gray);
        font-size:$font-size-small-x;
        .txt-red{
            color:$color-text-red;
        }
        .left{
            float: left;
            position: relative;
            width:6.8rem;
            height:auto;
            overflow: hidden;
            .portrait{
                position: absolute;
                height:1.42rem;
                width:1.42rem;
                top:0.09rem;
                overflow: hidden;
                border-radius: 50%;
                background: #ccc;
                img{
                    display: block;
                    width:100%;
                }
            }
            .information-main{
                padding-left:1.7rem;
                height:1.6rem;
                @include no-wrap();
                .nick{
                    position:relative;
                    height:0.5rem;
                    padding-top:0.1rem;
                    line-height: 0.5rem;
                    font-size:$font-size-small-x;
                }
                .rate{
                    display: inline-block;
                    height:0.46rem;
                    line-height: 0.46rem;
                    padding:0.02rem 0.1rem;
                    font-size:$font-size-small-x;
                    background:#F8A5B0;
                    border-radius: 0.05rem;
                    color:#fff;
                    .txt-red{
                        color:$color-text-red;
                    }
                }
                .win{
                    height:0.5rem;
                    line-height: 0.5rem;
                    font-size:$font-size-small;
                }
            }
        }
        .right{
            float: right;
            height:1.6rem;
            text-align: right;
            .btn{
                height: auto;
                overflow: hidden;
                padding-top:0.3rem;
                button{
                    height:0.56rem;
                    width:1.56rem;
                    border:0.027rem solid $color-border-red;
                    color:$color-border-red;
                    background:#fff;
                    border-radius: 0.06rem;
                    padding:0;
                    font-size: $font-size-small-x;
                    &.cancel{
                        border:0.027rem solid $color-border-gray;
                        color:$color-border-gray;
                    } 
                }
            }
            .fans{
                height:0.56rem;
                line-height: 0.56rem;
            }
        }
    }
}
</style>

