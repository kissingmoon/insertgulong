<template>
    <parcel>
        <div class="draw">
            <!-- <div class="win-money">
                <p class="money">
                    <span v-for="num in winMoney.num1">{{num}}</span>
                    <b>亿</b>
                    <span v-for="num  in winMoney.num2">{{num}}</span>
                    <b>万</b>
                </p>
                <p class="title">小李飞刀累计中奖...</p>
            </div> -->
            <scroll ref="scroll" class="scroll-content" :data="draw" >
                <draw-list :data="draw" :url="url" :isLink="isLink"></draw-list>
            </scroll>
            <router-view></router-view>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import DrawList from 'base/draw-list/draw-list';
    import {httpUrl} from 'common/js/map';
    import {slicer} from 'common/js/param';
    export default {
        data() {
            return{
                draw:[],
                winMoney:{
                    num1:[],
                    num2:[]
                },
                url:'/draw/number',
                isLink:true
            }
        },
        components:{
            Parcel,
            Scroll,
            DrawList
        },
        created() {
            this.getWinMoney();
            this.getDraw();
        },
        methods: {
            getWinMoney(){
                this.$axios.postRequest(httpUrl.descover.winMoney)
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        let money=res.data.money;
                        let length=money.length;
                        this.winMoney.num2=money.slice(-4).split('');
                        if(length > 4){
                            this.winMoney.num1=money.slice(0,-4).split('');
                        }
                    };
                });
            },
            getDraw(){
                this.$axios.postRequest(httpUrl.descover.draw)
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        this.draw=slicer(res.data,'kj_code',',');
                    };
                });
            },
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.draw{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    // bottom: 0rem;
    bottom: 1.44rem;
    z-index: 103;
    background: $color-bg;
    .win-money{
        height:1.45rem;
        padding-top:0.25rem;
        background:$color-bg-gray;
        text-align: center;
        .money{
            height: 0.7rem;
            line-height: 0.7rem;
            margin-bottom: 0.1rem;
            color:$color-red;
            font-size: $font-size-large;
            span{
                display: inline-block;
                height:0.7rem;
                line-height: 0.7rem;
                width:0.53rem;
                margin-right: 0.1rem;
                background: $color-bg;
            }
            b{
                margin-right: 0.1rem;
            }
        }
        .title{
            height:0.5rem;
            line-height: 0.5rem;
            color:$color-text-gray;
            font-size: $font-size-small-x;
        }
    }
    .scroll-content{
        height:calc(100% - 1.7rem);
        overflow: hidden;
    }
}
</style>
