var vectors = [] //array de vetores
var points = [] //array de pontos
var currentVector; //vetor atual (o que muda com o mouse)
var isDrawing = true; //diz se está "pausado" ou não
var menu = new Menu()

//dimensoes canva
var cnvWidth = 600
var cnvHeight = 600

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

function setup(){
  createCanvas(cnvWidth, cnvHeight);
}

function mousePressed(){
  
  if(mouseButton === "left" && isDrawing){ //se apertar com o botao esquerdo e não tiver pausado

    if(points.length > 0 ){
      vectors.push(currentVector) //adiciona o vetor atual ao array de vetores
    }
    points.push(new Point(mousePosition()))
  }

  if(mouseButton === "right"){

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
      vectors = []
      points=[]
      break
    
    case(69): //embaralharar
      points = shuffle(points)
      regenerateVectors()
      break
    
    case(46): //apagar um elemento
      deleteElement()
      break
    
    default:
      break
  }
}

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

function draw() {
  background(240,248,255); //azul claro
  
  vectors.forEach( v =>{
    v.draw()
  })

  points.forEach(p =>{
    p.draw()
  })
  
  if(isDrawing && points.length > 0){
    currentVector = new Vector(
      points[points.length-1], 
      new Point(mousePosition()))
  
    currentVector.draw(vectors.length == 0) //a expressao booleana indica se o vetor é o primeiro do array
  }
}


function regenerateVectors(){
  vectors = []
  for( i = 0 ; i < points.length-1 ; i++ ) { //desenha todos os vetores do array
    vectors.push(new Vector(points[i], points[i+1]))
  }
}