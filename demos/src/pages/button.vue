<template>
    <vm-page v-nav="{title: 'Button'}">
        <vm-content text-center>
            <h4>Colors</h4>
            <vm-button>Default</vm-button>
            <vm-button color="secondary">Secondary</vm-button>
            <vm-button color="danger">Danger</vm-button>
            <vm-button color="light">Light</vm-button>
            <vm-button color="dark">Dark</vm-button>
            <h4>Shapes</h4>
            <vm-button full>Full ion-button</vm-button>
            <vm-button block>Block ion-button</vm-button>
            <vm-button round>Round ion-button</vm-button>
            <h4>Outlines</h4>
            <vm-button color="secondary" full outline>Outline + Full</vm-button>
            <vm-button color="secondary" block outline>Outline + Block</vm-button>
            <vm-button color="secondary" round outline>Outline + Round</vm-button>
            <h4>Icons</h4>
            <vm-button icon-start color="dark">
                <vm-icon name="star"></vm-icon>
                Left Icon
            </vm-button>
            <vm-button icon-end color="dark">
                Right Icon
                <vm-icon name="star"></vm-icon>
            </vm-button>
            <vm-button icon-only color="dark">
                <vm-icon name="star"></vm-icon>
            </vm-button>
            <h4>Sizes</h4>
            <vm-button color="light" large>Large</vm-button>
            <vm-button color="light">Default</vm-button>
            <vm-button color="light" small>Small</vm-button>
        </vm-content>
    </vm-page>
</template>

<script type="text/javascript">
import {Button, Icon} from 'vimon'
export default {
  name: 'DemoButton',
  components: {
    'vm-button': Button,
    'vm-icon': Icon
  }
}
</script>
