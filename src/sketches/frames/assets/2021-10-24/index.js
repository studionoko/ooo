import cf from './config'
import Gradient from './Gradient'
import Noise from './Noise'

const meta = {
  name: '001 red rain',
  date: '24. Oktober 2021',
}

const settings = {
  dimensions: [ 600, 900 ],
  loop: true,
  fps: 1,
  playbackRate: 'fixed',
  duration: 5,
}

const sketch = () => {
  return ({ context, width, height, frame }) => {
    if (cf.noise) new Noise(context, width, height);

    let division = 5
    let yIncrement = Math.floor(height / (division))
    let xIncrement = Math.floor(width / division)

    for (let y = 0; y < height; y += yIncrement) {
      if (yIncrement > height / 30) yIncrement = Math.floor(yIncrement / 1.2);
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
}