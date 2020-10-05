import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Oferta } from './shared/oferta.model'
import { URL_API } from './app.api'
import { Observable } from 'rxjs'
import { map, catchError, retry } from 'rxjs/operators';



//import 'rxjs/add/operator/toPromise'

@Injectable()
export class OfertasService {

    //private url_api = "http://localhost:3000/ofertas"

    constructor(private httpClient: HttpClient){

    }

    public getOfertas(): Promise<Oferta[]> {
        
        return this.httpClient.get(`${URL_API}/ofertas?destaque=true`)
        .toPromise()
        .then((resposta: Oferta[]) => resposta)
        
    }

    public getOfertasPorCategoria(categoria: string) : Promise<Oferta[]> {
        
        return this.httpClient.get(`${URL_API}/ofertas?categoria=${categoria}`)
        .toPromise()
        .then((resposta: Oferta[]) => resposta)
        
    }   

    public getOfertaPorId(id: number): Promise<Oferta> {
        return this.httpClient.get(`${URL_API}/ofertas?id=${id}`)
        .toPromise()
        .then((resposta: any) => {
            return resposta.shift()
        })
    }

    public  getComoUsarOfertaPorId(id: number): Promise<string> {
        return this.httpClient.get(`${URL_API}/como-usar?id=${id}`)
        .toPromise()
        .then((resposta: any) => {
            return resposta[0].descricao
        })
    }

    public  getOndeFicaOfertaPorId(id: number): Promise<string> {
        return this.httpClient.get(`${URL_API}/onde-fica?id=${id}`)
        .toPromise()
        .then((resposta: any) => {
            return resposta[0].descricao
        })
    }

    public pesquisaOfertas(termo: string): Observable<Oferta[]>{
        return this.httpClient.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
        .pipe(map((resposta: any) => resposta), retry(10))
    }
}