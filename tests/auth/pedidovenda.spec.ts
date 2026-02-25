import { test, expect } from '@playwright/test'
import { Logada } from '../../pages/HomePage'
import { Pedido } from '../../pages/PedidoPage'
import { Toast } from '../../components/Toast'
import dadosPedido from '../../test-data/clientes.json'
import { getPedidoData, savePedidoId, savePedidoItemId } from '../../utils/pedidoStore'
import { PedidoApi } from '../../api/PedidoApi'
import { buildPedidoPayload } from '../../utils/pedidoFactory'
import { buildPedidoItemPayload } from '../../utils/pedidoItemFactory'
import { request } from 'node:http'
import console from 'node:console'

let pedidoApi: PedidoApi

test.beforeEach(async ({ page }) => {
    const pedido: Pedido = new Pedido(page)
    await pedido.pedidos()
})

test.describe('Pedido de Venda – Cadastro do Pedido', () => {
    test('Abrir tela de cadastro de pedido de venda', { tag: ['@critical', '@smoke', '@pedidos_venda', '@web'] }, async ({ page }) => {
        // Dado que estou na pagina de cadastro de pedidos.
        const pedido: Pedido = new Pedido(page)

        // Quando clico no botão "novo".
        await pedido.novoPedido()

        // Então deve abrir a tela para o cadastro de um novo pedido.
        await pedido.verificarTelaNovoPedido()
    })

    test('Criar pedido preenchendo somente a cabeça', { tag: ['@critical', '@regression', '@pedidos_venda', '@web', '@flaky'] }, async ({ page }) => {
        const pedidoApi: PedidoApi = new PedidoApi(page)
        const pedido: Pedido = new Pedido(page)
        const form = dadosPedido.cabecaPedido

        await pedido.novoPedido()
        await pedido.preencherCabecaPedido(form.cliente, form.vendedor, form.condicaoPagamento, form.formaPagamento, form.listaPreco)

        await expect(pedido.inputCliente).toHaveValue(/.+/)
        await expect(pedido.inputVendedor).toHaveValue(/.+/)
        await expect(pedido.inputCondicaoPagamento).toHaveValue(/.+/)
        await expect(pedido.inputFormaPagamento).toHaveValue(/.+/)
        await expect(pedido.inputListaPreco).toHaveValue(/.+/)

        const [response] = await Promise.all([
            page.waitForResponse(async r => {
                if (
                    !r.url().includes('/v1/pedido') ||
                    r.request().method() !== 'POST' ||
                    r.status() !== 200
                ) return false

                const body = await r.json().catch(() => null)
                return Boolean(body?.data?.pedidoId)
            }),
            pedido.submitPedido()
        ])

        const body = await response.json()
        const pedidoId = body.data.pedidoId

        expect(pedidoId).toBeTruthy()
        savePedidoId('cabecaPedido', pedidoId)
        console.log('Pedido criado com ID:', pedidoId)

        const textoTitulo = page.locator('#titulo strong i').first()
        await expect(textoTitulo).toBeVisible({ timeout: 50000 })

        await page.locator('#search-select').selectOption('pedidoId')
        const searchInput = page.locator('#search-input')
        await searchInput.fill(pedidoId.toString())

        await expect(page.locator('#search-input')).toHaveValue(/.+/)
        //necessário essa pausa para garantir que estou salvando o estado do elemento antes de clicar para pesquisar
        await page.waitForTimeout(1000)
        page.locator('#search-input').click()
        await page.waitForTimeout(1000)
        page.locator('#search-button').click()


        const linha = page.locator('table tbody tr')
        await expect(linha).toHaveCount(1, { timeout: 50000 })
        await expect(linha.first()).toContainText(pedidoId.toString(), { timeout: 50000 })

        //deletar pedido 
        await pedidoApi.deletarPedido(pedidoId)

    })
})

test.describe('Pedido de Venda – Validações da Cabeça', () => {
    test.beforeEach(async ({ page }) => {
        const logada: Logada = new Logada(page)
        const message = 'Pedidos'
        await logada.validarMenu(message)
    })
    test('Validar campos obrigatórios da cabeça do pedido', { tag: ['@high', '@regression', '@pedidos_venda', '@negativas', '@web'] }, async ({ page }) => {
        // Dado que estou na tela de cadastro de pedido.
        const pedido: Pedido = new Pedido(page)
        const toast: Toast = new Toast(page)
        await pedido.novoPedido()

        // Quando eu clico no botão "Salvar" sem preencher nenhum campo.
        await pedido.submitPedido()

        // Então devo ver um Toast informando que preciso preencher os campos obrigatórios e os campos 
        // ("Cliente", "Condição de Pagamento" e "Lista de Preço") deverão ficar em destaque.
        const messageToast = 'ATENÇÃO! Prencha todos os campos obrigatórios.'
        await toast.toast(messageToast)
    })

    test('Validar digitação de caracteres inválidos', { tag: ['@high', '@regression', '@pedidos_venda', '@negativas', '@web'] }, async ({ page }) => {
        // Dado que estou na tela de cadastro de pedido.
        const pedido: Pedido = new Pedido(page)
        const toast: Toast = new Toast(page)
        await pedido.novoPedido()

        // Quando digito um caracter inválido (letras) onde não é permitido.
        // Campos numéricos: "cliente", "vendedor", "condição de pagamento" e "lista de preço" 
        await pedido.caracteresInvalidos('cliente', 'sss')

        // Então devo ver um Toast informando que houve um erro
        const messageToast = 'Erro ao tentar realizar a ação. Por favor, tente novamente mais tarde!'
        await toast.toast(messageToast)
    })
})

test.describe('Pedido de Venda – Inclusão de Itens (Modal de Item)', () => {
    test('Abrir modal de inclusão de item', { tag: ['@critical', '@smoke', '@pedidos_venda', '@web'] }, async ({ page }) => {
        const pedido: Pedido = new Pedido(page)
        // Dado que informei os dados da cabeça do pedido.
        await page.goto('pedidos/238048')
        await expect(pedido.validaPedido).toHaveValue('238048')

        // Quando clico no botão "+" para adicionar os itens no pedido.
        await pedido.addPedido.click()

        // Então é apresentado um modal para preencher as informações do item que deverá ser acrescentado no pedido.
        await expect(pedido.modalPedidoitem).toBeVisible()

    });

    test('Incluir item válido no pedido', { tag: ['@critical', '@smoke', '@pedidos_venda', '@web'] }, async ({ page }) => {
        const pedidoApi: PedidoApi = new PedidoApi(page)
        const pedido: Pedido = new Pedido(page)
        const payload = buildPedidoPayload("pedidoItem")

        await pedidoApi.newPedido("pedidoItem", payload)

        const data = getPedidoData("pedidoItem")
        const pedidoId = data.pedidoId

        console.log('Pedido criado com ID:', pedidoId)

        // Dado que informei os dados da cabeça do pedido.
        await page.goto(`pedidos/${pedidoId}`)
        await expect(pedido.validaPedido).toHaveValue(pedidoId.toString())


        await expect(page.locator('td[colspan="12"]')).toBeVisible({ timeout: 10000 })
        await expect(pedido.gridPedido).toHaveText('Nenhum registro encontrado!')
        await pedido.addPedido.click()

        // Dado que selecionei um item válido e preenchi todos os campos.
        await expect(pedido.totalItem).toHaveText('Valor Total: R$ 0,00')
        await pedido.inputProduto.fill('0514')
        await pedido.inputProduto.press('Tab')
        await expect(pedido.inputQuantidade).toBeEditable()
        await pedido.inputQuantidade.fill('5')
        await expect(pedido.totalItem).not.toHaveText('Valor Total: R$ 0,00')


        // Quando clico no botão "Salvar"
        //salvar id do item no json
        const [response] = await Promise.all([
            page.waitForResponse(async (r) => {
                if (
                    !r.url().includes('/v1/pedidoItem') ||
                    r.request().method() !== 'POST' ||
                    r.status() !== 200

                ) return false
                const body = await r.json().catch(() => null)
                const id = body?.data?.pedidoItemId

                return Boolean(id && id !== 0)

            }),
            pedido.salvarItem.click()
        ])

        const body = await response.json()
        const pedidoItem = body?.data?.pedidoItemId

        expect(pedidoItem).toBeTruthy()
        savePedidoItemId('itemPedido', pedidoItem)
        console.log('Item criado com ID:', pedidoItem)

        // Então o item do pedido deverá aparecer na grid do pedido com os dados que foram  informado.
        await expect(pedido.validaPedido).toHaveValue(pedidoId.toString())
        // await expect(page.locator('div.w-full td').filter({ hasText: '0514' })).toBeVisible()
        await expect(pedido.gridPedido.filter({ hasText: '0514' })).toBeVisible()

        //deletar item do pedido via api
        await pedidoApi.deletarItem(pedidoItem)
        await pedidoApi.deletarPedido(pedidoId)
    })

    test.only('Editar item existente do pedido', { tag: ['@high', '@regression', '@pedidos_venda', '@web'] }, async ({ page }) => {
        const pedido: Pedido = new Pedido(page)
        const pedidoApi: PedidoApi = new PedidoApi(page)

        // Incluir pedido via API
        const payload = buildPedidoPayload("pedidoItem")
        await pedidoApi.newPedido("pedidoEditarItem", payload)
        const data = getPedidoData("pedidoEditarItem")
        const pedidoId = data.pedidoId
        console.log('Pedido criado com ID:', pedidoId)
        
        // Incluir Item no pedido via API
        const itemPayload = buildPedidoItemPayload(pedidoId, {
            materialId: "0517",
            descricao: "TPA DE VIDRO 28",
            tipoVendaId: 1,
            quantidade: 10,
            vlrMaterial: 19.5617,
            vlrUnitario: 19.5617,
            vlrDesconto: 0,
            vlrDescontoTotal: 0,
            naturezaOperacaoId: "5101B"
        })
        await pedidoApi.newPedidItemII("pedidoEditarItem",itemPayload)
        const dataItemId = getPedidoData("pedidoEditarItem")
        const pedidoItemId = dataItemId.pedidoItemId
        console.log('Item criado com o Id:',pedidoItemId)

        // Dado que eu já tenho um item inserido no pedido. 
        await page.goto(`pedidos/${pedidoId}`)
        await expect(pedido.validaPedido).toHaveValue(pedidoId.toString())
        await expect(pedido.formValorTotal).toHaveValue('208.34')

        
        const linha = page.locator('tbody:visible tr', { hasText: '0517' })
        await expect(linha.locator('td:visible').nth(3)).toHaveText('10,00')
        
        // Quando eu selecino a função para editar o item e troco as informações desse item e clico em "salvar".
        await pedido.editarItem.click()
        await expect(pedido.inputProduto).toHaveValue(/.+/)
        await expect(pedido.totalItem).toHaveText('Valor Total: R$ 208,34')
        await pedido.inputQuantidade.fill('')
        await pedido.inputQuantidade.fill('15')
        await pedido.inputVlrMaterial.press('Tab')
        await expect(pedido.totalItem).not.toHaveText('Valor Total: R$ 312.5')
        await pedido.salvarItem.click()
        // await page.waitForTimeout(10000)

        // Então os dados do item deverá ser atualizado de acordo com as informações preenchidas no momento da edição do item.
        await expect(pedido.validaPedido).toHaveValue(pedidoId.toString())
        await expect(pedido.formValorTotal).not.toHaveValue('312.50')
        await expect(linha.locator('td:visible').nth(3)).toHaveText('15,00')

        //deletar item do pedido via api
        // await pedidoApi.deletarItem(pedidoItemId)
        // await pedidoApi.deletarPedido(pedidoId)
    })

    test('Cancelar inclusão de item no pedido', { tag: ['@medium', '@regression', '@pedidos_venda', '@web'] }, async ({ page }) => {
        const pedido: Pedido = new Pedido(page)
        // Dado que eu iniciei a inclusão de um novo item no pedido.
        await page.goto('pedidos/238045')
        await expect(pedido.validaPedido).toHaveValue('238045')
        await pedido.addPedido.click()

        // E informo os dados do item
        await expect(pedido.totalItem).toHaveText('Valor Total: R$ 0,00')
        await pedido.inputProduto.fill('0514')
        await pedido.inputProduto.press('Tab')
        await expect(pedido.inputQuantidade).toBeEditable()
        await pedido.inputQuantidade.fill('5')
        await expect(pedido.totalItem).not.toHaveText('Valor Total: R$ 0,00')

        // Quando clico no botão "Cancelar".
        await pedido.cancelarItem.click()

        // Então o modal deverá fechar e voltar para tela de pedidos sem que tenha incluido nenhum item.
        await expect(pedido.validaPedido).toHaveValue('238045')
        await expect(page.locator('td[colspan="12"]')).toBeVisible({ timeout: 10000 })
        await expect(pedido.gridPedido).toHaveText('Nenhum registro encontrado!')
    })
})

test.describe.skip('Pedido de Venda – Validações do Item', () => {
    test('Pedido - Validar campos obrigatórios do item', { tag: ['@high', '@regression', '@pedidos_venda', '@negativas', '@web'] }, async ({ page }) => {
        // Dado que estou na tela de inclusão de um item no pedido.

        // Quando tento salvar o item sem preencher os campos obrigatórios.

        // Então o sistema deverá impedir o salvamento
        // E exibir um Toast na informando que é necessário informar os campos obrigatórios
        // E os campos obrigatórios devem ser marcados com inválidos.
    });

    test('Pedido - Bloquear preenchimento de campos numéricos com caracteres inválidos', { tag: ['@medium', '@regression', '@pedidos_venda', '@negativas', '@web'] }, async ({ page }) => {
        // Dado que estou na tela de inclusão de um item no pedido.

        // Quando tento digitar letras em campos numéricos

        // Então o sistema deverá exibir um Toast com uma mensagem de erro 
        // TODO: mensagem hoje não está sendo tratada, lembrar de pedir para o desenvolvimento tratar e deixar com algo mais amigável para o usuário final. 
    });
})

test.describe.skip('Pedido de Venda – Cálculos do Item', () => {
    test('Pedido - Calcular valor total do item ao informar quantidade e valor unitário', { tag: ['@critical', '@regression', '@pedidos_venda', '@web'] }, async ({ page }) => {
        // Dado que selecionei um item válido.

        // Quando informo a quantidade do item.

        // Então o sistema deverá exibir o valor total desse item no canto inferior esquedo do janela.
    });

    test('Pedido - Recalcular valor do item ao alterar quantidade', { tag: ['@high', '@regression', '@pedidos_venda', '@web'] }, async ({ page }) => {
        // Dado que eu já selecionei um item válido e informei a quantidade.

        // Quando quando altero a quantidade informada.

        // Então o sistema deverá refazer o calculo e exibir o novo valor 
    });

    test('Pedido - Aplicar desconto percentual no item', { tag: ['@high', '@regression', '@pedidos_venda', '@web'] }, async ({ page }) => {
        // Dado que informei um item válido no pedido de venda.

        // Quando aplico o desconto usando a opção de "Desconto Percentual (%)".

        // Então o sistema deverá informar o valor de desconto no campo "Valor do desconto Total"
        // E fazer o abatimento desse valor no total do pedido.
    });

    test('Pedido - Aplicar desconto em valor no item', { tag: ['@high', '@regression', '@pedidos_venda', '@web'] }, async ({ page }) => {
        // Dado que que informei um item válido no pedido de venda.

        // Quando aplico o desconto usando a opção de "Desconto Valor ($)".

        // Entãoo sistema deverá informar o valor de desconto no campo "Valor do desconto Total"
        // E fazer o abatimento desse valor no total do pedido.
    });
})

test.describe.skip('Pedido de Venda – Grid de Itens', () => {
    test('Pedido - Exibir corretamente os valores calculados na grid de itens', { tag: ['@high', '@regression', '@pedidos_venda', '@web'] }, async ({ page }) => {
        // Dado que eu informei/inseri os itens dentro de pedido de venda.

        // Quando volto para a grid.

        // Então devor ver as informações apresentadas na grid respeitando o seguinte calculo:
        // Valor dos itens = (Qtde x Vlr. Material) - Vlr.Desoneração
        // Vlr.Total       = Valor dos itens
        //                  - Vlr.Desconto Total
        //                  + Vlr. Frete
        //                  + Vlr.IPI
        //                  + Vlr.ST 
    });

    test('Pedido - Atualizar valor total do pedido conforme itens da grid', { tag: ['@critical', '@regression', '@pedidos_venda', '@web'] }, async ({ page }) => {
        // Dado que eu alteri a quantidade do item dentro de pedido de venda.

        // Quando volto para a grid.

        // Então o sistema deverá recalcular o valor total do pedido.
    });
})

test.describe.skip('Pedido de Venda – Exclusão de Itens', () => {
    test('Pedido - Excluir item individual pela grid', { tag: ['@high', '@regression', '@pedidos_venda', '@web'] }, async ({ page }) => {
        // Dado que eu tenho um pedido de venda com itens inseridos.

        // Quando utilizo a função de exclusão.

        // Então o sistema deverá excluir o item do pedido e atualizar a grid e o campo "Valor Total".
    });

    test('Pedido - Excluir todos os itens do pedido', { tag: ['@medium', '@regression', '@pedidos_venda', '@web'] }, async ({ page }) => {
        // Dado que eu tenho um pedido de venda com itens inseridos.

        // Quando utilizo a função "Excluir todos os Itens"

        // Então o sistema deverá excluir todos os itens do pedido.
        // E a cabeça do pedido deverá ser mantida.
        // E atualizar o campo "Valor Total" zerando essa informação
    });
})

test.describe.skip('Pedido de Venda – Assistente de Digitação', () => {
    test('Pedido - Abrir assistente de digitação de itens', { tag: ['@medium', '@regression', '@pedidos_venda', '@web'] }, async ({ page }) => {
        // Dado que eu preenchi as informações da cabeça do pedido de venda.

        // Quando clico no botão do "Assistente de Digitação".

        // Então o sistema deverá abrir o pop-up do assistente de digitação.
    });

    test('Pedido - Incluir itens pelo assistente de digitação', { tag: ['@high', '@regression', '@pedidos_venda', '@web'] }, async ({ page }) => {
        // Dado que eu preenchi as informações da cabeça do pedido de venda.
        // E cliquei no botão do "Assistente de Digitação".

        // Quando preencho as informações de "Produto", "Tipo de Venda" e "Quantidade".

        // Então clico no botão "Salvar" o pop-up deverá fechar e abrir novamente em branco para a seleção de um novo item.

    });
})

test.describe.skip('Pedido de Venda – Assistente (Lista de Materiais)', () => {
    test('Pedido - Abrir assistente de inclusão por lista de materiais', { tag: ['@medium', '@regression', '@pedidos_venda', '@web'] }, async ({ page }) => {
        // Dado que eu preenchi as informações da cabeça do pedido de venda.

        // Quando clico no Asistente (Lista de materiais).

        // Então deverá abrir uma janela com o nome "Lista de materias".
        // E deverá ser exibido nessa tela a imagem do item, código do item, descrição e valor.
        // E um campo para digitação da quantidade e logo abaixo 2 botões "-" e "+".
    });

    test('Pedido - Incluir itens no pedido pela lista de materiais', { tag: ['@high', '@regression', '@pedidos_venda', '@cadastro_material', '@web'] }, async ({ page }) => {
        // Dado que eu preenchi as informações da cabeça do pedido de venda.
        // E informei a quantidade dos itens que desejo inserir no pedido.

        // Quando clico no botão "OK" no canto inferior direito.

        // Então os itens que informei a quantidade deverão ser exibidos na grid do pedido de venda.
    });
})

test.describe.skip('Pedido de Venda – Importação por Excel', () => {
    test('Pedido - Abrir modal de importação de itens via Excel', { tag: ['@medium', '@regression', '@pedidos_venda', '@web'] }, async ({ page }) => {
        // Dado que tenho as informações da cabeça do pedido de venda preenchidos.

        // Quando clico na função "Importar(Excel)".

        // Então deverá ser exibido um pop-up para a importação do arquivo em excel.

    });

    test('Pedido - Importar itens no pedido via arquivo Excel', { tag: ['@high', '@regression', '@pedidos_venda', '@web'] }, async ({ page }) => {
        // Dado que tenho as informações da cabeça do pedido de venda preenchidos.
        // E já cliquei na função "Importar(Excel".

        // Quando clico no botão "Procurar".

        // Então o sistema deverá abrir uma janela para que o usuário selecione a planilha.
        // Após selecionar o sistema deverá comparar os intens da planilha e se estiver de acordo coma as margens parametrizadas no sistema
        // permitir importar os itens para o pedido. 
    });
})

test.describe.skip('Pedido de Venda – Documentos', () => {
    test('Pedido - Incluir documento no pedido', { tag: ['@medium', '@regression', '@pedidos_venda', '@web'] }, async ({ page }) => {
        // Dado que estou cadastrando e/ou editando um pedido de venda.

        // Quando clico no botão "Documentos" no canto inferior esquerdo.

        // Então o sistema deverá exibir uma janela onde eu posso ver todos os documentos inserido no peidodo e a opção de inserir novos documentos.

    });

    test('Pedido - Excluir documento do pedido', { tag: ['@low', '@regression', '@pedidos_venda', '@web'] }, async ({ page }) => {
        // Dado que estou na janela "Documentos" dentro de um pedido de venda.

        // Quando clico no ícone da "Lixeira" de um documento

        // Então o sistema deverá excluir esse documento desse pedido de venda.
    });
})
