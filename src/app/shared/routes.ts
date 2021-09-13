import { ObservableComponent } from './../components/asincronos/observable/observable.component';
import { VariosComponent } from './../components/varios/varios.component';

import { Routes} from "@angular/router"

export const routes: Routes = [
    {
    path:"",
    component:ObservableComponent
   },
   {
    path:"varios",
    component:VariosComponent 
   },

   {
    path:"**",
    component: VariosComponent
   }
]