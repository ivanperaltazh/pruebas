import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-varios',
  templateUrl: './varios.component.html',
  styleUrls: ['./varios.component.css']
})
export class VariosComponent implements OnInit {

  a = new Animal();
  b = new Animal();

  constructor(){
    //Polimorfismo
    this.a = new Dog();
    this.b = new Cat();
  }


  ngOnInit(): void {
    
    const persona = {
      name: 'Juan',
      print: function(){ console.log(this.name) }
  }
  
   const data1 = {
      print: persona.print
  }
  
  const data = {
      print: persona.print.bind(persona) // con esto matenemos el contexto de "persona"
  }
  
  persona.print(); //  => Juan
  data1.print(); // => undefined, porque se ejecuta en el contexto de data
                                      // y adui no hay el this.name

   data.print(); //  => Juan, porque lleva el bind con persona

   let cadena = this.generica("hola");
   let numero = this.generica(100);

   console.log(this.a.makeSound()); //Woof
   console.log(this.b.makeSound()); // Meow

  }



generica<T>(data: T): T{
console.log('data*****', data);
return data;
}


}

//------------------- Polimorfismo--------------------------------
class Animal {
  public makeSound():void {
   console.log("Grr...");
  }
}

class Cat extends Animal {
  public makeSound() {
    console.log("Meow");
  }
}

class Dog extends Animal {
  public makeSound() {
    console.log("Woof");
  }
}


