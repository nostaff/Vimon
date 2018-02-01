<template>
  <vm-page v-nav="{title: 'Popover', showMoreButton: true, onMoreButtonClick: pageSetting}">
    <vm-content ref="content">

      <div padding>

        <div>Lorem ipsum dolor sit amet, <span class="highlightText" @click="popupText($event, 'consectetur')">consectetur</span> adipiscing elit. Mauris vel ipsum in purus mollis dictum eget vitae purus. Nulla ultrices est odio, a maximus velit pretium ac. Donec vel elementum mi. Proin elementum pulvinar neque, in lacinia nibh tempus auctor. Nam sapien velit, <span class="highlightText" @click="popupText($event, 'commodo')">commodo</span> ac nibh a, maximus ullamcorper nunc. Integer luctus
          tortor dignissim, dictum neque at, scelerisque purus. Vivamus nec erat vel magna posuere euismod. Sed ac augue eu tellus tincidunt fermentum eget sit amet nunc. Donec sit amet mi libero. Cras nunc arcu, ultrices nec sapien eu, convallis posuere libero. Pellentesque vulputate lacus eros, at lobortis lorem egestas et. Vestibulum tempus quam in efficitur lobortis. Maecenas consectetur consequat sem pharetra aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos himenaeos.
        </div>

        <div>Mauris ac ligula elit. <span class="highlightText" @click="popupText($event, 'Nulla')">Nulla</span> pulvinar eget leo ut aliquet. Praesent sit amet luctus quam. Nam fringilla iaculis mi, ut maximus mauris molestie feugiat. Curabitur nec scelerisque elit. Nunc eu odio facilisis, tempor enim eget, venenatis sem. Sed vitae lorem vehicula, auctor orci ultrices, finibus mauris. Donec vitae pulvinar diam. Nulla luctus congue quam, sed lacinia arcu dictum a.</div>

        <div>Morbi laoreet magna elit, id dapibus massa varius consequat. Praesent rhoncus nunc quam, eu mollis velit commodo ut. Etiam euismod elit mi, non auctor velit blandit ut. Aenean vitae pulvinar mi, ac <span class="highlightText" @click="popupText($event, 'pretium')">pretium</span> tellus. Morbi eu auctor sem, sollicitudin cursus felis. Praesent vestibulum velit sed eros iaculis ornare. Praesent diam diam, pellentesque eget scelerisque sed, bibendum ut risus. Sed sed fermentum sem.
          Integer vel justo felis. Proin eget quam est. In sit amet ipsum sagittis, convallis ipsum fringilla, interdum ante. Etiam vel tincidunt mauris. Nunc feugiat eros nunc, et vestibulum metus mollis et. Nullam eu viverra velit, id ultrices nisl. Donec non enim elementum, laoreet sapien id, feugiat tellus.
        </div>

        <div>Sed pellentesque ipsum eget ante hendrerit maximus. <span class="highlightText" @click="popupText($event, 'Aliquam')">Aliquam</span> id venenatis nulla. Nullam in nibh at enim vestibulum ullamcorper. Nam felis dolor, lobortis vel est non, condimentum malesuada nisl. In metus sapien, malesuada at nulla in, pretium aliquam turpis. Quisque elementum purus mi, sed tristique turpis ultricies in. Donec feugiat dolor non ultricies ultricies. Cum sociis natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus. Proin ut purus et diam porta cursus vitae semper mi. Donec fringilla tellus orci. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc vitae commodo sem. Duis vehicula quam sit amet imperdiet facilisis. Pellentesque eget dignissim neque, et scelerisque libero. Maecenas molestie metus sed orci cursus, in venenatis justo dapibus.
        </div>

        <div>Aenean rhoncus urna at interdum blandit. Donec ac <span class="highlightText" @click="popupText($event, 'massa')">massa</span> nec libero vehicula tincidunt. Sed sit amet hendrerit risus. Aliquam vitae vestibulum ipsum, non feugiat orci. Vivamus eu rutrum elit. Nulla dapibus tortor non dignissim pretium. Nulla in luctus turpis. Etiam non mattis tortor, at aliquet ex. Nunc ut ante varius, auctor dui vel, volutpat elit. Nunc laoreet augue sit amet ultrices porta. Vestibulum ante ipsum
          primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum pellentesque lobortis est, ut tincidunt ligula mollis sit amet. In porta risus arcu, quis pellentesque dolor mattis non. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
        </div>
      </div>

    </vm-content>
  </vm-page>
</template>
<script>
import Popage from './popage.vue'

export default {
  methods: {

    pageSetting (ev) {
      this.$popover.present({
        ev: ev,
        component: Popage,
        data: {
          contentEle: this.$refs.content.$el // 传入数据, 内部通过`this.$options.$data`获取这个data
        }
      })
    },

    popupText (ev, text) {
      let contont = '<p style="padding:0 14px;" text-center>You select the word of <strong>' + text + '</strong>.</p>'

      this.$popover.present({
        ev: ev,
        component: contont
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .highlightText {
    font-weight: bold;
    font-size: 1.5em;
  }
</style>
