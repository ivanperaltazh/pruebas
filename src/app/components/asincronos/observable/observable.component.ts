import { Libro } from './../libro.model';
import { LibroService } from './../libro.service';
import { Component, OnInit } from '@angular/core';
import { from, interval, Observable, of, concat, merge, Subscription, Subject } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';



@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css']
})
export class ObservableComponent implements OnInit {

 
  libros: Libro[];
  observableSubs: Subscription = null;
  observable: Observable<Libro[]> = null;

  constructor(private libroObservableService: LibroService){  }

  num;
  observabl = interval(1000).pipe(
    map(x => Math.random()*(10+1))
    );

    subjet = new Subject();
    

  ngOnInit() {

let suscp = this.observabl.subscribe(this.subjet);

this.subjet.subscribe(x =>  {

  this.num = x;
  console.log('Obsrvador 1', this.num);
  if (this.num > 5 ){
    suscp.unsubscribe();}
});
//this.subjet.subscribe(x => console.log('Obsrvador 2', x));

//this.observabl.subscribe(x => console.log('Obsrvador 1', x));


  //libroObservableService devuelve un observable que devuelve colecciones de Libros
  this.observableSubs = this.libroObservableService.getLibros()
  .subscribe(
    libros => this.libros = libros, // value => viene de  next()
    error => console.log(error),    // error => viene de error()
    () => console.log("this.libroObservableService.getLibros() FINALIZADO") // complete => viene de complet()
  );
  }

   ngOnDestroy(){ if (this.observableSubs) this.observableSubs.unsubscribe();  }

  /* -------------------------------Operadores rxja --------------------------------- */
  sourceInterval;


  testOperadorCreate() {
    let source = new Observable( observer => { observer.next(0); observer.next(1); observer.complete();});
    source.subscribe(x => console.log(x));
  }

  testOperadorInterval() {
    let source = interval(1000); //Emite secuencia 0, 1, 2, ... cada 1 segundo
    this.sourceInterval =  source.subscribe(x => console.log(x));
  }

  unsubscribeInterval(){
    this.sourceInterval.unsubscribe();
  }


  testOperadorOf() {
    let source = of('a','b','c'); //Emite secuencia ‘a’, ‘b’ y ‘c’
    source.subscribe(x => console.log(x));
  }

  testOperadorFrom1() {
    let source = from(
      new Promise<string>( (resolve, reject) => {
          setTimeout(() => { resolve("Valor resuelto por la Promise."); }, 2000);
      })
    );
    source.subscribe(x => console.log(x));
  }

  testOperadorFrom2() {
    let source = from([{nombre: 'Miguel', edad: 30}, {nombre: 'Juan', edad: 35}]);
    source.subscribe(x => console.log(x));
  }

  testOperadorConcat() {
    let source1 = of('a','b','c');
    let source2 = of('d','e','f');
    let source3 = concat(source1, source2); //Emite secuencia a, b, c, d, e, f
    source3.subscribe(x => console.log(x));
  }

  // ahora es tap() en lugar de do()
  testOperadorTap() {
    let source = of('a','b','c').pipe(tap(x => console.log(x))); //Emite secuencia ‘a’, ‘b’ y ‘c’, y muestra estos valores por log
    source.subscribe(x => console.log(x));
  }

 testOperadorTap2() {
    const source = of(1, 2, 3, 4, 5).pipe(
      tap(n => {
        if (n > 3) {
          //throw new TypeError(`Value ${n} es mayor que 3`)
          n = n * 3;
        }
      })
     )
     .subscribe(console.log);
  }


  testOperadorMap() {
    let source = interval(1000).pipe(map(x => 2 * x)); //Emite secuencia 0, 2, 4, ...
    source.subscribe(x => console.log(x));
  }

 testOperatorFilter(){
  //Filtrar elementos emitidos por la fuente Observable emitiendo
  // solo aquellos que satisfacen un predicado específico.
  const source = from([1, 2, 3, 4, 5]);
  const example = source.pipe(filter(num => num % 2 === 0));
  example.subscribe(val => console.log(`Even number: ${val}`));
 }

  testOperadorMerge() {
    let source1 = interval(1000);
    let source2 = interval(1000).pipe(map(x => 10 * x));
    let source3 = merge(source1, source2); //Emite secuencia 0, 0, 1, 10, 2, 20,...
    source3.subscribe(x => console.log(x));
  }

 



}
