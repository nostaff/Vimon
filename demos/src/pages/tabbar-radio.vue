<template>
  <vm-page>

    <vm-header>
      <vm-toolbar>
        <vm-title>Radio</vm-title>
      </vm-toolbar>
    </vm-header>

    <vm-content>
      <h2>Welcome to Ionic!</h2>
      <p>
        This starter project comes with simple tabs-based layout for apps
        that are going to primarily use a Tabbed UI.
      </p>
      <p>
        Take a look at the <code>src/pages/</code> directory to add or change tabs,
        update any existing page or create new pages.
      </p>
    </vm-content>

  </vm-page>

</template>

<script type="text/javascript">
import {Toolbar} from 'vimon'
export default {
  components: {
    'vm-toolbar': Toolbar
  }
}
</script>