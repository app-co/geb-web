/* eslint-disable prettier/prettier */
import { Form } from '@unform/web'
import React, { useState } from 'react'
import { IRelation } from '../../dtos'
import { cor } from '../../styles/color'
import { Input } from '../Input'
import * as S from './styles'

type TGetUser = {
  id: string
  nome: string
  membro: string
  created: string
  presenca: string
  workname: string
  relations: IRelation[]
}

interface I {
  userSelectd: (user: TGetUser) => void
  getAllUsers: TGetUser[]
}

export function Table({ userSelectd, getAllUsers }: I) {
  const [pageSize, setPageSize] = useState<number>(10) // Defina um valor padrão conforme necessário
  const [currentPage, setCurrentPage] = useState<number>(1) // Defina um valor padrão conforme necessário
  const [search, setSearch] = React.useState<string>('')

  const users = getAllUsers ?? []
  // Função para lidar com a mudança de página
  const totalItems = users.length
  const totalPages = Math.ceil(totalItems / pageSize)

  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize

  const currentItems = users.slice(startIndex, endIndex)

  const userList =
    search !== ''
      ? users.filter((h) => {
        const name = h?.nome.toUpperCase()
        const searchUpcase = search.toLocaleUpperCase()

        if (name.includes(searchUpcase)) {
          return h
        }
        return null
      })
      : currentItems

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  const handleSelectUser = React.useCallback(async (user: TGetUser) => {
    userSelectd(user)
  }, [userSelectd])


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
              <h4>Membro</h4>
            </S.TableCell>

            <S.TableCell>
              <h4>Empresa</h4>
            </S.TableCell>

            <S.TableCell>
              <h4>Presença</h4>
            </S.TableCell>

            <S.TableCell>
              <h4>Dt. cadastro</h4>
            </S.TableCell>
          </S.TableTop>

          {userList.map((h) => (
            <S.TableRow onClick={() => handleSelectUser(h)} style={{ color: cor.bg.light }} key={h?.id}>
              <S.TableCell>{h?.nome}</S.TableCell>
              <S.TableCell>{h?.workname}</S.TableCell>
              <S.TableCell>{h?.membro}</S.TableCell>
              <S.TableCell>{h?.presenca}</S.TableCell>
              <S.TableCell>
                {h.created}
              </S.TableCell>
            </S.TableRow>
          ))}
        </S.TableBody>

        <S.PaginationContainer>
          <S.PageButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </S.PageButton>
          {/* Renderizar botões de páginação aqui */}
          <S.PageButton
            onClick={() => handlePageChange(currentPage + 1)}
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
