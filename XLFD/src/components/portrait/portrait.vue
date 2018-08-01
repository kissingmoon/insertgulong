<template>
    <parcel>
        <div class="portrait">
            <!-- 头像上传功能 -->
            <!-- <simple-cropper class="portrait-main" :initParam="uploadParam" :successCallback="uploadHandle" ref="cropper">
                <img class="img" :src="account.image_url" @click="upload">
                <button class="btn" @click="upload">设置头像</button>
            </simple-cropper> -->
            <!-- 头像选择功能 -->
            <div class="portrait-wrapper">
                <ul>
                    <li v-for="(item,i) in portraitList" :class="{'on': portraitUrl == item.imageUrl}" @click="selectImg(item.imageUrl)">
                        <img :src="item.imageUrl">
                    </li>
                    
                </ul>
            </div>
            <div class="btn-wrapper">
                <button class="btn" :disabled="btnType" @click="setPhoto" >保存</button>
            </div>
        </div>
    </parcel>
</template>

<script>
import SimpleCropper from "base/simple-cropper/simple-cropper";
import Parcel from "base/parcel/parcel";
import { httpUrl } from "common/js/map";
import { mapGetters,mapActions,mapMutations } from "vuex";
export default {
    data() {
        return {
        //   uploadParam: {
        //     fileType: "recruit",
        //     uploadURL: httpUrl.info.userImg // 上传地址
        //   }
            portraitList:[],
            portraitUrl:''
        }
    },
    components: {
        Parcel,
        SimpleCropper
    },
    computed: {
        ...mapGetters(["account"]),
        btnType(){
            return !this.portraitUrl || (this.portraitUrl && this.portraitUrl.length < 1) || this.portraitUrl == this.account.image_url;
        }
    },
    created() {
        this.getPhotoList();
    },
    mounted(){
        this.portraitUrl = this.account.image_url;
    },
    methods: {
        // 上传头像
        // upload() {
        //     this.$refs["cropper"].upload();
        // },
        // 上传头像成功回调
        // uploadHandle(data) {
        //     this.setTip('设置成功');
        //     this.getUser();
        // },
        ...mapActions([
            'getUser'
        ]),
        ...mapMutations({
            setTip:'SET_TIP'
        }),
        // 获取头像列表
        getPhotoList(){
            this.$axios.postRequest(httpUrl.info.listPhoto)
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    this.portraitList = res.data.data.list;
                };
            })
        },
        //选择头像
        selectImg(url){
            this.portraitUrl = url;
        },
        //上传头像
        setPhoto(){
            this.$axios.postRequest(httpUrl.info.userImage,{'imageUrl':this.portraitUrl})
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    this.getUser();
                    this.setTip('保存成功!');
                    this.$router.back();
                };
            })
        }
    }
};
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.portrait {
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    overflow: hidden;
    z-index: 101;
    background: #fff;
    text-align: center;
    .portrait-main{
        padding-top:1rem;
        width:100%;
    }
    .img {
        display: block;
        width: 8rem;
        height: 8rem;
        background: #ccc;
        margin: 0 auto;
    }
    .btn {
        height: 1.15rem;
        line-height: 1.15rem;
        width: 8rem;
        text-align: center;
        background: $color-red;
        color: #fff;
        font-size: $font-size-large;
        border-radius: 0.1rem;
        border: 0;
        margin-top: 0.8rem;
    }
    .portrait-wrapper{
        height: auto;
        overflow: hidden;
        ul{
           height: auto;
            overflow: hidden; 
            padding-top:0.4rem;
            li{
                position: relative;
                float: left;
                width:1.8rem;
                height:1.8rem;
                border-radius: 2rem;
                overflow: hidden;
                border:0.08rem solid $color-border-gray;
                margin-left: 0.42rem;
                margin-bottom:0.4rem;
                &.on{
                    border:0.08rem solid $color-red;
                }
                img{
                    width:100%;
                }
            }
        }
    }
}
</style>
