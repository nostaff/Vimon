<template>
  <vm-page>
    <vm-header>
      <vm-navbar hide-back-button>
        <vm-button slot="buttons" start>
          <vm-icon name="search"></vm-icon>
        </vm-button>
        <vm-buttons right slot="buttons">
          <vm-button @click="$menu.toggle('menu')" menutoggle>
            <vm-icon name="menu"></vm-icon>
          </vm-button>
        </vm-buttons>
        <vm-title @onTitleClick="onTitleClickHandler">Aha!</vm-title>
      </vm-navbar>
    </vm-header>

    <vm-content>
      <div class="index scrollContent">
        <vm-grid class="vimo">
          <vm-row class="vimo__logo">
            <vm-col text-center no-padding>
              <div class="vimo__logo--img">
                <img src="../assets/vimo.png">
              </div>
            </vm-col>
          </vm-row>
          <vm-row class="vimo__text">
            <vm-col text-center>
              <h1>VIMON</h1>
              <p>v{{vimo.version}}</p>
              <p class="message">Mobile UI components for Vue.js</p>
              <!--
              <a class="star" href="#"><img src="https://img.shields.io/github/stars/nostaff/vimon.svg?style=social&label=Star" alt="Star"></a>
              <a class="star" href="#"><img src="https://img.shields.io/github/forks/nostaff/vimon.svg?style=social&label=Fork" alt="Fork"></a>
              -->
            </vm-col>
          </vm-row>
        </vm-grid>
      </div>

      <vm-list>
          <vm-item link="/component">
            <vm-icon slot="item-start" name="watch"></vm-icon>
            Live Demo
          </vm-item>
          <vm-item link="http://github.io/nostaff/vimon">
            <vm-icon slot="item-start" name="book"></vm-icon>
            Docs
          </vm-item>
          <vm-item link="http://github.com/nostaff/vimon">
            <vm-icon slot="item-start" name="logo-github"></vm-icon>
            Github
          </vm-item>
        </vm-list>
    </vm-content>
    <vm-footer class="index inspired">
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
    </vm-footer>
  </vm-page>
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
    }
  }
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
