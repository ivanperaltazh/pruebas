import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ObservableComponent } from './components/asincronos/observable/observable.component';
import { VariosComponent } from './components/varios/varios.component';
import { RouterModule } from '@angular/router';

import { routes } from './shared/routes';

@NgModule({
  declarations: [
    AppComponent,
    ObservableComponent,
    VariosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
