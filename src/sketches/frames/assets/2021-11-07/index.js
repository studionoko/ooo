import { range } from 'canvas-sketch-util/random'

import cf from './config'
import Orb from './Orb'
import Noise from './Noise'

const meta = {
  name: '004 orbs',
  date: '08. november 2021',
}

const settings = {
  dimensions: [ 750, 1100 ],
  loop: false,
  fps: 1,
  playbackRate: 'fixed',
  duration: 100,
}

const options = [
  // { name: 'division', val: 5, min: 2, max: 10 },
  // { name: 'division', val: 5, min: 2, max: 10 },
]

const sketch = (opts, ...args) => {
  return ({ context, width, height, frame }) => {
    const ctx = context

    ctx.globalCompositeOperation = 'color-dodge'
    if (cf.noise) new Noise(ctx, width, height)

    const g1 = ctx.createLinearGradient(0, 0, width, height)
    g1.addColorStop(0, 'hsl(250, 100%, 50%)')
    g1.addColorStop(1, 'hsl(30, 100%, 80%)')
    ctx.fillStyle = g1
    ctx.fillRect(0, 0, width, height)

    let i = 0
    const horizontal = 6
    const vertical = 11
    const max = horizontal * vertical

    for (let y = 0; y < vertical; y++) {
      for (let x = 0; x < horizontal; x++) {
        i += 1

        if (Math.random() * max > i && Math.random() * vertical > y) continue

        new Orb(
          ctx,
          width/7 + width * x/7,
          height/11 + height * y/11,
          50,
          i,
        )
      }
    }

    const g2 = ctx.createLinearGradient(
      range(0, width),
      range(0, height/8),
      range(0, width),
      range(height * 0.8, height)
    )
    g2.addColorStop(0, 'hsl(250, 100%, 50%)')
    g2.addColorStop(1, 'hsl(30, 100%, 80%)')
    ctx.fillStyle = g2
    ctx.fillRect(0, 0, width, height)


    ctx.globalCompositeOperation = 'hue'
    const g3 = ctx.createLinearGradient(
      range(0, width),
      range(0, -height/4),
      range(0, width),
      range(height, height*1.2)
    )
    g3.addColorStop(0, 'hsl(235, 100%, 50%)')
    g3.addColorStop(0.4, 'hsl(260, 100%, 50%)')
    g3.addColorStop(1, 'hsl(50, 50%, 70%)')
    ctx.fillStyle = g3
    ctx.fillRect(0, 0, width, height)
  }
}

export default {
  settings,
  sketch,
  meta,
  // options,
}