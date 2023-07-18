import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResultadosService } from 'src/app/services/resultados.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage implements OnInit {

  cargando:boolean = true;

  resultados:any = [];
  resultadosFacil:any = [];
  resultadosMedio:any = [];
  resultadosDificil:any = [];
  
  nivel:string = 'facil';
  constructor(public resultadosService: ResultadosService, private router:Router) { }

  ngOnInit() {
    this.resultadosService.traerResultados().subscribe(datos =>{

      datos.sort((a,b) => a.segundos - b.segundos )

      this.resultados = datos;

      this.resultadosFacil = this.resultados.filter((a: { nivel: string; }) => a.nivel == 'fácil').slice(0,5);
      this.resultadosMedio = this.resultados.filter((a: { nivel: string; }) => a.nivel == 'medio').slice(0,5);
      this.resultadosDificil = this.resultados.filter((a: { nivel: string; }) => a.nivel == 'difícil').slice(0,5);

      console.log(datos);

      this.cargando = false;
    })
  }

  elegirDificultad(dificultad:string){
    this.nivel = dificultad;
  }

  volver(){
    this.router.navigateByUrl('home')
  }

}
