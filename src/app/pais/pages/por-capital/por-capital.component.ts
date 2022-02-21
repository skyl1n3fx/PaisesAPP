import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent implements OnInit {

  termino: string = '';

  placeholder : string = 'Buscar por capital ...';

  // Capturar errores
  hayError: boolean = false;

  paises: Country[] = [];

  constructor
    (
      private paisService: PaisService
    ) {

  }

  ngOnInit(): void {
  }

  buscar(termino : string) {
    this.hayError = false;
    this.paisService.buscarCapital(termino)
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


}