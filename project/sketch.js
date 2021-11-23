var vectors = [] //array de vetores
var points = [] //array de pontos
var currentVector; //vetor atual (o que muda com o mouse)
var isDrawing = true; //diz se está "pausado" ou não

//menu
var addText = '[S] Somar '
var clearText = '[C] Limpar tudo'
var shuffleText = '[E] Embaralhar'
var escapeText = '[ESC] - Parar de desenhar'
var escapeText2 = '[ESC] - Voltar a desenhar'

var addButton, clearButton, backgroundColor, scpWidth, shuffleButton;
var buttons = [];

//dimensoes canva
var cnvWidth = 600
var cnvHeight = 600

function deleteElement(){
    let pos = mousePosition()
    
    vectors.forEach( v =>{
      if(v.isHover()){
        vectors.splice(vectors.indexOf(v),1)
        return;
      }
    })
  
    points.forEach(p =>{
      if(p.isHover()){
        points.splice(points.indexOf(p),1)
        regenerateVectors()
        return;
      }
    })
}
  
function mousePosition(){
    let x = mouseX
    let y = mouseY

    if(x > cnvWidth){x = cnvWidth}
    else if(x<0){x = 0}

    if(y > cnvHeight){ y = cnvHeight }
    else if(y < 0){ y = 0}

    return [x, y]
}

function sum(){ //soma os vetores

  let sumVector = new Vector(points[0], points[points.length-1], color(255,0,0))

  vectors.push(sumVector)
  isDrawing = false;

}

function regenerateVectors(){
  vectors = []
  for( i = 0 ; i < points.length-1 ; i++ ) { //desenha todos os vetores do array
    vectors.push(new Vector(points[i], points[i+1]))
  }
}

function clearAll(){
  vectors = []
  points = []
}

function shufflePoints(){
  points = shuffle(points)
  regenerateVectors()
}


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
    points.push(new Point(mousePosition(), color(1,31,75)))
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
      shufflePoints()
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

  if(isDrawing){
    text(escapeText, cnvWidth - scpWidth*13/12 - 5 , 17)

    let currentPoint = new Point(mousePosition(), color(1,31,75))
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
      new Point(mousePosition()), color(1,31,75))
    currentVector.draw()
  }
  
}
