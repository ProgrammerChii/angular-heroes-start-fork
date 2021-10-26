import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListadoDeHeroesComponent } from "./home/components/listado-de-heroes/listado-de-heroes.component";
import { HeroProfileComponent } from './home/components/hero-profile/hero-profile.component';
import { ModalPollComponent } from './home/components/modal-poll/modal-poll.component';
import { PublicComponent } from "./public.component";

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: "", redirectTo: "listado-heroes", pathMatch: 'full'},
      { path: "listado-heroes", component: ListadoDeHeroesComponent },
      { path: "heroe/:id", component: HeroProfileComponent },
      { path: "modal-poll", component: ModalPollComponent },
      { path: "**", redirectTo: "/listado-heroes" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class PublicRoutingModule {
  constructor() {}
}
