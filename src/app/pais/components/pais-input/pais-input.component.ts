import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styleUrls: ['./pais-input.component.css']
})
export class PaisInputComponent implements OnInit {

  @Input() placeholder : string = '';

  @Output() onEnter : EventEmitter<string> = new EventEmitter();
  // Emitir cuando se deja de escribir
  @Output() onDebounce : EventEmitter<string> = new EventEmitter();

  debouncer : Subject<string> = new Subject();

  termino : string = '';

  buscar(){
    this.onEnter.emit(this.termino);
  }

  ngOnInit(): void {
    this.debouncer.pipe(debounceTime(300)) // Espera un poco para emitir la información al terminar de escribir
    .subscribe(valor => {
      console.log(valor);
      this.onDebounce.emit(valor);
    });
  }

  teclaPresionada(event : any){
    this.debouncer.next(this.termino);

  }

}
