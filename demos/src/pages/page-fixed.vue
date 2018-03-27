<template>
  <vm-page v-nav="{title: '浮动内容'}">
    <vm-content class="outer-content" padding ref="content">
      <div slot="fixed" padding class="fixedContent fixedTop0">
        <strong>业务有需求将部分内容固定到顶部或者固定到底部, 这部分固定内容不随页面的滚动而移动, 就像这样.</strong>
      </div>
      <div slot="fixed" padding class="fixedContent fixedTop">
        <strong>或者固定到页面的某个位置. 这部分使用的都是slot属性: fixed </strong>
      </div>
      <article>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
      </article>
      <!--Button-->
      <vm-button block @click="scrollToBottom">滚动到底部</vm-button>
      <article>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
      </article>
      <vm-button block @click="scrollToTop">滚动到顶部</vm-button>
      <article>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fuga iste iusto nihil officia possimus sit ullam. Aperiam architecto dolor ex harum iste laboriosam nostrum possimus quibusdam. Provident, sequi similique?</p>
      </article>
      <div slot="fixed" padding class="fixedContent fixedBottom">
        <strong>业务有需求将部分内容固定到顶部或者固定到底部, 这部分固定内容不随页面的滚动而移动, 就像这样.</strong>
      </div>
    </vm-content>
    <vm-footer>
      <vm-toolbar>
        <vm-title>This is a Footer</vm-title>
      </vm-toolbar>
    </vm-footer>
  </vm-page>
</template>

<script type="text/javascript">
import {Button, Toolbar} from 'vimon'
export default {
  components: {
    'vm-button': Button,
    'vm-toolbar': Toolbar
  },
  computed: {
    content () {
      return this.$refs.content
    }
  },
  methods: {
    scrollToBottom () {
      this.content.scrollToBottom()
    },
    scrollToTop () {
      this.content.scrollToTop()
    }
  }
}
</script>

<style scoped lang="scss">
.fixedContent {
  height: 72px;
  background: rgba(255, 125, 196, 0.95);
  position: absolute;
    z-index: 1009;
}

.fixedTop {
  top: 72px;
  background: rgba(145, 255, 191, 0.95);
  position: absolute;
    z-index: 1009;
}

.fixedBottom {
  bottom: 0;
  background: rgba(145, 255, 191, 0.95);
  position: absolute;
    z-index: 1009;
}
</style>

