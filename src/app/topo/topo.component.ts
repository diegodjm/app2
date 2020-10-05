import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

import { distinctUntilChanged, switchMap } from 'rxjs/operators'
import { debounceTime } from 'rxjs/operators'
import { of } from 'rxjs'
import { catchError } from 'rxjs/operators'

//import '../util/rxjs-extensions'

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((termo: string) => {

      if(termo.trim() === '' ){
        return of<Oferta[]>([])
      }
        return this.ofertasService.pesquisaOfertas(termo)
      }),
      catchError((err: any) => {
        return of<Oferta[]>([])
      })
    )
    
  }

  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca)
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('')
  }

}
