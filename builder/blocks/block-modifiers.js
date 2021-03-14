import { Box, Button, Input, Select } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { ChromePicker } from 'react-color'
import { Portal } from '../usePortal'

import { MdDeleteForever } from 'react-icons/md'
import { BiFontSize } from 'react-icons/bi'
import { FiAlignCenter, FiAlignLeft, FiAlignRight } from 'react-icons/fi'
import {
	AiOutlineVerticalAlignBottom,
	AiOutlineVerticalAlignMiddle,
	AiOutlineVerticalAlignTop
} from 'react-icons/ai'

import { DELETE, EDIT } from './constants'

// Text **********************************************************
// ***************************************************************
// ***************************************************************
// ***************************************************************
// ***************************************************************

const fontSize = {
	type: 'dropdown',
	icon: <BiFontSize size='1.5rem' />,
	property: 'fontSize',
	options: [
		{ value: '2rem', title: 'xxl' },
		{ value: '1.75rem', title: 'xl' },
		{ value: '1.5rem', title: 'lg' },
		{ value: '1.25rem', title: 'md' },
		{ value: '1rem', title: 'sm' },
		{ value: '0.75rem', title: 'xs' }
	]
}
const textAlign = {
	type: 'dropdown',
	property: 'textAlign',
	options: [
		{ value: 'center', title: 'center' },
		{ value: 'left', title: 'left' },
		{ value: 'right', title: 'right' }
	]
}
const alignItems = {
	type: 'dropdown',
	placeholder: 'Vertical Align',
	property: 'alignItems',
	options: [
		{ value: 'start', title: 'top' },
		{ value: 'center', title: 'center' },
		{ value: 'end', title: 'bottom' }
	]
}
const fontWeight = {
	type: 'dropdown',
	placeholder: 'Font Bold',
	property: 'fontWeight',
	options: [
		{ value: '300', title: 'thin' },
		{ value: '400', title: 'normal' },
		{ value: '500', title: 'semibold' },
		{ value: '700', title: 'bold' },
		{ value: '900', title: 'super bold' }
	]
}
const Color = {
	type: 'dropdown',
	placeholder: 'Color',
	property: 'color',
	options: [
		{ value: 'yellow', title: 'yellow' },
		{ value: 'black', title: 'black' },
		{ value: 'red', title: 'red' },
		{ value: 'brown', title: 'brown' },
		{ value: 'blue', title: 'blue' }
	]
}

// Block *********************************************************
// ***************************************************************
// ***************************************************************
// ***************************************************************
// ***************************************************************

const borderRadius = {
	type: 'dropdown',
	placeholder: 'Border Radius',
	property: 'borderRadius',
	options: [
		{ value: '10px', title: 'sm' },
		{ value: '20px', title: 'md' },
		{ value: '100px', title: 'lg' },
		{ value: '100%', title: 'circle' }
	]
}
const boxShadow = {
	type: 'dropdown',
	placeholder: 'Shadow',
	property: 'boxShadow',
	options: [
		{
			value:
				'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;',
			title: 'sm'
		},
		{
			value:
				'0 13px 27px -5px rgba(50,50,93,0.25),0 8px 16px -8px rgba(0,0,0,0.3)',
			title: 'md'
		},
		{
			value: 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;',
			title: 'lg'
		},
		{
			value:
				'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;',
			title: 'in'
		}
	]
}

// Common ********************************************************
// ***************************************************************
// ***************************************************************
// ***************************************************************
// ***************************************************************

const backgroundColor = {
	type: 'color',
	placeholder: 'Background color',
	property: 'backgroundColor'
}

const deleteBlock = {
	type: 'button',
	placeholder: <MdDeleteForever color='red' size='1.4rem' />,
	property: '',
	operationType: DELETE
}
const imageInput = {
	type: 'text',
	placeholder: 'Enter image url',
	property: 'imageUrl'
}
const redirectInput = {
	type: 'text',
	placeholder: 'Redirect on click',
	property: 'redirect'
}

const Properties = {
	text: [
		deleteBlock,
		fontSize,
		textAlign,
		alignItems,
		fontWeight,
		borderRadius,
		boxShadow,
		Color
		// backgroundColor,
	],
	image: [deleteBlock, boxShadow, borderRadius, imageInput, redirectInput],
	inception: [deleteBlock, boxShadow, borderRadius, backgroundColor]
}

const PropertiesModifiers = {
	dropdown: DropDownSelector,
	color: ColorSelector,
	button: ButtonSelector,
	text: TextInput,
	redirect: TextInput
}

function DropDownSelector({ handleEdit, property, value, options, icon }) {
	const handleChange = (e) => {
		const { value } = e.target
		handleEdit(property, value)
	}
	return (
		<Box
			display='flex'
			alignItems='center'
			justifyContent='center'
			paddingX='0.5rem'>
			{icon}
			<Select
				size='sm'
				cursor='pointer'
				display='flex'
				justifyContent='center'
				variant='flushed'
				border='none'
				iconColor='blue'
				icon='none'
				value={value}
				sx={{ padding: '0', textAlign: 'center' }}
				onChange={handleChange}>
				{options?.map(({ value, title }, index) => {
					return (
						<option key={index} value={value}>
							{title}
						</option>
					)
				})}
			</Select>
		</Box>
	)
}

DropDownSelector.propTypes = {
	handleEdit: PropTypes.func.isRequired,
	property: PropTypes.string.isRequired,
	value: PropTypes.string,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired
		}).isRequired
	).isRequired,
	placeholder: PropTypes.string.isRequired
}

function RGBAToHexA({ r, g, b, a }) {
	r = r.toString(16)
	g = g.toString(16)
	b = b.toString(16)
	a = Math.round(a * 255).toString(16)

	if (r.length == 1) r = '0' + r
	if (g.length == 1) g = '0' + g
	if (b.length == 1) b = '0' + b
	if (a.length == 1) a = '0' + a

	return '#' + r + g + b + a
}

function ColorSelector({ handleEdit, property, value, placeholder }) {
	const [isOpen, setIsOpen] = useState(false)
	const handleChange = ({ rgb }) => {
		handleEdit(property, RGBAToHexA(rgb))
	}
	return (
		<Box>
			<label onClick={() => setIsOpen(true)}>{placeholder}</label>
			{isOpen && (
				<Box pos='absolute' zIndex='9999'>
					<button onClick={() => setIsOpen(false)}>Close</button>
					<ChromePicker color={value} onChange={handleChange} />
				</Box>
			)}
		</Box>
	)
}
ColorSelector.propTypes = {
	handleEdit: PropTypes.func,
	property: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string
}
function TextInput({ handleEdit, property, value, placeholder }) {
	const handleChange = (e) => {
		handleEdit(property, e.target.value)
	}
	return (
		<Box onDoubleClick={(e) => e.stopPropagation()}>
			<Input
				placeholder={placeholder}
				onChange={handleChange}
				value={value}
				color='white'
			/>
		</Box>
	)
}
TextInput.propTypes = {
	handleEdit: PropTypes.func.isRequired,
	property: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired
}

function ButtonSelector({ handleEdit, property, operationType, placeholder }) {
	const handleClick = () => {
		handleEdit(property, null, operationType)
	}
	return (
		<Box>
			<Button padding='0' onClick={handleClick} bg=''>
				{placeholder}
			</Button>
		</Box>
	)
}
ButtonSelector.propTypes = {
	handleEdit: PropTypes.func.isRequired,
	property: PropTypes.string.isRequired,
	operationType: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired
}

export const Modifiers = ({ handleEdit, propertiesValues, properties }) => {
	return (
		properties?.map((propertyData, index) => {
			const type = propertyData.type
			const property = propertyData.property
			const Modifier = PropertiesModifiers[type]
			return (
				<Modifier
					handleEdit={handleEdit}
					{...propertyData}
					key={index}
					value={propertiesValues[property]}
				/>
			)
		}) ?? null
	)
}

function getOffsetTop(elem) {
	var offsetTop = 0
	var offsetLeft = 0
	do {
		if (!isNaN(elem.offsetTop)) {
			offsetTop += elem.offsetTop
			offsetLeft += elem.offsetLeft
		}
		// eslint-disable-next-line no-cond-assign
	} while ((elem = elem.offsetParent))
	return { left: +offsetLeft, top: +offsetTop }
}

function getTranslateValues(element) {
	if (!element?.offsetParent)
		return {
			left: 0,
			top: 0
		}
	const style = window.getComputedStyle(element?.offsetParent)
	const matrix =
		style['transform'] || style.webkitTransform || style.mozTransform
	const matrixValues = matrix.match(/matrix.*\((.+)\)/)?.[1].split(', ') ?? null
	if (!matrixValues)
		return {
			left: 0,
			top: 0
		}
	return {
		left: +matrixValues[4],
		top: +matrixValues[5]
	}
}

function getOffsets(blockKey) {
	const mainParentStyles = document.getElementById(blockKey).offsetParent
		.offsetParent.offsetParent
	if (blockKey.includes('child-inception')) {
		const v1 = getOffsetTop(mainParentStyles)
		const v2 = getTranslateValues(document.getElementById(blockKey))
		return { top: v1.top + v2.top, left: v1.left + v2.left }
	}
	if (blockKey.includes('inception')) {
		return getOffsetTop(document.getElementById(blockKey))
	}
	return getTranslateValues(document.getElementById(blockKey))
}

export const BlockModifiers = ({ data, blockKey, blockType }) => {
	const { editBlock = () => {} } = data

	function handleEdit(id, value, operationType = EDIT) {
		editBlock({ ...data, [id]: value }, blockKey, operationType)
	}
	const dim = getOffsets(blockKey)
	return (
		<Portal id='main-builder'>
			<Box
				display='flex'
				alignItems='center'
				justifyContent='left'
				paddingRight='10px'
				left={dim.left - 150}
				top={dim.top - 50}
				rounded='5px'
				boxShadow='rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;'
				pos='absolute'
				onClick={(e) => e.stopPropagation()}
				backgroundColor='white'
				color='black'>
				<Modifiers
					handleEdit={handleEdit}
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
	blockType: PropTypes.string.isRequired
}
