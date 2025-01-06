import { CaretDown } from '@phosphor-icons/react'
import React from 'react'
import * as S from './styles'
import { ToValues } from 'react-spring'

interface IValue {
  label: string
  value: any
}

interface I {
  value: IValue[]
  onChange: (item: IValue[]) => void
  options: IValue[]
}

export function InputSelect({ value = [], onChange, options = [] }: I) {

  const [showOption, setShowOpton] = React.useState<boolean>(false)
  const [selected, setSelected] = React.useState<IValue[]>(value)


  function onItemSelect(item: IValue) {
    setSelected(h => {
      const find = h.find(p => p.value === item.value)
      if (find) {
        return h.filter(p => p.value !== item.value);
      } else {
        return [...h, item];
      }
    });
  }

  React.useEffect(() => {
    onChange(selected)
  }, [selected])

  return (
    <div style={{ marginBottom: 50 }} >



      <S.Container show={showOption} >
        <S.curretOption onClick={() => setShowOpton(!showOption)} >
          <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', flex: 1, gap: 10 }} >
            {selected.map(h => (
              <p key={h.value} >{h.label}; </p>
            ))}
          </div>
          <CaretDown size={30} />
        </S.curretOption>

        <S.line show={showOption} className='line' />


        {options.map(h => (
          <S.option
            key={h.value}
            onClick={() => {
              onItemSelect(h)
            }}
            show={showOption} >
            <h4 key={h.value} >{h.label}</h4>
          </S.option>
        ))}
      </S.Container>

    </div>
  )
}