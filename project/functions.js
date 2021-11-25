var vectors = [] //array de vetores
var points = [] //array de pontos
var currentVector; //vetor atual (o que muda com o mouse)
var currentPoint;
var isDrawing = true; //diz se está "pausado" ou não

//botoes
var addText = '[S] Somar '
var clearText = '[C] Limpar tudo'
var shuffleText = '[E] Embaralhar'
var centralizeText = '[A] Centralizar'

//textos na tela
var escapeText = '[ESC] - Parar de desenhar'
var escapeText2 = '[ESC] - Voltar a desenhar'
var delText = '[DEL] - Remover elemento'


var addButton, clearButton, backgroundColor, scpWidth, shuffleButton, centralizeButton;
var buttons = [];

//dimensoes canva
var cnvWidth = 550
var cnvHeight = 500

function deleteElement(){ //deleta elemento que o mouse está por cima

    vectors.forEach( v =>{ //verifica se é um vetor
      if(v.isHover()){
        vectors.splice(vectors.indexOf(v),1)
        return;
      }
    })
  
    points.forEach(p =>{ //verifica se é um ponto
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
  if(vectors.length > 1){
    let sumVector = new Vector(points[0], points[points.length-1], color(255,0,0))

    vectors.push(sumVector)
    isDrawing = false;
  }
  
}

function regeneratePoints(){ //repopula o vetor de pontos baseado nos pontos dos vetores existentes
  points = []
  points.push(vectors[0].point1)
  
  vectors.forEach(v =>{
    points.push(v.point2)
  })
}

function regenerateVectors(){ //repopula os vetor de vetores baseado nos pontos existentes
  vectors = []
  for( i = 0 ; i < points.length-1 ; i++ ) { //desenha todos os vetores do array
    vectors.push(new Vector(points[i], points[i+1]))
  }
}

function clearAll(){
  vectors = []
  points = []
}

function shuffleVectors(){    
  vectors = shuffle(vectors)

  updatePointSequence()
  
  centralizePoints()

  checkCanvasBounds()
}

function centralizePoints(){
    let arrX = [], arrY=[]
    
    points.forEach(p=>{
        arrX.push(p.x)
        arrY.push(p.y)
    })

    let difX = cnvWidth/2 - media(arrX)
    let difY = cnvHeight/2 - media(arrY)
    
    points.forEach(p=>{
        p.setX(p.x + difX)
        p.setY(p.y + difY)
    })
    
    regenerateVectors()
}

function media(arr){
    let sum = 0
    arr.forEach(a=>{
        sum+=a
    })

    return sum/arr.length
}

function checkCanvasBounds(){
  let i = 0
  
  while(i < vectors.length - 1){
    let changed = false
    let firstPoint = vectors[0].point1
    let p = vectors[i].point2
    
    //verifica se o ponto atual do loop fica forá do canvas de alguma forma
    //modifica o primeiro ponto do primeiro vetor e depois atualiza todos os outros baseados nessa mudança
    if (p.x > cnvWidth){ 
      firstPoint.setX(firstPoint.x - (p.x - cnvWidth)) //mover mais para a esquerda o primeiro ponto
      changed = true
    }
    else if(p.x < 0){
      firstPoint.setX(firstPoint.x - p.x) //mover mais para a direita o primeiro ponto
      changed = true
    }

    if(p.y > cnvHeight){
      firstPoint.setY(firstPoint.y - (p.y - cnvHeight)) //mover mais para a cima o primeiro ponto
      changed = true
    }
    else if (p.y < 0){
      firstPoint.setY(firstPoint.y - p.y) //mover mais para a baixo o primeiro ponto
      changed = true 
    }
    
    if(changed){
      vectors[0].setPoints(firstPoint)
      updatePointSequence()
    }
    i++
  }
}
  

function updatePointSequence(){
  for (let i = 0; i < vectors.length-1; i++) {
    vectors[i+1].setPoints(vectors[i].point2)
  }
  regeneratePoints()
}