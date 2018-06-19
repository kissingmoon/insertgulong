<template>
  <div class="v-simple-cropper">
        <slot>
            <button @click="upload">上传图片</button>
        </slot>
        <input class="file" ref="file" type="file" accept="image/*" @change="uploadChange">
        <div class="v-cropper-layer" ref="layer">
            <div class="layer-header">
                <button class="cancel" @click="cancelHandle">取消</button>
                <button class="confirm" @click="confirmHandle">裁剪</button>
            </div>
            <img ref="cropperImg">
        </div>
  </div>
</template>

<script>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
export default {
  name: "v-simple-cropper",
  props: {
    initParam: Object,
    successCallback: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      cropper: {},
      filename: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化裁剪插件
    init() {
      let cropperImg = this.$refs["cropperImg"];
      this.cropper = new Cropper(cropperImg, {
        aspectRatio: 1 / 1,
        dragMode: "move"
      });
    },
    // 点击上传按钮
    upload() {
      this.$refs["file"].click();
    },
    // 选择上传文件
    uploadChange(e) {
      let file = e.target.files[0];
      this.filename = file["name"];
      let URL = window.URL || window.webkitURL;
      this.$refs["layer"].style.display = "block";
      this.cropper.replace(URL.createObjectURL(file));
    },
    // 取消上传
    cancelHandle() {
      this.cropper.reset();
      this.$refs["layer"].style.display = "none";
      this.$refs["file"].value = "";
    },
    // 确定上传
    confirmHandle() {
        let cropBox = this.cropper.getCropBoxData();
        let scale = this.initParam["scale"] || 1;

        let cropCanvas = this.cropper.getCroppedCanvas({
            width: cropBox.width * scale,
            height: cropBox.height * scale
        });
        let _this = this;
        cropCanvas.toBlob(function(blob){
            var formData=new FormData();
            formData.append('files',blob,file.name);
            
            _this.$axios.postRequest(_this.initParam["uploadURL"], formData)
            .then(res => {
                _this.successCallback(res.data);
                _this.cancelHandle();
            });
        });
        
    },
    convertBase64UrlToBlob(urlData) {   
        var bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte   
        //处理异常,将ascii码小于0的转换为大于0   
        var ab = new ArrayBuffer(bytes.length);  
        var ia = new Uint8Array(ab);   
        for(var i = 0; i < bytes.length; i++) {   
            ia[i] = bytes.charCodeAt(i);   
        }  
        return new Blob([ab], { type: 'image/png' });  
    }

  }
};
</script>

<style scoped lang="scss">
.v-simple-cropper {
  .file {
    display: none;
  }
  .v-cropper-layer {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 99999;
    display: none;
    .layer-header {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 99999;
      background: #fff;
      width: 100%;
      height: 0.8rem;
      padding: 0 0.2rem;
      box-sizing: border-box;
    }
    .cancel,
    .confirm {
      line-height: 0.8rem;
      font-size: 0.28rem;
      background: inherit;
      border: 0;
      outline: 0;
      float: left;
    }
    .confirm {
      float: right;
    }
    img {
      position: inherit !important;
      border-radius: inherit !important;
      float: inherit !important;
    }
  }
}
</style>
