export function convertNumberToMoney(item: number | null) {
  const value = item || 0
  const money = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return money
}
