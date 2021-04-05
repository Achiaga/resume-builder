import { Box, Text, Button, Input } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Portal } from '../usePortal'
import { EDIT } from './constants'
import { Properties } from './block-properties'
import {
  editBlockConfig,
  getBlockParentId,
  getIsMobileBuilder,
} from '../../features/builderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getBlockOffsets } from './block-positionn-helpers'
import { deleteProperty } from './block-properties'

const PropertiesModifiers = {
  dropdown: DropDownSelector,
  colorDropdown: ColorDropDownSelector,
  emojiDropdown: EmojiDropDownSelector,
  button: ButtonSelector,
  text: TextInput,
  redirect: TextInput,
}

function DropDownSelector({
  handleEdit,
  icon,
  isOpen,
  isBlockAtTop,
  isBlockAtLeft,
  handleOpenToolbar,
  property,
  value,
  options,
}) {
  const result = options.find((option) => option.value === value)?.title || ''

  const handleChange = (e) => {
    const { value } = e.currentTarget
    handleEdit(property, value)
  }

  const checkDisplayTop = () => {
    if (isBlockAtTop) return 'unset'
    return '-45px'
  }

  const checkDisplayBottom = () => {
    if (isBlockAtTop) return '-45px'
    return 'unset'
  }

  return (
    <Box
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      height="20px"
      borderLeft="1px solid gray"
      paddingX="0.3rem"
    >
      <Button
        id={property}
        size="sm"
        padding="3px"
        bg="transparent"
        onClick={handleOpenToolbar}
      >
        {icon}
        <Text as="span" pl={icon && `0.25rem`}>
          {result}
        </Text>
      </Button>
      <Box
        position="absolute"
        top={checkDisplayTop}
        bottom={checkDisplayBottom}
        display={'flex'}
        left={isBlockAtLeft ? '2px' : 'unset'}
        bg="white"
        rounded="5px"
        zIndex="999999"
        boxShadow="rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;"
      >
        {isOpen === property &&
          options?.map(({ value: optionValue, title }, index) => {
            return (
              <Button
                bg="transparent"
                onClick={handleChange}
                key={index}
                height="2rem"
                fontSize="14px"
                background={`${optionValue === value && '#bdd4f95e'}`}
                _hover={
                  optionValue === value
                    ? { bg: '#bdd4f98a' }
                    : { bg: '#F2F2F2' }
                }
                value={optionValue}
                paddingX="4px"
              >
                {title}
              </Button>
            )
          })}
      </Box>
    </Box>
  )
}

DropDownSelector.propTypes = {
  icon: PropTypes.any,
  isOpen: PropTypes.bool.isRequired,
  isBlockAtTop: PropTypes.bool.isRequired,
  isBlockAtLeft: PropTypes.bool.isRequired,
  handleOpenToolbar: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  property: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.any.isRequired,
    }).isRequired
  ).isRequired,
  placeholder: PropTypes.string.isRequired,
}

function ColorDropDownSelector({
  handleEdit,
  isOpen,
  isBlockAtTop,
  isBlockAtLeft,
  isBlockAtRight,
  handleOpenToolbar,
  property,
  value,
  options,
}) {
  const valueIcon = options.find((option) => option.value === value)?.icon || ''

  const handleChange = (e) => {
    const { value } = e.currentTarget
    handleEdit(property, value)
  }

  const checkDisplayTop = () => {
    if (isBlockAtTop) return 'unset'
    return '-103px'
  }

  const checkDisplayBottom = () => {
    if (isBlockAtTop) return '-294px'
    return 'unset'
  }

  return (
    <Box
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      height="20px"
      borderLeft="1px solid gray"
      paddingX="0.3rem"
    >
      <Button
        id={property}
        size="sm"
        padding="3px"
        bg="transparent"
        onClick={handleOpenToolbar}
      >
        {valueIcon}
      </Button>
      <Box
        position="absolute"
        top={checkDisplayTop}
        bottom={checkDisplayBottom}
        left={isBlockAtLeft ? '2px' : 'unset'}
        right={isBlockAtRight ? '0px' : 'unset'}
        bg="white"
        rounded="5px"
        zIndex="999999"
        boxShadow="rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;"
      >
        {isOpen === property &&
          options?.map(({ value: optionValue, title, icon }, index) => {
            return (
              <Button
                bg="transparent"
                onClick={handleChange}
                key={index}
                w="6rem"
                display="flex"
                justifyContent="space-between"
                height="2rem"
                fontSize="14px"
                background={`${optionValue === value && '#bdd4f95e'}`}
                _hover={
                  optionValue === value
                    ? { bg: '#bdd4f98a' }
                    : { bg: '#F2F2F2' }
                }
                value={optionValue}
                paddingX="4px"
              >
                {icon}
                <Box width="60%" display="flex" justifyContent="flex-start">
                  {title}
                </Box>
              </Button>
            )
          })}
      </Box>
    </Box>
  )
}

ColorDropDownSelector.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isBlockAtTop: PropTypes.bool.isRequired,
  isBlockAtLeft: PropTypes.bool.isRequired,
  isBlockAtRight: PropTypes.bool.isRequired,
  handleOpenToolbar: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  property: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.any.isRequired,
    }).isRequired
  ).isRequired,
  placeholder: PropTypes.string.isRequired,
}

function EmojiDropDownSelector({
  handleEdit,
  isOpen,
  isBlockAtTop,
  isBlockAtLeft,
  isBlockAtRight,
  handleOpenToolbar,
  property,
  icon,
  value,
  options,
}) {
  // const valueIcon = options.find((option) => option.value === value)?.icon || ''

  const handleChange = (e) => {
    const { value } = e.currentTarget
    handleEdit(property, value)
  }

  const checkDisplayTop = () => {
    if (isBlockAtTop) return 'unset'
    return '-103px'
  }

  const checkDisplayBottom = () => {
    if (isBlockAtTop) return '-294px'
    return 'unset'
  }

  return (
    <Box
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      height="20px"
      borderLeft="1px solid gray"
      paddingX="0.3rem"
    >
      <Button
        id={property}
        size="sm"
        padding="3px"
        bg="transparent"
        onClick={handleOpenToolbar}
      >
        {icon}
      </Button>
      <Box
        position="absolute"
        top={checkDisplayTop}
        bottom={checkDisplayBottom}
        left={isBlockAtLeft ? '2px' : 'unset'}
        right={isBlockAtRight ? '0px' : 'unset'}
        bg="white"
        rounded="5px"
        zIndex="999999"
        boxShadow="rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;"
      >
        {isOpen === property &&
          options?.map(({ value: optionValue, title, icon }, index) => {
            return (
              <Button
                bg="transparent"
                onClick={handleChange}
                key={index}
                w="6rem"
                display="flex"
                justifyContent="space-between"
                height="2rem"
                fontSize="14px"
                background={`${optionValue === value && '#bdd4f95e'}`}
                _hover={
                  optionValue === value
                    ? { bg: '#bdd4f98a' }
                    : { bg: '#F2F2F2' }
                }
                value={optionValue}
                paddingX="4px"
              >
                {icon}
                <Box width="60%" display="flex" justifyContent="flex-start">
                  {title}
                </Box>
              </Button>
            )
          })}
      </Box>
    </Box>
  )
}

EmojiDropDownSelector.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isBlockAtTop: PropTypes.bool.isRequired,
  isBlockAtLeft: PropTypes.bool.isRequired,
  isBlockAtRight: PropTypes.bool.isRequired,
  handleOpenToolbar: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  property: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.any.isRequired,
    }).isRequired
  ).isRequired,
  placeholder: PropTypes.string.isRequired,
}

function TextInput({
  handleEdit,
  handleCloseInput,
  isOpen,
  isBlockAtTop,
  isBlockAtLeft,
  isBlockAtRight,
  handleOpenToolbar,
  property,
  value,
  placeholder,
  inputPlaceholder,
}) {
  const handleChange = (e) => {
    e.stopPropagation()
    handleEdit(property, e.target.value)
  }
  return (
    <Box
      onDoubleClick={(e) => e.stopPropagation()}
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      height="20px"
      borderLeft="1px solid gray"
      paddingX="0.3rem"
    >
      <Button
        id={property}
        size="sm"
        padding="3px"
        bg="transparent"
        onClick={handleOpenToolbar}
      >
        {placeholder}
      </Button>
      {isOpen === property && (
        <Box
          position="absolute"
          top={isBlockAtTop ? 'unset' : '-60px'}
          bottom={isBlockAtTop ? '-60px' : 'unset'}
          left={isBlockAtLeft ? '0' : 'unset'}
          right={isBlockAtRight ? '-3rem' : 'unset'}
          bg="white"
          rounded="5px"
          zIndex="999999"
          padding="8px"
          boxShadow="rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;"
        >
          <Input
            placeholder={inputPlaceholder}
            onChange={handleChange}
            onKeyDown={handleCloseInput}
            value={value}
            rounded="3px"
            color="black"
            paddingX="6px"
            paddingY="3px"
            paddingLeft="0.4rem"
            boxShadow="rgb(15 15 15 / 10%) 0px 0px 0px 1px inset"
            background="rgba(242, 241, 238, 0.6)"
            w="15rem"
            height="1.9rem"
            fontSize="14px"
            border="transparent"
          />
        </Box>
      )}
    </Box>
  )
}
TextInput.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  property: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleCloseInput: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  isBlockAtTop: PropTypes.bool.isRequired,
  isBlockAtLeft: PropTypes.bool.isRequired,
  isBlockAtRight: PropTypes.bool.isRequired,
  handleOpenToolbar: PropTypes.func,
}

function ButtonSelector({ handleEdit, property, operationType, placeholder }) {
  const handleClick = () => {
    handleEdit(property, null, operationType)
  }
  return (
    <Box>
      <Button
        padding="0"
        onClick={handleClick}
        bg="transparent"
        borderRadius="5px"
        borderTopRightRadius="0px"
        borderBottomRightRadius="0px"
        _hover={{ bg: '#ff818180' }}
      >
        {placeholder}
      </Button>
    </Box>
  )
}
ButtonSelector.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  property: PropTypes.string.isRequired,
  operationType: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
}

export const Modifiers = ({
  isOpen,
  isBlockAtTop,
  isBlockAtLeft,
  isBlockAtRight,
  handleOpenToolbar,
  handleEdit,
  handleCloseInput,
  propertiesValues,
  properties,
}) => {
  const isMobileBuilder = useSelector(getIsMobileBuilder)
  if (isMobileBuilder) {
    const Modifier = PropertiesModifiers[deleteProperty.type]
    return (
      <Modifier
        isOpen={isOpen}
        isBlockAtTop={isBlockAtTop}
        isBlockAtLeft={isBlockAtLeft}
        isBlockAtRight={isBlockAtRight}
        handleOpenToolbar={handleOpenToolbar}
        handleEdit={handleEdit}
        handleCloseInput={handleCloseInput}
        {...deleteProperty}
      />
    )
  }

  return (
    properties?.map((propertyData, index) => {
      const type = propertyData.type
      const property = propertyData.property
      const Modifier = PropertiesModifiers[type]
      return (
        <Modifier
          isOpen={isOpen}
          isBlockAtTop={isBlockAtTop}
          isBlockAtLeft={isBlockAtLeft}
          isBlockAtRight={isBlockAtRight}
          handleOpenToolbar={handleOpenToolbar}
          handleEdit={handleEdit}
          handleCloseInput={handleCloseInput}
          {...propertyData}
          key={index}
          value={propertiesValues[property]}
        />
      )
    }) ?? null
  )
}

export const BlockModifiers = ({ data, blockKey, blockType }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const blockParentId = useSelector(getBlockParentId(blockKey))

  const handleOpenToolbar = (e) => {
    const { id } = e.currentTarget
    setIsOpen(id)
  }

  function handleCloseInput(e) {
    if (e.key === 'Enter') {
      setIsOpen(false)
    }
  }

  function handleEdit(id, value, operationType = EDIT) {
    if (id !== 'imageUrl' && id !== 'redirect') setIsOpen(false)
    const newData = { ...data }
    if (id === 'emoji') {
      newData.text = `${data.text} ${value}`
    } else {
      newData[id] = value
    }
    dispatch(editBlockConfig({ newData, blockId: blockKey, operationType }))
  }
  const dim = getBlockOffsets(blockKey, blockParentId)

  const isBlockAtRight = dim.left > window.innerWidth * 0.7
  const isBlockAtLeft = dim.left < window.innerWidth * 0.07

  const xOffsetToolbar = isBlockAtRight
    ? { right: window.innerWidth - (dim.left + dim.width) }
    : { left: dim.left }

  const isBlockAtTop = dim.top < 150
  const yOffsetToolbar = isBlockAtTop
    ? { top: dim.top + dim.height + 5 + 'px' }
    : { top: dim.top - 50 + 'px' }

  return (
    <Portal id="main-builder">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="left"
        paddingRight="3px"
        {...xOffsetToolbar}
        {...yOffsetToolbar}
        rounded="5px"
        boxShadow="rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;"
        pos="absolute"
        onClick={(e) => e.stopPropagation()}
        backgroundColor="white"
        color="black"
        zIndex="9999"
      >
        <Modifiers
          handleOpenToolbar={handleOpenToolbar}
          isOpen={isOpen}
          isBlockAtTop={isBlockAtTop}
          isBlockAtRight={isBlockAtRight}
          isBlockAtLeft={isBlockAtLeft}
          handleEdit={handleEdit}
          handleCloseInput={handleCloseInput}
          propertiesValues={data}
          properties={Properties[blockType]}
        />
      </Box>
    </Portal>
  )
}

BlockModifiers.propTypes = {
  data: PropTypes.any,
  blockKey: PropTypes.string.isRequired,
  blockType: PropTypes.string.isRequired,
}
