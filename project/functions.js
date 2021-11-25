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
    let c = color(1,31,75)
    vectors = shuffle(vectors)
    let i = 0

    while(i < vectors.length){
        let firstPoint = vectors[0].point1
        let p = vectors[i].point2
        
        if (p.x > cnvWidth){
            let dif = p.x - cnvWidth
            
            firstPoint.setX(firstPoint.x - dif) //mover mais para a esquerda o primeiro ponto
            vectors[0].setPoints(new Point(firstPoint.x - dif, c))
            i = 0
            continue
        }
        else if(p.x < 0){
            firstPoint.setX(firstPoint.x - p.x) //mover mais para a direita o primeiro ponto
            vectors[0].setPoints(firstPoint)
           
            i = 0
            continue
        }

        if(p.y > cnvHeight){
            let dif = p.y - cnvHeight
            
            firstPoint.setY(firstPoint.y - dif) //mover mais para a cima o primeiro ponto
            vectors[0].setPoints(firstPoint)
            
            i = 0
            continue

        }
        else if (p.y < 0){
            firstPoint.setY(firstPoint.y - p.y) //mover mais para a baixo o primeiro ponto
            vectors[0].setPoints(firstPoint)
            
            i = 0
            continue
        }

        if(i<vectors.length - 1){
            vectors[i+1].setPoints(vectors[i].point2)
        }
        
        i++
    }

  regeneratePoints()
}

function teste(){
    vectors = [vectors[2], vectors[0], vectors[1]]

    vectors[1].setPoints(vectors[0].point2)
    vectors[2].setPoints(vectors[1].point2)
    
    regeneratePoints()
}