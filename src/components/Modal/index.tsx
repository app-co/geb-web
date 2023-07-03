import { ReactNode } from 'react'
import * as S from './styles'
import { Button } from '../Button'
interface I {
  title: string
  children: ReactNode
  isOpen: boolean
  load?: boolean
  cancel: () => void
  submit: () => void
}
export function Modal({
  load = false,
  isOpen = false,
  cancel,
  submit,
  title,
  children,
}: I) {
  return (
    <S.Container isOpen={isOpen} ariaHideApp={false}>
      <div className="box">
        <h3>{title}</h3>

        <div className="content">{children}</div>

        <div className="buttons">
          <Button type="button" onClick={cancel} bg="delet" title="CANCELAR" />
          <Button
            load={load}
            type="submit"
            onClick={submit}
            bg="submit"
            title="SALVAR"
          />
        </div>
      </div>
    </S.Container>
  )
}
