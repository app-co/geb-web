export function convertNumberToMoney(value: number) {
  const money = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return money
}
