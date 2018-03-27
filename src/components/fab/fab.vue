<template>
  <div class="ion-fab">
    <slot></slot>
  </div>
</template>
<script type="text/javascript">
  import ModeMixins from '../../themes/theme.mixins'

  export default {
    name: 'vm-fab',
    mixins: [ModeMixins],
    provide () {
      let _this = this
      return {
        fabComponent: _this
      }
    },
    data () {
      return {
        /**
         * @hidden
         */
        listsActive: false,

        /**
         * @hidden
         */
        mainButton: null,

        /**
         * @hidden
         */
        fabLists: []
      }
    },
    methods: {
      /**
       * @hidden
       */
      toggleClicked () {
        if (this.canActivateList()) {
          this.toggleList()
        }
      },

      /**
       * @hidden
       */
      canActivateList () {
        return (this.fabLists.length > 0 && this.mainButton)
      },

      /**
       * @hidden
       */
      toggleList () {
        this.$app && this.$app.setEnabled(false, 300)

        this.setActiveLists(!this.listsActive)
      },

      /**
       * @hidden
       */
      setActiveLists (isActive) {
        if (isActive === this.listsActive) {
          return
        }

        let lists = this.fabLists
        for (let list of lists) {
          list.setVisible(isActive)
        }
        this.mainButton.setActiveClose(isActive)
        this.listsActive = isActive
      },

      /**
       * Close an active FAB list container
       */
      close () {
        this.setActiveLists(false)
      }

    }
  }
</script>

<style lang="scss">
  @import 'fab';
  @import 'fab.ios';
  @import 'fab.md';
</style>
