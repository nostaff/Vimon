<template>
    <vm-page v-nav="{title: 'Textarea'}">

        <vm-content class="outer-content">

            <vm-list title="Textarea">
                <vm-item>
                    <vm-label slot="item-label" color="primary">Inline Label</vm-label>
                    <vm-textarea slot="item-content" placeholder="Textarea"></vm-textarea>
                </vm-item>

                <vm-item>
                    <vm-label slot="item-label" color="primary" fixed>Fixed Label</vm-label>
                    <vm-textarea slot="item-content" placeholder="Textarea"></vm-textarea>
                </vm-item>

                <vm-item>
                    <vm-textarea placeholder="Textarea with no label"></vm-textarea>
                </vm-item>

                <vm-item>
                    <vm-label slot="item-label" color="primary" stacked>Stacked Label</vm-label>
                    <vm-textarea slot="item-content" placeholder="Textarea"></vm-textarea>
                </vm-item>

                <vm-item>
                    <vm-label slot="item-label" color="primary" floating>Floating Label</vm-label>
                    <vm-textarea slot="item-content"></vm-textarea>
                </vm-item>

                <vm-item>
                    <vm-label slot="item-label" color="primary" stacked>With MaxLenth</vm-label>
                    <vm-textarea slot="item-content" maxlength="10" placeholder="Textarea with MaxLenth"></vm-textarea>
                </vm-item>
            </vm-list>

        </vm-content>
    </vm-page>
</template>
