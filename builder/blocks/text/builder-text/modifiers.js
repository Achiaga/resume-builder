import { Box, Button, Select } from '@chakra-ui/react'
import PropTypes from 'prop-types'

import { TextPropTypes } from '..'
import { DELETE, EDIT } from '../../constants'

const fontSize = {
	type: 'dropdown',
	placeholder: 'Select a FontSize',
	property: 'fontSize',
	options: [
		{ value: '2rem', title: 'Title' },
		{ value: '1.75rem', title: 'Subtitle 1' },
		{ value: '1.5rem', title: 'Subtitle 2' },
		{ value: '1rem', title: 'Text' }
	]
}
const textAlign = {
	type: 'dropdown',
	placeholder: 'Align text',
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
		{ value: '400', title: 'normal' },
		{ value: '700', title: 'bold' },
		{ value: '900', title: 'super bold' }
	]
}
const backgroundColor = {
	type: 'color',
	placeholder: 'Background color',
	property: 'backgroundColor'
}

const fontColor = {
	type: 'color',
	placeholder: 'font color',
	property: 'color'
}

const deleteBlock = {
	type: 'button',
	placeholder: 'Delete block',
	property: '',
	operationType: DELETE
}

const Properties = [
	deleteBlock,
	fontSize,
	textAlign,
	backgroundColor,
	fontColor,
	alignItems,
	fontWeight
]

const PropertiesModifiers = {
	dropdown: DropDownSelector,
	color: ColorSelector,
	button: ButtonSelector
}

function DropDownSelector({
	handleEdit,
	property,
	value,
	options,
	placeholder
}) {
	const handleChange = (e) => {
		const { value } = e.target
		handleEdit(property, value)
	}
	return (
		<Box>
			<Select placeholder={placeholder} value={value} onChange={handleChange}>
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
	value: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired
		}).isRequired
	).isRequired,
	placeholder: PropTypes.string.isRequired
}

function ColorSelector({ handleEdit, property, value, placeholder }) {
	const handleChange = (e) => {
		const { value } = e.target
		handleEdit(property, value)
	}
	return (
		<Box>
			<label>{placeholder}</label>
			<input type='color' onChange={handleChange} value={value} />
		</Box>
	)
}
ColorSelector.propTypes = {
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
			<Button onClick={handleClick} bg='blackAlpha.400'>
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

const BlockProperties = ({ handleEdit, propertiesValues }) => {
	console.log({ propertiesValues })
	return Properties.map((propertyData, index) => {
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
	})
}

const Modifiers = ({ data, blockKey }) => {
	const { editBlock = () => {} } = data

	function handleEdit(id, value, operationType = EDIT) {
		editBlock({ ...data, [id]: value }, blockKey, operationType)
	}
	return (
		<Box
			onClick={(e) => e.stopPropagation()}
			pos='absolute'
			top='-20px'
			backgroundColor='black'
			color='white'
			transform='translate(0px, -100%)'>
			<BlockProperties handleEdit={handleEdit} propertiesValues={data} />
		</Box>
	)
}

Modifiers.propTypes = {
	data: TextPropTypes,
	blockKey: PropTypes.string.isRequired
}

export default Modifiers
