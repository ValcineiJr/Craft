var aviso = "asdas";
var bancada = false;

var itens = [
    "madeiraBruta",
    "madeira",
    "mesa",
    "pedregulho",
    "graveto",
    "picMadeira",
    "espadaMadeira"
];
var nomes = {
    madeiraBruta: "Madeira Bruta",
    madeira: "Madeira Processada",
    mesa: "Bancada de Trabalho",
    graveto: "Graveto",
    picMadeira: "Picareta de Madeira",
    pedregulho: "Pedregulho",
    espadaMadeira: "Espada de Madeira"
    
};
var desc = {
    madeiraBruta: "Madeira Bruta usada para processos de criação",
    madeira: "Use Madeira processada para começar a craftar",
    mesa: "Estação de Criação de itens",
    graveto: "Base para ferramentas cu",
    picMadeira: "Comece a pegar suas primeiras pedras",
    pedregulho: "Duro como pedra",
    espadaMadeira: "Comece a caçada"
};

var itensCompra =[
    "madeiraBruta",
    "pedregulho",
];

var quantidade = {
    madeiraBruta: 0,
    madeira: 0,
    mesa: 0,
    pedregulho: 0,
    graveto: 0,
    picMadeira: 0,
    espadaMadeira: 0   
};

var picareta = "sem";
var espada = "sem";

var status = {
    vida: 10,
    armadura: 10
};

var qt_vida = 10;
var qt_arm = 10;

$(function(){
    addItem("madeiraBruta",true);
    addItem("madeira");
    addItem("graveto");
    addItem("mesa");    
    addItem("pedregulho",true);
    addCompra("madeiraBruta");
    addCompra("pedregulho");
    for(let i=0; i <= qt_vida; i++){
        $('.btn-inv').append("<img class='cora' src='./img/coracao.png'>");
        $('.btn-craft').append("<img class='cora' src='./img/semArmadura.png'>");
    }    
    setTimeout(update, 1);
    hover();
    craft();
    coleta();
    $('.btn').on('mousedown', function(){
        $('.btn').css('margin-bottom', "3px")
    });
    $('.btn').on('mouseup', function(){
        $('.btn').css('margin-bottom', '5px')
    });
});

function craft(){
    for(let i=0; i < itens.length; i++){
        let itemC = $("."+itens[i]);
        itemC.on('click', function(){
            switch(itens[i]){
                case "madeira":
                    if(quantidade["madeiraBruta"] >= 1){
                        quantidade["madeira"] +=4;
                        quantidade["madeiraBruta"]--;
                    }
                break;
                case "graveto":                
                    if(quantidade["madeira"] >= 2){
                        quantidade["graveto"] +=4;
                        quantidade['madeira']-=2;
                    }
                break;
                case "mesa":
                    if(quantidade['madeira'] >= 4 && quantidade['mesa'] == 0){
                        quantidade['madeira']-=4;
                        quantidade['mesa']++;
                        bancada = true;   
                        $('.mesa img').css('cursor', 'auto');
                        addItem("picMadeira"); 
                        addItem("espadaMadeira"); 
                        hover(); 
                        craft();                     
                    }
                break;
                case "picMadeira":
                    if(quantidade["madeira"] >=3 && quantidade["graveto"] >= 2 && picareta == "sem"){
                        quantidade["madeira"]-=3;
                        quantidade["graveto"]-=2;
                        $('.picMadeira img').css('cursor', 'auto');
                        picareta = "madeira";
                        quantidade['picMadeira']++;
                    }
                break;
                case "espadaMadeira":
                    if(quantidade["madeira"] >= 2 && quantidade['graveto'] >= 1 && espada == "sem"){
                        quantidade["madeira"]-=2;
                        quantidade["graveto"]-=1;
                        $('.espadaMadeira img').css('cursor', 'auto');
                        espada = "madeira";
                        quantidade['espadaMadeira']++;
                    }
                break;
            }
        });
    }    

           
}
function coleta(){
    
    for(let c=0; c < itensCompra.length; c++){
        let i = 0;
        let div = $('.'+itensCompra[c]+"1");
        
        div.on('click', function(){            
            if(i == 0){
                i = 1;
                var elem = document.getElementById(""+itensCompra[c]);
                
                var width = 1;
                var id = setInterval(frame, 10);
                function frame(){
                    if(width >= 100){
                        clearInterval(id);
                        i = 0;
                    }else{
                        width++;
                        elem.style.width = width + "%";
                    }             
                    if(width == 99){ 
                        if(itensCompra[c] == "pedregulho"){
                            if(picareta == "sem"){
                                msgAviso("Você precisa de uma picareta para quebrar isso!");
                            }else{
                                quantidade[itensCompra[c]] += 1;  
                            }
                        }else{
                            quantidade[itensCompra[c]] += 1;  
                        }
                                                
                    }                
                }
            }        
        });
    }  
}

function msgAviso(text){
    aviso = text;
    $('.aviso').fadeIn(500);
    $('.aviso').delay(500).fadeOut(3000);
}
function update(){
    
    setTimeout(update, 1);
    
    $('.aviso h1').html(aviso);

    for(let i=0; i < itens.length; i++){
        $("."+itens[i]+" span").html(quantidade[itens[i]]);
    }
    if(espada != "sem"){
        $('.buton').show();
    }        
    
    
        sessionStorage.setItem("madeiraBruta", quantidade['madeira']);
        sessionStorage.setItem("madeira", quantidade['madeira']);
        
       
 
}

    console.log(sessionStorage.getItem("madeira"));

function addItem(material,auto){
    
    var classe = material;
    
    var divBox = $(".inv-box");    
    divBox.append("<div class='item "+classe+"'>");
    var divItem = $("."+material);

    if(auto == true){
        divItem.append("<img class='auto' src='./img/"+material+".png'>");
    }else{
        divItem.append("<img src='./img/"+material+".png'>");
    }

    divItem.append("<div class='quant "+material+"'><span>0</span></div>");
    divBox.append("</div>");
}
function addCompra(material){
    var mat = $(".mat");
    mat.append("<div class='mat-img "+material+"1"+"'><img src='./img/"+material+".png'>");
    var divMat = $("."+material+"1");
    divMat.append("<div id='myProgress'><div class='myBar' id='"+material+"'></div></div>");
    mat.append("</div>");
}

function hover(){
    for(let i=0; i < itens.length; i++){
        let item = $("."+itens[i]+" img");
        item.on("mouseenter", function(){
            info(""+itens[i]);
              $('.info').css('display', 'block');
        });
        item.on("mouseleave", function(){
            $('.info').css('display', 'none');
        });
    }     
}
function info(item){
    var divInfo = $(".info");
    $(".info .img").html("<div class='img'><img src='img/"+item+".png'></div>");
    
    $(".info .nome").html("<div class='nome'>"+nomes[item]+"</div>");
    $(".info .desc").html("<div class='desc'><p>"+desc[item]+"</p></div>");    
    $(".info .qt").html("<div class='qt quant "+item+"'>Sua Quantidade: <span>0</span></div>");
}
