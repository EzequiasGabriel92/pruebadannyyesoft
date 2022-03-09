import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { CorporativoRoutingModule } from "./corporativo-routing.module";

import { DetalleCorporativoComponent } from './components/detalle/detalle-corporativo.component';
import { ListCorporativoComponent } from './components/list/list-corporativo.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipeModule } from 'app/shared/pipes/pipe.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    SharedModule, 
    CorporativoRoutingModule
  ],
  exports: [],
  declarations: [
    DetalleCorporativoComponent,
    ListCorporativoComponent
  ],
  providers: [],
})
export class CorporativoModule { }