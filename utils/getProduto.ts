import produtos from '../test-data/produto.json'

type Produto = {
    materialId: string
    descricao: string
    tipoVendaId: number
    quantidade: number
    vlrMaterial: number
    vlrUnitario: number
    vlrDesconto: number
    vlrDescontoTotal: number
    naturezaOperacaoId: string
}

const produtosMap = produtos as Record<string, Produto>

export function getProduto(nome: string): Produto{
    return produtosMap[nome]
}