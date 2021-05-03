import {
  Box,
  Text,
  Button,
  Input,
  Tooltip,
  Grid,
  useDisclosure,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Portal } from '../usePortal'
import { EDIT } from './constants'
import { Properties } from './block-properties'
import { editBlockConfig, getBlockParentId } from '../../features/builderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getBlockOffsets } from './block-positionn-helpers'
import ImageSelectorModal from './block-helpers/ImageSelectorModal'

export const CustomToolTip = ({ label, children }) => {
  return (
    <Tooltip
      paddingRight="5px"
      hasArrow
      placement="top"
      label={label}
      bg="#2B2A35"
      color="#F6F6F9"
      borderRadius="10px"
      closeOnClick
      gutter={12}
      paddingX="10px"
      paddingY="5px"
      fontSize="xs"
      sx={{
        '.chakra-tooltip__arrow-wrapper': {
          zIndex: '1 !important',
        },
      }}
    >
      {children}
    </Tooltip>
  )
}

const PropertiesModifiers = {
  dropdown: DropDownSelector,
  colorDropdown: ColorDropDownSelector,
  emojiDropdown: EmojiDropDownSelector,
  button: ButtonSelector,
  duplicate: DuplicateButton,
  text: TextInput,
  redirect: TextInput,
  image: ImageSelector,
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
  tooltip,
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
      h="100%"
    >
      <CustomToolTip label={tooltip}>
        <Box
          as="button"
          d="flex"
          alignItems="center"
          h="100%"
          id={property}
          bg="transparent"
          onClick={handleOpenToolbar}
          borderRadius="0"
          px="0.75rem"
          fontSize="sm"
          color="gray.500"
          fontWeight="500"
          _hover={{
            backgroundColor: 'primary.100',
          }}
        >
          {icon}
          <Text as="span" pl={icon && `0.45rem`}>
            {result}
          </Text>
        </Box>
      </CustomToolTip>
      <Box
        position="absolute"
        top={checkDisplayTop}
        bottom={checkDisplayBottom}
        display={'flex'}
        left={isBlockAtLeft ? '2px' : 'unset'}
        bg="white"
        rounded="5px"
        zIndex="999"
        boxShadow="rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;"
        overflow="hidden"
      >
        {isOpen === property &&
          options?.map(({ value: optionValue, title }, index) => {
            return (
              <Box
                as="button"
                bg="transparent"
                onClick={handleChange}
                key={index}
                px="0.5rem"
                py="0.25rem"
                fontSize="14px"
                fontWeight="500"
                background={`${optionValue === value && '#bdd4f95e'}`}
                _hover={
                  optionValue === value
                    ? { bg: '#bdd4f98a' }
                    : { bg: 'primary.100' }
                }
                value={optionValue}
              >
                {title}
              </Box>
            )
          })}
      </Box>
    </Box>
  )
}

DropDownSelector.propTypes = {
  icon: PropTypes.any,
  isOpen: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
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
  tooltip,
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
      h="100%"
    >
      <CustomToolTip label={tooltip}>
        <Box
          as="button"
          id={property}
          padding="3px"
          bg="transparent"
          onClick={handleOpenToolbar}
          d="flex"
          alignItems="center"
          h="100%"
          borderRadius="0"
          px="0.75rem"
          fontSize="sm"
          color="gray.500"
          fontWeight="500"
          _hover={{
            backgroundColor: 'primary.100',
          }}
        >
          {valueIcon}
        </Box>
      </CustomToolTip>
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
                paddingX="2px"
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
  isOpen: PropTypes.string.isRequired,
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
  tooltip,
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
      <CustomToolTip label={tooltip}>
        <Button
          id={property}
          size="sm"
          padding="3px"
          bg="transparent"
          onClick={handleOpenToolbar}
        >
          {icon}
        </Button>
      </CustomToolTip>
      <Grid
        templateColumns="repeat(5, 1fr)"
        gap={1}
        position="absolute"
        top={checkDisplayTop}
        bottom={checkDisplayBottom}
        left={isBlockAtLeft ? '2px' : 'unset'}
        right={isBlockAtRight ? '0px' : 'unset'}
        bg="white"
        rounded="5px"
        maxHeight="5.5rem"
        overflow="scroll"
        zIndex="999999"
        boxShadow="rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;"
      >
        {isOpen === property &&
          options?.map(({ value: optionValue }, index) => {
            return (
              <Button
                bg="transparent"
                onClick={handleChange}
                key={index}
                w="1rem"
                display="flex"
                justifyContent="center"
                height="2rem"
                fontSize="18px"
                background={`${optionValue === value && '#bdd4f95e'}`}
                _hover={
                  optionValue === value
                    ? { bg: '#bdd4f98a' }
                    : { bg: '#F2F2F2' }
                }
                value={optionValue}
                paddingX="4px"
              >
                <Box width="60%" display="flex" justifyContent="flex-start">
                  {optionValue}
                </Box>
              </Button>
            )
          })}
      </Grid>
    </Box>
  )
}

EmojiDropDownSelector.propTypes = {
  isOpen: PropTypes.string.isRequired,
  isBlockAtTop: PropTypes.bool.isRequired,
  isBlockAtLeft: PropTypes.bool.isRequired,
  isBlockAtRight: PropTypes.bool.isRequired,
  handleOpenToolbar: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  property: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
    }).isRequired
  ).isRequired,
}

export function TextInput({
  handleEdit,
  handleCloseInput,
  isOpen,
  isBlockAtTop,
  isBlockAtLeft,
  isBlockAtRight,
  handleOpenToolbar,
  property,
  value,
  icon,
  tooltip,
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
      h="100%"
    >
      <CustomToolTip label={tooltip}>
        <Box
          as="button"
          d="flex"
          alignItems="center"
          w="full"
          h="100%"
          id={property}
          bg="transparent"
          display="flex"
          onClick={handleOpenToolbar}
          borderRadius="0"
          px="0.75rem"
          fontSize="sm"
          color="gray.500"
          fontWeight="500"
          _hover={{
            backgroundColor: 'primary.100',
          }}
        >
          {icon && icon}
          {/* <Text as="span" pl={icon && `0.45rem`}>
            {placeholder}
          </Text> */}
        </Box>
      </CustomToolTip>
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
  value: PropTypes.string,
  handleCloseInput: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string,
  isOpen: PropTypes.string.isRequired,
  isBlockAtTop: PropTypes.bool.isRequired,
  isBlockAtLeft: PropTypes.bool.isRequired,
  isBlockAtRight: PropTypes.bool.isRequired,
  handleOpenToolbar: PropTypes.func,
}

export function ButtonSelector({
  handleEdit,
  property,
  operationType,
  placeholder,
  tooltip,
}) {
  const handleClick = () => {
    handleEdit(property, null, operationType)
  }
  return (
    <Box
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      h="100%"
    >
      <CustomToolTip label={tooltip}>
        <Box
          as="button"
          onClick={handleClick}
          d="flex"
          alignItems="center"
          h="100%"
          id={property}
          bg="transparent"
          borderRadius="0"
          px="1rem"
          fontSize="sm"
          color="gray.500"
          fontWeight="500"
          borderTopLeftRadius="17px"
          borderBottomLeftRadius="17px"
          _hover={{
            backgroundColor: 'primary.100',
          }}
        >
          {placeholder}
        </Box>
      </CustomToolTip>
    </Box>
  )
}
ButtonSelector.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  property: PropTypes.string.isRequired,
  operationType: PropTypes.string.isRequired,
  placeholder: PropTypes.object.isRequired,
}
export function ImageSelector({ handleEdit, property, icon, tooltip }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleChange = (imageUrl) => {
    handleEdit(property, imageUrl)
  }
  return (
    <Box
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      h="100%"
    >
      <CustomToolTip label={tooltip}>
        <Box
          as="button"
          d="flex"
          alignItems="center"
          w="full"
          h="100%"
          id={property}
          bg="transparent"
          display="flex"
          borderRadius="0"
          px="0.75rem"
          fontSize="sm"
          color="gray.500"
          fontWeight="500"
          _hover={{
            backgroundColor: 'primary.100',
          }}
          onClick={onOpen}
        >
          {icon}
        </Box>
      </CustomToolTip>
      <Portal id="modal-images">
        <ImageSelectorModal
          isOpen={isOpen}
          onClose={onClose}
          handleSelectImage={handleChange}
        />
      </Portal>
    </Box>
  )
}
ImageSelector.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  property: PropTypes.string.isRequired,
  operationType: PropTypes.string.isRequired,
  placeholder: PropTypes.object.isRequired,
}

export function DuplicateButton({
  handleEdit,
  property,
  operationType,
  placeholder,
  tooltip,
}) {
  const handleClick = () => {
    handleEdit(property, null, operationType)
  }
  return (
    <Box
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      h="100%"
    >
      <CustomToolTip label={tooltip}>
        <Button
          onClick={handleClick}
          as="button"
          d="flex"
          alignItems="center"
          h="100%"
          id={property}
          bg="transparent"
          borderRadius="0"
          px="1rem"
          fontSize="sm"
          color="gray.500"
          fontWeight="500"
          borderTopRightRadius="17px"
          borderBottomRightRadius="17px"
          _hover={{
            backgroundColor: 'primary.100',
          }}
        >
          {placeholder}
        </Button>
      </CustomToolTip>
    </Box>
  )
}
DuplicateButton.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  property: PropTypes.string.isRequired,
  operationType: PropTypes.string.isRequired,
  placeholder: PropTypes.object.isRequired,
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

export function getXOffsetToolbar(dim) {
  const isBlockAtRight = dim.left > window.innerWidth * 0.7

  return isBlockAtRight
    ? { right: window.innerWidth - (dim.left + dim.width) }
    : { left: dim.left }
}
export function getYOffsetToolbar(dim) {
  const isBlockAtTop = dim.top < 150
  return isBlockAtTop
    ? { top: dim.top + dim.height + 5 + 'px' }
    : { top: dim.top - 50 + 'px' }
}

export const BlockModifiers = ({ data, blockKey, blockType }) => {
  const [isOpen, setIsOpen] = useState('')
  const dispatch = useDispatch()
  const blockParentId = useSelector(getBlockParentId(blockKey))

  const handleOpenToolbar = (e) => {
    const { id } = e.currentTarget
    setIsOpen(id)
  }

  function handleCloseInput(e) {
    if (e.key === 'Enter') {
      setIsOpen('')
    }
  }

  function handleEdit(id, value, operationType = EDIT) {
    if (id !== 'imageUrl' && id !== 'redirect') setIsOpen('')
    const newData = { ...data }
    if (id === 'emoji') {
      newData.text = `${data.text} ${value}`
    } else {
      newData[id] = value
    }
    dispatch(editBlockConfig({ newData, blockId: blockKey, operationType }))
  }
  const dim = getBlockOffsets(blockKey, blockParentId)

  const isBlockAtLeft = dim.left < window.innerWidth * 0.07
  const isBlockAtTop = dim.top < 150
  const isBlockAtRight = dim.left > window.innerWidth * 0.7

  const xOffsetToolbar = getXOffsetToolbar(dim)
  const yOffsetToolbar = getYOffsetToolbar(dim)

  return (
    <Portal id="main-builder">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="left"
        {...xOffsetToolbar}
        {...yOffsetToolbar}
        boxShadow="rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;"
        pos="absolute"
        onClick={(e) => e.stopPropagation()}
        backgroundColor="white"
        color="gray.500"
        zIndex="9999"
        borderRadius="20px"
        fontSize="xs"
        h="35px"
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
