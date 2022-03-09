import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CorporativoServices } from '../../service/corporativo.services';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import swal from 'sweetalert2';


@Component({
  selector: 'app-detalle-corporativo',
  templateUrl: './detalle-corporativo.component.html',
  styleUrls: ['./detalle-corporativo.component.scss']
})

export class DetalleCorporativoComponent {
  
  @ViewChild(DatatableComponent) table: DatatableComponent;


  id:number;
  itemCorporativo:any;
  itemCorporativoEdit:any;
  itemCorporativoEditContacto:any;
  formCorporativo:FormGroup;

  formContacto:FormGroup;

  load:boolean = false;
  editar = true;

  public rows:any[] = []
  public ColumnMode = ColumnMode;
  public limitRef = 10;
  private tempData = [];

  public columns = [
    { name: "ID", prop: "id" },
    { name: "NOMBRE", prop: "S_Nombre" },
    { name: "PUESTO", prop: "S_Puesto" },
    { name: "TELEFONO", prop: "N_TelefonoFijo"},
    { name: "CELULAR", prop: "N_TelefonoMovil" },
    { name: "EMAIL", prop: "S_Email" },
    { name: "OBSERVACIONES", prop: "S_Comentarios" },
    { name: "Acciones", prop: "Actions" },
  ];


  constructor (
    private activatedRoute: ActivatedRoute,
    private corporativoServices: CorporativoServices,
    private spinner:NgxSpinnerService,
    private fb:FormBuilder,
    private router: Router

  ) {}

  ngOnInit () :void{
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    if(this.id)
    this.createFormCorporativo();
    this.createFormContacto()
    this.getCoporativo();
    this.formCorporativo.disable();
  }



  getCoporativo(){
    this.spinner.show();
    this.corporativoServices.getCorporativo(this.id).subscribe(res => {
      if(res.status === 200){
        this.itemCorporativo = res.body.data.corporativo;
        this.rows = this.itemCorporativo.tw_contactos_corporativo,
        this.formCorporativo.patchValue(this.itemCorporativo)
        const fecha = this.formatDate(this.itemCorporativo.D_FechaIncorporacion);
        this.formCorporativo.get('D_FechaIncorporacion').setValue(fecha)
        this.load = true;
        this.editar = true;
        this.formContacto.reset();
        this.spinner.hide()
      }else{
        this.spinner.hide()
      }
    })
  }

  createFormCorporativo(){

    this.formCorporativo = this.fb.group({
      id:[''],
      S_NombreCorto:[''],
      S_NombreCompleto:[''],
      S_SystemUrl:[''],
      D_FechaIncorporacion:[''],
      S_Activo:[''],
    })
  }

  createFormContacto(){
    this.formContacto = this.fb.group({
      id:[''],
      S_Nombre:['', Validators.required],
      S_Puesto:['', Validators.required],
      N_TelefonoFijo:['', Validators.required],
      N_TelefonoMovil:['', Validators.required],
      S_Email:['', Validators.required],
      S_Comentarios:['', Validators.required],
      tw_corporativo_id:[''],
      created_at:[''],
      updated_at:['']
    })
  }

  returnCorporativos(){

    this.router.navigate(['corporativos'])
  }

  edit(){

    this.formCorporativo.enable();
  }

  onSubmit() {
    this.itemCorporativo.S_NombreCorto = this.formCorporativo.value.S_NombreCorto,
    this.itemCorporativo.S_NombreCompleto = this.formCorporativo.value.S_NombreCompleto,
    this.itemCorporativo.S_SystemUrl = this.formCorporativo.value.S_SystemUrl,
    this.itemCorporativo.D_FechaIncorporacion = this.formCorporativo.value.D_FechaIncorporacion,
    this.itemCorporativo.S_Activo = this.formCorporativo.value.S_Activo,
    this.spinner.show();
    this.corporativoServices.updateCorporativo(this.itemCorporativo, this.itemCorporativo.id).subscribe(res => {
      if(res.status === 201){
        this.spinner.show();
        swal.fire({
          icon: 'success',
          text: 'Corporativo Actualizado',
          showConfirmButton: false,
          timer: 4000,
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false,
        });
        this.getCoporativo();
      }else{
        this.spinner.show()
      };
      console.log(res)
      this.spinner.hide();
    })

    console.log('Your form data : ', this.formCorporativo.value );
  }

  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  editContactoCorporativo(row){
    this.formContacto.patchValue(row)
    this.editar = false;
  }

  addContactoCorporativo(){
    if(this.formContacto.valid){
      this.spinner.show()
      this.formContacto.value. tw_corporativo_id = this.itemCorporativo.id;
      this.corporativoServices.addContacto(this.formContacto.value).subscribe(res => {
        if(res.status === 201){
          this.spinner.show();
          swal.fire({
            icon: 'success',
            text: 'Contacto Creado',
            showConfirmButton: false,
            timer: 4000,
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false,
          });
          this.getCoporativo();
        }else{
          this.spinner.show()
        }
      })
    }else{
      swal.fire({
        icon: 'warning',
        text: 'Todos los campos son requeridos',
        showConfirmButton: false,
        timer: 4000,
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false,
      });
    }
  }

  updateContacto(){
    this.spinner.show();
    if(this.formContacto.valid){
      
      this.corporativoServices.updateContacto(this.formContacto.value, this.formContacto.get('id').value).subscribe(res => {
        if(res.status === 201){
          this.spinner.show();
          swal.fire({
            icon: 'success',
            text: 'Contacto Actualizado',
            showConfirmButton: false,
            timer: 4000,
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false,
          });
          this.getCoporativo();
        }else{
          this.spinner.show()
        };
      })
    }else{
      swal.fire({
        icon: 'warning',
        text: 'Todos los campos son requeridos',
        showConfirmButton: false,
        timer: 4000,
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false,
      });
    }
  }

  deleteContactoCorporativo(row){
    this.spinner.show();
    this.corporativoServices.deleteContacto(row.id).subscribe((res) => {
      if(res.status === 200){
        this.spinner.hide();
        swal.fire({
          icon: 'success',
          text: res.body.data,
          showConfirmButton: false,
          timer: 4000,
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false,
        });
       this.getCoporativo();
      }else{
        this.spinner.hide()
      }
    });
  }
}


