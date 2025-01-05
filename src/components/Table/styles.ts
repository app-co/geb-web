import styled from 'styled-components'
import { cor } from '../../styles/color'

export const Container = styled.div`
  background-color: rgba(74, 74, 74, 1);
  border-radius: 10px;
  padding: 20px;
`

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
`

export const TableBody = styled.div`
  display: flex;
  padding: 5px 0;
  gap: 0.2rem;
  flex-direction: column;
  width: 100%;

`

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 0.5fr;
  column-gap: 30px;
  
  padding: 5px 10px;
  align-items: center;


  :hover {
    background-color: ${cor.bg.dark};
    cursor: pointer;
  }
`

export const TableTop = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 0.5fr;
  column-gap: 10px;
`

export const TableCell = styled.div`
  flex: 1;
  padding: 5px 0;

`

export const SearchInput = styled.input`
  /* Adicione estilos conforme necessário */
`

export const PaginationContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
`

export const PageButton = styled.button`
  background-color: ${cor.focus.a};
  padding: 5px 10px;
`
