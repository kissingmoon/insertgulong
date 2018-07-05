<template>
    <parcel>
        <div class="portrait">
            <simple-cropper class="portrait-main" :initParam="uploadParam" :successCallback="uploadHandle" ref="cropper">
                <img class="img" :src="account.image_url" @click="upload">
                <button class="btn" @click="upload">设置头像</button>
            </simple-cropper>
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
      uploadParam: {
        fileType: "recruit",
        uploadURL: httpUrl.info.userImg // 上传地址
      }
    };
  },
  components: {
    Parcel,
    SimpleCropper
  },
  computed: {
    ...mapGetters(["account"])
  },
  methods: {
    // 上传头像
    upload() {
      this.$refs["cropper"].upload();
    },
    // 上传头像成功回调
    uploadHandle(data) {
        this.setTip('设置成功');
        this.getUser();
    },
    ...mapActions([
        'getUser'
    ]),
    ...mapMutations({
        setTip:'SET_TIP'
    }),
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
}
</style>
