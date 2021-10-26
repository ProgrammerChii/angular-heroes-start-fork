import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ListadoDeHeroesComponent } from "./public/home/components/listado-de-heroes/listado-de-heroes.component";
import { HeroesService } from "./services/heroes/heroes.service";
import { HeroProfileComponent } from "./public/home/components/hero-profile/hero-profile.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { ModalPollComponent } from "./public/home/components/modal-poll/modal-poll.component";
import { CapitalizePipe } from "./capitalize.pipe";
import { CoreModule } from "./core/core.module";
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './store/contador.reducers';

@NgModule({
  declarations: [
    AppComponent,
    ListadoDeHeroesComponent,
    HeroProfileComponent,
    SpinnerComponent,
    ModalPollComponent,
    CapitalizePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CoreModule,
    StoreModule.forRoot({ count: counterReducer })
  ],
  providers: [HeroesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
