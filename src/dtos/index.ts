/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
export interface IUserDtos {
  id: string
  nome: string
  membro: string
  senha: string
  adm: boolean
  token: string
  media: number
  hub: 'GEB' | 'CLUB_MENTORIA'

  //! ! FK_USERS
  situation: ISituationUser
  profile: IProfileDto
  links: ILinkDto
  region: IRegion
  Stars: IStars[]
  RelationShip: IRelation[]
  created_at: Date
  updated_at: Date
}

export interface ISituationUser {
  id?: string
  inativo: boolean
  firstLogin: boolean
  apadrinhado: boolean
  fk_id_user?: string
}

export interface IProfileDto {
  fk_id_user: string
  // fk_id_post?: string;
  whats: string
  workName: string
  CNPJ: string
  CPF: string
  ramo: string
  enquadramento: string
  email: string
  insta?: string
  web?: string
  face?: string
  whatsApp?: string
  logo?: string
  avatar?: string
}

export interface IRegion {
  id?: string
  city: string
  fk_id_user?: string
}

export interface IPresencaDto {
  id?: string
  nome: string
  user_id: string
  presenca?: boolean
  createdAt: Date
}

export interface IOrderTransaction {
  id?: string
  consumidor_name: string
  prestador_name: string
  consumidor_id: string

  prestador_id: string
  valor: number
  descricao: string
  createdAt?: Date
}

export interface ITransaction {
  id?: string
  consumidor_name?: string
  prestador_name?: string
  consumidor_id?: string

  prestador_id?: string
  valor: number
  descricao: string
  created_at: Date
  date?: string
  valorFormated: string
}

export interface IB2b {
  send_id: string
  send_name: string
  recevid_name: string
  recevid_id: string
  appointment: string
  assunto: string
  createdAt: Date
  validate?: boolean
  id?: string
}

export interface IIndicationDto {
  id?: string
  indicado_id: string
  indicado_name: string
  quemIndicou_id: string
  quemIndicou_name: string
  client_name: string
  phone_number_client: number
  description: string
  validate?: boolean
}

export interface ILinkDto {
  id?: string
  user_id: string
  nome: string
  link: string
}

export interface IPostsDtos {
  id?: string
  image: string
  fk_id_user: string
  description: string
  like?: ILikeDto[]
  profile?: IProfileDto
  user?: IUserDtos
  created_at?: Date
  date?: number
}

export interface ILikeDto {
  id?: string
  like: number
  fk_id_post: string
}

export interface IStars {
  id: string
  fk_id_user: string
  star: number
  valiador: string
}

export interface IPadrinho {
  id: string
  user_id: string
  apadrinhado_name: string
  apadrinhado_id: string
  qnt: string
  created_at: Date | string
  updated_at: Date | string
}

export interface IGuest {
  id: string
  fk_user_id: string
  name_convidado: string
  approved: boolean
  created_at: Date | string
  updated_at: Date | string
  user: {
    id: string
    nome: string
    membro: string
    token: string
    senha: string
    adm: boolean
    created_at: string
  }
}

export interface IDonate {
  id: string
  fk_id_user: string
  approved: boolean
  itens: string
  created_at: Date | string
  updated_at: Date | string
}

export interface IIndication {
  id: string
  indicado_id: string
  indicado_name: string
  quemIndicou_id: string
  quemIndicou_name: string
  client_name: string
  phone_number_client: string
  description: string
  createdAt: Date | string
  updated_at: Date | string
  validate: boolean
}

type T =
  | 'B2B'
  | 'CONSUMO_IN'
  | 'CONSUMO_OUT'
  | 'PADRINHO'
  | 'PRESENCA'
  | 'INDICATION'
  | 'DONATE'
  | 'INVIT'

export interface IRelation {
  id: string
  objto: any
  situation: boolean
  ponts: number
  fk_user_id: string
  prestador_id: string
  client_id: string
  hub: string
  type: T
  created_at: Date
  updated_at: Date
}

export interface IMetric {
  usersUp: number
  metricValidByYear: number
  metricValidByMonth: number
  padding_media_transaction: number
  valid_media_transaction: number
  amount_accumulated: number
}

export interface IExtratoUser {
  consumo: IRelation[]
  venda: IRelation[]
  b2b: IRelation[]
  donate: IRelation[]
  indication: IRelation[]
  padrinho: IRelation[]
  presenca: IRelation[]
  totalConsumo: string
  totalVenda: string
  invit: IRelation[]
  allRelation: IRelation[]
}
