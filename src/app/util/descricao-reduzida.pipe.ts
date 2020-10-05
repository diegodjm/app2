import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'descricaoReduzida' })
export class DescricaoReduzida {
    transform(texto: string, truncarEm: number): string {
        if (texto.length > truncarEm) {
            return texto.substr(0, truncarEm) + '...'
        }
        return texto
    }
}