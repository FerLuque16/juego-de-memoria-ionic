import { Component, OnInit } from '@angular/core';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


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

  tipoCartas:string = '';

  cartaAnterior: number = 0;
  // cartaActuaL: number = 0;
  primerEntrada: boolean = true;
  constructor() {

    
   }

  ngOnInit() {

    // console.log(this.cartas);
    // this.cartas.sort(()=> Math.random() - 0.5);
    this.cartas = this.cartasAnimales;
    // this.cartas = this.cartasHerramientas;
    // this.cartas = this.cartasFrutas;
    this.cartas.sort(()=> Math.random() - 0.5);
    // console.log(this.cartas);

  }

  elegirNivel(nivel:number){
    switch (nivel) {
      case 1:
        this.tipoCartas = 'animales'
        this.cartas = this.cartasAnimales;
        this.cartas.sort(()=> Math.random() - 0.5);

        break;
      case 2:
        this.tipoCartas = 'herramientas';
        this.cartas = this.cartasHerramientas;
        this.cartas.sort(()=> Math.random() - 0.5);

        break;
      case 3:
        this.tipoCartas = 'frutas';
        this.cartas = this.cartasFrutas;
        this.cartas.sort(()=> Math.random() - 0.5);
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

}
