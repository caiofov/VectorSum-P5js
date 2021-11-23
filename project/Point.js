class Point{
    constructor(pos){
        this.pos = pos
        this.x = pos[0]
        this.y = pos[1]
        this.radius = 10
    }

    draw(){
        fill(0)
        stroke(0)
        strokeWeight(0.5)
        textSize(15)
        
        if(this.isHover()){
            fill(255,165,0)
        }
        
        circle(this.x,this.y,this.radius)
        text("x: " + this.x + " y: " + this.y, this.x, this.y-this.radius)
    }

    isHover(){
        let x = mousePosition()[0]
        let y = mousePosition()[1]
        
        return x > this.x-this.radius && x < this.x+this.radius && y > this.y-this.radius && y < this.y+this.radius
    }
}