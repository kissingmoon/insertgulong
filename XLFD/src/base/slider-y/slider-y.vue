<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { addClass } from "common/js/dom";
import BScroll from "better-scroll";

export default {
  name: "slider",
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    };
  },
  mounted() {
    setTimeout(() => {
      this._setSliderHeight();
      this._initDots();
      this._initSlider();

      if (this.autoPlay) {
        this._play();
      }
    }, 20);

    window.addEventListener("resize", () => {
      if (!this.slider) {
        return;
      }
      this._setSliderHeight(true);
      this.slider.refresh();
    });
  },
  activated() {
    if (this.autoPlay) {
      this._play();
    }
  },
  deactivated() {
    clearTimeout(this.timer);
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  methods: {
    _setSliderHeight(isResize) {
      this.children = this.$refs.sliderGroup.children;
      let height = 0;
      let sliderHeight = this.$refs.slider.clientHeight;
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        addClass(child, "slider-item");

        child.style.height = sliderHeight + "px";
        height += sliderHeight;
      }
      if (this.loop && !isResize) {
        height += 2 * sliderHeight;
      }
      this.$refs.sliderGroup.style.height = height + "px";
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: false,
        scrollY: true,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      });

      this.slider.on("scrollEnd", () => {
        let pageIndex = this.slider.getCurrentPage().pageY;
        if(pageIndex >= (this.children.length -1) ){
            pageIndex=0;
        }
        if (this.loop) {
          pageIndex -= 1;
        }
        this.currentPageIndex = pageIndex;
        if (this.autoPlay) {
          this._play();
        }
      });

      this.slider.on("beforeScrollStart", () => {
        if (this.autoPlay) {
          clearTimeout(this.timer);
        }
      });
    },
    _initDots() {
      this.dots = new Array(this.children.length);
    },
    _play() {
      let pageIndex = this.currentPageIndex + 1;
      if (this.loop) {
        pageIndex += 1;
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(0,pageIndex, 400);
      }, this.interval);
    }
  }
};
</script>

<style scoped lang="scss">
@import "common/scss/variable.scss";
.slider {
  min-height: 1px;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>