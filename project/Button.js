class Button{
    constructor(x,y, color,text, action, margin = 6, fontSize = 15){
      this.x = x
      this.y = y
      
      this.width = textWidth(text) * fontSize/12 + margin*2
      this.height = fontSize + margin*2
      
      this.color = color
      this.text = text
  
      this.margin = margin;
      this.fontSize = fontSize;
      this.action = action;
    }
  
    draw(){
      fill(this.color)
      stroke(this.color)
      if(this.isHover()){
        fill(0,91,150)
        stroke(0,91,150)
      }
      rect(this.x,this.y,this.width,this.height)
      
      fill(255)
      stroke(255)
      textSize(this.fontSize)
      text(this.text, this.x + this.margin, this.y + this.margin/2 + this.fontSize)
    }
  
    onClick(){
      switch(this.action){
        case "add":
            sum()
            break
        case "clear":
            clearAll()
            break
        case "help":
            print("help")
            break
        case "shuffle":
            shufflePoints()
            break
        default:
          this.action()
          break
      }
    }

    isHover(){
        let pos = mousePosition()
        return (pos[0] < this.x + this.width 
            && pos[0] > this.x
            && pos[1] < this.y + this.height 
            && pos[1] > this.y)
    }
  
  }