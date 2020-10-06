import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_API } from './app.api';
import { Pedido } from './shared/pedido.model';
import { map } from 'rxjs/operators';

@Injectable()
export class OrdemCompraService {

    constructor(private http: HttpClient){}

    public efetivarCompra(pedido: Pedido): Observable<any> {
        let headers: Headers = new Headers()
        headers.append('content-type', 'application-json')

        return this.http.post(
            `${URL_API}/pedidos`,
            JSON.stringify(pedido),
        ).pipe(map((response: any) => 
                console.log(response)
            ))
           
        
    }
}

