
  ## FabButton
  
  FABs (Floating Action Buttons) are standard material design components. They are shaped as a circle that represents a promoted action. When pressed, it may contain more related actions.
  FABs as its name suggests are floating over the content in a fixed position. This is not achieved exclusively with `<button ion-fab>Button</button>` but it has to wrapped with the `<vm-fab>` component, like this:
  
  ```html
  <vm-content>
   <!-- Real floating action button, fixed. It will not scroll with the content -->
   <vm-fab>
     <button ion-fab>Button</button>
   </vm-fab>
  
   <!-- Button shaped as a circle that just like a normal button scrolls with the content -->
   <button ion-fab>Button</button>
  </vm-content>
  
  ```
  
  In case the button is not wrapped with `<vm-fab>`, the fab button will behave like a normal button, scrolling with the content.
  
  See [ion-fab] to learn more information about how to position the fab button.
  
  @property [mini] - Makes a fab button with a reduced size.
  
  @usage
  *
  ```html
  
  <!-- Colors -->
  <vm-fab>
    <button ion-fab color="primary">Button</button>
  </vm-fab>
  
  <!-- Mini -->
  <vm-fab>
    <button ion-fab mini>Small</button>
  </vm-fab>
  ```
  