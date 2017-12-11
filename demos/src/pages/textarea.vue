<template>
    <ion-page v-nav="{title: '多行输入框'}">
        <ion-content class="outer-content">

            <ion-list title="Textarea">
                <ion-item>
                    <ion-label slot="item-label" color="primary">Inline Label</ion-label>
                    <ion-textarea slot="item-content" placeholder="Textarea"></ion-textarea>
                </ion-item>

                <ion-item>
                    <ion-label slot="item-label" color="primary" fixed>Fixed Label</ion-label>
                    <ion-textarea slot="item-content" placeholder="Textarea"></ion-textarea>
                </ion-item>

                <ion-item>
                    <ion-textarea placeholder="Textarea with no label"></ion-textarea>
                </ion-item>

                <ion-item>
                    <ion-label slot="item-label" color="primary" stacked>Stacked Label</ion-label>
                    <ion-textarea slot="item-content" placeholder="Textarea"></ion-textarea>
                </ion-item>

                <ion-item>
                    <ion-label slot="item-label" color="primary" floating>Floating Label</ion-label>
                    <ion-textarea slot="item-content"></ion-textarea>
                </ion-item>

                <ion-item>
                    <ion-label slot="item-label" color="primary" stacked>With MaxLenth</ion-label>
                    <ion-textarea slot="item-content" maxlength="10" placeholder="Textarea with MaxLenth"></ion-textarea>
                </ion-item>
            </ion-list>

        </ion-content>
    </ion-page>
</template>
