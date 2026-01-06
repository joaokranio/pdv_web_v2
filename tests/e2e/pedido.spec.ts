import { test, expect } from '@playwright/test'
import { Login } from '../../pages/LoginPage'
import { Logada } from '../../pages/HomePage'

test.beforeEach(async ({ page }) => {
    const login: Login = new Login(page)
    await login.go()
})

test('Cadastro de pedido de venda', async ({ page }) => {
    // Dado que estou na pagina de cadastro de pedidos.

    // Quando clico no botão "novo".

    // Então deve abrir a tela para o cadastro de um novo pedido.
})

test('Validação de campos Obrigatórios.', async ({ page }) => {
    // Dado que estou na tela de cadastro de pedido.

    // Quando eu clico no botão "Salvar" sem preencher nenhum campo.

    // Então devo ver um Toast informando que preciso preencher os campos obrigatórios e os campos deverão ficar em destaque.

})

test('Mensagem de erro ao preencher campos numéricos com caracteres inválidos', async ({ page }) => {
    // Dado que estou na tela de cadastro de pedidos.

    // Quando tento preencher os campos numéricos com letras. 

    // Então deve ser exibido um Toast em vermelho informando que a ação não é permitida.

})

test('Cadastro de pedido sem itens', async ({ page }) => {
    // Dado que estou na tela de cadastro de pedidos.

    // E informo somente os campos da cabeça do pedido sem inserir itens.

    // Quando clico no botão salvar.

    // Então a cabeça do pedido deverá ser salva sem apresentar erros.

    // Excluir pedido via API. 

})

test('Inserir itens no pedido pelo botão adicionar.', async ({ page }) => {
    // Dado que eu cadastrei a cabeça do pedido.

    // Quando clico no botão adicionar na tela de cadastro de pedido.

    // Então deverá abrir uma nova janela para informar o item e a quantidade.

})

test('Calculo quantidade x valor material do item no pedido.', async ({ page }) => {
    // Dado que preciso consultar os calculos dos itens do peido.

    // Quando quando informo uma quantidade maior ou superior que 2.

    // Então o calculo do sistema deverá considerar a quantidade informada x valor do material + o valor do IPI.
})

test('Calculo de desconto do item no pedido por procentagem.', async ({ page }) => {
    // Dado que inseri um item no pedido.

    // Quando informo um percentual de desconto de 10%.

    // Então o sistema deverá preencher o campo "Valor do desconto total" e abater o desconto no valor total do item.
})

test('Calculo de desconto do item no pedido por valor.', async ({ page }) => {
    // Dado que inseri um item no pedido.

    // Quando informo um valor de desconto.

    // Então o sistema deverá preencher o campo "Valor do desconto total" e abater o desconto no valor total do item.
})

test('Validar o calculo do campo "Valor Total" do pedido.', async ({ page }) => {
    // Dado que inseri alguns itens no pedido.

    // Quando retorno para a grid.

    // Então o campo "Valor total" deverá ser a soma da coluna Vlr.Total da grid dos itens do pedido. 
    
})

test('Validar informações apresentadas na grid dos itens do pedido.', async ({ page }) => {
    // Dado que insei alguns itens no pedido.

    // Quando retorno para a grid.

    // Então dos calculos dos itens na grid deverão estar respeitando os calculos 
    // Valor dos itens = (Qtde x Vlr. Material) - Vlr.Desoneração
    // Vlr.Total       = Valor dos itens
    //                  - Vlr.Desconto Total
    //                  + Vlr. Frete
    //                  + Vlr.IPI
    //                  + Vlr.ST
})

test('Inserir itens no pedido pelo Assistente de Digitação.', async ({ page }) => {
    // Dado que eu cadastrei a cabeça do pedido.

    // Quando clico no botão "Assistente de Digitação" na tela de cadastro de pedido.

    // Então deverá abrir a janela do "Assistente de Digitação" para informar os tens do pedido.

})

test('Inserir itens no pedido pelo Assistente.', async ({ page }) => {
    // Dado que eu cadastrei a cabeça do pedido.

    // Quando clico no botão "Assistente" na tela de cadastro de pedido.

    // Então deverá abrir a janela do "Assistente" para informar os tens do pedido.

})

test('Inserir itens no pedido pelo Excel.', async ({ page }) => {
    // Dado que eu cadastrei a cabeça do pedido.

    // Quando clico no botão "Importar (Excel)" na tela de cadastro de pedido.

    // Então deverá abrir a janela do "Importar (Excel)" para informar o rquivos com os itens para a importação.

    //TODO: Questionar sobre o campo valor unitário do item no excel, se o valor informado no excel for diferente do cadastro qual seria o comportamento?

})

test('Excluir todos os itens do pedido.', async ({ page }) => {
    // Dado que eu cadastrei o pedido e inseri os itens.

    // Quando clico no botão "excluir Todos os Itens" na tela de cadastro de pedido.

    // Então deverá limpar a grid dos itens do pedido.

})

test('Validar a funcionalidade da exclusão de itens dentro da grid.', async ({ page }) => {
    // Dado que eu cadastrei o pedido e inseri os itens.

    // Quando clico no icone "lixeira" em algum item da grid de itens do pedido.

    // Então deverá ser exibido um pop-up para confirmar a exclusão do item.

})

test('Editar item na grid do pedido.', async ({ page }) => {
    // Dado que eu cadastrei o pedido e inseri os itens.

    // Quando clico no icone "Lapis" em algum item da grid de itens do pedido.

    // Então deverá abir uma nova janela com os dados desse items para alterar as informações.

})

test('Inserir documentos no pedido.', async ({ page }) => {
    // Dado que cliquei no botão "Documentos" do cadastro de pedidos.

    // Quando clico no botão "Adicionar".

    // Então deve abrir uma janela para adicionar os documentos no pedido.

})

test('Excluir documentos do pedido.', async ({ page }) => {
    // Dado que cliquei no botão "Documentos" de um pedido que já tem um documento inserido.

    // Quando clico no botão "Excluir".

    // Então o documento não deverá ser mais exibo na lista .

})
