import { useField } from '@unform/core'
import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { cep, currency, expire, number } from '../../utils/mask'
import * as S from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  mask?: 'cep' | 'price' | 'text' | 'number' | 'expire'
  sizeW?: string
  sizeH?: string
}
export function Input({
  name,
  label,
  sizeW = '100%',
  sizeH = '100%',
  mask = 'text',
  ...rest
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const { fieldName, defaultValue, error, registerField } = useField(name)

  const handleInput = useCallback(() => {
    setIsFocused(false)

    setIsFilled(!!inputRef.current?.value)
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  const handleChange = useCallback(
    async (e: React.FormEvent<HTMLInputElement>) => {
      if (mask === 'cep') {
        cep(e)
      }

      if (mask === 'price') {
        currency(e)
      }

      if (mask === 'number') {
        number(e)
      }

      if (mask === 'text') {
        e.currentTarget.value.toLocaleUpperCase()
      }

      if (mask === 'expire') {
        expire(e)
      }
    },
    [mask],
  )

  return (
    <S.Box isFocus={isFocused} isFilled={isFilled}>
      <p className="label">{label}</p>
      <S.Container
        sizeW={sizeW}
        sizeH={sizeH}
        isErro={!!error}
        isFilled={isFilled}
        isFocus={isFocused}
      >
        <input
          defaultValue={defaultValue}
          onFocus={() => setIsFocused(true)}
          onKeyUp={handleChange}
          onBlur={handleInput}
          ref={inputRef}
          {...rest}
        />
      </S.Container>
    </S.Box>
  )
}
