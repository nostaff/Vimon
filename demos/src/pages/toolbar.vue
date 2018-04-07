<template>
  <vm-page v-nav="{title: 'Toolbar'}">

    <vm-content>
      <vm-toolbar no-border-top>
        <vm-title>Long title that never ends. It just goes on and on my friend.</vm-title>
      </vm-toolbar>

      <vm-toolbar no-border-top>
        <vm-buttons slot="buttons" start>
          <vm-button icon-only>
            <vm-icon name="contact"></vm-icon>
          </vm-button>
          <vm-button icon-only>
            <vm-icon name="search"></vm-icon>
          </vm-button>
        </vm-buttons>
        <vm-buttons slot="buttons" end>
          <vm-button icon-only>
            <vm-icon name="more"></vm-icon>
          </vm-button>
        </vm-buttons>
        <vm-title>Default Buttons</vm-title>
      </vm-toolbar>

      <vm-toolbar no-border-top>
        <vm-buttons slot="buttons" start>
          <vm-button icon-only color="danger">
            <vm-icon name="contact"></vm-icon>
          </vm-button>
          <vm-button icon-only color="secondary">
            <vm-icon name="search"></vm-icon>
          </vm-button>
        </vm-buttons>
        <vm-buttons slot="buttons" end>
          <vm-button icon-only color="dark">
            <vm-icon name="more"></vm-icon>
          </vm-button>
        </vm-buttons>
        <vm-title>Colored Buttons</vm-title>
      </vm-toolbar>

      <vm-toolbar no-border-top>
        <vm-buttons slot="buttons" start>
          <vm-button icon-only solid>
            <vm-icon name="contact"></vm-icon>
          </vm-button>
        </vm-buttons>
        <vm-title>Solid</vm-title>
        <vm-buttons slot="buttons" end>
          <vm-button icon-end solid color="secondary">
            Help
            <vm-icon name="help-circle"></vm-icon>
          </vm-button>
        </vm-buttons>
      </vm-toolbar>

      <vm-toolbar no-border-top>
        <vm-buttons slot="buttons" start>
          <vm-button icon-only outline>
            <vm-icon name="contact"></vm-icon>
          </vm-button>
        </vm-buttons>
        <vm-buttons slot="buttons" end>
          <vm-button icon-end outline color="secondary">
            Help
            <vm-icon name="help-circle"></vm-icon>
          </vm-button>
        </vm-buttons>
        <vm-title>Outline</vm-title>
      </vm-toolbar>

      <vm-toolbar no-border-top>
        <vm-button slot="buttons" icon-only menutoggle>
          <vm-icon name="menu"></vm-icon>
        </vm-button>
        <vm-title>Left Menu</vm-title>
      </vm-toolbar>

      <vm-toolbar no-border-top>
        <vm-title>Right Menu</vm-title>
        <vm-button slot="buttons" menutoggle  end>
          <vm-icon name="menu"></vm-icon>
        </vm-button>
      </vm-toolbar>

      <vm-toolbar no-border-top>
        <vm-buttons slot="buttons" end>
          <vm-button icon-only>
            <vm-icon name="search"></vm-icon>
          </vm-button>
        </vm-buttons>
        <vm-segment color="danger" v-model="favorites">
          <vm-segment-button value="featured">
            Featured
          </vm-segment-button>
          <vm-segment-button value="recent">
            Recent
          </vm-segment-button>
        </vm-segment>
      </vm-toolbar>

      <vm-toolbar no-border-top>
        <vm-segment v-model="apps">
          <vm-segment-button value="paid">
            Paid
          </vm-segment-button>
          <vm-segment-button value="free">
            Free
          </vm-segment-button>
          <vm-segment-button value="top">
            Top
          </vm-segment-button>
        </vm-segment>
      </vm-toolbar>

      <vm-toolbar no-border-top>
        <vm-searchbar></vm-searchbar>
      </vm-toolbar>

      <vm-toolbar no-border-top color="primary">
        <vm-searchbar></vm-searchbar>
      </vm-toolbar>

    </vm-content>

    <vm-footer>

      <vm-toolbar>
        <vm-title>I'm a footer</vm-title>
      </vm-toolbar>

    </vm-footer>

  </vm-page>
</template>

<script type="text/javascript">
import {Button, Icon, Toolbar, Buttons, Segment, SegmentButton, Searchbar} from 'vimon'
export default {
  components: {
    'vm-button': Button,
    'vm-icon': Icon,
    'vm-toolbar': Toolbar,
    'vm-buttons': Buttons,
    'vm-segment': Segment,
    'vm-segment-button': SegmentButton,
    'vm-searchbar': Searchbar
  },
  data () {
    return {
      demo: 'Toolbar',
      favorites: 'recent',
      apps: 'free'
    }
  }
}
</script>
