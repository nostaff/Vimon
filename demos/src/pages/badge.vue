<template>
  <vm-page v-nav="{title: 'Badge'}">
    <vm-content padding>
        <vm-badge>2</vm-badge>
        <vm-badge color="danger">35</vm-badge>
        <vm-badge color="dark">99</vm-badge>
    </vm-content>
  </vm-page>
</template>

<script>
  export default {
    name: 'DemoBadge'
  }
</script>
