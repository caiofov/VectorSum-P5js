class Menu{
    constructor(){
        this.helpText = '[H] Ajuda'
        this.addText = '[S] Somar'
        this.clearText = '[C] Limpar tudo'
        
        this.help = createButton(this.helpText)
        this.add = createButton(this.addText )
        this.clear = createButton(this.clearText)
    }

    draw(bool){
        if(bool){
            text("")
        }
        else{

        }
    }
}