import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})

export class CorporativoServices {

  public apiURL=environment.apiURL;
  public auth_token='Bearer '+localStorage.getItem('tokenscloud');

  httpHeaders: HttpHeaders = new HttpHeaders({
    Authorization: this.auth_token
  });

  constructor(
    private httpClient: HttpClient
  ) {}


    getCorporativos():Observable<any>{

        return this.httpClient.get<HttpResponse<Object>>(this.apiURL+'/corporativos',{ observe: 'response', headers:this.httpHeaders});
    }

    getCorporativo(id:number):Observable<any>{

      const urlApi = this.apiURL+ '/corporativos/'+id;
      return this.httpClient.get<HttpResponse<Object>>(urlApi,{ observe: 'response', headers:this.httpHeaders});
    }

    updateCorporativo(item, id):Observable<any>{

      const urlApi = this.apiURL+ '/corporativos/'+id;
      return this.httpClient.put<HttpResponse<Object>>(urlApi, item, { observe: 'response', headers:this.httpHeaders});
      
    }


    addContacto(item){
      const urlApi = this.apiURL+ '/contactos';
      return this.httpClient.post<HttpResponse<Object>>(urlApi, item, { observe: 'response', headers:this.httpHeaders});
    }

    updateContacto(item, id){
      const urlApi = this.apiURL+ '/contactos/'+id;
      return this.httpClient.put<HttpResponse<Object>>(urlApi, item, { observe: 'response', headers:this.httpHeaders});
    }

    deleteContacto(id):Observable<any>{

      const urlApi = this.apiURL+ '/contactos/'+id;
      return this.httpClient.delete<HttpResponse<Object>>(urlApi,{ observe: 'response', headers:this.httpHeaders});
      
    }


}