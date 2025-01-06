import { useTheme } from "@/contexts/ThemeContext";
import { _height, _width } from "@/utils/sizes";
import { MaterialIcons } from "@expo/vector-icons";
import { Actionsheet, Box, HStack } from "native-base";
import { CheckCircle } from "phosphor-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Lista } from "../ferramentas/lista";
import { Input } from "./Input";
import { TextStyle } from "./topograph";

type T = {
  label: string;
  value: string;
}

interface I {
  options: T[]
  value: string | T[]
  onChange: (value: string) => void
  label: string
  placeholder?: string
  nexPage: () => void
  load: boolean
  isMultiple?: boolean
  error?: boolean
  searching?: (h: string) => void
  refetch?: () => void
}

export function InputSelect({ onChange, label, refetch, searching, error = false, isMultiple = false, load = false, nexPage, placeholder, options = [], value }: I) {
  const { theme: { colors } } = useTheme()

  const [search, setSearch] = React.useState('')
  const [hight, setHight] = React.useState(_height * 0.4)
  const [open, setOpen] = React.useState(false)

  const [selected, setSelected] = React.useState(placeholder)
  const [lista, setLista] = React.useState<T[]>(value)

  React.useEffect(() => {
    if (isMultiple) {
      onChange(lista)
    }
  }, [lista])

  const valueLabel = options.find(h => h.value === value)?.label ?? ''

  const removeSpecialChars = (str: string) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9 ]/g, '');
  };


  function onItemSelect(item: T) {
    if (isMultiple) {
      setLista(h => {
        const find = h.find(p => p.value === item.value)
        if (find) {
          return h.filter(p => p.value !== item.value);
        } else {
          return [...h, item];
        }
      });
      return
    }

    onChange(item.value)
    setOpen(false)
    setSelected(item.value)
  }


  function color() {
    if (lista.length > 0) {
      return colors.focus;
    }

    if (!!error) {
      return '#ff0000';
    }

    return '#46464b'

  }

  React.useEffect(() => {
    if (searching) {
      searching(search)
    }
  }, [search])


  const opt = search !== ''
    ? options.filter(h => removeSpecialChars(h.label).toLowerCase().includes(removeSpecialChars(search).toLowerCase()))
    : options

  return (
    <>
      {/* <Modal transparent visible={load} >
        <Loading />
      </Modal> */}

      {isMultiple ? (
        <Box>
          <TextStyle style={{ marginBottom: 5 }} >{label}</TextStyle>

          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={{
              borderWidth: 1,
              borderColor: color(),
              borderRadius: 10,
              backgroundColor: colors.backgroundSoft,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              overflow: 'hidden',
              paddingVertical: 10,
              paddingHorizontal: 10
            }}
          >
            <Box style={{ gap: 10 }} flexWrap={'wrap'} flexDirection={'row'} bg={colors.backgroundSoft}>
              {lista.slice(0, 7).map(h => (
                <>
                  <Box key={h.value} rounded={'lg'} px={2} bg={colors.background} p={1} >
                    <TextStyle>{h.label}</TextStyle>
                  </Box>

                </>

              ))}

              {
                lista.length >= 5 && (
                  <TextStyle style={{ marginTop: 5 }} >... mais {lista.slice(7).length}</TextStyle>
                )
              }
            </Box>

            <MaterialIcons color={colors.focus} size={25} name="arrow-drop-down-circle" />

          </TouchableOpacity>
        </Box>
      ) : (

        <TouchableOpacity onPress={() => setOpen(true)} >
          <Input icon={
            <MaterialIcons color={colors.focus} size={25} name="arrow-drop-down-circle" />
          } placeholderTextColor={colors.backgroundSoft} placeholder={placeholder} editable={false} label={label} value={valueLabel} />
        </TouchableOpacity >

      )
      }
      <Actionsheet onClose={() => setOpen(false)} w={'full'} isOpen={open} >
        <Box borderTopRadius={20} style={{ gap: 8 }} p={4} w={_width} h={hight} bgColor={colors.backgroundSoft} >

          <Input
            label="Pesquisar"
            onChangeText={setSearch}
            onBlur={(h) => setHight(_height * 0.4)}
            onFocus={() => setHight(_height * 0.6)}
            style={{ color: colors.background }}
          />

          <Lista
            data={opt}
            onReflesh={refetch!}
            nextPage={nexPage}
            refleshing={load}
            renderItem={h => {
              const select = isMultiple
                ? lista.findIndex(p => p.value === h.value) !== -1
                : value === h.value
              return (
                <>
                  {isMultiple ? (
                    <TouchableOpacity style={{ backgroundColor: select ? colors.background : 'transparent', borderRadius: 6 }}
                      onPress={() => onItemSelect(h)} >
                      <HStack p={2} alignItems={'center'} justifyContent={'space-between'} >
                        <TextStyle colorText={colors.text} >{h?.label}</TextStyle>
                        {select && (
                          <CheckCircle weight="fill" color={colors.focus} />
                        )}
                      </HStack>
                    </TouchableOpacity>
                  ) : (

                    <TouchableOpacity style={{ backgroundColor: select ? colors.backdrop : 'transparent' }}
                      onPress={() => onItemSelect(h)} >
                      <HStack space={4} alignItems={'center'} p={2} >
                        {select && (
                          <CheckCircle weight="fill" color={colors.focus} />
                        )}
                        <TextStyle colorText={colors.text} >{h?.label}</TextStyle>
                      </HStack>
                    </TouchableOpacity>
                  )}
                </>

              )
            }}
          />

          {/* <FlatList
            data={opt}
            onEndReached={nexPage}
            contentContainerStyle={{ gap: 5 }}
            renderItem={({ item: h }) => {
              const select = isMultiple
                ? lista.findIndex(p => p.value === h.value) !== -1
                : value === h.value
              return (
                <>
                  {isMultiple ? (
                    <TouchableOpacity style={{ backgroundColor: select ? colors.background : 'transparent', borderRadius: 6 }}
                      onPress={() => onItemSelect(h)} >
                      <HStack p={2} alignItems={'center'} justifyContent={'space-between'} >
                        <TextStyle colorText={colors.text} >{h?.label}</TextStyle>
                        {select && (
                          <CheckCircle weight="fill" color={colors.focus} />
                        )}
                      </HStack>
                    </TouchableOpacity>
                  ) : (

                    <TouchableOpacity style={{ backgroundColor: select ? colors.backdrop : 'transparent' }}
                      onPress={() => onItemSelect(h)} >
                      <HStack p={2} >
                        <TextStyle colorText={colors.text} >{h?.label}</TextStyle>
                        {select && (
                          <CheckCircle weight="fill" color={colors.focus} />
                        )}
                      </HStack>
                    </TouchableOpacity>
                  )}
                </>

              )
            }}
          /> */}
        </Box>
      </Actionsheet>
    </>
  )
}