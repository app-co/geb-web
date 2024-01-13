/* eslint-disable prettier/prettier */
import { Form } from '@unform/web'
import { format } from 'date-fns'
import React, { useState } from 'react'
import { IUserDtos } from '../../dtos'
import { cor } from '../../styles/color'
import { Input } from '../Input'
import * as S from './styles'

interface I {
  userSelectd: (user: IUserDtos) => void
  getAllUsers: IUserDtos[]
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

  const handleSelectUser = React.useCallback(async (user: IUserDtos) => {
    userSelectd(user)
  }, [userSelectd])


  return (
    <S.Container>
      <S.TableContainer>
        <S.TableHeader>
          <Form>
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
              <h3>Nome</h3>
            </S.TableCell>

            <S.TableCell>
              <h3>Membro</h3>
            </S.TableCell>

            <S.TableCell>
              <h3>E-mail</h3>
            </S.TableCell>

            <S.TableCell>
              <h3>Dt. cadastro</h3>
            </S.TableCell>
          </S.TableTop>

          {userList.map((h) => (
            <S.TableRow onClick={() => handleSelectUser(h)} style={{ color: cor.bg.light }} key={h?.id}>
              <S.TableCell>{h?.nome}</S.TableCell>
              <S.TableCell>{h?.membro}</S.TableCell>
              <S.TableCell>{h?.profile?.email}</S.TableCell>
              <S.TableCell>
                {format(new Date(h?.created_at), 'dd/MM/yy')}
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
