import { Component, ViewChild } from '@angular/core';
import { CorporativoServices } from '../../service/corporativo.services';
import { DatatableComponent, ColumnMode } from "@swimlane/ngx-datatable";

import { NgxSpinnerService } from "ngx-spinner";
import { data } from '../../../shared/data/smart-data-table';
import { Router } from '@angular/router';

export interface infoCorporativos{
  id:number
  S_NombreCorto:string,
  S_NombreCompleto:string,
  S_LogoURL:string,
  S_SystemUrl:string,
  D_FechaIncorporacion:string,
  S_Activo:string,
  updated_at:string
}

@Component({
  selector: 'app-list-corporativo',
  templateUrl: './list-corporativo.component.html',
  styleUrls: ['./list-corporativo.component.scss']
})

export class ListCorporativoComponent {

  @ViewChild(DatatableComponent) table: DatatableComponent;

  public rows:any;
  public ColumnMode = ColumnMode;
  public limitRef = 10;
  private tempData = [];


  // column header
  public columns = [
    { name: "ID", prop: "id" },
    { name: "CORPORATIVO", prop: "CORPORATIVO" },
    { name: "URL", prop: "URL" },
    { name: "INCORPORACIÓN", prop: "D_FechaIncorporacion" },
    { name: "CREADO EL", prop: "CREADO EL" },
    { name: "ASIGNADO A", prop: "ASIGNADO A" },
    { name: "Status", prop: "S_Activo" },
    { name: "Acciones", prop: "Actions" },
  ];


  itemsCorporativos:any[] = [];
  constructor (
    private corporativoServices: CorporativoServices,
    private spinner:NgxSpinnerService,
    private router:Router
    ) {}

  ngOnInit () :void{

    this.getCorporativos();
  }

  getCorporativos(){
    this.spinner.show();
    this.corporativoServices.getCorporativos().subscribe(res =>{
      if(res.status === 200){
        this.itemsCorporativos = res.body.data;
        this.tempData = res.body.data;
        this.rows = res.body.data;
        this.spinner.hide();
      }else{
      }
    },
    error =>{
      this.spinner.hide();
      console.log(error)
    }
    )

  }

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.S_NombreCompleto.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  updateLimit(limit){
    this.limitRef = limit.target.value;
  }
  

  redirectToDetailCorporativo(id:number){
    const url = `/corporativos/detalle/${id}`
    this.router.navigate([url])
  }
}