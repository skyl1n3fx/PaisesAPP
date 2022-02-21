import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
    button {
      margin-right: 5px;
    }`
  ]
})
export class PorRegionComponent implements OnInit {

  regiones: string[] = 
  [
    'EU',
    'EFTA',
    'CARICOM',
    'PA',
    'AU',
    'USAN',
    'EEU',
    'AL',
    'ASEAN',
    'CAIS',
    'CEFTA',
    'NAFTA',
    'SAARC'
  ];

  paises : Country[] = [];

  regionActiva: string = '';



  activarRegion(region: string) {
    if(region === this.regionActiva)  return;
    this.regionActiva = region;
    this.listarRegiones();
  }

  constructor
  (
    private paisService : PaisService
  )
  {
  }

  ngOnInit(): void {
  }

  getClaseCss(region: string) {
    const clase = region === this.regionActiva ? 'btn btn-primary' : 'btn btn-outline-primary'
    return clase;
  }

  listarRegiones(){
    this.paises = [];
    this.paisService.buscarRegion(this.regionActiva)
    .subscribe( regiones => this.paises = regiones)
  }
}
