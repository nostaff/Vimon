<template>
  <vm-page v-nav="{title: 'Badge'}">
    <vm-content>

      <vm-card>

        <img src="../../static/img/bjork-live.jpg"/>

        <vm-card-content>
          <vm-card-title>
            Björk
          </vm-card-title>
          <p>
            Björk first came to prominence as one of the lead vocalists of the avant pop Icelandic sextet the Sugarcubes, but when...
          </p>
        </vm-card-content>

        <vm-item>
          <vm-icon slot="item-start" name='musical-notes' style="color: #d03e84"></vm-icon>
          Albums
          <vm-badge slot="item-end">9</vm-badge>
        </vm-item>

        <vm-item>
          <vm-icon slot="item-start" name='logo-twitter' style="color: #55acee"></vm-icon>
          Followers
          <vm-badge slot="item-end">260k</vm-badge>
        </vm-item>

        <vm-item>
          <vm-icon slot="item-start" name='logo-facebook'></vm-icon>
          Facebook
          <vm-badge slot="item-end" dot color="danger"></vm-badge>
        </vm-item>
      </vm-card>

    </vm-content>
  </vm-page>
</template>

<script type="text/javascript">
import {Icon, Badge, Card, CardTitle, CardContent, List, Item} from 'vimon'
export default {
  name: 'DemoBadge',
  components: {
    'vm-icon': Icon,
    'vm-badge': Badge,
    'vm-card': Card,
    'vm-card-title': CardTitle,
    'vm-card-content': CardContent,
    'vm-list': List,
    'vm-item': Item
  }
}
</script>
