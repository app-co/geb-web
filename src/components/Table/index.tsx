/* eslint-disable prettier/prettier */
import { Form } from '@unform/web'
import React, { useState } from 'react'
import { IRelation } from '../../dtos'
import { cor } from '../../styles/color'
import { Input } from '../Input'
import * as S from './styles'
import { IUser } from '../../hooks/dto/interfaces'
import { format } from 'date-fns'
import { make } from '../../hooks'

type TGetUser = {
  id: string
  nome: string
  membro: string
  created: string
  presenca: string
  workname: string
  relations: IRelation[]
  situation: {
    apadrinhado: boolean
    firstLogin: boolean
    inativo: boolean
    logado: boolean
  }
}

interface I {
  userSelectd: (user: IUser) => void
}

const { querys } = make()

export function Table({ userSelectd }: I) {
  const [pageSize, setPageSize] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [search, setSearch] = React.useState<string>('')
  const [pageNumber, setPageNumber] = React.useState(0)
  const [users, setUsers] = React.useState<IUser[]>([])


  const { data, isLoading } = querys.useUserByHub({
    nome: search,
    hub: '0,1',
    pageNumber,
    pageSize
  })


  // Função para lidar com a mudança de página
  const totalItems = data?.totalRecords ?? 0
  const totalPages = Math.ceil(data?.totalRecordsPerPage ?? 0)


  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
  }

  const handleSelectUser = React.useCallback(async (user: IUser) => {
    userSelectd(user)
  }, [userSelectd])

  React.useEffect(() => {
    const us = data?.records ?? []
    if (us.length > 0) {
      setUsers(us)
    }
  }, [data])


  return (
    <S.Container>
      <S.TableContainer>
        <S.TableHeader>
          <Form onSubmit={() => { }} >

            <Input
              onChange={(h) => setSearch(h.currentTarget.value)}
              placeholder="Pesquisar por nome"
              name="search"
            />
          </Form>
        </S.TableHeader>
        <S.TableBody>
          <S.TableTop>
            <S.TableCell>
              <h4>Nome</h4>
            </S.TableCell>

            <S.TableCell>
              <h4>Apelido</h4>
            </S.TableCell>

            <S.TableCell>
              <h4>Empresa</h4>
            </S.TableCell>

            {/* <S.TableCell>
              <h4>Presença</h4>
            </S.TableCell> */}

            <S.TableCell>
              <h4>Dt. cadastro</h4>
            </S.TableCell>
          </S.TableTop>

          {users.map((h) => (
            <S.TableRow onClick={() => handleSelectUser(h)} style={{ color: cor.bg.light }} key={h?.id}>
              <S.TableCell>{h?.nome}</S.TableCell>
              <S.TableCell>{h?.apelido}</S.TableCell>
              <S.TableCell>{h?.profile?.workName}</S.TableCell>
              {/* <S.TableCell>{h?.presenca}</S.TableCell> */}
              <S.TableCell>
                {format(new Date(h.created_at), 'dd/MM/yyyy')}
              </S.TableCell>
            </S.TableRow>
          ))}
        </S.TableBody>

        <S.PaginationContainer>
          <S.PageButton
            onClick={() => setPageNumber(pageNumber - pageSize)}
            disabled={pageNumber === 0}
          >
            Anterior
          </S.PageButton>
          {/* Renderizar botões de páginação aqui */}
          <S.PageButton
            onClick={() => setPageNumber(pageNumber + pageSize)}
            disabled={currentPage === totalPages}
          >
            Próxima
          </S.PageButton>
          <span>Itens por página:</span>
          <select
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            value={pageSize}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
        </S.PaginationContainer>
      </S.TableContainer>
    </S.Container>
  )
}
