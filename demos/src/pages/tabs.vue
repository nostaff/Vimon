<template>
    <ion-page v-nav="{title: 'Tabs'}">

        <ion-content class="tabs-demo">
            <!-- Text -->
            <ion-tabs tabs-only>
                <ion-tab tabTitle="Recents"></ion-tab>
                <ion-tab tabTitle="Favorites" tabBadge="23"></ion-tab>
                <ion-tab tabTitle="Settings"></ion-tab>
            </ion-tabs>


            <!-- Icons -->
            <ion-tabs tabs-only selectedIndex="1" color="primary">
                <ion-tab tabIcon="call"></ion-tab>
                <ion-tab tabIcon="heart"></ion-tab>
                <ion-tab tabIcon="settings" tabBadge="2" tabBadgeStyle="danger"></ion-tab>
            </ion-tabs>


            <!-- Icons on top of text -->
            <ion-tabs tabs-only selectedIndex="2" color="secondary">
                <ion-tab tabTitle="Location" tabIcon="navigate"></ion-tab>
                <ion-tab tabTitle="Favorites" tabIcon="star" tabBadge="12" tabBadgeStyle="dark"></ion-tab>
                <ion-tab tabTitle="Radio" tabIcon="musical-notes"></ion-tab>
            </ion-tabs>


            <!-- Icons below text -->
            <ion-tabs tabs-only tabsLayout="icon-bottom" selectedIndex="1" color="danger">
                <ion-tab tabTitle="Recents" tabIcon="call" tabBadge="47" tabBadgeStyle="light"></ion-tab>
                <ion-tab tabTitle="Favorites" tabIcon="heart"></ion-tab>
                <ion-tab tabTitle="Settings" tabIcon="settings"></ion-tab>
            </ion-tabs>


            <!-- Icons right of text -->
            <ion-tabs tabs-only tabsLayout="icon-end" selectedIndex="0" color="light">
                <ion-tab tabTitle="Recents" tabIcon="call"></ion-tab>
                <ion-tab tabTitle="Favorites" tabIcon="heart"></ion-tab>
                <ion-tab tabTitle="Settings" tabIcon="settings" tabBadge="4" tabBadgeStyle="secondary"></ion-tab>
            </ion-tabs>


            <!-- Icons left of text -->
            <ion-tabs tabs-only tabsLayout="icon-start" color="dark">
                <ion-tab tabTitle="Recents" tabIcon="call" tabBadge="1" tabBadgeStyle="danger"></ion-tab>
                <ion-tab tabTitle="Favorites" tabIcon="heart"></ion-tab>
                <ion-tab tabTitle="Settings" tabIcon="settings"></ion-tab>
            </ion-tabs>


            <!-- No icons -->
            <ion-tabs tabs-only tabsLayout="icon-hide">
                <ion-tab tabTitle="Recents" tabIcon="call"></ion-tab>
                <ion-tab tabTitle="Favorites" tabIcon="heart" tabBadge="61" tabBadgeStyle="dark"></ion-tab>
                <ion-tab tabTitle="Settings" tabIcon="settings"></ion-tab>
            </ion-tabs>


            <!-- No overflow text -->
            <ion-tabs tabs-only color="primary">
                <ion-tab tabTitle="Indiana Jones and the Raiders of the Lost Ark"></ion-tab>
                <ion-tab tabTitle="Indiana Jones and the Temple of Doom"></ion-tab>
                <ion-tab tabTitle="Indiana Jones and the Last Crusade"></ion-tab>
            </ion-tabs>

        </ion-content>
    </ion-page>
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
