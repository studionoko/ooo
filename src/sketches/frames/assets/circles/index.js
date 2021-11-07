import { range } from 'canvas-sketch-util/random'
import cf from './config'
import Noise from '../Noise'

const meta = {
  name: '003 smiles',
  date: '28. oktober 2021',
}

const settings = {
  dimensions: [ 600, 600 ],
  loop: true,
  fps: 1,
  playbackRate: 'fixed',
  duration: 5,
  animate: false,
  playing: true,
}

const options = [
  {
    name: 'amount',
    val: 18,
    min: 5,
    max: 30,
  },
  {
    name: 'spread',
    val: 5,
    min: 5,
    max: 12,
  },
]

const makeSquare = (ctx, w, h, s) => {
  const min = 0.3 + (s/20)
  const max = 0.7 - (s/20)

  const x = range(w * min, w * max)
  const y = range(h * min, h * max)

  ctx.strokeStyle = 'red'
  ctx.arc(x, y, 50, 0, 1 * Math.PI)
  ctx.stroke()
}

const sketch = (opts, ...args) => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = '#f9f9ff'
    context.fillRect(0, 0, width, height)

    if (cf.noise) new Noise(context, width, height, 0xfff1f1ff);

    context.beginPath()

    const amt = opts[0].val
    const spread = opts[1].val

    for (let i = 0; i < amt; i++) {
      makeSquare(context, width, height, spread)
    }

    context.closePath()
  }
}

export default {
  settings,
  sketch,
  meta,
  options,
}