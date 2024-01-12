import { ChartLineUp } from '@phosphor-icons/react'
import React, { RefObject, useRef } from 'react'
import { Menu } from '../Menu'
import * as S from './styles'

type T = {
  children: React.ReactNode
}

const menu = [
  {
    path: '/home',
    name: 'PAINEL',
    icon: <ChartLineUp weight="duotone" />,
  },
  {
    path: '/membros',
    name: 'Usuários',
    icon: <ChartLineUp weight="duotone" />,
  },
  {
    path: '/cafe',
    name: 'CAfe',
    icon: <ChartLineUp weight="duotone" />,
  },
  {
    path: '/bana',
    name: 'Banana',
    icon: <ChartLineUp weight="duotone" />,
  },
]

export function Layout({ children }: T) {
  const linkRef: RefObject<HTMLAnchorElement> = useRef(null)

  const handleClick = React.useCallback(async () => {
    linkRef?.current?.focus()
  }, [])

  return (
    <S.Container>
      <Menu />
      <S.grid>
        <S.sideMenu>
          {menu.map((h) => (
            <S.link key={h.name}>
              <S.navLink
                className={({ isActive, isPending }) =>
                  isPending ? 'pending' : isActive ? 'active' : ''
                }
                ref={linkRef}
                to={h.path}
                onClick={handleClick}
              >
                {h.icon}
                <p>{h.name}</p>
              </S.navLink>
            </S.link>
          ))}
        </S.sideMenu>
        <S.content>{children}</S.content>
      </S.grid>
    </S.Container>
  )
}
