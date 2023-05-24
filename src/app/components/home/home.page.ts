import { Component, OnInit } from '@angular/core';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  cartas = [
    {
      id:1,
      urlImagen:'/assets/zorro.png'
    },
    {
      id:2,
      urlImagen:'/assets/zorro.png'
    },
    {
      id:3,
      urlImagen:'/assets/oveja.png'
    },
    {
      id:4,
      urlImagen:'/assets/oveja.png'
    },
    {
      id:5,
      urlImagen:'/assets/mono.png'
    },
    {
      id:6,
      urlImagen:'/assets/mono.png'
    },
    
    
  ]

  cartaAnterior: number = 0;
  // cartaActuaL: number = 0;
  primerEntrada: boolean = true;
  constructor() {

    
   }

  ngOnInit() {

    // console.log(this.cartas);
    this.cartas.sort(()=> Math.random() - 0.5);

    // console.log(this.cartas);

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
      console.log(id);
      console.log(this.cartaAnterior);
      
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

 

  revisarIgualdad(id:number){

    const carta1 = this.cartas.find((a)=> a.id == id);
    const carta2 = this.cartas.find((a)=> a.id == this.cartaAnterior);

    if(carta1?.urlImagen == carta2?.urlImagen){
     

      return true;
    }

    return false;
    
  }

}
