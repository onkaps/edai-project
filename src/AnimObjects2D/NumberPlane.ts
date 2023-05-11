import p5 from 'p5'
import Scene2D from '@/core/Scene2D'
import { Lines } from '@/enums/AnimObjects2D'
import Line from './Line'
import { Width , Height } from "@helpers/Dimensions";
import AnimObject2D from '@/core/AnimObject2D';
import Point from './Point';
import Colour from '@/auxiliary/Colour';



export default class NumberPlane extends AnimObject2D {

    
    xAxis: Line
    yAxis: Line 
    xPosPoints: Point[] = []
    xNegPoints: Point[] = []
    yPosPoints: Point[] = []
    yNegPoints: Point[] = []
    points: Point[] = []
    unit: number

    constructor ({unit, s}: { unit: number, s: Scene2D }) {
        super(s)
        this.unit = unit
        this.xAxis = new Line(Lines.doublePoint, { x1: Width.half, y1: 0, x2: Width.half, y2: Height.full }, s);
        this.yAxis = new Line(Lines.doublePoint, { x1: 0, y1: Height.half, x2: Width.full, y2: Height.half }, s);

        for (let i = 0; i < Width.full; i++) {
            this.xPosPoints.push(new Point( Width.half + i * this.unit, Height.half, { scene: s } ))
        }
        for (let i = 0; i < Width.full; i++) {
            this.xNegPoints.push(new Point( Width.half - i * this.unit, Height.half, { scene: s } ))
        }
        
        for (let i = 0; i < Height.full; i++) {
            this.yPosPoints.push(new Point( Width.half, Height.half - i * this.unit, { scene: s } ))
        }
        for (let i = 0; i < Height.full; i++) {
            this.yNegPoints.push(new Point( Width.half, Height.half + i * this.unit, { scene: s } ))
        }
    }
    
    planePoint (xCoordinate: number, yCoordinate: number, colour ?: Colour): Point {
        
        let point
        if ( xCoordinate >= 0 && yCoordinate >= 0){
            point = new Point( Width.half + xCoordinate * this.unit, Height.half - yCoordinate * this.unit,{ scene: this.scene, colour: colour || this.colour })
        }
        else if ( xCoordinate < 0 && yCoordinate > 0) {
            point = new Point( Width.half + xCoordinate * this.unit, Height.half - yCoordinate * this.unit, { scene: this.scene, colour: colour || this.colour } )
        }
        else if ( xCoordinate < 0 && yCoordinate < 0) {
            point = new Point( Width.half + xCoordinate * this.unit, Height.half - yCoordinate * this.unit, { scene: this.scene, colour: colour || this.colour })
        }
        else if (xCoordinate > 0 && yCoordinate < 0) {
            point = new Point( Width.half + xCoordinate * this.unit, Height.half - yCoordinate * this.unit, { scene: this.scene , colour: colour || this.colour} )
        }
        this.points.push(point as Point)
        return point as Point;
    }

    draw (p: p5) {
        this.xAxis.draw(p)
        this.yAxis.draw(p)

        for (let pt of this.xPosPoints) {
            pt.draw(p)
        }
        for (let pt of this.xNegPoints) {
            pt.draw(p)
        }


        for (let pt of this.yPosPoints) {
            pt.draw(p)
        }
        for (let pt of this.yNegPoints) {
            pt.draw(p)
        }

        for ( let pt of this.points) {
            pt.draw(p)
        }

    }
    
}