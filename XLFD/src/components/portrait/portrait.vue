<template>
    <div class="portrait">
        <simple-cropper :initParam="uploadParam" :successCallback="uploadHandle" ref="cropper">
            <img class="img" :src="account.image_url" @click="upload">
            <button @click="upload">设置头像</button>
        </simple-cropper>
    </div>
</template>

<script>
import SimpleCropper from 'base/simple-cropper/simple-cropper';
import {httpUrl} from 'common/js/map';
import {mapGetters} from 'vuex';
export default {
  data () {
    return {
      uploadParam: {
        fileType: 'recruit',
        uploadURL: httpUrl.info.userImg, // 上传地址
      }
    }
  },
  computed: {
        ...mapGetters([
            'account'
        ])
    },
  methods: {
    // 上传头像
    upload () {
      this.$refs['cropper'].upload();
    },
    // 上传头像成功回调
    uploadHandle (data) {
      if (data.state === 'SUCCESS') {
            console.log('成功！');
      }
    }
  },
  components: {
    SimpleCropper
  }
}
</script>
<style scoped lang="scss">
    .portrait{
        position: fixed;
        width: 100%;
        top: 1.2rem;
        bottom: 0rem;
        overflow: hidden;
        z-index: 101;
        background:#fff;
        .img{
            display: block;
            width:4rem;
            height: 4rem;
            background: #ccc;
        }
    }
</style>
