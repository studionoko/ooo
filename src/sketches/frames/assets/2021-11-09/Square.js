export default class Square {
  constructor(ctx, x, y, size, index, frame) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.size = size
    this.index = index
    this.deg = (index * index/1000) + frame

    this.draw()
  }

  draw() {
    const { x, y, size } = this
    this.ctx.save()
    this.ctx.translate(x + size/2, y + size/2)
    this.ctx.beginPath()
    this.ctx.strokeStyle = 'red'
    this.ctx.rotate(this.deg * Math.PI/180)
    this.ctx.rect(0, 0, size, size)
    this.ctx.stroke()
    this.ctx.closePath()
    this.ctx.restore()
  }
}