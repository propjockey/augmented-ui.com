import PropJockey from "https://unpkg.com/propjockey@0.0.3/src/propjockey.js"

// PropJockey animations are meant to be written by animation tooling, but I have not created the tooling yet
// So this fn makes it easier to manually advance an animation's prop's keyframe's "position" as a stopgap
const adv = (memo => (id, ms) => {
  const ts = memo[id] || 0
  memo[id] = ts + ms
  return ts + ms
})({})

const fullShapeMixins = `
  <span class="animate-to-200"></span> HTML attr mixins for<br>Sci-Fi shaping of any element<br>
  <span class="full-shape-mixins-h" style="padding-top: 0.25rem;" data-augmented-ui="all-hex">!</span>
  <span class="full-shape-mixins" data-augmented-ui="all-hex-alt">!</span>
  <span class="full-shape-mixins" style="padding-top: 0.25rem;" data-augmented-ui="all-triangle-up">!</span>
  <span class="full-shape-mixins" data-augmented-ui="all-hexangle-up">!</span>
`

const presetnationEl = document.querySelector("#presentation")
const backdropEl = document.querySelector("#backdrop")
const terminalFrameEl = document.querySelector("#terminal-frame")
const terminalEl = document.querySelector("#terminal")
const termcmdEl = document.querySelector("#term-cmd")
const centerEl = document.querySelector("#pres-center")
const centerdemoEl = document.querySelector("#centerdemo")
const centerdemoCSSVarRemSetter = (obj, propName, newVal, prop) => centerdemoEl.style.setProperty(propName, newVal + "rem")
const beats = {
  corepropsdemo: 7500 + 5500 + 5800 + 2000,
  fakeendstart:  7500 + 5500 + 5800 + 2000 + 600 + 4000 + 1750,
  futureisaug:   7500 + 5500 + 5800 + 2000 + 600 + 4000 + 1750 + 5000,
  explosion:     7500 + 5500 + 5800 + 2000 + 600 + 4000 + 1750 + 5000 + 7000,
  end:           7500 + 5500 + 5800 + 2000 + 600 + 4000 + 1750 + 5000 + 8000 + 13000
}
const presentationAnim = new PropJockey({
  repeat: true,
  repeatDelay: 1250,
  defaultSetter: "setter.element.cssVar.unit",
  props: {
    className: {
      slide: x => x,
      // setter: "setter.object.prop",
      setter: (obj, propName, newVal, prop) => {
        if (prop.__oldValue !== newVal) {
          prop.__oldValue = newVal
          obj[propName] = newVal
        }
      },
      keyframes: [
        { position: 0, value: "showv1", ease: "ease.step-start" },
        { position: 7500, value: "", ease: "ease.step-start" },
        { position: beats.corepropsdemo, value: "corepropsdemo", ease: "ease.step-end" },
        { position: beats.fakeendstart, value: "lock-bg", ease: "ease.step-end" },
        { position: beats.futureisaug + 2000, value: "fakeend", ease: "ease.step-end" },
        { position: beats.explosion, value: "explosion", ease: "ease.step-end" },
        { position: beats.explosion + 12000, value: "", ease: "ease.step-end" }
      ]
    },
    "--pjAnim-frame": {
      setter: (obj, propName, newVal, prop) => {
        backdropEl.style.setProperty(propName, newVal)
      },
      keyframes: [
        { position: 0, value: 0, ease: "ease.step-start" },
        { position: 2500, value: 0, ease: ["factory.steps", 22, "jump-start"] },
        { position: 5500, value: 22, ease: "ease.step-start" },
        { position: 7250, value: 23, ease: "ease.step-start" }
      ]
    },
    "--pjAnim-termw": {
      setter: (obj, propName, newVal, prop) => {
        terminalFrameEl.style.setProperty(propName, newVal + "%")
      },
      keyframes: [
        { position: 0, value: 2, ease: "ease.step-start" },
        { position: 550, value: 2, ease: "ease.ease-in" },
        { position: 750, value: 32, ease: "ease.step-start" }
      ]
    },
    "--pjAnim-termh": {
      setter: (obj, propName, newVal, prop) => {
        terminalFrameEl.style.setProperty(propName, newVal + "%")
      },
      keyframes: [
        { position: 0, value: 4, ease: "ease.step-start" },
        { position: 550, value: 4, ease: "ease.ease-in" },
        { position: 750, value: 66, ease: "ease.step-start" }
      ]
    },
    "--pjAnim-termtexth": {
      unit: "rem",
      setter: (obj, propName, newVal, prop) => {
        if (prop.__oldValue !== newVal) {
          prop.__oldValue = newVal
          terminalEl.style.setProperty(propName, newVal + prop.unit)
          terminalEl.scrollTop = (newVal === 11) ? 500 : 0
        }
      },
      keyframes: [
        { position: 0, value: 0, ease: "ease.step-start" },
        { position: 900, value: 0, ease: "ease.step-end" },
        { position: 1200, value: 1, ease: "ease.step-end" },
        { position: 3250, value: 3, ease: "ease.step-end" },
        { position: 3550, value: 7, ease: "ease.step-end" },
        { position: 5550, value: 11, ease: "ease.step-start" }
      ]
    },
    "--pjAnim-termcmdw": {
      setter: (obj, propName, newVal, prop) => {
        termcmdEl.style.setProperty(propName, newVal + "%")
      },
      keyframes: [
        { position: 0, value: 0 },
        { position: 2000, value: 0 },
        { position: 3250, value: 60 }
      ]
    },
    text: {
      slide: x => x,
      setter: (obj, propName, newVal, prop) => {
        if (prop.__oldValue !== newVal) {
          prop.__oldValue = newVal
          centerEl.innerHTML = newVal
        }
      },
      keyframes: [
        // v1 animation plays while terminal updates augmented-ui
        { position: 0, value: "", ease: "ease.step-end" },
        // "RELAUNCH..." closes the terminal and v1 animation
        { position: 7500 + 2000, value: `<span class="pres-text fade-in">augmented-ui<br>version 2</span>`, ease: "ease.step-end" },
        { position: 7500 + 5500, value: `<span class="pres-text" data-augmented-ui-reset>${fullShapeMixins}</span>`, ease: "ease.step-end" },
        { position: beats.corepropsdemo, value: `<span class="pres-text">AND ~60 new --aug-props<br>for unlimited customization</span>`, ease: "ease.step-end" },
        { position: beats.fakeendstart, value: `<span class="pres-text fade-in">Boxes and rounded corners<br>will always be useful.</span>`, ease: "ease.step-end" },
        { position: beats.fakeendstart + 3500, value: `<span class="pres-text fade-in">But...</span>`, ease: "ease.step-end" },
        { position: beats.futureisaug, value: `<span class="pres-text" style="color: var(--c0);">the future is augmented!</span>`, ease: "ease.step-end" },
        { position: beats.explosion, value: `<span class="pres-text"><span style="color: var(--c0);">augmented-ui version 2</span><br>available now, for free!</span>`, ease: "ease.step-end" },
        { position: beats.explosion + 13000, value: "", ease: "ease.step-end" }
      ]
    },
    "--pjAnim-tl-augscale": {
      setter: centerdemoCSSVarRemSetter,
      keyframes: [
        { position: 0, value: 0, ease: "ease.step-end" },
        { position: 7500 + 0 * 250, value: 0, ease: "ease.out-back" },
        { position: 7500 + 4000, value: 1.0, ease: "ease.step-end" },
        { position: beats.fakeendstart, value: 1.0, ease: "ease.ease-out" },
        { position: beats.fakeendstart + 1250, value: 0.0, ease: "ease.ease-out" },
        { position: beats.fakeendstart + 2500, value: 2.5, ease: "ease.ease-out" },
        { position: beats.fakeendstart + 3750, value: 0.0, ease: "ease.ease-out" },
        { position: beats.futureisaug + 2000, value: 1.0, ease: "ease.ease-out" },
        { position: beats.futureisaug + 3000, value: 1.0, ease: "ease.ease-out" },
        { position: beats.futureisaug + 4500, value: 0, ease: "ease.ease-out" },
        { position: beats.end, value: 0, ease: "ease.ease-out" }
      ]
    },
    "--pjAnim-t-augscale": {
      setter: centerdemoCSSVarRemSetter,
      keyframes: [
        { position: 0, value: 0, ease: "ease.step-end" },
        { position: 7500 + 1 * 250, value: 0, ease: "ease.out-back" },
        { position: 7500 + 4000, value: 1.0, ease: "ease.step-end" },
        { position: beats.fakeendstart, value: 1.0, ease: "ease.ease-out" },
        { position: beats.fakeendstart + 1250, value: 0.0, ease: "ease.ease-out" },
        { position: beats.fakeendstart + 2500, value: 2.5, ease: "ease.ease-out" },
        { position: beats.fakeendstart + 3750, value: 0.0, ease: "ease.ease-out" },
        { position: beats.futureisaug + 2000, value: 1.0, ease: "ease.ease-out" },
        { position: beats.futureisaug + 3000, value: 1.0, ease: "ease.ease-out" },
        { position: beats.futureisaug + 4500, value: 0, ease: "ease.ease-out" },
        { position: beats.end, value: 0, ease: "ease.ease-out" }
      ]
    },
    "--pjAnim-tr-augscale": {
      setter: centerdemoCSSVarRemSetter,
      keyframes: [
        { position: 0, value: 0, ease: "ease.step-end" },
        { position: 7500 + 2 * 250, value: 0, ease: "ease.out-back" },
        { position: 7500 + 4000, value: 1.0, ease: "ease.step-end" },
        { position: beats.fakeendstart, value: 1.0, ease: "ease.ease-out" },
        { position: beats.fakeendstart + 1250, value: 0.0, ease: "ease.ease-out" },
        { position: beats.fakeendstart + 2500, value: 2.5, ease: "ease.ease-out" },
        { position: beats.fakeendstart + 3750, value: 0.0, ease: "ease.ease-out" },
        { position: beats.futureisaug + 2000, value: 1.0, ease: "ease.ease-out" },
        { position: beats.futureisaug + 3000, value: 1.0, ease: "ease.ease-out" },
        { position: beats.futureisaug + 4500, value: 0, ease: "ease.ease-out" },
        { position: beats.end, value: 0, ease: "ease.ease-out" }
      ]
    },
    "--pjAnim-r-augscale": {
      setter: centerdemoCSSVarRemSetter,
      keyframes: [
        { position: 0, value: 0, ease: "ease.step-end" },
        { position: 7500 + 3 * 250, value: 0, ease: "ease.out-back" },
        { position: 7500 + 4000, value: 1.0, ease: "ease.step-end" },
        { position: beats.fakeendstart, value: 1.0, ease: "ease.ease-out" },
        { position: beats.fakeendstart + 1250, value: 0.0, ease: "ease.ease-out" },
        { position: beats.fakeendstart + 2500, value: 2.5, ease: "ease.ease-out" },
        { position: beats.fakeendstart + 3750, value: 0.0, ease: "ease.ease-out" },
        { position: beats.futureisaug + 2000, value: 1.0, ease: "ease.ease-out" },
        { position: beats.futureisaug + 3000, value: 1.0, ease: "ease.ease-out" },
        { position: beats.futureisaug + 4500, value: 0, ease: "ease.ease-out" },
        { position: beats.end, value: 0, ease: "ease.ease-out" }
      ]
    },
    "--pjAnim-br-augscale": {
      setter: centerdemoCSSVarRemSetter,
      keyframes: [
        { position: 0, value: 0, ease: "ease.step-end" },
        { position: 7500 + 4 * 250, value: 0, ease: "ease.out-back" },
        { position: 7500 + 4000, value: 1.0, ease: "ease.step-end" },
        { position: beats.fakeendstart, value: 1.0, ease: "ease.ease-out" },
        { position: beats.fakeendstart + 1250, value: 0.0, ease: "ease.ease-out" },
        { position: beats.fakeendstart + 2500, value: 2.5, ease: "ease.ease-out" },
        { position: beats.fakeendstart + 3750, value: 0.0, ease: "ease.ease-out" },
        { position: beats.futureisaug + 2000, value: 1.0, ease: "ease.ease-out" },
        { position: beats.futureisaug + 3000, value: 1.0, ease: "ease.ease-out" },
        { position: beats.futureisaug + 4500, value: 0, ease: "ease.ease-out" },
        { position: beats.end, value: 0, ease: "ease.ease-out" }
      ]
    },
    "--pjAnim-b-augscale": {
      setter: centerdemoCSSVarRemSetter,
      keyframes: [
        { position: 0, value: 0, ease: "ease.step-end" },
        { position: 7500 + 5 * 250, value: 0, ease: "ease.out-back" },
        { position: 7500 + 4000, value: 1.0, ease: "ease.step-end" },
        { position: beats.fakeendstart, value: 1.0, ease: "ease.ease-out" },
        { position: beats.fakeendstart + 1250, value: 0.0, ease: "ease.ease-out" },
        { position: beats.fakeendstart + 2500, value: 2.5, ease: "ease.ease-out" },
        { position: beats.fakeendstart + 3750, value: 0.0, ease: "ease.ease-out" },
        { position: beats.futureisaug + 2000, value: 1.0, ease: "ease.ease-out" },
        { position: beats.futureisaug + 3000, value: 1.0, ease: "ease.ease-out" },
        { position: beats.futureisaug + 4500, value: 0, ease: "ease.ease-out" },
        { position: beats.end, value: 0, ease: "ease.ease-out" }
      ]
    },
    "--pjAnim-bl-augscale": {
      setter: centerdemoCSSVarRemSetter,
      keyframes: [
        { position: 0, value: 0, ease: "ease.step-end" },
        { position: 7500 + 6 * 250, value: 0, ease: "ease.out-back" },
        { position: 7500 + 4000, value: 1.0, ease: "ease.step-end" },
        { position: beats.fakeendstart, value: 1.0, ease: "ease.ease-out" },
        { position: beats.fakeendstart + 1250, value: 0.0, ease: "ease.ease-out" },
        { position: beats.fakeendstart + 2500, value: 2.5, ease: "ease.ease-out" },
        { position: beats.fakeendstart + 3750, value: 0.0, ease: "ease.ease-out" },
        { position: beats.futureisaug + 2000, value: 1.0, ease: "ease.ease-out" },
        { position: beats.futureisaug + 3000, value: 1.0, ease: "ease.ease-out" },
        { position: beats.futureisaug + 4500, value: 0, ease: "ease.ease-out" },
        { position: beats.end, value: 0, ease: "ease.ease-out" }
      ]
    },
    "--pjAnim-l-augscale": {
      setter: centerdemoCSSVarRemSetter,
      keyframes: [
        { position: 0, value: 0, ease: "ease.step-end" },
        { position: 7500 + 7 * 250, value: 0, ease: "ease.out-back" },
        { position: 7500 + 4000, value: 1.0, ease: "ease.step-end" },
        { position: beats.fakeendstart, value: 1.0, ease: "ease.ease-out" },
        { position: beats.fakeendstart + 1250, value: 0.0, ease: "ease.ease-out" },
        { position: beats.fakeendstart + 2500, value: 2.5, ease: "ease.ease-out" },
        { position: beats.fakeendstart + 3750, value: 0.0, ease: "ease.ease-out" },
        { position: beats.futureisaug + 2000, value: 1.0, ease: "ease.ease-out" },
        { position: beats.futureisaug + 3000, value: 1.0, ease: "ease.ease-out" },
        { position: beats.futureisaug + 4500, value: 0, ease: "ease.ease-out" },
        { position: beats.end, value: 0, ease: "ease.ease-out" }
      ]
    },
    cAugScale: {
      setter: (obj, propName, newVal, prop) => {
        centerdemoEl.style.setProperty("--pjAnim-augscale", newVal)
      },
      keyframes: [
        { position: 0, value: 0, ease: "ease.step-end" },
        { position: 7500 + 4000, value: 0, ease: "ease.ease-out" },
        { position: 7500 + 5000, value: 1.0, ease: "ease.step-end" },
        { position: beats.futureisaug, value: 1.0, ease: "ease.ease-out" },
        { position: beats.futureisaug + 3500, value: 0, ease: "ease.ease-out" }
      ]
    },
    demoAugs: {
      slide: x => x,
      setter: (obj, propName, newVal, prop) => {
        if (prop.__oldValue !== newVal) {
          prop.__oldValue = newVal
          centerdemoEl.setAttribute("data-augmented-ui", newVal)
        }
      },
      keyframes: [
        { position: 0, value: "tl-2-clip-x t-scoop-x tr-2-clip-x r-rect-y br-2-clip-x b-scoop-x bl-2-clip-x l-rect-y" },
        { position: adv("augs", 7500 + 5500), value: "tl-2-scoop-x t-scoop-x tr-2-clip-x r-rect-y br-2-clip-x b-scoop-x bl-2-clip-x l-rect-y" },
        { position: adv("augs", 200), value: "tl-2-scoop-x t-round-x tr-2-clip-x r-rect-y br-2-clip-x b-scoop-x bl-2-clip-x l-rect-y" },
        { position: adv("augs", 200), value: "tl-2-scoop-x t-round-x tr-2-rect-x r-rect-y br-2-clip-x b-scoop-x bl-2-clip-x l-rect-y" },
        { position: adv("augs", 200), value: "tl-2-scoop-x t-round-x tr-2-rect-x r-clip-y br-2-clip-x b-scoop-x bl-2-clip-x l-rect-y" },
        { position: adv("augs", 200), value: "tl-2-scoop-x t-round-x tr-2-rect-x r-clip-y br-2-round-xy b-scoop-x bl-2-clip-x l-rect-y" },
        { position: adv("augs", 200), value: "tl-2-scoop-x t-round-x tr-2-rect-x r-clip-y br-2-round-xy b-scoop-y bl-2-clip-x l-rect-y" },
        { position: adv("augs", 200), value: "tl-2-scoop-x t-round-x tr-2-rect-x r-clip-y br-2-round-xy b-scoop-y bl-2-step-inset l-rect-y" },
        { position: adv("augs", 200), value: "tl-2-scoop-x t-round-x tr-2-rect-x r-clip-y br-2-round-xy b-scoop-y bl-2-step-inset l-rect-xy" },
        { position: adv("augs", 200), value: "tl-2-scoop-inset t-round-x tr-2-rect-x r-clip-y br-2-round-xy b-scoop-y bl-2-step-inset l-rect-xy" },
        { position: adv("augs", 200), value: "tl-2-scoop-inset t-round-xy tr-2-rect-x r-clip-y br-2-round-xy b-scoop-y bl-2-step-inset l-rect-xy" },
        { position: adv("augs", 200), value: "tl-2-scoop-inset t-round-xy tr-2-round-y r-clip-y br-2-round-xy b-scoop-y bl-2-step-inset l-rect-xy" },
        { position: adv("augs", 200), value: "tl-2-scoop-inset t-round-xy tr-2-round-y r-clip-xy br-2-round-xy b-scoop-y bl-2-step-inset l-rect-xy" },
        { position: adv("augs", 200), value: "tl-2-scoop-inset t-round-xy tr-2-round-y r-clip-xy br-clip b-scoop-y bl-2-step-inset l-rect-xy" },
        { position: adv("augs", 200), value: "tl-2-scoop-inset t-round-xy tr-2-round-y r-clip-xy br-clip b-clip-y bl-clip-inset l-scoop-xy" },
        { position: adv("augs", 200), value: "tl-2-round-y t-round-xy tr-2-round-y r-clip-xy br-clip b-clip-y bl-clip-inset l-scoop-xy" },
        { position: adv("augs", 200), value: "tl-2-round-y t-clip-x tr-2-round-y r-clip-xy br-clip b-clip-y bl-clip-inset l-scoop-xy" },
        { position: adv("augs", 200), value: "tl-2-round-y t-clip-x tr-2-round-x r-clip-xy br-clip b-clip-y bl-clip-inset l-scoop-xy" },
        { position: adv("augs", 200), value: "tl-2-round-y t-clip-x tr-2-round-x r-scoop-y br-clip b-clip-y bl-clip-inset l-scoop-xy" },
        { position: adv("augs", 200), value: "tl-2-round-y t-clip-x tr-2-round-x r-scoop-y br-2-clip-xy b-clip-y bl-clip-inset l-scoop-xy" },
        { position: adv("augs", 200), value: "tl-2-round-y t-clip-x tr-2-round-x r-scoop-y br-2-clip-xy b-clip bl-clip-inset l-scoop-xy" },
        { position: adv("augs", 200), value: "tl-2-round-y t-clip-x tr-2-round-x r-scoop-y br-2-clip-xy b-clip bl-2-rect-x l-scoop-xy" },
        { position: adv("augs", 200), value: "tl-2-round-y t-clip-x tr-2-round-x r-scoop-y br-2-clip-xy b-clip bl-2-rect-x l-step-xy" },
        { position: adv("augs", 200), value: "tl-2-clip-x t-clip-x tr-2-round-x r-scoop-y br-2-clip-xy b-clip bl-2-rect-x l-step-xy" },
        { position: adv("augs", 200), value: "tl-2-clip-x t-scoop-x tr-2-round-x r-scoop-y br-2-clip-xy b-clip bl-2-rect-x l-step-xy" },
        { position: adv("augs", 200), value: "tl-2-clip-x t-scoop-x tr-2-clip-x r-scoop-y br-2-clip-xy b-clip bl-2-rect-x l-step-xy" },
        { position: adv("augs", 200), value: "tl-2-clip-x t-scoop-x tr-2-clip-x r-rect-y br-2-clip-xy b-clip bl-2-rect-x l-step-xy" },
        { position: adv("augs", 200), value: "tl-2-clip-x t-scoop-x tr-2-clip-x r-rect-y br-2-clip-x b-clip bl-2-rect-x l-step-xy" },
        { position: adv("augs", 200), value: "tl-2-clip-x t-scoop-x tr-2-clip-x r-rect-y br-2-clip-x b-scoop-x bl-2-rect-x l-step-xy" },
        { position: adv("augs", 200), value: "tl-2-clip-x t-scoop-x tr-2-clip-x r-rect-y br-2-clip-x b-scoop-x bl-2-clip-x l-step-xy" },
        { position: adv("augs", 200), value: "tl-2-clip-x t-scoop-x tr-2-clip-x r-rect-y br-2-clip-x b-scoop-x bl-2-clip-x l-rect-y" },
        { position: beats.fakeendstart + 1250, value: "tl-round tr-round br-round bl-round" },
        { position: beats.fakeendstart + 3750, value: "tl-2-clip-x t-scoop-x tr-2-clip-x r-rect-y br-2-clip-x b-scoop-x bl-2-clip-x l-rect-y" }
      ]
    },
    "--pjAnim-corepropsscale": {
      setter: (obj, propName, newVal, prop) => {
        centerdemoEl.style.setProperty(propName, newVal)
      },
      keyframes: [
        { position: 0, value: 0, ease: "ease.step-end" },
        { position: beats.corepropsdemo + 600, value: 0, ease: "ease.out-back" },
        { position: beats.corepropsdemo + 600 + 4000, value: 1.0, ease: "ease.ease-out" },
        { position: beats.corepropsdemo + 600 + 4000 + 1000, value: 0, ease: "ease.ease-in" },
        { position: beats.end, value: 0, ease: "ease.ease-out" }
      ]
    }
  }
})

let presHeight = presetnationEl.offsetHeight * 1.1;
let playing = true

presentationAnim.play(presetnationEl)

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  presentationAnim.seek(presetnationEl, beats.explosion).pause(presetnationEl)
} else {
  const scrollPosToggle = () => {
    const scrollY = window.scrollY
    if (playing && scrollY > presHeight) {
      presentationAnim.pause(presetnationEl)
      playing = false
    } else if (!playing && scrollY < presHeight) {
      presentationAnim.resume(presetnationEl)
      playing = true
    }
  }
  window.addEventListener("scroll", scrollPosToggle)
  scrollPosToggle()
}
