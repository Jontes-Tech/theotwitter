const amount = 6
const random = Math.floor(Math.random() * amount)

// We listen to the DOM for changes, and when we detect a change, we check if the header is present.
// This is rather unefficient, but reliable enough for this use case.
// If you have a better idea, maybe using DOMContentLoaded, feel free to open a PR.
const observer = new MutationObserver(() => {
  // I know this querySelector call is a bit of a hack, but it works, and should be somewhat future-proof.
  const container = document.querySelector('header div div div div div h1 a div')
  if (container) {
    observer.disconnect()
    container.innerHTML = ''

    const image = document.createElement('img')
    image.src = chrome.runtime.getURL(`/img/${random}.webp`)
    image.width = 48
    image.style.borderRadius = '100%'

    image.onerror = () => {
      throw new Error("Could not load image, probably because your browser does not support WebP.")
    }

    container.appendChild(image)
    console.log("Successfully injected image into header. Enjoy! - @jontes-tech")
  }
})

observer.observe(document.body, {
  childList: true,
  subtree: true
})
