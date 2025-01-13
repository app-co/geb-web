import { z } from "zod";

export const validation = {
  user: z.object({
    id: z.string({ message: '* campo obrigatório' }),
    nome: z.string({ message: '* campo obrigatório' }).transform(h => h.trim()),
    apelido: z.string({ message: '* campo obrigatório' }).transform(h => h.trim()),
    token: z.string({ message: '* campo obrigatório' }).optional(),
    senha: z.string().optional().nullable().transform(h => h ? h.trim() : ''),
    adm: z.boolean().default(false),
    apadrinhado: z.boolean(),
    hub: z.array(z.number().default(0)),
  }),
  profile: z.object({
    id: z.string({ message: '* campo obrigatório' }).optional(),
    logotipo: z.string({ message: '* campo obrigatório' }).optional(),
    whats: z.string({ message: '* campo obrigatório' }),
    avatar: z.string({ message: '* campo obrigatório' }).optional(),
    workName: z.string({ message: '* campo obrigatório' }),
    CNPJ: z.string().optional().nullable(),
    CPF: z.string().optional().nullable(),
    ramo: z.string().optional().nullable(),
    enquadramento: z.string().optional().nullable(),
    email: z.string({ message: '* campo obrigatório' }).email('E-mail invaálido'),
    userId: z.string({ message: '* campo obrigatório' })
  }),
  midia: z.object({
    id: z.number(),
    nome: z.string({ message: '* campo obrigatório' }),
    link: z.string({ message: '* campo obrigatório' }),
    type_midia: z.string({ message: '* campo obrigatório' }),
    created_at: z.string({ message: '* campo obrigatório' }),
    updated_at: z.string({ message: '* campo obrigatório' }),
    user_id: z.string({ message: '* campo obrigatório' }),
  }),

  indication: z.object({
    indicado_por: z.string({ message: '* campo obrigatório' }),
    nomeCliente: z.string({ message: '* campo obrigatório' }),
    contatoCliente: z.string({ message: '* campo obrigatório' }),
    descricao: z.string({ message: '* campo obrigatório' }),
  }),
  b2b: z.object({
    descricao: z.string({ message: '* campo obrigatório' }),
    nome: z.string({ message: '* campo obrigatório' }),
  }),
  donate: z.array(z.object({
    item: z.string({ message: '* campo obrigatório' }),
    ponto: z.number(),
  })),
  consumo: z.object({
    descricao: z.string({ message: '* campo obrigatório' }),
    nome: z.string({ message: '* campo obrigatório' }),
  }),
  invit: z.object({
    nomeConvidado: z.string({ message: '* campo obrigatório' }),
    nome: z.string({ message: '* campo obrigatório' }),
  }),
  session: z.object({
    apelido: z.string({ message: '* campo obrigatório' }),
    senha: z.string({ message: '* campo obrigatório' }),
  }),
  usersByHub: z.object({
    hub: z.string({ message: '* campo obrigatório' }),
    pageSize: z.number(),
    pageNumber: z.number(),
    nome: z.string({ message: '* campo obrigatório' }),
  })
}

