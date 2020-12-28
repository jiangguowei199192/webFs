<!--
 * @Descripttion: 出来混迟早是要还的
 * @version: v_2.4
 * @Author: liangkaiLee
 * @Date: 2020-12-27 14:23:46
 * @LastEditors: liangkaiLee
 * @LastEditTime: 2020-12-27 18:34:16
-->
<template>
  <div class="temp_home">
    <el-container>
      <el-header>
        <div class="header">
          <h2>长江禁捕实战应用平台</h2>
        </div>
        <div class="content">
          <!-- <swiper ref="mySwiper" :options="swiperOption" class="show-swiper">
            <template v-for="(banner_item, banner_index) in bannerList">
              <swiper-slide :key="banner_index">
                <div class="swiper-item">
                  <span>{{ banner_item }}</span>
                </div>
              </swiper-slide>
            </template>
          </swiper>-->
          <div class="banner" id="box">
            <pre class="prev">prev</pre>
            <pre class="next">next</pre>
            <ul>
              <li>
                <img src="../assets/images/tempHome/menu_a.png" />
                <p>调度平台</p>
              </li>
              <li>
                <img src="../assets/images/tempHome/menu_a.png" />
                <p>AR/红外</p>
              </li>
              <li>
                <img src="../assets/images/tempHome/menu_a.png" />
                <p>视频巡查</p>
              </li>
              <li>
                <img src="../assets/images/tempHome/menu_a.png" />
                <p>智慧空警</p>
              </li>
              <li>
                <img src="../assets/images/tempHome/menu_a.png" />
                <p>勤务中心</p>
              </li>
              <li>
                <img src="../assets/images/tempHome/menu_a.png" />
                <p>联创协作</p>
              </li>
              <li>
                <img src="../assets/images/tempHome/menu_a.png" />
                <p>智慧城市</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="bottom"></div>
      </el-header>
      <el-main>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </el-main>
      <!-- 粒子漂浮物 -->
      <vue-particles
        style="height: 1020px"
        color="#fff"
        :particleOpacity="0.5"
        :particlesNumber="40"
        shapeType="star"
        :particleSize="3.5"
        linesColor="#fff"
        :linesWidth="1.5"
        :lineLinked="true"
        :lineOpacity="0.2"
        :linesDistance="130"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      ></vue-particles>
    </el-container>
  </div>
</template>

<script>
// import { Swiper, SwiperSlide } from "vue-awesome-swiper";
// import "swiper/swiper.min.css";
import ZoomPic from '@/utils/slider.js'
import VueParticles from 'vue-particles'
import Vue from 'vue'
Vue.use(VueParticles)

export default {
  name: 'carrousel',

  components: {
    // Swiper,
    // SwiperSlide,
  },

  data () {
    return {
      bannerList: [1, 2, 3, 4, 5, 6],
      swiperOption: {
        slidesPerView: 'auto',
        watchSlidesProgress: true,
        centeredSlides: true,
        init: false,
        on: {
          progress: function () {
            for (let i = 0; i < this.slides.length; i++) {
              const slide = this.slides.eq(i)
              const slideProgress = this.slides[i].progress
              let modify = 0
              if (parseInt(Math.abs(slideProgress)) > 0) {
                modify = Math.abs(slideProgress) * 0.2
              }
              const translate = slideProgress * modify * 500 + 'px'
              const scale = 1 - Math.abs(slideProgress) / 5
              const zIndex = 99 - Math.abs(Math.round(10 * slideProgress))
              slide.transform(`translateX(${translate}) scale(${scale})`)
              slide.css('zIndex', zIndex)
              slide.css('opacity', 1)
              if (parseInt(Math.abs(slideProgress)) > 1) {
                slide.css('opacity', 0)
              }
            }
          }
        }
      }
    }
  },

  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },

  mounted () {
    // console.log(this.swiper)
    // this.initSwiper();
    // eslint-disable-next-line no-new
    new ZoomPic('box')
    this.goToRealHome()
  },

  methods: {
    initSwiper () {
      this.$nextTick(async () => {
        await this.swiper.init()
        await this.swiper.slideTo(2, 1000, false)
      })
    },

    goToRealHome () {
      const targets = document.querySelectorAll('li')
      const _this = this
      for (let i = 0; i < targets.length; i++) {
        targets[i].index = i
        targets[i].onmouseup = function () {
          // console.log('我是目标' + this.index)
          if (this.index === 3) {
            _this.$router.push({ path: '/videoSystem' })
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.temp_home {
  background: url(../assets/images/tempHome/bg.png) no-repeat center/100% 100%;
  height: 1080px;
  .el-header {
    margin: 0 auto;
    .header {
      width: 1285px;
      height: 112px;
      background: url(../assets/images/tempHome/title.png) no-repeat center/100%
        100%;
      line-height: 112px;
      text-align: center;
      font-size: 24px;
      color: #43ffff;
    }
    .content {
      height: 430px;
      margin-top: 150px;
      position: relative;
      overflow: hidden;
      .banner {
        position: relative;
        height: 430px;
        margin: 0 auto 0;
      }
      .banner ul {
        position: relative;
        height: 430px;
      }
      .banner li {
        position: absolute;
        list-style: none;
        width: 0;
        height: 0;
        top: 146px;
        left: 377px;
        z-index: 0;
        cursor: pointer;
        overflow: hidden;
        background: rgb(9, 26, 60);
        opacity: 0.85;
        border-radius: 80%;
        img {
          width: 100%;
          vertical-align: top;
          position: relative;
        }
        p {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: 28px;
          font-weight: 500;
          color: #22ffff;
        }
      }
      .banner .prev,
      .banner .next {
        position: absolute;
        top: 50%;
        width: 39px;
        height: 80px;
        margin-top: -40px;
        overflow: hidden;
        text-indent: -999px;
        cursor: pointer;
        background: url(../assets/images/tempHome/btn.png) no-repeat;
      }
      .banner .prev {
        left: -60px;
      }
      .banner .next {
        right: -60px;
        background-position: -39px 0;
      }
    }
    .bottom {
      height: 250px;
      background: url(../assets/images/tempHome/shadow.png) no-repeat
        center/100% 100%;
      text-align: center;
      margin-top: 120px;
    }
  }
  .el-main {
    padding: 0;
  }
}
</style>
