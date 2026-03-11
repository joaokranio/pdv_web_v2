import fs from 'fs'
import path from 'path'

const runtimeDir = path.resolve(__dirname, '../test-data/runtime')

function ensureRuntimeFolderExists() {
  if (!fs.existsSync(runtimeDir)) {
    fs.mkdirSync(runtimeDir, {recursive: true})
  }
}

function getFilePath(cenario: string) {
  ensureRuntimeFolderExists()
  return path.join(runtimeDir, `${cenario}.json`)
}

function ensureFileExists(filePath: string){
  if (!fs.existsSync(filePath)) {
    const initalDate = {
      pedidoId: null,
      pedidoItemIds: [],
      // pedidoItemId: null,
      createAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    fs.writeFileSync(filePath, JSON.stringify(initalDate,null,2))
  }
}

function readFile(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

function writeFile(filePath: string, data:any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

// =====================
// SALVAR PEDIDO
// =====================

export function savePedidoId(cenario: string, pedidoId: number) {
  const filePath = getFilePath(cenario)
  ensureFileExists(filePath)

  const data = readFile(filePath)

  data.pedidoId = pedidoId
  data.updatedAt = new Date().toISOString()

  writeFile(filePath, data)
}

// =====================
// SALVAR ITEM
// =====================

export function savePedidoItemId(cenario: string, pedidoItemId: number) {
  const filePath = getFilePath(cenario)
  ensureFileExists(filePath)

  const data = readFile(filePath)

  if (!data.pedidoItemIds) {
    data.pedidoItemIds = []
  }

  data.pedidoItemIds.push(pedidoItemId)
  // data.pedidoItemId = pedidoItemId
  data.updatedAt = new Date().toISOString()

  writeFile(filePath, data)
}

// ======================
// LER DADOS
// ======================

export function getPedidoData(cenario: string) {
  const filePath = getFilePath(cenario)

  if (!fs.existsSync(filePath)) {
    throw new Error (` Arquivo do cenário "${cenario}" não encontrado.`)
  }

  return readFile(filePath)
}

// ========================
// LIMPAR ARQUIVO
// ========================

export function clearPedidoData(cenario: string) {
  const filePath = getFilePath(cenario)

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
}