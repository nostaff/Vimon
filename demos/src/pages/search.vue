<template>
    <ion-page v-nav="{title: '搜索框'}">
        <ion-content>

            <ion-searchbar v-model="keywords" placeholder="输入关键字" :onChange="onChange"
                           :on-cancel="onCancel"></ion-searchbar>

            <div class="item" v-show="searching">
                searching for '{{keywords}}'.
            </div>

        </ion-content>
    </ion-page>
</template>
<script>
    export default{
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
