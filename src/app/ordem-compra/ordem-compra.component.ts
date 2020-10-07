import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  @ViewChild('formulario', null) public f: NgForm

  public idPedidoCompra: number

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {
    
  }

  public confirmarCompra(): void {
    console.log(this.f.value)
    
    let pedido: Pedido = new Pedido(
      this.f.value.endereco,
      this.f.value.numero,
      this.f.value.complemento,
      this.f.value.formaPagamento
    )

    this.ordemCompraService.efetivarCompra(pedido)
    .subscribe((idPedido: number) => {
      this.idPedidoCompra = idPedido
      //console.log('Pedido cadastrado com sucesso! Id do pedido: ' + idPedido)
    })

  }
} 
