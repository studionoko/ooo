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
  {
    name: 'radius',
    val: settings.dimensions[0]/3,
    min: 2,
    max: settings.dimensions[0],
  },
  { name: 'xOffset', val: 9, min: 3, max: 15 },
  { name: 'yOffset', val: 5, min: 3, max: 12 },
]

const sketch = (opts, ...args) => {
  const [ radius, xOffset, yOffset ] = options

  const b = range(65, 80)
  const b2 = range(40, 55)
  const h = range(250, 320)
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
          new Circle(ctx, width, height, radius.val + 0.2*i, 40*i, 8-4*i, fs),
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
      circle.draw(frame, xOffset.val, yOffset.val, radius.val)
    })
  }
}

export default {
  settings,
  sketch,
  meta,
  options,
}