type PedidoItemOverrides = Partial<typeof basePedidoItemPayload>

const basePedidoItemPayload = {
    id: "0",
    pedidoItemId: 0,
    pedidoId: 0,

    tipoMaterial: "A",
    materialId: "",
    descricao: "",
    unidadeId: "PC",
    bloqueado: "N",

    tipoVendaId: 1,
    tipoVenda: "",

    regraFiscalId: 0,
    naturezaOperacaoId: "",

    quantidade: 1,
    qtdeFaturada: 0,

    vlrUnitario: 0,
    percDesconto: 0,
    vlrDesconto: 0,
    vlrDescontoTotal: 0,

    subTrib: "N",

    percIPI: 0,
    vlrIPI: 0,

    percICMS: 0,
    vlrICMS: 0,

    percPIS: 0,
    vlrPIS: 0,

    percCOFINS: 0,
    vlrCOFINS: 0,

    vlrMaterial: 0,
    vlrFrete: 0,
    vlrBruto: 0,
    vlrTotal: 0,

    percDescontos: [],
    vlrDescontos: []
}

export function buildPedidoItemPayload(
    pedidoId: number,
    overrides?: PedidoItemOverrides
) {
    return {
        ...basePedidoItemPayload,
        pedidoId,
        ...overrides
    }
}