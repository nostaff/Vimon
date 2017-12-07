import core from './core.js'

import App from './components/app/index.js'
import {Footer, Header, Page} from './components/page/index.js'
import {Buttons, Navbar, Title, Toolbar} from './components/toolbar/index.js'
import Content from './components/content/index.js'

import Address from './components/address/index.js'
import Avatar from './components/avatar/index.js'
import Backdrop from './components/backdrop/index.js'
import Badge from './components/badge/index.js'
import Button from './components/button/index.js'
import {Card, CardContent, CardHeader, CardTitle} from './components/card/index.js'
import {Checkbox, CheckboxGroup} from './components/checkbox/index.js'
import Cells from './components/cells/index.js'
import Chip from './components/chip/index.js'
import Datetime from './components/datetime/index.js'
import {Fab, FabButton, FabList} from './components/fab/index.js'
// import Feedback from './components/feedback/index.js'
import {Column, Grid, Row} from './components/grid/index.js'
import Icon from './components/icon/index.js'
// import Img from './components/img/index.js'
import InfiniteScroll from './components/infinite-scroll/index.js'
import {Input, Textarea} from './components/input/index.js'
import {Item, ItemDivider, ItemGroup, ItemOptions, ItemSliding, ItemReorder} from './components/item/index.js'
import Label from './components/label/index.js'
import {List, ListHeader} from './components/list/index.js'
// import Menu from './components/menu/index.js'
import Note from './components/note/index.js'
// import Noticebar from './components/noticebar/index.js'
// import PopSheet from './components/pop-sheet/index.js'
import {Radio, RadioGroup} from './components/radio/index.js'
import Range from './components/range/index.js'
import Refresher from './components/refresher/index.js'
import Scroll from './components/scroll/index.js'
// import ScrollSegment from './components/scroll-segment/index.js'
import Searchbar from './components/searchbar/index.js'
import {Segment, SegmentButton} from './components/segment/index.js'
import {Option, Select} from './components/select/index.js'
// import Separation from './components/separation/index.js'
// import Sheet from './components/sheet/index.js'
// import SlideBox from './components/slide-box/index.js'
// import Slides from './components/slides/index.js'
// import SlidesLite from './components/slides-lite/index.js'
import Spinner from './components/spinner/index.js'
import {Tab, Tabs} from './components/tabs/index.js'
import Thumbnail from './components/thumbnail/index.js'
import Toggle from './components/toggle/index.js'

// Plugins
import ActionSheet from './components/action-sheet'
import Alert from './components/alert'
// import ChooseCity from './components/choose-city/chose-city'
// import CityPicker from './components/city-picker'
// import Indicator from './components/indicator'
import Loading from './components/loading'
import Modal from './components/modal'
import Picker from './components/picker'
import Popover from './components/popover'
import Popup from './components/popup'
// import PreviewImage from './components/components/preview-image'
import Toast from './components/toast'

// directives
import Navigation from './directives/navigation.js'

const version = '1.0.1'

// Componnets
const components = {
  App,
  Footer,
  Header,
  Content,
  Page,

  Address,
  Avatar,
  Backdrop,
  Badge,
  Button,
  Buttons,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  CheckboxGroup,
  Cells,
  Chip,
  Datetime,
  Fab,
  FabButton,
  FabList,
  // Feedback,
  Column,
  Grid,
  Row,
  Icon,
  // Img,
  InfiniteScroll,
  Input,
  Textarea,
  Item,
  ItemDivider,
  ItemGroup,
  // ItemCollapse,
  ItemOptions,
  ItemReorder,
  ItemSliding,
  Label,
  ListHeader,
  List,
  // Menu,
  Note,
  // Noticebar,
  Navbar,
  // PopSheet,
  Radio,
  RadioGroup,
  Range,
  Refresher,
  Scroll,
  // ScrollSegment,
  Searchbar,
  Segment,
  SegmentButton,
  Select,
  Option,
  // Separation,
  // Sheet,
  // SlideBox,
  // Slides,
  // SlidesLite,
  Spinner,
  Tabs,
  Tab,
  Thumbnail,
  Title,
  Toolbar,
  Toggle
}

// directives
const directives = {
  Navigation
}

const VuePlugin = {
  install: function (Vue, options = {}) {
    /* istanbul ignore if */
    if (this.installed) return

    core(Vue, options)

    // components
    for (let component in components) {
      let name = components[component].name || component
      Vue.component(name, components[component])
    }

    // directives
    for (let directive in directives) {
      let name = directives[directive].name || directive
      Vue.directive(name, directives[directive])
    }

    // plugins
    Vue.prototype.$actionSheet = ActionSheet
    Vue.prototype.$dialog = Alert
    Vue.prototype.$loading = Loading
    Vue.prototype.$modal = Modal
    Vue.prototype.$picker = Picker
    Vue.prototype.$popover = Popover
    Vue.prototype.$popup = Popup
    Vue.prototype.$toast = Toast
  }
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  VuePlugin.install(window.Vue)
}

export {
  version,

  // Componnets
  App,
  Footer,
  Header,
  Content,
  Page,
  // Nav,
  Address,
  Avatar,
  Backdrop,
  Badge,
  Button,
  Buttons,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  CheckboxGroup,
  Cells,
  Chip,
  Datetime,
  Fab,
  FabButton,
  FabList,
  // Feedback,
  Column,
  Grid,
  Row,
  Icon,
  // Img,
  InfiniteScroll,
  Input,
  Textarea,
  Item,
  ItemDivider,
  ItemGroup,
  // ItemCollapse,
  ItemOptions,
  ItemReorder,
  ItemSliding,
  Label,
  ListHeader,
  List,
  // Menu,
  Note,
  // Noticebar,
  Navbar,
  // PopSheet,
  Radio,
  RadioGroup,
  Range,
  Refresher,
  Scroll,
  // ScrollSegment,
  Searchbar,
  Segment,
  SegmentButton,
  Select,
  Option,
  // Separation,
  // Sheet,
  // SlideBox,
  // Slides,
  // SlidesLite,
  Spinner,
  Tabs,
  Tab,
  Thumbnail,
  Title,
  Toolbar,
  Toggle,

  // Plugins
  ActionSheet,
  Alert,
  // ChooseCity,
  // CityPicker,
  // Indicator,
  Loading,
  Modal,
  Picker,
  Popover,
  Popup,
  // PreviewImage,
  Toast,

  // Directives
  Navigation
}

export default VuePlugin
