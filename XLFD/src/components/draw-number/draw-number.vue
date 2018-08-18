<template>
    <parcel>
        <div class="draw">
            <scroll ref="scroll" class="scroll-content" 
                :data="drawNumber" 
                :isAllData="isAllData"
                :pulldown="pulldown"
                :pullup="pullup"
                :refreshStatus="refreshStatus"
                :loadStatus="loadStatus"
                @pulldown="getDrawNubmer('down')"
                @pullup="getDrawNubmer('up')"
                >
                <draw-list :data="drawNumber"></draw-list>
            </scroll>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import {mapMutations} from 'vuex';
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import DrawList from 'base/draw-list/draw-list';
    import {httpUrl} from 'common/js/map';
    import {slicer} from 'common/js/param';
    export default {
        data() {
            return{
                pulldown: false,
                pullup: true,
                refreshStatus:false,
                loadStatus:false,
                isAllData:false,
                drawNumber:[],
                param:{
                    lottery_id:'',
                    page_no:1,
                    page_size:20
                },
                header:{
                    title:'开奖历史',
                    back:true
                }
            }
        },
        components:{
            Parcel,
            Scroll,
            DrawList
        },
        created() {
            this.init();
            this.getDrawNubmer();
            this.setHeader(this.header);
        },
        methods: {
            init(){
                this.param.lottery_id =this.$route.query.id;
                this.header.title =this.$route.query.name;
            },
            getDrawNubmer(type){
                if(type == 'up'){
                    this.loadStatus=true;
                    ++this.param.page_no;
                }else if(type == 'down'){
                    this.refreshStatus=true;
                    this.param.page_no=1;
                }
                this.$axios.postRequest(httpUrl.descover.drawNumber,this.param)
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        if(type == 'up'){
                            this.loadStatus=false;
                            this.drawNumber=this.drawNumber.concat(slicer(res.data,'kj_code',','));
                            this.isAllData =res.data.length < 20 ? true : false;
                        }else if(type == 'down'){
                            this.refreshStatus=false;
                            this.drawNumber=slicer(res.data,'kj_code',',');
                            this.isAllData=false;
                        }else{
                            this.drawNumber=slicer(res.data,'kj_code',',');
                            this.isAllData =res.data.length < 20 ? true : false;
                        }
                    };
                });
            },
            ...mapMutations({
                setHeader:'SET_HEADER',
            }),
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
    bottom: 0rem;
    z-index: 103;
    background: $color-bg;
    .scroll-content{
        height:100%;
        overflow: hidden;
    }
}
</style>
