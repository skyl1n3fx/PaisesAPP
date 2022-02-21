import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  // Puede ser nulo
  pais! : Country;

  constructor
    (
      private activatedRoute: ActivatedRoute,
      private paisService: PaisService
    ) { }

  ngOnInit(): void {

    // RxJs - SwitchMap 
    // Para capturar el resulatado de un observable dentro de otro Obsevable
    this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.paisService.getPaisPorAlpha(id)),
      tap(console.log) // Forma corta de console.log con tap
    )
      .subscribe(pais => this.pais = pais);

    /*
    this.activatedRoute.params
      .subscribe(({ id }) => {

        this.paisService.getPaisPorAlpha(id)
          .subscribe(pais => {
            console.log(pais);
          })

      });
      */
  }

}
