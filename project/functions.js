var vectors = [] //array de vetores
var points = [] //array de pontos
var currentVector; //vetor atual (o que muda com o mouse)
var currentPoint;
var isDrawing = true; //diz se está "pausado" ou não

//textos dos botoes
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

function deleteElement(){ //deleta elemento que o mouse está por cima -> só é chamada quando a tecla DEL é pressionada

    vectors.forEach( v =>{ //verifica se está por cima de um vetor
      if(v.isHover()){
        vectors.splice(vectors.indexOf(v),1) //tira o vetor da lista de vetores. Então, automaticamente, ele não será mais desenhado
        return;
      }
    })
  
    points.forEach(p =>{ //verifica se está por cima de um ponto
      if(p.isHover()){
        points.splice(points.indexOf(p),1) //faz o mesmo, mas para a lista de pontos
        regenerateVectors()  //recalcula os vetores quando for eliminado o ponto
        return;
      }
    })
}
  
function mousePosition(){ //quando chamada, retorna a posição do mouse
    let x = mouseX
    let y = mouseY

    //verificando os limites do canvas -> se passar do limite, será considerado como se fosse o próprio limite

    //limite para o eixo X (largura)
    if(x > cnvWidth){x = cnvWidth}
    else if(x<0){x = 0}

    //limite para o eixo Y (altura)
    if(y > cnvHeight){ y = cnvHeight }
    else if(y < 0){ y = 0}

    return [x, y]
}

function sum(){ //soma os vetores
  if(vectors.length > 1){
    //cria um novo vetor soma, que possui o ponto inicial no primeiro ponto do primeiro vetor e o último ponto no último ponto do último vetor
    let sumVector = new Vector(points[0], points[points.length-1], color(255,0,0))

    vectors.push(sumVector) //adiciona à lista de vetores, para ser desenhado
    isDrawing = false //dá "pause" no desenho, para evitar possíveis erros
  }
  
}

function regeneratePoints(){ //repopula o vetor de pontos baseado nos pontos dos vetores existentes
  points = []
  points.push(vectors[0].point1) //adiciona o primeiro ponto do primeiro vetor
  
  vectors.forEach(v =>{ //para cada vetor da lista
    points.push(v.point2) //adicionará o último ponto desse vetor
  })
}

function regenerateVectors(){ //repopula os vetor de vetores baseado nos pontos existentes
  vectors = []
  for( i = 0 ; i < points.length-1 ; i++ ) { 
    vectors.push(new Vector(points[i], points[i+1])) //cada vetor será uma linha entre o ponto atual e o próximo ponto
  }
}

function clearAll(){ //remove todos os pontos e todos os vetores
  vectors = []
  points = []
}

function shuffleVectors(){    
  vectors = shuffle(vectors) //mistura a lista de vetores

  updatePointSequence() //atualiza a sequência de pontos de acordo com os vetores -> essa função também atualiza os pontos de cada vetor
  
  centralizePoints() //centraliza os pontos e, consequentemnete, os vetores

  checkCanvasBounds() //verifica se todos os pontos estão dentro do canva, se não, irá resolver
}

function centralizePoints(){ //centraliza os pontos para o meio do canvas
    let arrX = [], arrY=[]
    
    points.forEach(p=>{ //gera dois arrays: um para todos os valores de X e outro para todos os valores de Y
        arrX.push(p.x)
        arrY.push(p.y)
    })

    //para cada eixo, tiratremos a media dos pontos e veremos o quanto esse ponto médio será deslocado para ficar no centro do canvas
    let difX = cnvWidth/2 - media(arrX) //(Meio do eixo X) - (Coordenada X do ponto médio)
    let difY = cnvHeight/2 - media(arrY)//(Meio do eixo Y) - (Coordenada Y do ponto médio)
    
    //cada ponto será deslocado os valores medidos acima
    points.forEach(p=>{
        p.setX(p.x + difX)
        p.setY(p.y + difY)
    })
    
    regenerateVectors() //recalcula os vetores com base nos pontos
}

function media(arr){ //função de apoio -> calcula o valor médio de um array
    let sum = 0
    arr.forEach(a=>{
        sum+=a
    })

    return sum/arr.length
}

function checkCanvasBounds(){ //verifica se os todos os pontos estão dentro dos pontos
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
    
    if(changed){ //se tiver alterado algo
      vectors[0].setPoints(firstPoint) //atualiza os pontos do primeiro vetor
      updatePointSequence() //atualiza a sequencia de pontos (e vetores)
    }
    i++
  }
}
  

function updatePointSequence(){ //atualiza a sequencia de pontos e modifica os vetores com base nessa sequencia
  for (let i = 0; i < vectors.length-1; i++) {
    vectors[i+1].setPoints(vectors[i].point2) //para cada vetor, seu primeiro ponto será o último do vetor anterio
  }
  regeneratePoints() //atualiza o vetor de pontos
}