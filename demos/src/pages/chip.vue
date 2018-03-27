<template>
  <vm-page v-nav="{title: 'Chip'}">
    <vm-content padding text-center>
      <h2>Text Chips</h2>
      <vm-chip>
        <vm-label>Default</vm-label>
      </vm-chip>
      <vm-chip>
        <vm-label color="secondary">Secondary Label</vm-label>
      </vm-chip>
      <vm-chip>
        <vm-label>Another With Longer Text</vm-label>
      </vm-chip>
      <h2>Color Chips</h2>
      <vm-chip color="primary">
        <vm-icon name="heart" color="dark"></vm-icon>
        <vm-label>Primary</vm-label>
      </vm-chip>
      <vm-chip color="secondary">
        <vm-label color="dark">Secondary w/ Dark label</vm-label>
      </vm-chip>
      <vm-chip color="danger">
        <vm-label>Danger</vm-label>
      </vm-chip>
      <h2>Icon Chips</h2>
      <vm-chip>
        <vm-icon name="pin"></vm-icon>
        <vm-label>Default</vm-label>
      </vm-chip>
      <vm-chip>
        <vm-label>Secondary</vm-label>
        <vm-icon name="pin" color="secondary"></vm-icon>
      </vm-chip>
      <h2>Avatar Chips</h2>
      <vm-chip>
        <vm-avatar>
          <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y">
        </vm-avatar>
        <vm-label>Default</vm-label>
      </vm-chip>
      <vm-chip>
        <vm-label>Right Avatar</vm-label>
        <vm-avatar>
          <img src="https://gravatar.com/avatar/d249a09fecac4da036d26c5002af2c94?d=identicon&f=y">
        </vm-avatar>
      </vm-chip>
      <h2>Delete Chips</h2>
      <vm-chip id="chip1">
        <vm-label>Default</vm-label>
        <vm-button clear @click.native="deleteElm('chip1')">
          <vm-icon name="close-circle"></vm-icon>
        </vm-button>
      </vm-chip>
      <vm-chip id="chip2">
        <vm-icon name="pin" color="primary"></vm-icon>
        <vm-label>With Icon</vm-label>
        <vm-button clear @click.native="deleteElm('chip2')">
          <vm-icon name="close-circle"></vm-icon>
        </vm-button>
      </vm-chip>
      <vm-chip id="chip3">
        <vm-avatar>
          <img src="https://gravatar.com/avatar/83b4748bf7e821165ecccd4c090d96e1?d=identicon&f=y">
        </vm-avatar>
        <vm-label>With Avatar</vm-label>
        <vm-button clear color="dark" @click.native="deleteElm('chip3')">
          <vm-icon name="close-circle"></vm-icon>
        </vm-button>
      </vm-chip>
    </vm-content>
  </vm-page>
</template>

<script type="text/javascript">
import {Avatar, Button, Label, Chip, Icon, FabList, FabButton} from 'vimon'
export default {
  name: 'DemoChip',
  components: {
    'vm-avatar': Avatar,
    'vm-button': Button,
    'vm-label': Label,
    'vm-chip': Chip,
    'vm-fab-list': FabList,
    'vm-fab-button': FabButton,
    'vm-icon': Icon
  },
  methods: {
    deleteElm (chip) {
      let el = this.$el.querySelector('#' + chip)
      el.parentNode.removeChild(el)
    }
  }
}
</script>
