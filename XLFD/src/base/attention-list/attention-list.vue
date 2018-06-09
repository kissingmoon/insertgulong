<template>
    <div class="attention-list">
        <ul>
            <li class="item-mode border-1px" v-for="(item,index) in data" :key="index">
                <div class="left">
                    <div class="portrait">
                        <img :src="item.image_url" alt="">
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
                        <button v-show="!item.has_gz">关注+</button>
                        <button v-show="item.has_gz" class="cancel">取消关注</button>
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
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import {httpUrl} from 'common/js/map';
    export default {
        data() {
            return{
            }
        },
        props:{
            data: {
                type: [Array,Object,String],
                default: null
            }
        },
        components:{
            Parcel,
            Scroll
        },
        created() {
        },
        methods: {
        
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
        @include border-1px($color-border-gray);
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

