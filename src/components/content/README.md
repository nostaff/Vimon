
@name Content
@description
The Content component provides an easy to use content area with
some useful methods to control the scrollable area. There should
only be one content in a single view component. If additional scrollable
elements are need, use [ionScroll](../../scroll/Scroll).


The content area can also implement pull-to-refresh with the
[Refresher](../../refresher/Refresher) component.

@usage
```html
<vm-content>
  Add your content here!
</vm-content>
```

To get a reference to the content component from a Page's logic,
you can use Angular's `@ViewChild` annotation:

```ts
import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';

@Component({...})
export class MyPage{
  @ViewChild(Content) content: Content;

  scrollToTop() {
    this.content.scrollToTop();
  }
}
```

@advanced

### Scroll Events

Scroll events happen outside of Angular's Zones. This is for performance reasons. So
if you're trying to bind a value to any scroll event, it will need to be wrapped in
a `zone.run()`

```ts
import { Component, NgZone } from '@angular/core';
@Component({
  template: `
    <vm-header>
      <vm-navbar>
        <vm-title>{{scrollAmount}}</vm-title>
      </vm-navbar>
    </vm-header>
    <vm-content (ionScroll)="scrollHandler($event)">
       <p> Some realllllllly long content </p>
    </vm-content>
`})
class E2EPage {
 public scrollAmount = 0;
 constructor( public zone: NgZone){}
 scrollHandler(event) {
   console.log(`ScrollEvent: ${event}`)
   this.zone.run(()=>{
     // since scrollAmount is data-binded,
     // the update needs to happen in zone
     this.scrollAmount++
   })
 }
}
```

This goes for any scroll event, not just `ionScroll`.

### Resizing the content

If the height of `ion-header`, `ion-footer` or `ion-tabbar`
changes dynamically, `content.resize()` has to be called in order to update the
layout of `Content`.


```ts
@Component({
  template: `
    <vm-header>
      <vm-navbar>
        <vm-title>Main Navbar</vm-title>
      </vm-navbar>
      <vm-toolbarngIf="showToolbar">
        <vm-title>Dynamic Toolbar</vm-title>
      </vm-toolbar>
    </vm-header>
    <vm-content>
      <button ion-button (click)="toggleToolbar()">Toggle Toolbar</button>
    </vm-content>
`})

class E2EPage {
  @ViewChild(Content) content: Content;
  showToolbar: boolean = false;

  toggleToolbar() {
    this.showToolbar = !this.showToolbar;
    this.content.resize();
  }
}
```


Scroll to a specific position

```ts
import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';

@Component({
  template: `<vm-content>
               <button ion-button (click)="scrollTo()">Down 500px</button>
             </vm-content>`
)}
export class MyPage{
  @ViewChild(Content) content: Content;
  scrollTo() {
    // set the scrollLeft to 0px, and scrollTop to 500px
    // the scroll duration should take 200ms
    this.content.scrollTo(0, 500, 200);
  }
}
```
