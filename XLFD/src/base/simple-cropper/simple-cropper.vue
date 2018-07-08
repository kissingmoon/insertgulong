<template>
  <div class="v-simple-cropper">
        <slot>
            <button @click="upload">上传图片</button>
        </slot>
        <input id="id" class="file" ref="file" type="file" accept="image/*" @change="uploadChange" >
        <div class="v-cropper-layer" ref="layer">
            <div class="layer-header">
                <button class="cancel" @click="cancelHandle">取消</button>
                <button class="confirm" @click="confirmHandle">保存</button>
            </div>
            <img ref="cropperImg">
        </div>
  </div>
</template>

<script>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import { httpUrl } from "common/js/map";
export default {
    props: {
        initParam: {
            type:Object,
            default:{}
        },
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
            // var e = document.createEvent('MouseEvent');     
            // e.initEvent('click', false, false);     
            // setTimeout(document.getElementById("id").dispatchEvent(e),0); 
            
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
            let imgData = cropCanvas.toDataURL("image/png");
            // let formData = new window.FormData();
            // formData.append("fileType", this.initParam["fileType"]);
            // formData.append("img", imgData);
            //console.log(encodeURIComponent(imgData));
            this.$axios.postRequest(httpUrl.info.userImg,{img:imgData})
            .then((res)=> {
                if(!res.data.errorCode){
                    this.successCallback(res.data);
                    this.cancelHandle();
                };
            });
        }
    }
}
</script>

<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.v-simple-cropper {
  .file {
    display: none;
    cursor: pointer;
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
      bottom: 0;
      left: 0;
      z-index: 99999;
      background: #fff;
      width: 100%;
      height: 1rem;
      padding: 0 0.2rem;
      box-sizing: border-box;
    }
    .cancel,
    .confirm {
        height:0.7rem;
        line-height: 0.7rem;
        width:1.2rem;
        float: left;
        text-align: center;
        background: $color-red;
        color: #fff;
        border-radius: 0.1rem;
        border: 0;
        margin-top:0.15rem; 
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
