import { Observable } from 'rxjs';
import { Libro } from './libro.model';
import { Injectable } from '@angular/core';
import { LIBROS } from './mocks';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  constructor() { }


  /* //Sincrono:
  getLibros() {
    this.loggerService.log("Llamada realizada sobre LibroService.getLibros");
    return LIBROS;
  }*/

  /* // Promesas:
  getLibros(): Promise<Libro[]> {
    return new Promise<Libro[]>( (resolve, reject) => {
      console.log("Inicio ejecutor (Promise de LibroService.getLibros())");
      setTimeout(() => {
        console.log("Fin ejecutor (Promise de LibroService.getLibros())");
        resolve(LIBROS);
      }, 5000);
    });
  }
*/

// Observables:
  getLibros(): Observable<Libro[]> {
    return new Observable<Libro[]>( observer => {
      let libros: Libro[] = [];

    // observer.next([]);
    
    
      LIBROS.forEach((libro, index) => {
        setTimeout(() => {
          libros.push(libro);
          observer.next(libros);
        }, (index + 1) * 1500);
      });

      
     // observer.error( console.log('**** Error en datos *****'));
   

      setTimeout(() => {
        observer.complete();
      }, (LIBROS.length + 1) * 1500);

    });
  }

}
