import cf from './config'
import Gradient from './Gradient'
import Noise from './Noise'

const meta = {
  name: '002 blå',
  date: '03. august 2021',
}

const settings = {
  dimensions: [ 900, 600 ],
  loop: true,
  fps: 1,
  playbackRate: 'fixed',
  duration: 5,
}

const sketch = () => {
  return ({ context, width, height, frame }) => {
    if (cf.noise) new Noise(context, width, height);

    context.globalCompositeOperation = 'normal'

    context.fillStyle = '#222222'
    context.fillRect(0, 0, width, height)

    let division = 5
    let yIncrement = Math.ceil(height / (division))
    let xIncrement = Math.ceil(width / division)

    for (let y = height; y > 0; y -= yIncrement) {
      if (xIncrement > width / 60) xIncrement = Math.ceil(xIncrement / (1.3 + (frame / 100)));
      if (yIncrement > height / 30) yIncrement = Math.ceil(yIncrement / 1.2);

      for (let x = width; x > 0; x -= xIncrement) {
        new Gradient(
          context,
          Math.ceil(x),
          Math.ceil(y),
          Math.ceil(xIncrement),
          Math.ceil(yIncrement),
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
}