const format = (value) => new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
}).format(value)

export default format
