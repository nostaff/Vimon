<template>
    <ion-page v-nav="{title: '按钮'}">
        <ion-content text-center>
            <h4>Colors</h4>
            <ion-button>Default</ion-button>
            <ion-button color="secondary">Secondary</ion-button>
            <ion-button color="danger">Danger</ion-button>
            <ion-button color="light">Light</ion-button>
            <ion-button color="dark">Dark</ion-button>
            <h4>Shapes</h4>
            <ion-button full>Full ion-button</ion-button>
            <ion-button block>Block ion-button</ion-button>
            <ion-button round>Round ion-button</ion-button>
            <h4>Outlines</h4>
            <ion-button color="secondary" full outline>Outline + Full</ion-button>
            <ion-button color="secondary" block outline>Outline + Block</ion-button>
            <ion-button color="secondary" round outline>Outline + Round</ion-button>
            <h4>Icons</h4>
            <ion-button icon-start color="dark">
                <ion-icon name="star"></ion-icon>
                Left Icon
            </ion-button>
            <ion-button icon-end color="dark">
                Right Icon
                <ion-icon name="star"></ion-icon>
            </ion-button>
            <ion-button icon-only color="dark">
                <ion-icon name="star"></ion-icon>
            </ion-button>
            <h4>Sizes</h4>
            <ion-button color="light" large>Large</ion-button>
            <ion-button color="light">Default</ion-button>
            <ion-button color="light" small>Small</ion-button>
        </ion-content>
    </ion-page>
</template>

<script>
  export default {
    name: 'DemoButton'
  }
</script>
