class Vector{
  constructor(point1,point2, paint = color(0,0,0)){
  
    this.point1 = point1
    this.point2 = point2
    
    this.x1 = point1.x
    this.y1 = point1.y
    this.x2 = point2.x
    this.y2 = point2.y
    
    this.paint = paint

    this.dy = this.y2 - this.y1
    this.dx = this.x2 - this.x1

    //para a função da reta
    this.angular = (this.dy) / (this.dx) //coeficiente angular
    this.linear = this.y1 - this.angular*this.x1 //coeficiente linear

    this.weight = 2

    //valor escalar do vetor
    this.value = sqrt(
      pow((this.dx),2)+
      pow((this.dy),2)
      )

  }
  
  draw(){
    stroke(this.paint)
    
    
    if(this.isHover()){
      textSize(15)
      noFill()
      strokeWeight(1)
      text("Módulo: "+ nf(this.value, undefined, 2), ((this.x2 - this.x1)/2)+this.x1, ((this.y2 - this.y1)/2)+this.y1)
      stroke(255,165,0)
  
    }
    strokeWeight(this.weight)
    line(this.x1, this.y1, this.x2, this.y2)    
  }
  
  isHover(){
    let pos = mousePosition()
    let result = this.lineFunction(pos[0])
    
    let maxX = ( this.x1 > this.x2 ? this.x1 : this.x2 )
    let minX = ( this.x1 > this.x2 ? this.x2 : this.x1 )
    let maxY = ( this.y1 > this.y2 ? this.y1 : this.y2 )
    let minY = ( this.y1 > this.y2 ? this.y2 : this.y1 )

    return  (result < pos[1] + this.weight+2 
      && result > pos[1] - this.weight - 2 
      && pos[0] < maxX
      && pos[1] < maxY
      && pos[0] > minX
      && pos[1] > minY)
  }

  lineFunction(x){
    return this.angular*x + this.linear
  }

  setPoints(p1){
    this.point1 = p1;
    this.x1 = this.point1.x
    this.t1 = this.point1.y
    print("x1: " + this.x1 + "y1: " +this.y1)
    this.setPoint2()
  }

  setPoint2(){
    this.x2 = this.x1 + this.dx
    this.y2 = this.y1 + this.dy
    this.point2 = new Point([this.x2,this.y2], color(1,31,75))
    print("x2: " + this.x2 + "y2: " +this.y2)
  }
  
}
