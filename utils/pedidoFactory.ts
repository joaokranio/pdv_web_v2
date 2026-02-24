import clientes from '../test-data/clientes.json'

type ClienteContext = keyof typeof clientes

const basePedidoPayload = {
    pedidoId: 0,
    filialId: 1,
        filialFiscalId: 1,
        
        obraId: "108.0001",
        aplicacaoId: "108.0001001",

        faturamentoClienteId: null,
        
        tipoPedidoId: 1,
        tipoFator: "Q",
        percFator: 1,
        
        fatorListaPrecoOriginal: 0,
        fatorListaPreco: -0.5,
        
        pedidoCliente: null,
        observacao: null,
        observacaoInterna: null,

        usuarioCadastro: "SECTRA",

        subTrib: "S",
        indicadorPresenca: 9,
        
        vlrIPI: 0,
        vlrICMS: 0,
        vlrICMSSubTrib: 0,
        vlrICMSFCP: 0,
        vlrICMSSubTribFCP: 0,
        vlrDesoneracao: 0,
        vlrSeguro: 0,
        vlrDespesa: 0,
        vlrServico: 0,
        vlrProduto: 0,
        vlrDesconto: 0,
        vlrFrete: 0,
        vlrTotal: 0,
        
        responsavelFreteId: "0",
        transportadoraId: null,
        responsavelRedespachoId: "0",
        redespachoId: null,
        tipoTransporteId: 0,
        
        entregaRazaoSocial: null,
        entregaEndereco: null,
        entregaBairro: null,
        entregaCidade: null,
        entregaCEP: null,
        entregaTelefone: null,
        entregaFax: null,
        entregaEmail: null,
        entregaCNPJ: null,
        entregaIE: null,
        entregaNumero: null,
        entregaComplemento: null,
        entregaUF: null,
        entregaTipoPessoa: null,
        entregaCPF: null,
        entregaPais: null,
        entregaIBGE: null,
        entregaReferencia: null,

        cobrancaBairro: null,
        cobrancaCEP: null,
        cobrancaCidade: null,
        cobrancaCNPJ: null,
        cobrancaComplemento: null,
        cobrancaCPF: null,
        cobrancaEmail: null,
        cobrancaEndereco: null,
        cobrancaFax: null,
        cobrancaTelefone: null,
        cobrancIE: null,
        cobrancaIBGE: null,
        cobrancaNumero: null,
        cobrancaPais: null,
        cobrancaRazaoSocial: null,
        cobrancaTipoPessoa: null,
        cobrancaUF: null,
        
        cobraFrete: "S",
        tipoCobrancaFrete: 3,
        tipoCobrancaFreteDias: 0,
        
        integracao: "N",
        integracaoErro: null,
        
        filialFiscal: null,
        condicaoPagamento: null,
        fatorPreco: null,
        cliente: null,
        
        id: "0"
    }
   
    export function buildPedidoPayload(context: ClienteContext) {
        const cliente = clientes[context]
    
        if (!cliente) {
            throw new Error(`Cliente não encontrado para o contexto: ${context}`)
        }
    
        return {
            ...basePedidoPayload,
    
            clienteId: Number(cliente.cliente),
            vendedorId: Number(cliente.vendedor),
            fatorPrecoId: Number(cliente.listaPreco),
            condicaoPagamentoId: Number(cliente.condicaoPagamento),
            tipoPagamentoId: cliente.formaPagamento,
            dataPedido: new Date().toISOString(),
            dtCadastro: new Date().toISOString()
        }
}