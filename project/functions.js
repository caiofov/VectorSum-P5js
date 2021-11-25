var vectors = [] //array de vetores
var points = [] //array de pontos
var currentVector; //vetor atual (o que muda com o mouse)
var currentPoint;
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
var cnvWidth = 550
var cnvHeight = 500

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
  if(vectors.length > 1){
    let sumVector = new Vector(points[0], points[points.length-1], color(255,0,0))

    vectors.push(sumVector)
    isDrawing = false;
  }
  
}

function regeneratePoints(){
  points = []
  points.push(vectors[0].point1)
  
  vectors.forEach(v =>{
    points.push(v.point2)
  })
  
  // points.pop()
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

function shuffleVectors(){
  vectors = shuffle(vectors)
  let ready = false
  let i = 0

  while(!ready){
    let p = vectors[i].point2
    vectors[i+1].setPoints(p)

    if(i == vectors.length){
        ready = true
    }
  }

  regeneratePoints()
}
