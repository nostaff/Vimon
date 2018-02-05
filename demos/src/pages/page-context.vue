<template>
  <vm-page>

    <vm-header>
      <vm-navbar ref="navbar">
        <vm-title ref="title">文本</vm-title>
      </vm-navbar>
    </vm-header>

    <vm-content padding class="outer-content">

      <h1>这个是h1标签</h1>
      <h2>这个是h2标签</h2>
      <h3>这个是h3标签</h3>
      <h4>这个是h4标签</h4>
      <h5>这个是h5标签</h5>
      <h6>这个是h6标签</h6>
      <p>这个是p标签</p>
      <vm-button block @click="$history.toRoot()">返回首页</vm-button>


      <p>通过在组件上使用ref属性获取组件的控制权, 比如获取Title组件的控制权修改document.title</p>
      <vm-button @click="setTitle('Hello Vue')" small outline>点击设置Title='Hello Vue'</vm-button>
      <vm-button @click="showPopMenu()" small>显示右侧弹出按钮</vm-button>


      <p>Vimo支持使用rem布局, 当然, 在写业务代码的时候使用px就好, 剩下是使用插件完成吧! </p>

      <strong>步骤:</strong>
      <ul>
        <li>在index.html文件中加上js脚本, 给html标签附上基础fontSize.</li>
        <li>在build/vue-loader.conf.js文件中将注释解开: postcss: [require('postcss-px2rem')({remUnit: 50})]</li>
      </ul>

    </vm-content>
    <vm-footer>
      <vm-toolbar>
        <vm-segment value="1">
          <vm-segment-button value="1">第一章</vm-segment-button>
          <vm-segment-button value="2">第二章</vm-segment-button>
          <vm-segment-button value="3">第三章</vm-segment-button>
        </vm-segment>
      </vm-toolbar>
    </vm-footer>
  </vm-page>
</template>

<script type="text/javascript">
export default {
  name: 'context',
  watch: {},
  computed: {
    titleComponent () {
      return this.$refs.title
    },
    navbarComponent () {
      return this.$refs.navbar
    }
  },
  methods: {
    setTitle (val) {
      this.titleComponent.setTitle(val)
    },
    showPopMenu () {
      let data = [
        {
          title: '周边美食',
          icon: 'https://zos.alipayobjects.com/rmsportal/mzorSIxVEdkTuxumzzau.png',
          badge: '-1',
          handler () {
            console.log('index:0 选择了: 周边美食')
          }
        },
        {
          title: '购物攻略',
          icon: 'https://zos.alipayobjects.com/rmsportal/UoBNIZJosEXNQtAxCEUg.png',
          badge: '100',
          handler () {
            console.log('index:1 选择了: 购物攻略')
          }
        },
        {
          title: '摄影技巧',
          icon: 'https://zos.alipayobjects.com/rmsportal/QJeWMNUFFiDCQawMLPTr.png',
          badge: '12',
          handler () {
            console.log('index:2 选择了: 摄影技巧')
          }
        },
        {
          title: '搞笑段子',
          icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAQlBMVEUAAAC/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7++vr6/v78Ycp3SAAAAFXRSTlMAEPAwwCDQYEDgsIBwkJ+gf1CPb09zkeEOAAAFLUlEQVR42rzZ25KrIBAF0M0dFWM02f//qyeTmgpliaj05KzXaGgutjTikIGAg5iaIRAjpOIAgSQPIE0QGAdIDRYCdoSU1RDQFlKkQTNDQiiSAc0CGSGTSMEqnMgEmZ7s0Kwje8iQgkVg+AKRmRSM4sCXGRITXzwaeb5MEFCaPxyaOP7QEAh8G9Fk5FtAO0tJJzTfLJo5/poFw0c6QRL41TUmAeEQRH6klhz6EdFEeX5o1fAAfXRK2j7pDS4x67sbInCeKzrigqi50hlco27c6N3p4Htu3BzOMzfNklvECfHGEn0zOEUFz13dw6HKPTru8kHhgAs9D/iH22/d80AfKj2Ii+cp3fLcdEU9l46n+HssxP5cLC/xSzD4ZcLieYldng7Z3LOJnRWgZssm/QxkJvX62u0p4iOmnlfoPhhsmXR2DYwRG3E8uwaSwS6X/HHru/eb4xh8cjjgUuVfdG59LwZdiT23Xhen+rKp20slU8R5rhDC5GR3S9+GBhcYzRXvBPuB3H5zBL5tR9Kt22+PoFOSquBtaKzLhJWBlXRBafGuGFHUhZA3xc18fU/s4uN+f0RXHwIvrw0nFKiHz3uUYoSTvDZUfDOFX+6azPS9EIKpDJ/sfCBv++uFQ5eHTzQHY+Uhz/Rcrs8DIJ0Dc9i+t8VkZfii/v6UTHmu9ApQI6nVF07JhsIkTlzpP1nLFq4cIBO3pbnjmstZK25L9Pj3Z8U91/KV9IWzYinLcm7I1KexbbDaQ2q05eyYhXwiwvT33wvSVJuBvFdwuvTiG4e//2ZkubE846KLB3pphpQKm2e7ZvvVTCxijVXb74ZyghH4CssKje/rWWHxfYEVCd+nWGEgIZ8Dj//BcVeEkAv/irWzXUlBIACgxV6AoN331v//6nQnMzEGLFAkcx59EOICtZA9EVmduYreeuMTFC5rS0Qy/Cg4g/5YTVNs0liSBurUZol2HvkCb7uyqSTVqO7KazC9N5VFjZmNiksm1+/LBLp8mZvPC8rh6YRU1TyufwoiHjOjKNjhS1IUKcTVKSx2r73Vh2elIoO4PAUwuMS4oGEePsOwi9tYy0Nlals7l3f+r+T/O54oNri27ExzLaVejnkDDPv+RajComfBC2yUxZM6b18/iD/bV9CSrvKNT2C+PQH9T7A2AU9T+fYEAk2UiidQfgPR0SxS6fpCQAfqJWkKrxY6OBREdxqUpAmsEPJ44SzZWUAkepqMAOEshIzlVq0sPUobgBcdxb1zWlsjF0mPka9aLIvnu2EuWk9Dkiiri8cSpq1vVCZJGrRHa4FLo9LZVimipyH+XwyR2ZgMmc16Dy9GGuS5kUZ4Lm42S7g1umNDHl+0uLjIXbhwf/Ry/LIRZ9q5g3Brb38+vUS7pmGK9lTJlSfdY7DE0CF+Bz/KPZm0o5o31Bh8xZj0QYwR6+0zoanG9VXfrIFBKKnG99aepIMhb6pzUPDMNnIXeqrzl8pvm4BbTOBykpJn19PLzHa1moZ0TrJP4XJ2jFCViJN/oZdwmjiJqX5x/FtBh99MPC+YHh2nKPOVcNPUhHAqUQcZNoeidpZAU4/En1vpJfXHe/vIWmtL3bxonH2ZTCpgKZpMQYOjqRw0LTTRAh1WmmaFLokmSQN9qenvf/7fKNXVs3zjRk70iZUetQq4ynl6jHfQxPYkxvPjgaBuWDBwH1oaZBHGODs0vINxapV0i1wVPIQPMvn+yrg75SKZDDxOLZq66KhgFoyrJoZdIwqYTeESo/6gv/RHigsquO4PrWwzz9ROC40AAAAASUVORK5CYII=',
          badge: '0',
          handler () {
            console.log('index:3 选择了: 搞笑段子')
          }
        }
      ]
      this.navbarComponent.showPopMenu(data)
    }
  }
}
</script>
