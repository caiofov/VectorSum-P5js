class Point{
    constructor(pos, color){
        this.pos = pos
        this.x = pos[0]
        this.y = pos[1]
        this.radius = 10
        this.color = color
    }

    draw(){
        let buttonText = "x: " + nf(this.x,undefined, 2) + " y: " + nf(this.y, undefined, 2)
        let buttonTextFontSize = 15
        let widthButtonText = textWidth(buttonText) * buttonTextFontSize/12
        let buttonTextX = this.x
        let buttonTextY = this.y - this.radius
        
        fill(this.color)
        stroke(this.color)
        strokeWeight(0.5)
        textSize(buttonTextFontSize)
        
        if(this.isHover()){
            fill(255,165,0)
        }
        
        circle(this.x,this.y,this.radius)

        if(buttonTextX + widthButtonText > cnvWidth){
            buttonTextX -= (buttonTextX + widthButtonText) - cnvWidth
        }
        if(buttonTextY - buttonTextFontSize < 0){
            buttonTextY += buttonTextFontSize
        }

        text(buttonText, buttonTextX, buttonTextY)
    }

    isHover(){
        let x = mousePosition()[0]
        let y = mousePosition()[1]
        
        return (x > this.x - this.radius 
            && x < this.x + this.radius 
            && y > this.y - this.radius 
            && y < this.y + this.radius)
    }

    setX(x){
        this.x = x
        this.pos = [this.x,this.y]
    }
    setY(y){
        this.y = y
        this.pos = [this.x,this.y]
    }
}