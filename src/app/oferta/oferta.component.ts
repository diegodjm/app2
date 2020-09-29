import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model'

import { interval, Observable , Observer} from 'rxjs'


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
    ){ 
    
  }

  ngOnInit() {
    
    console.log( this.route.snapshot.params['id'])    
    this.ofertasService.getOfertaPorId(this.route.snapshot.params['id'])
    .then((oferta: Oferta) => {
      this.oferta=oferta
    })
    /*
    this.route.params.subscribe(
      (parametro: any) => { console.log(parametro) } ,
      (erro:any) => console.log(erro),
      () => console.log('processamento foi classificado como concluido')
    )*/
    /*
    let tempo = interval(2000)
    tempo.subscribe((intervalo: number) => {
      console.log(intervalo)
    })
    */

    let meuObservableTeste = Observable.create((observer: Observer<number>) => {
      observer.next(1)
      observer.next(3)
    })

    meuObservableTeste.subscribe(
      (resultado: any) => console.log(resultado)
    )

  }

}
