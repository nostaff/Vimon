# vue-avatar

An avatar component for vue.js.

This component display an avatar image and if none is provided fallback to the
user initials.  This component is highly inspired from
[vue-avatar](https://github.com/eliep/vue-avatar).

Rules used to compute user initials:
- divide the username on space and hyphen
- use the first letter of each parts
- never use more than three letters as initials
- if the username is divided in more than three parts and has part
  starting with an uppercase, skip parts starting with a lowercase.


## Version

| Vuejs version | vue-avatar version |
| ------------- | -----------------  |
| ^2.0.0        | ^2.0.0             |


## Usage
vue-avatar is a UMD module, which can be used as a module in both CommonJS and AMD modular environments.
When in non-modular environment, Avatar will be registered as a global variable.</p>

### ES6
```js

import Avatar from 'vue-avatar/dist/Avatar'

export default {
  ...
  components: {
    Avatar
  },
  ...
}
```
After that, you can use it in your templates:

```html
<avatar username="Jane Doe"></avatar>
```


## Props
<table class="table">
<thead><tr>
  <th>Name</th><th>Required</th><th>Default</th><th>Type</th><th>Description</th>
</tr></thead>
<tbody>
  <tr><td>username</td>
    <td> Y </td>
    <td> - </td>
    <td> String </td>
    <td>The user name that will be used to compute user initial.</td></tr>
  <tr><td>initials</td>
    <td> N </td>
    <td> - </td>
    <td> String </td>
    <td>Force the displayed initials by overriding the computed ones.</td></tr>
  <tr><td>src</td>
    <td> N </td>
    <td> - </td>
    <td> String </td>
    <td>Path to the avatar image to display.</td></tr>
  <tr><td>backgroundColor</td>
    <td> N </td>
    <td> - </td>
    <td> String </td>
    <td>The avatar background color to use if no image is provided. If none
      is specified, a background color will be picked depending on
      the user name length.</td></tr>
  <tr><td>color</td>
    <td> N </td>
    <td> - </td>
    <td> String </td>
    <td>The font color used to render the user initials. If none
      is provided, the background color is used to compute
      the font color.</td></tr>
  <tr><td>:lighten</td>
    <td> N </td>
    <td> 80 </td>
    <td> Number </td>
    <td>A factor by which the background color must be lightened to
      produce the font color. Number between [-100,100].</td></tr>
  <tr><td>:size</td>
    <td> N </td>
    <td> 50 </td>
    <td> Number </td>
    <td>The avatar size in pixel.</td></tr>
  <tr><td>:rounded</td>
    <td> N </td>
    <td> true </td>
    <td> Boolean </td>
    <td>True if the avatar must be rounded.</td></tr>
</tbody>
</table>

## Event
<table class="table">
<thead><tr>
  <th>Name</th><th>Arguments</th><th>Description</th>
</tr></thead>
<tbody>
  <tr><td>@avatar-initials</td>
    <td>username (the value of the username props),
      initials (the value of the computed initials or the initials props if any)</td>
    <td>This event is trigger when the component is ready with component
      username and initial.</td></tr>
</tbody>
</table>

