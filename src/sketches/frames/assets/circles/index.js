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
  animate: true,
  playing: true,
}

const options = [{
  name: 'circles',
  val: 5,
  min: 0,
  max: 21,
}]

const makeSquare = (ctx, w, h) => {
  const x = range(w * 0.3, w * 0.7)
  const y = range(h * 0.3, h * 0.7)

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

    for (let i = 0; i < opts[0].val; i++) {
      makeSquare(context, width, height)
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