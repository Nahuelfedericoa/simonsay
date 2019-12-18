const overlay = document.getElementById('overlay')
const azul = document.getElementById('azul')
const violeta = document.getElementById('violeta')
const verde = document.getElementById('verde')
const amarillo = document.getElementById('amarillo')
const btnEmpezar = document.getElementById('btnEmpezar')
const UltimoNivel = 10
let contador = 0

overlay.addEventListener('click',function() {
  if(contador == 0){
    overlay.classList.add('uno')
    contador++
  }else if (contador == 1){
    overlay.classList.remove('uno')
    contador = 0
  }
})

class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generarSecuencia()
    setTimeout(this.siguienteNivel, 500)

  }
  inicializar() {

    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.elegirColor = this.elegirColor.bind(this)
    this.toggleBtnEmpezar()
    this.nivel = 1
    this.colores = {
      azul,
      violeta,
      verde,
      amarillo
      }
  }
  toggleBtnEmpezar() {
    if (btnEmpezar.classList.contains('hide')) {
      btnEmpezar.classList.remove('hide')
    }else{
      btnEmpezar.classList.add('hide')
    }
  }
  generarSecuencia() {
    this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4))
  }
  siguienteNivel() {
    this.subnivel = 0
    this.iluminarSecuencia()
    this.agragarClicks()
  }

  transformarNumeroAColor(numero) {
    switch (numero) {
      case 0:
        return 'azul'
      case 1:
        return 'amarillo'
      case 2:
        return 'verde'
      case 3:
        return 'violeta'
    }
  }
  transformarColorANumero(color) {
    switch (color) {
      case 'azul':
        return 0
      case 'amarillo':
        return 1
      case 'verde':
        return 2
      case 'violeta':
        return 3
    }
  }

  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++){
      const color = this.transformarNumeroAColor(this.secuencia[i])
      console.log(color);
      setTimeout(() =>
        this.iluminarColor(color), 750 * i)
    }
  }
iluminarColor(color) {
  this.colores[color].classList.add('light')
  setTimeout(() => this.apagarColor(color), 350)
}

apagarColor(color) {
  this.colores[color].classList.remove('light')
}
agragarClicks(){
  this.colores.azul.addEventListener('click', this.elegirColor)
  this.colores.verde.addEventListener('click', this.elegirColor)
  this.colores.violeta.addEventListener('click', this.elegirColor)
  this.colores.amarillo.addEventListener('click', this.elegirColor)
}
eliminarClicks(){
  this.colores.azul.removeEventListener('click', this.elegirColor)
  this.colores.verde.removeEventListener('click', this.elegirColor)
  this.colores.violeta.removeEventListener('click', this.elegirColor)
  this.colores.amarillo.removeEventListener('click', this.elegirColor)
}
elegirColor(ev) {
  const nombreColor = ev.target.dataset.color
  const numeroColor = this.transformarColorANumero(nombreColor)
  this.iluminarColor(nombreColor)
  if (numeroColor === this.secuencia[this.subnivel]) {
    this.subnivel++
    if (this.subnivel === this.nivel) {
      this.nivel++
      this.eliminarClicks()
      if (this.nivel === (UltimoNivel + 1)){
        this.ganoElJuago()
      }else {
        setTimeout(this.siguienteNivel, 1500)
      }
    }
  }else{
    this.perdioElJuego()
  }

}
ganoElJuago() {
  swal('Ganaste!!!', ' ', 'success')
  .then(this.inicializar)
}
perdioElJuego() {
  swal('Ups :(', ' ', 'error')
  .then(() => {
    this.eliminarClicks()
    this.inicializar()
  })
}
}
function empezarJuego() {
  window.juego = new Juego()

}