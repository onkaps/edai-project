import p5 from 'p5'
import { PointProps } from '@/interfaces/AnimObjects2D'
import AnimObject2D from '@/core/AnimObject2D'

export default class Point extends AnimObject2D {
  size: number = 5
  x: number
  y: number

  constructor(x: number, y: number, options: PointProps) {
    super(options.scene)
    if (options.colour) this.colour = options.colour
    if (options.size) this.size = options.size
    this.x = x
    this.y = y
  }

  draw(p: p5) {
    p.fill(this.colour.rgba)
    p.ellipse(this.x, this.y, this.size, this.size)
  }
}
