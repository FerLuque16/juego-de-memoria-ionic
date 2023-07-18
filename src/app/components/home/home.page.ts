import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import { AuthService } from 'src/app/services/auth.service';
import { ResultadosService } from 'src/app/services/resultados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  

  seconds : number = 0;
  intervalId: any;
  aciertos : number = 0;
  cantidadPares : number = 0;
  tiempoJugador : any;

  jugarOtraVez:boolean = false;

  cargando:boolean = false;


  cartas:any = [];

  cartasAnimales = [
    {
      id:1,
      urlImagen:'/assets/animales/zorro.png'
    },
    {
      id:2,
      urlImagen:'/assets/animales/zorro.png'
    },
    {
      id:3,
      urlImagen:'/assets/animales/oveja.png'
    },
    {
      id:4,
      urlImagen:'/assets/animales/oveja.png'
    },
    {
      id:5,
      urlImagen:'/assets/animales/mono.png'
    },
    {
      id:6,
      urlImagen:'/assets/animales/mono.png'
    },
    
    
  ]

  cartasFrutas = [
    {
      id:1,
      urlImagen:'/assets/frutas/banana.png'
    },
    {
      id:2,
      urlImagen:'/assets/frutas/banana.png'
    },
    {
      id:3,
      urlImagen:'/assets/frutas/sandia.png'
    },
    {
      id:4,
      urlImagen:'/assets/frutas/sandia.png'
    },
    {
      id:5,
      urlImagen:'/assets/frutas/uvas.png'
    },
    {
      id:6,
      urlImagen:'/assets/frutas/uvas.png'
    },
    {
      id:7,
      urlImagen:'/assets/frutas/naranja.png'
    },
    {
      id:8,
      urlImagen:'/assets/frutas/naranja.png'
    },
    {
      id: 9,
      urlImagen: '/assets/frutas/kiwi.png'
    },
    {
      id: 10,
      urlImagen: '/assets/frutas/kiwi.png'
    },
    {
      id: 11,
      urlImagen: '/assets/frutas/cereza.png'
    },
    {
      id: 12,
      urlImagen: '/assets/frutas/cereza.png'
    },
    {
      id: 13,
      urlImagen: '/assets/frutas/fresa.png'
    },
    {
      id: 14,
      urlImagen: '/assets/frutas/fresa.png'
    },
    {
      id: 15,
      urlImagen: '/assets/frutas/ciruela.png'
    },
    {
      id: 16,
      urlImagen: '/assets/frutas/ciruela.png'
    }
  ]

  cartasHerramientas = [
    {
      id:1,
      urlImagen:'/assets/herramientas/pala.png'
    },
    {
      id: 2,
      urlImagen: '/assets/herramientas/pala.png'
    },
    {
      id: 3,
      urlImagen: '/assets/herramientas/regla.png'
    },
    {
      id: 4,
      urlImagen: '/assets/herramientas/regla.png'
    },
    {
      id: 5,
      urlImagen: '/assets/herramientas/martillo.png'
    },
    {
      id: 6,
      urlImagen: '/assets/herramientas/martillo.png'
    },
    {
      id: 7,
      urlImagen: '/assets/herramientas/llave.png'
    },
    {
      id: 8,
      urlImagen: '/assets/herramientas/llave.png'
    },
    {
      id: 9,
      urlImagen: '/assets/herramientas/destornillador.png'
    },
    {
      id: 10,
      urlImagen: '/assets/herramientas/destornillador.png'
    }
  ]

  cartasArray:any = [];

  nivel:string = '';

  cartaAnterior: number = 0;
  // cartaActuaL: number = 0;
  primerEntrada: boolean = true;
  constructor(public auth:AuthService, public resultadosService:ResultadosService, private router:Router) {

    
   }

  ngOnInit() {

    // console.log(this.cartas);
    // this.cartas.sort(()=> Math.random() - 0.5);
    // this.cartas = this.cartasAnimales;
    // this.cartas = this.cartasHerramientas;
    // this.cartas = this.cartasFrutas;
    // this.cartas.sort(()=> Math.random() - 0.5);
    // console.log(this.cartas);

  }

  elegirNivel(nivel:number){
    switch (nivel) {
      case 0:
        this.aciertos = 0;
        this.cantidadPares = 0;
        this.stopTimer();
        this.nivel = '';
        this.cartas = [];
        this.jugarOtraVez = false;
        break;
      case 1:
        this.cargando = true;
        this.nivel = '_';
        setTimeout(() => {
          this.nivel = 'fácil';
          this.cartas = this.cartasAnimales;
          this.cantidadPares = 3;
          this.cartas.sort(()=> Math.random() - 0.5);
          this.startTimer();
          this.cargando = false;
          
        }, 1000);
        

        break;
      case 2:
        this.cargando = true;
        this.nivel = '_';
        setTimeout(() => {
          this.nivel = 'medio';
          this.cartas = this.cartasHerramientas;
          this.cantidadPares = 5;
          this.cartas.sort(()=> Math.random() - 0.5);
          this.startTimer();
          this.cargando = false;
        }, 1000);
        

        break;
      case 3:
        this.cargando = true;
        this.nivel = '_';
        setTimeout(() => {
          this.nivel = 'difícil';
          this.cartas = this.cartasFrutas;
          this.cantidadPares = 8;
          this.cartas.sort(()=> Math.random() - 0.5);
          this.startTimer();
          this.cargando = false;
        }, 1000);
        
        break;
      default:
        break;
    }
  }

  cambiarDeLado(id :number){


  if(this.primerEntrada || this.cartaAnterior == id){
    const element = document.getElementById(id.toString());
    
    element!.classList.toggle('flipped');
    this.primerEntrada = false;
    this.cartaAnterior = id;

  }
  else{
    const element = document.getElementById(id.toString());
   
    element!.classList.toggle('flipped');

    if(this.revisarIgualdad(id)){
      document.getElementById(id.toString())?.parentNode?.removeAllListeners!();
      document.getElementById(this.cartaAnterior.toString())?.parentNode?.removeAllListeners!();
      this.primerEntrada = true;
    }
    else{

      
      let carta1 = document.getElementById(id.toString());
      let carta2 = document.getElementById(this.cartaAnterior.toString());

      
      setTimeout(() => {
        carta1?.classList.toggle('flipped');
        carta2?.classList.toggle('flipped');
      }, 1000);

      this.primerEntrada = true;

      
    }
    this.cartaAnterior = id;
  }

  }


  cambiarDeLado2(id:number){
    
    const element = document.getElementById(id.toString());
    
    element!.classList.toggle('flipped');

    let carta1 = this.cartas.find((a: { id: number; })=> a.id == id);

    if(this.cartasArray.length == 0){
      this.cartasArray.push(carta1);

    }else{
      const esta = this.cartasArray.find((a: { urlImagen: string | undefined; }) => a.urlImagen == carta1?.urlImagen);
      const repetida = this.cartasArray.find((a: { id: number; }) => a.id == id);

      if(repetida){
        this.cartasArray = [];
        return
      }

      const idCarta1 = this.cartasArray[0].id;
      const element1 = document.getElementById(idCarta1.toString());
    
      const element2 = document.getElementById(id.toString());
      if(!esta){ 
        setTimeout(() => {
          element1!.classList.toggle('flipped');
          element2!.classList.toggle('flipped');
        }, 1000);
        
      }else{

        element1!.parentNode?.removeAllListeners!();
        element2!.parentNode?.removeAllListeners!();
        this.aciertos++;
        if(this.aciertos == this.cantidadPares){
          this.tiempoJugador = this.formatTime();
          clearInterval(this.intervalId);                  
          setTimeout(() => {
            this.win()
          }, 1000);
        }
      }

      this.cartasArray = [];
    }
  }
 

  revisarIgualdad(id:number){

    const carta1 = this.cartas.find((a: { id: number; })=> a.id == id);
    const carta2 = this.cartas.find((a: { id: number; })=> a.id == this.cartaAnterior);

    if(carta1?.urlImagen == carta2?.urlImagen){
     

      return true;
    }

    return false;
    
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  updateTimer() {
    this.seconds++;
  }

  formatTime() {
    const minutes = Math.floor(this.seconds / 60);
    const remainingSeconds = this.seconds % 60;
    return `${this.padTime(minutes)}:${this.padTime(remainingSeconds)}`;
  }

  padTime(time: number) {
    return time < 10 ? `0${time}` : time;
  }

  stopTimer(){
    this.seconds = 0;
    clearInterval(this.intervalId);
  }

  win(){
    Swal.fire({
      title: '¡Ganaste!',
      text: `Tu tiempo: ${this.tiempoJugador}`,
      confirmButtonText: "Elegir otra dificultad",
      confirmButtonColor: '#3880ff',
      background: '#5fd750',
      color: '#000000',
      heightAuto:false,
      cancelButtonColor: '#ff9400',
      showCancelButton: true,
      cancelButtonText: 'Ir a Resultados'
    }).then((result) => {
      if (result.isConfirmed) {
        this.guardarDatos();
        this.elegirNivel(0);
        this.stopTimer();
        this.jugarOtraVez = false;
      }else{
        
        
        this.guardarDatos();
        this.stopTimer();
        this.router.navigateByUrl('resultados');
        // this.jugarOtraVez = true;
        // let nivel = this.nivel;
        this.elegirNivel(0);

        // switch (nivel) {
        //   case 'fácil':
        //     this.elegirNivel(1);
        //     break;
        //   case 'medio':
        //     this.elegirNivel(2);
        //     break;
        //   case 'difícil':
        //     this.elegirNivel(3);
        //     break;
        
        //   default:
        //     break;
        // }
        
      }
    });
  }

  guardarDatos(){
    const date = new Date();    
    //para que quede DD/MM/YYYY
    const mes = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1;
    const fecha =`${date.getDate()}/${mes}/${date.getFullYear()}`;

    const jugador = this.auth.actualEmail;
    // console.log(fecha, this.tiempoJugador,jugador,this.seconds);
    console.log('Fecha:',fecha,'Tiempo Jugador:', this.tiempoJugador,'Segundos:',this.seconds);
    //guardar los datos,guardo segundos porque creo que para ordenar va a ser mas facil con ese dato
    const data = {
        fecha:fecha,
        tiempo:this.tiempoJugador,
        jugador : jugador,
        segundos: this.seconds,
        nivel: this.nivel
      }
    this.resultadosService.guardarDatos(data);
    
  }

  cerrarSesion(){

    console.log('Entré');
    this.auth.logout();
    this.router.navigateByUrl('auth');
  }

  

 
}
