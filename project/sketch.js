

// ----------------------------------------------------



function setup(){
  createCanvas(cnvWidth, cnvHeight);
  
  backgroundColor = color(179,205,224)
  
  addButton = new Button(10, 10, color(100,151,177), addText, "add");
  clearButton = new Button(110, 10, color(100,151,177), clearText, "clear");
  shuffleButton = new Button(240, 10, color(100,151,177), shuffleText, "shuffle");

  buttons.push(addButton)
  buttons.push(clearButton)
  buttons.push(shuffleButton)

  scpWidth = textWidth(escapeText)
  scpWidth2 = textWidth(escapeText2)

}

function mousePressed(){
  if(mouseButton === "left" && isDrawing){ //se apertar com o botao esquerdo e não tiver pausado
    
      if(points.length > 0 ){
      vectors.push(currentVector) //adiciona o vetor atual ao array de vetores
    }
    
    points.push(currentPoint)
    print(currentPoint)
  }
  
  else if(mouseButton === "left" && !(isDrawing)){
    buttons.forEach( b=> {
      if(b.isHover()){
        b.onClick()
      }
      return
    })
  }
  
}

function keyPressed(){
  switch(keyCode){
    
    case(83): //somar
      sum()
      break
      
    case(27): //"pausar"
      isDrawing = !(isDrawing)
      break
    
    case(67): //limpar
      clearAll()
      break
    
    case(69): //embaralharar
      shuffleVectors()
      break
    
    case(46): //apagar um elemento
      deleteElement()
      break
    
    default:
      break
  }
}

function draw() {
  background(backgroundColor);

  stroke(1,31,75)
  noFill()
  strokeWeight(0.4)
  textSize(13)

  t = "[DEL] - Remover elemento"
  w = textWidth(t)
  text(t, cnvWidth - w - 5, 40)
  currentPoint = new Point(mousePosition(), color(1,31,75))

  if(isDrawing){
    text(escapeText, cnvWidth - scpWidth*13/12 - 5 , 17)
    currentPoint.draw()
  }
  else{
    text(escapeText2, cnvWidth - scpWidth2*13/12 - 5 , 17)
  }
  
  vectors.forEach(v =>{
    v.draw()
  })

  points.forEach(p =>{
    p.draw()
  })

  buttons.forEach(b=>{
    b.draw()
  })
  
  if(isDrawing && points.length > 0){
    currentVector = new Vector(
      points[points.length-1], 
      currentPoint, 
      color(1,31,75)
      )
    currentVector.draw()
  }
  
}
