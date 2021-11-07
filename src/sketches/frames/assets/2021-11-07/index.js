import cf from './config'
import Orb from './Orb'
import Noise from './Noise'

const meta = {
  name: '004 orbs',
  date: '07. november 2021',
}

const settings = {
  dimensions: [ 600, 900 ],
  loop: true,
  fps: 1,
  playbackRate: 'fixed',
  duration: 5,
}

const options = [{
  name: 'division',
  val: 5,
  min: 2,
  max: 10,
}]

const sketch = (opts, ...args) => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = '#f2f2ff'
    context.fillRect(0, 0, width, height)

    if (cf.noise) new Noise(context, width, height);

    new Orb(context, width/2, height/2, 50)
  }
}

export default {
  settings,
  sketch,
  meta,
  // options,
}