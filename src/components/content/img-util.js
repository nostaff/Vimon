export function updateImgs (imgs, viewableTop, contentHeight, scrollDirectionY, requestableBuffer, renderableBuffer) {
  // ok, so it's time to see which images, if any, should be requested and rendered
  // ultimately, if we're scrolling fast then don't bother requesting or rendering
  // when scrolling is done, then it needs to do a check to see which images are
  // important to request and render, and which image requests should be aborted.
  // Additionally, images which are not near the viewable area should not be
  // rendered at all in order to save browser resources.
  const viewableBottom = (viewableTop + contentHeight)
  const priority1 = []
  const priority2 = []
  let img

  // all images should be paused
  for (var i = 0, ilen = imgs.length; i < ilen; i++) {
    img = imgs[i]

    if (scrollDirectionY === 'up') {
      // scrolling up
      if (img.top < viewableBottom && img.bottom > viewableTop - renderableBuffer) {
        // scrolling up, img is within viewable area
        // or about to be viewable area
        img.canRequest = img.canRender = true
        priority1.push(img)
        continue
      }

      if (img.bottom <= viewableTop && img.bottom > viewableTop - requestableBuffer) {
        // scrolling up, img is within requestable area
        img.canRequest = true
        img.canRender = false
        priority2.push(img)
        continue
      }

      if (img.top >= viewableBottom && img.top < viewableBottom + renderableBuffer) {
        // scrolling up, img below viewable area
        // but it's still within renderable area
        // don't allow a reset
        img.canRequest = img.canRender = false
        continue
      }
    } else {
      // scrolling down

      if (img.bottom > viewableTop && img.top < viewableBottom + renderableBuffer) {
        // scrolling down, img is within viewable area
        // or about to be viewable area
        img.canRequest = img.canRender = true
        priority1.push(img)
        continue
      }

      if (img.top >= viewableBottom && img.top < viewableBottom + requestableBuffer) {
        // scrolling down, img is within requestable area
        img.canRequest = true
        img.canRender = false
        priority2.push(img)
        continue
      }

      if (img.bottom <= viewableTop && img.bottom > viewableTop - renderableBuffer) {
        // scrolling down, img above viewable area
        // but it's still within renderable area
        // don't allow a reset
        img.canRequest = img.canRender = false
        continue
      }
    }

    img.canRequest = img.canRender = false
    img.reset()
  }

  // update all imgs which are viewable
  priority1.sort(sortTopToBottom).forEach(i => i.update())

  if (scrollDirectionY === 'up') {
    // scrolling up
    priority2.sort(sortTopToBottom).reverse().forEach(i => i.update())
  } else {
    // scrolling down
    priority2.sort(sortTopToBottom).forEach(i => i.update())
  }
}

export function sortTopToBottom (a, b) {
  if (a.top < b.top) {
    return -1
  }
  if (a.top > b.top) {
    return 1
  }
  return 0
}
