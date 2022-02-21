import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [ 
    `
      li {
        cursor :pointer;
      }
    `
  ]
})
export class PorPaisComponent implements OnInit {

  termino: string = '';
  placeholder : string = 'Buscar país ...';

  // Capturar errores
  hayError: boolean = false;

  mostrarSugerencias : boolean = false;
  paises: Country[] = [];

  paisesSugeridos: Country[] = [];

  constructor
    (
      private paisService: PaisService
    ) {

  }

  ngOnInit(): void {
  }

  buscar(termino : string) {
    this.hayError = false;
    this.paisService.buscarPais(termino)
      .subscribe((data) => {
        if (data.status === 404) {
          this.hayError = true;
          this.paises = [];
          return;
        }

        this.paises = data;

      }, (e) => {
        console.log('errross');
        this.hayError = true;
        this.paises = [];
      });
  }

  sugerencias(termino : string){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais(termino).subscribe(paises => {
      if(paises.status === 404){
        console.log('Sin sugerencias');
        this.paisesSugeridos = [];
      }else{
        this.paisesSugeridos = paises.splice(0,3)
      }
 
    },(e) => {
      this.paisesSugeridos = [];
      console.log('error')
    })
  }

  buscarSugerido(termino : string){
    this.mostrarSugerencias = false;
    this.buscar(termino);
  }
}
