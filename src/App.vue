<template>
    <div id="app">
        <v-toast v-show="showToast"></v-toast>
        <v-alert v-show="showAlert"></v-alert>
        <v-loading v-show="loading"></v-loading>

        <x-header class="header" slot="header"
                  :left-options="leftOptions"
                  :right-options="rightOptions"
                  :title="title"
                  :transition="headerTransition"
                  @on-click-more="onClickMore"></x-header>

        <div class="content">
            <transition name="slide-left">
                <router-view></router-view>
            </transition>
        </div>

        <tabbar slot="bottom" class="tabbar" v-show="!isTabbarDemo">
            <tabbar-item link="/home" :selected="isDemo" badge="9">
                <span slot="icon" class="icon-home"></span>
                <span slot="label" class="tab-label">首页</span>
            </tabbar-item>
            <tabbar-item link="/sport" :selected="isDemo">
                <span slot="icon" class="icon-search"></span>
                <span slot="label" class="tab-label">搜索</span>
            </tabbar-item>
            <tabbar-item link="/setting" :selected="isDemo">
                <span slot="icon" class="icon-gear"></span>
                <span slot="label" class="tab-label">设置</span>
            </tabbar-item>
            <tabbar-item link="/user" :selected="isDemo" show-dot>
                <span slot="icon" class="icon-person"></span>
                <span slot="label" class="tab-label">我的</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
    import XHeader from './components/Header'
    import Tabbar from './components/TabBar'
    import TabbarItem from './components/TabBarItem'
    import Badge from './components/Badge'
    import toast from './components/toast'
    import alert from './components/alert'
    import loading from './components/loading'

    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'app',
        components: {
            'v-tabbar': Tabbar,
            XHeader,
            Tabbar,
            TabbarItem,
            'v-header': XHeader,
            'v-toast': toast,
            'v-alert': alert,
            'v-loading': loading,
        },
        data () {
            return {

            }
        },
        watch: {
//            path (path) {
//                if (path === '/component/demo') {
//                    this.$router.replace('/demo')
//                    return
//                }
//                if (path === '/demo') {
//                    setTimeout(() => {
//                        this.box = document.querySelector('#demo_list_box')
//                        if (this.box) {
//                            this.box.removeEventListener('scroll', this.handler, false)
//                            this.box.addEventListener('scroll', this.handler, false)
//                        }
//                    }, 1000)
//                } else {
//                    this.box && this.box.removeEventListener('scroll', this.handler, false)
//                }
//            }
        },
        methods: {
            ...mapActions({ setNavState: 'setNavState' }),
            onClickMore () {
                this.showMenu = true
            },
        },
        computed: {
            ...mapGetters([
                'loading',
                'showToast',
                'showAlert'
            ]),
            leftOptions () {
                return {
                    showBack: this.$route.path !== '/',
                    backIcon: 'icon-left-nav',
                    backText: '返回'
                }
            },
            rightOptions () {
                return {
                    showMore: true,
                    moreIcon: 'icon-right-nav'
                }
            },
            headerTransition () {
                return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
            },
            componentName () {
                if (this.$route.path) {
                    const parts = this.$route.path.split('/')
                    if (/component/.test(this.$route.path) && parts[2]) return parts[2]
                }
            },
            isDemo () {
                return /component|demo/.test(this.$route.path)
            },
            isTabbarDemo () {
                return /tabbar/.test(this.$route.path)
            },
            title () {
                switch (this.$route.path.split('/')[1]) {
                    case '':
                        return "Qu约"
                    case 'home':
                        return "Qu约"
                    case 'sport':
                        return "约跑"
                    case 'travel':
                        return "约行"
                    case 'user':
                        return "我的"
                }
            },
            tabar () {
                return this.$route.path.split('/').length > 2 ? false : true
            },
            menuDisplay () {
                if (this.$route.path.split('/')[1] == 'home') {
                    return false
                }
                return this.$route.path.split('/').length > 2 ? false : true
            },
            backDisplay () {
                return this.$route.path.split('/').length > 2 ? true : false
            },
            mapDisplay () {
                if (this.$route.path.split('/')[1] == 'home') {
                    return true
                }
                return false
            }
        }
    }
</script>

<style lang="scss">
    @import './assets/css/function';

    // Variables
    @import "./assets/css/variables.scss";

    // Mixins
    @import "./assets/css/mixins.scss";

    // Normalize & Base CSS
    @import "./assets/css/normalize.scss";
    @import "./assets/css/base.scss";
    @import "./assets/css/type.scss";

    // Ratchicons
    @import "./assets/css/ratchicons.scss";

    // Theme iOS
    @import "./assets/css/theme-ios.scss";

</style>
