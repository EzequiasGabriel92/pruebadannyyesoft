import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCorporativoComponent } from './components/list/list-corporativo.component';
import { DetalleCorporativoComponent } from './components/detalle/detalle-corporativo.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:'',
        component:ListCorporativoComponent,
        data: {
          title: 'Lista de Corporativos'
        },
      },
      {
        path: 'detalle/:id',
        component: DetalleCorporativoComponent,
        data: {
          title: 'Detalle Corporativos'
      },
    },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorporativoRoutingModule { }
