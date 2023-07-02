export const b2bRoutes = {
  get: {
    'list-all': 'b2b/list-all-b2b',
    'list-all-recivid': '/b2b/list-by-recevid',
    'list-all-send': '/b2b/list-by-send',
  },
  post: {
    create: '/b2b/create-b2b',
  },
  put: {
    validade: '/b2b/validade-b2b',
  },
}

export const userRoutes = {
  get: {
    'find-by-id': '/user/find-user-by-id',
    'list-all': '/user/list-all-user',
  },

  post: {
    create: '/user/create-user',
    session: '/user/session',
  },

  put: {},

  delete: {
    'delete-user': '/user/delete/',
  },
}

export const presencaRotes = {
  get: {
    'list-all': '/presenca/list-all',
    'list-orders': '/presenca/list-all-order-presenca',
  },

  post: {
    create: '/presenca/create-order-presenca',
    validade: '/presenca/create-presenca',
  },

  put: {},

  delete: {},
}

export const consumoRoutes = {
  get: {
    'all-consumo': '/transaction/list-all-transaction',
  },
}

export const padrinhoRoutes = {
  get: {
    'all-consumo': '/user/padrinho/padrinho',
  },
}

export const indicationRoutes = {
  get: {
    'list-all': '/indication/list-all-indication',
  },
}

export const donatesRoutes = {
  get: {
    'list-all': '/donate',
  },
}

export const convidadosRoutes = {
  get: {
    'list-all': '/guest',
  },
}
