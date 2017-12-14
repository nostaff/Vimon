import core from './core.js'

import App from './components/app/index.js'
import Footer from './components/footer/index.js'
import Header from './components/header/index.js'
import Page from './components/page/index.js'
import Buttons from './components/buttons/index.js'
import Nav from './components/nav/index.js'
import Navbar from './components/navbar/index.js'
import Title from './components/title/index.js'
import Toolbar from './components/toolbar/index.js'
import Content from './components/content/index.js'

import Address from './components/address/index.js'
import Avatar from './components/avatar/index.js'
import Backdrop from './components/backdrop/index.js'
import Badge from './components/badge/index.js'
import Button from './components/button/index.js'
import Card from './components/card/index.js'
import CardContent from './components/card-content/index.js'
import CardHeader from './components/card-header/index.js'
import CardTitle from './components/card-title/index.js'
import Checkbox from './components/checkbox/index.js'
import CheckboxGroup from './components/checkbox-group/index.js'
import Cells from './components/cells/index.js'
import Chip from './components/chip/index.js'
import Datetime from './components/datetime/index.js'
import Fab from './components/fab/index.js'
import FabButton from './components/fab-button/index.js'
import FabList from './components/fab-list/index.js'
// import Feedback from './components/feedback/index.js'
import Column from './components/column/index.js'
import Grid from './components/grid/index.js'
import Row from './components/row/index.js'
import Icon from './components/icon/index.js'
// import Img from './components/img/index.js'
import InfiniteScroll from './components/infinite-scroll/index.js'
import Input from './components/input/index.js'
import Textarea from './components/textarea/index.js'
import Item from './components/item/index.js'
import ItemDivider from './components/item-divider/index.js'
import ItemGroup from './components/item-group/index.js'
import ItemOptions from './components/item-options/index.js'
import ItemSliding from './components/item-sliding/index.js'
import ItemReorder from './components/item-reorder/index.js'
import Label from './components/label/index.js'
import List from './components/list/index.js'
import ListHeader from './components/list-header/index.js'
// import Menu from './components/menu/index.js'
import Note from './components/note/index.js'
// import Noticebar from './components/noticebar/index.js'
// import PopSheet from './components/pop-sheet/index.js'
import Radio from './components/radio/index.js'
import RadioGroup from './components/radio-group/index.js'
import Range from './components/range/index.js'
import Refresher from './components/refresher/index.js'
import Scroll from './components/scroll/index.js'
// import ScrollSegment from './components/scroll-segment/index.js'
import Searchbar from './components/searchbar/index.js'
import Segment from './components/segment/index.js'
import SegmentButton from './components/segment-button/index.js'
import Select from './components/select/index.js'
import Option from './components/option/index.js'
// import Separation from './components/separation/index.js'
// import Sheet from './components/sheet/index.js'
// import SlideBox from './components/slide-box/index.js'
import Slides from './components/slides/index.js'
import Slide from './components/slide/index.js'
// import SlidesLite from './components/slides-lite/index.js'
import Spinner from './components/spinner/index.js'
import Tab from './components/tab/index.js'
import Tabs from './components/tabs/index.js'
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

// Componnets
const components = {
  App,
  Footer,
  Header,
  Content,
  Page,
  Nav,
  Navbar,

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
  Slides,
  Slide,
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

const install = function (Vue, options = {}) {
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

  var ENV = process.env.NODE_ENV
  if (ENV && ENV !== 'production' && ENV !== 'test' && typeof console !== 'undefined' && console.warn && typeof window !== 'undefined') {
    console.warn('You are using a whole package of vimo, ' + 'please read docs https://vm-component.github.io/vimo/ to reduce app bundle size.')
  }
}

export default install

export {
  // Componnets
  App,
  Footer,
  Header,
  Content,
  Page,
  Nav,
  Navbar,

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
  Slides,
  Slide,
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
