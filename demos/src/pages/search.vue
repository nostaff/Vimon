<template>
    <vm-page v-nav="{title: 'Searchbar'}">
        <vm-content>

            <vm-searchbar v-model="keywords" placeholder="输入关键字" :onChange="onChange"
                           :on-cancel="onCancel"></vm-searchbar>

            <div class="item" v-show="searching">
                searching for '{{keywords}}'.
            </div>

        </vm-content>
    </vm-page>
</template>
<script type="text/javascript">
import {Searchbar} from 'vimon'
export default {
  components: {
    'vm-searchbar': Searchbar
  },
  data () {
    return {
      keywords: '',
      searching: false
    }
  },

  methods: {
    onChange (keywords) {
      console.log(keywords)
      this.searching = true
    },

    onCancel () {
      this.searching = false
      this.keywords = ''
    }
  }
}
</script>
