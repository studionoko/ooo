import cf from './config'
import Gradient from './Gradient'
import Noise from './Noise'

const meta = {
  name: '001 red',
  date: '09. september 2021',
}

const settings = {
  dimensions: [ 600, 900 ],
  loop: true,
  fps: 1,
  playbackRate: 'fixed',
  duration: 5,
}

const options = [
  {
    name: 'division',
    val: 5,
    min: 2,
    max: 10,
  },
  {
    name: 'xincrement',
    val: 2,
    min: 1,
    max: 10,
  },
]

const sketch = (opts, ...args) => {
  return ({ context, width, height, frame }) => {
    if (cf.noise) new Noise(context, width, height);

    let division = opts[0].val
    let yIncrement = Math.floor(height / (division))
    let xIncrement = Math.floor(width / division)

    for (let y = 0; y < height; y += yIncrement) {
      if (yIncrement > height / 30) yIncrement = Math.floor(yIncrement / (1 + (opts[1].val/10)));
      if (xIncrement > width / 60) xIncrement = Math.floor(xIncrement / (1.3 + (frame / 100)));

      for (let x = 0; x < width; x += xIncrement) {
        new Gradient(
          context,
          Math.floor(x),
          Math.floor(y),
          Math.floor(xIncrement),
          Math.floor(yIncrement),
          frame,
        )
      }
    }
  }
}

export default {
  settings,
  sketch,
  meta,
  options,
}