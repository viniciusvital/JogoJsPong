

//variavéis da bolinha
let xBolinha = 100;
let yBolinha = 200;
let diametro = 22;

//velocidade da bolinha
let velXBolinha = 5;
let velYBolinha = 5;
let raio = diametro / 2;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 5;
let comprimentoRaquete = 10;
let alturaRaquete = 90;
let colidiu = false;

//variaveis da raquete oponente
let xRaqueteOponente= 585;
let yRaqueteOponente= 150;
let velocidadeYOponente;

//pontuação
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostrarBolinha();
  moverBolinha();
  verificarBorda();
  mostrarRaquete(xRaquete, yRaquete);
  mostrarRaquete(xRaqueteOponente, yRaqueteOponente);
  moverRaquete();
  colisaoRaquete();
  colisaoRaqueteBiblioteca(xRaquete,yRaquete);
  colisaoRaqueteBiblioteca(xRaqueteOponente,yRaqueteOponente);
  movimentoRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function mostrarBolinha(){
  circle(xBolinha,yBolinha,diametro);
}

function mostrarRaquete(x,y){
  rect(x, y,comprimentoRaquete, alturaRaquete);
}

function moverBolinha(){
  xBolinha += velXBolinha;
  yBolinha += velYBolinha;
  
}

function verificarBorda(){
  
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velXBolinha *= -1;
      }
  
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velYBolinha *= -1;
  }
}

function moverRaquete(){
  if(keyIsDown(87)){
    yRaquete -=10;
  }
   if(keyIsDown(83)){
    yRaquete +=10;
  }
}

function colisaoRaquete(){
  if(xBolinha - raio < xRaquete + comprimentoRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete){
    velXBolinha *= -1;
    raquetada.play();
  }
}
function colisaoRaqueteBiblioteca(x,y){
  colidiu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if(colidiu){
    velXBolinha *= -1;
    raquetada.play();
  }
}

function movimentoRaqueteOponente(){
  
    if (keyIsDown(UP_ARROW)){
        yRaqueteOponente -= 10;
    }
    if (keyIsDown(DOWN_ARROW)){
        yRaqueteOponente += 10;
    }
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text (meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text (pontosOponente, 470,26);
}

function marcaPonto(){
  if(xBolinha + raio > 599){
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha <= 10){
    pontosOponente += 1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}