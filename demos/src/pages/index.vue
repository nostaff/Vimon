<template>
  <ion-page>
    <ion-header>
      <ion-navbar hide-back-button>
        <ion-buttons right slot="buttons">
          <ion-button @click="$menu.toggle('menu')" role="bar-button" menutoggle>
            <ion-icon name="more"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title @onTitleClick="onTitleClickHandler">Aha!</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <div class="index scrollContent" padding>
        <ion-grid class="vimo">
          <ion-row class="vimo__logo">
            <ion-col text-center no-padding>
              <div class="vimo__logo--img">
                <img src="../assets/vimo.png">
              </div>
            </ion-col>
          </ion-row>
          <ion-row class="vimo__text">
            <ion-col text-center>
              <h1>VIMON</h1>
              <p>v{{vimo.version}}</p>
              <p class="message">Mobile UI components for Vue.js</p>
              <a class="star" href="#"><img src="https://img.shields.io/github/stars/nostaff/vimon.svg?style=social&label=Star" alt="Star"></a>
              <a class="star" href="#"><img src="https://img.shields.io/github/forks/nostaff/vimon.svg?style=social&label=Fork" alt="Fork"></a>
            </ion-col>
          </ion-row>
        </ion-grid>

      </div>
      <ion-list>
          <ion-item link="/component">
            <ion-icon slot="item-start" name="watch"></ion-icon>
            Live Demo
          </ion-item>
          <ion-item link="http://github.io/nostaff/vimon">
            <ion-icon slot="item-start" name="book"></ion-icon>
            Docs
          </ion-item>
          <ion-item link="http://github.com/nostaff/vimon">
            <ion-icon slot="item-start" name="logo-github"></ion-icon>
            Github
          </ion-item>
        </ion-list>
    </ion-content>
    <ion-footer class="index inspired">
      <p class="inspired__name">INSPIRED BY</p>
      <div class="inspired__logos">
        <section>
          <i class="inspired__logos--ionic"></i>
        </section>
        <section>
          <i class="inspired__logos--vue"></i>
          <span>Vue.js</span>
        </section>
      </div>
    </ion-footer>
  </ion-page>
</template>

<script type="text/javascript">
export default {
  name: 'IndexDemo',
  data () {
    return {
      vimo: window.VM
    }
  },
  methods: {
    onTitleClickHandler () {
      alert('你点击了标题')
    },
    onDocsClickHandler () {
      window.open('https://nostaff.github.io/vimon/')
    }
  },
  created () {},
  mounted () {}
}
</script>

<style scoped lang="scss">
.index.scrollContent {
  .vimo {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    .vimo__logo {
      flex: 110px 0 0; /*no*/
      .vimo__logo--img {
        height: 110px; /*no*/
        flex: 110px 0 0; /*no*/
        img {
          height: 100%;
        }
      }
    }
    .vimo__text {
      margin-top: 5px;
      margin-bottom: 5px;
      h1 {
        font-weight: bold;
      }
      p {
        margin: 5px 0;
        font-size: 12px;
        color: #2c3e50;
      }
      .message {
        line-height: 22px;
      }
      .star {
        line-height: 22px;
      }
    }
    .vimo__btns {
    }
  }
}

.index.inspired {
  width: 100%;
  height: 55px;
  bottom: 0;
  border-top: 1px solid #eee;
  text-align: center;
  background: #fff;
  .inspired__name {
    font-size: 14px;
    line-height: 120%;
    padding: 5px 0;
    margin: 0;
    color: #919191;
  }
  .inspired__logos {
    display: flex;
    justify-content: center;
    align-content: center;
    & > section {
      display: flex;
      justify-content: center;
      align-content: center;
      i {
        display: inline-block;
        /*outline: 1px solid red;*/
      }
      & > span {
        display: inline-block;
        height: 100%;
        font-family: "Dosis", "Source Sans Pro", "Helvetica Neue", Arial,
          sans-serif;

        font-size: 13px;
        line-height: 154%;
        color: #2c3e50;
        font-weight: 500;
      }
      .inspired__logos--ionic {
        height: 22px;
        width: 80px;
        background: transparent url(../assets/ionic.png) no-repeat top
          center/60px auto;
      }
      .inspired__logos--vue {
        height: 22px;
        width: 26px;
        background: transparent url(../assets/vue.png) no-repeat top center/22px
          auto;
      }
    }
  }
}
</style>
