# header 顶部组件
> One of the best uses of the toolbar is as a header.
> [demo访问](http://localhost:8080/header) 请npm run dev 后点击访问

## 使用
```html
<vm-header>
     <vm-toolbar color="primary">
          <vm-buttons slot="buttons">
              <vm-button color="secondary" small clear  icon-only>
                  <vm-icon name="home"></vm-icon>
               </vm-button>
          </vm-buttons>
          <vm-title>header primary</vm-title>
          <vm-buttons slot="buttons" end>
                <vm-button color="danger" small clear  icon-only>
                   <vm-icon name="heart"></vm-icon>
                </vm-button>
          </vm-buttons>
     </vm-toolbar>
 </vm-header>
```
## toolbar
>You can also change the toolbar __color__ the same way. This will allow you to have a different color toolbar per page in your app

## Buttons
>Buttons can be added to both header and footer toolbars. To add a button to a toolbar, we need to first add an __ion-buttons__ component. This component wraps one or more buttons, and can be given the __start__ or __end__ attributes to control the placement of the buttons it contains

