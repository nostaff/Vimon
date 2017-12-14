<template>
    <vm-page v-nav="{title: 'Tabs'}">

        <vm-content class="tabs-demo">
            <!-- Text -->
            <vm-tabs tabs-only>
                <vm-tab tabTitle="Recents"></vm-tab>
                <vm-tab tabTitle="Favorites" tabBadge="23"></vm-tab>
                <vm-tab tabTitle="Settings"></vm-tab>
            </vm-tabs>


            <!-- Icons -->
            <vm-tabs tabs-only selectedIndex="1" color="primary">
                <vm-tab tabIcon="call"></vm-tab>
                <vm-tab tabIcon="heart"></vm-tab>
                <vm-tab tabIcon="settings" tabBadge="2" tabBadgeStyle="danger"></vm-tab>
            </vm-tabs>


            <!-- Icons on top of text -->
            <vm-tabs tabs-only selectedIndex="2" color="secondary">
                <vm-tab tabTitle="Location" tabIcon="navigate"></vm-tab>
                <vm-tab tabTitle="Favorites" tabIcon="star" tabBadge="12" tabBadgeStyle="dark"></vm-tab>
                <vm-tab tabTitle="Radio" tabIcon="musical-notes"></vm-tab>
            </vm-tabs>


            <!-- Icons below text -->
            <vm-tabs tabs-only tabsLayout="icon-bottom" selectedIndex="1" color="danger">
                <vm-tab tabTitle="Recents" tabIcon="call" tabBadge="47" tabBadgeStyle="light"></vm-tab>
                <vm-tab tabTitle="Favorites" tabIcon="heart"></vm-tab>
                <vm-tab tabTitle="Settings" tabIcon="settings"></vm-tab>
            </vm-tabs>


            <!-- Icons right of text -->
            <vm-tabs tabs-only tabsLayout="icon-end" selectedIndex="0" color="light">
                <vm-tab tabTitle="Recents" tabIcon="call"></vm-tab>
                <vm-tab tabTitle="Favorites" tabIcon="heart"></vm-tab>
                <vm-tab tabTitle="Settings" tabIcon="settings" tabBadge="4" tabBadgeStyle="secondary"></vm-tab>
            </vm-tabs>


            <!-- Icons left of text -->
            <vm-tabs tabs-only tabsLayout="icon-start" color="dark">
                <vm-tab tabTitle="Recents" tabIcon="call" tabBadge="1" tabBadgeStyle="danger"></vm-tab>
                <vm-tab tabTitle="Favorites" tabIcon="heart"></vm-tab>
                <vm-tab tabTitle="Settings" tabIcon="settings"></vm-tab>
            </vm-tabs>


            <!-- No icons -->
            <vm-tabs tabs-only tabsLayout="icon-hide">
                <vm-tab tabTitle="Recents" tabIcon="call"></vm-tab>
                <vm-tab tabTitle="Favorites" tabIcon="heart" tabBadge="61" tabBadgeStyle="dark"></vm-tab>
                <vm-tab tabTitle="Settings" tabIcon="settings"></vm-tab>
            </vm-tabs>


            <!-- No overflow text -->
            <vm-tabs tabs-only color="primary">
                <vm-tab tabTitle="Indiana Jones and the Raiders of the Lost Ark"></vm-tab>
                <vm-tab tabTitle="Indiana Jones and the Temple of Doom"></vm-tab>
                <vm-tab tabTitle="Indiana Jones and the Last Crusade"></vm-tab>
            </vm-tabs>

        </vm-content>
    </vm-page>
</template>

<style lang="scss">

    .tabs-demo {
        .ion-tabs[tabs-only]:first-child {
            margin-top: 20px;
        }

        .ion-tabs[tabs-only], .ion-tabs[tabs-only] .tabbar {
            position: relative;
            top: auto;
            height: auto;
            visibility: visible;
            opacity: 1;
        }
        .ion-tabs[tabs-only] {
            margin-bottom: 20px;
            contain: none;
        }
        .ion-tabs, .ion-tabs .tabbar {
            position: relative;
            top: auto;
            height: auto;
            visibility: visible;
            opacity: 1;
        }

        .ion-tabs {
            margin-bottom: 20px;
        }
    }
</style>
