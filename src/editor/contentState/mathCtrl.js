import katex from 'katex'
import { CLASS_OR_ID } from '../config'

import 'katex/dist/katex.min.css'

const mathCtrl = ContentState => {
  ContentState.prototype.renderMath = function () {
    const mathEles = document.querySelectorAll(`.${CLASS_OR_ID['AG_MATH_RENDER']}`)
    const { loadMathMap } = this
    for (const math of mathEles) {
      const content = math.getAttribute('data-math')
      const type = math.getAttribute('data-type')
      const displayMode = type === 'display_math'
      const key = `${content}_${type}`
      if (loadMathMap.has(key)) {
        math.innerHTML = loadMathMap.get(key)
        return
      }
      try {
        const html = katex.renderToString(content, {
          displayMode
        })
        loadMathMap.set(key, html)
        math.innerHTML = html
      } catch (err) {
        math.innerHTML = 'Invalid'
        math.classList.add(CLASS_OR_ID['AG_MATH_ERROR'])
      }
    }
  }
}

export default mathCtrl
