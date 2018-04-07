<template>
  <vm-page v-nav="{title: 'Img'}">
    <vm-content padding>
      <h1>IMG Lazyload</h1>
      <p>只有需要加载的图片才会下载显示, 已下载完毕的图片会等到合适位置才显示.</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius expedita officia quam reiciendis similique suscipit vel. Assumenda, cum error eum, fuga nobis pariatur placeat praesentium qui, repellendus repudiandae similique veritatis.</p>
      <vm-img width="100%" height="200" :src="'/static/background/'+i+'.jpg'" v-for="i in totalCount" :key="i"></vm-img>
    </vm-content>
  </vm-page>
</template>

<script type="text/javascript">
import {Img} from 'vimon'
export default {
  components: {
    'vm-img': Img
  },
  name: 'name',
  data () {
    return {
      totalCount: 20
    }
  }
}
</script>
