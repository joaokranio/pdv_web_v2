import fs from 'fs'
import path from 'path'

const filePath = path.resolve(__dirname,'../test-data/pedido.json')

export function savePedidoId(chave: string, pedidoId: number) {
  let data: any = {}

  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  }

  data[chave] = { pedidoId }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

export function getPedidoId(chave: string): number {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  return data[chave].pedidoId
}
