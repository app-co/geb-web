import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { cor } from '../../styles/color'

export const Container = styled.div`
  flex: 1;
  background-color: ${cor.bg.dark};
`

export const grid = styled.main`
  display: grid;
  grid-template-columns: 15vw 1fr;
`
export const sideMenu = styled.div`
  background-color: ${cor.dark[1]};
  min-height: 100vh;
  padding: 40px 17px 17px 17px;
  border-right: 1px solid #777777;
`

export const content = styled.div`
  padding: 30px;
  flex: 1;
`

export const navLink = styled(NavLink)`
  display: flex;
  gap: 10px;
  text-decoration: none;
  align-items: center;
  margin-top: 1rem;

  p {
    color: ${cor.bg.dark};

    &:hover {
      color: #4a4a4a;
    }
  }
`

export const link = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-radius: 10px;

  svg {
    width: 2rem;
    height: 2rem;
    color: ${cor.bg.dark};
  }

  .active {
    color: ${cor.bg.light};
    border-radius: 8px;
    background-color: ${cor.bg.dark};
    padding: 8px 0;

    p {
      color: ${cor.bg.light};
      font-weight: 600;
    }

    svg {
      color: ${cor.bg.light};
    }
  }
`
