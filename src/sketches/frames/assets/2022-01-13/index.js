import { range } from 'canvas-sketch-util/random'
import { mapRange } from 'canvas-sketch-util/math'

import Circle from './Circle'
import Noise from './Noise'

const meta = {
  name: '006 circle',
  date: '13. januar 2022',
}

const settings = {
  dimensions: [ 560, 825 ],
  animate: true,
  fps: 60,
  loop: true,
  duration: 6.3,
}

const options = [
  // { name: 'division', val: 5, min: 2, max: 10 },
]

const sketch = (opts, ...args) => {
  const b = range(65, 80)
  const b2 = range(40, 55)
  const h = range(250, 350)
  const fs1 = `hsl(0, 100%, ${b}%`
  const fs2 = `hsl(${h}, 100%, ${b2}%)`

  const fs = [fs1, fs2]

  let initiated = false
  let cos, sin
  let circles = []



  return ({ context, width, height, frame }) => {
    const ctx = context

    if (!initiated) {
      initiated = true
      for (let i = 0; i < 5; i++) {
        circles.push(
          new Circle(ctx, width, height, width/3 + 0.2*i, 40*i, 8-4*i, fs),
        )
      }
    }

    cos = (offset=0) => Math.cos((frame-offset)/60)
    sin = (offset=0) => Math.sin((frame-offset)/60)

    /**
     *  Background
     */
    const bg = ctx.createLinearGradient(0, 0, 0, height)
    bg.addColorStop(0, fs1)
    bg.addColorStop(0.75 + (cos() * 0.25), fs2)
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, width, height)

    /**
     *  Circle(s)
     */
    circles.forEach(circle => {
      circle.draw(frame)
    })
  }
}

export default {
  settings,
  sketch,
  meta,
  // options,
}