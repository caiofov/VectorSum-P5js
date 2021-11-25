

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
  delWidth = textWidth(delText)

}

function mousePressed(){
  if(mouseButton === "left" && isDrawing){ //se apertar com o botao esquerdo e não tiver pausado
    
      if(points.length > 0 ){
      vectors.push(currentVector) //adiciona o vetor atual ao array de vetores
    }
    
    points.push(currentPoint)
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
    if(vectors.length > 1){
      shuffleVectors()
    }
      break
    
    case(46): //apagar um elemento
      deleteElement()
      break
    
    default:
      break
  }
}

function draw() {
  let currentEscapeText, currentDelTextY;
  background(backgroundColor);

  currentPoint = new Point(mousePosition(), color(1,31,75))

  if(isDrawing){
    currentEscapeText = escapeText //texto da instrução do ESC, caso esteja desenhando
    currentDelTextY = scpWidth*13/12 + 20 //coord Y da instrução do DEL, caso esteja desenhando
    currentPoint.draw() //desenhar ponto atual (posição do mouse)
  }
  else{
    currentEscapeText = escapeText2 //texto da instrução do ESC, caso não esteja desenhando
    currentDelTextY = scpWidth2*13/12 + 20 //coord Y da instrução do DEL, caso não esteja desenhando
  }
  
  stroke(1,31,75)
  noFill()
  strokeWeight(0.4)
  textSize(13)
  
  //desenhar os textos
  text(currentEscapeText, 10 , 55) //texto com instruçao para para/começar a desenhar
  text(delText, currentDelTextY, 55) //texto com instrução para deletar um elemento
  
  vectors.forEach(v =>{
    v.draw()
  })

  points.forEach(p =>{
    p.draw()
  })

  buttons.forEach(b=>{
    b.draw()
  })
  
  //se tiver desenhando e existir mais de um ponto no vetor, deverá desenhar o vetor atual, o que acompanha o mouse
  if(isDrawing && points.length > 0){
    currentVector = new Vector(
      points[points.length-1], 
      currentPoint, 
      color(1,31,75)
      )
    currentVector.draw()
  }
  
}
