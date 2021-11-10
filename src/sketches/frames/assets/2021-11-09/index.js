import { range } from 'canvas-sketch-util/random'

import cf from './config'
import Noise from './Noise'
import Square from './Square'

const meta = {
  name: '005 schotter',
  date: '10. november 2021',
}

const settings = {
  dimensions: [ 750, 1100 ],
  loop: true,
  fps: 1,
  playbackRate: 'fixed',
}

const options = [
  { name: 'width', val: 16, min: 6, max: 24 },
  { name: 'height', val: 24, min: 12, max: 32 },
]

const sketch = (opts, ...args) => {
  return ({ context, width, height, frame }) => {
    const ctx = context

    new Noise(ctx, width, height)

    ctx.globalCompositeOperation = 'soft-light'

    // options
    const w = options[0].val
    const h = options[1].val
    const margin = width / 12

    let i = 0
    let maxI = w * h

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const size = (width / w) - margin/w*2
        const xpos = margin + (x * size)
        const ypos = margin + (y * size)

        new Square(ctx, xpos, ypos, size, i, maxI)

        i++
      }
    }
  }
}

export default {
  settings,
  sketch,
  meta,
  // options,
}