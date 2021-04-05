import { BiBorderRadius } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { GiTwoShadows } from 'react-icons/gi'
import { FiAlignCenter, FiAlignLeft, FiAlignRight } from 'react-icons/fi'
import {
  AiOutlineVerticalAlignBottom,
  AiOutlineVerticalAlignMiddle,
  AiOutlineVerticalAlignTop,
  AiOutlineBorderRight,
} from 'react-icons/ai'

import { FontIcon, BgIcon } from '../../assets/fontIcon'

import { DELETE } from './constants'

// Text

const fontSize = {
  type: 'dropdown',
  property: 'fontSize',
  options: [
    { value: '12', title: 'xs' },
    { value: '18', title: 'sm' },
    { value: '24', title: 'md' },
    { value: '30', title: 'lg' },
    { value: '36', title: 'xl' },
    { value: '42', title: '2xl' },
    { value: '46', title: '3xl' },
    { value: '52', title: '4xl' },
  ],
}
const textAlign = {
  type: 'dropdown',
  property: 'textAlign',
  options: [
    { value: 'left', title: <FiAlignLeft /> },
    { value: 'center', title: <FiAlignCenter /> },
    { value: 'right', title: <FiAlignRight /> },
  ],
}
const alignItems = {
  type: 'dropdown',
  property: 'alignItems',
  options: [
    { value: 'start', title: <AiOutlineVerticalAlignTop /> },
    { value: 'center', title: <AiOutlineVerticalAlignMiddle /> },
    { value: 'end', title: <AiOutlineVerticalAlignBottom /> },
  ],
}
const fontWeight = {
  type: 'dropdown',
  property: 'fontWeight',
  options: [
    { value: '300', title: 'thin' },
    { value: '400', title: 'normal' },
    { value: '500', title: 'semibold' },
    { value: '700', title: 'bold' },
    { value: '900', title: 'super-bold' },
  ],
}
const color = {
  type: 'colorDropdown',
  property: 'fontColor',
  options: [
    {
      value: '#000000',
      title: 'black',
      icon: <FontIcon fontColor="#000000" />,
    },
    {
      value: 'rgb(155,154,151)',
      title: 'gray',
      icon: <FontIcon fontColor="rgb(155,154,151)" />,
    },
    {
      value: 'rgb(100,71,58)',
      title: 'brown',
      icon: <FontIcon fontColor="rgb(100,71,58)" />,
    },
    {
      value: 'rgb(217,115,13)',
      title: 'orange',
      icon: <FontIcon fontColor="rgb(217,115,13)" />,
    },
    {
      value: 'rgb(223,171,1)',
      title: 'yellow',
      icon: <FontIcon fontColor="rgb(223,171,1)" />,
    },
    {
      value: 'rgb(15,123,108)',
      title: 'green',
      icon: <FontIcon fontColor="rgb(15,123,108)" />,
    },
    {
      value: 'rgb(11,110,153)',
      title: 'blue',
      icon: <FontIcon fontColor="rgb(11,110,153)" />,
    },
    {
      value: 'rgb(105,64,165)',
      title: 'purple',
      icon: <FontIcon fontColor="rgb(105,64,165)" />,
    },
    {
      value: 'rgb(173,26,114)',
      title: 'pink',
      icon: <FontIcon fontColor="rgb(173,26,114)" />,
    },
    {
      value: 'rgb(224,62,62)',
      title: 'red',
      icon: <FontIcon fontColor="rgb(224,62,62)" />,
    },
    {
      value: '#FFFFFF',
      title: 'white',
      icon: <FontIcon fontColor="#FFFFFF" />,
    },
  ],
}

// Block

const border = {
  type: 'dropdown',
  property: 'border',
  icon: <AiOutlineBorderRight />,
  options: [
    { value: '0px solid black', title: 'none' },
    { value: '1px solid black', title: 'black' },
    { value: '1px solid rgb(205, 211, 216)', title: 'gray' },
  ],
}

const borderRadius = {
  type: 'dropdown',
  property: 'borderRadius',
  icon: <BiBorderRadius />,
  options: [
    { value: '0px', title: 'none' },
    { value: '10px', title: 'sm' },
    { value: '20px', title: 'md' },
    { value: '100px', title: 'lg' },
    { value: '100%', title: 'circle' },
  ],
}

const boxShadow = {
  type: 'dropdown',
  property: 'boxShadow',
  icon: <GiTwoShadows />,
  options: [
    {
      value: 'none',
      title: 'none',
    },
    {
      value:
        'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
      title: 'sm',
    },
    {
      value:
        '0 13px 27px -5px rgba(50,50,93,0.25),0 8px 16px -8px rgba(0,0,0,0.3)',
      title: 'md',
    },
    {
      value: 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;',
      title: 'lg',
    },
    {
      value:
        'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;',
      title: 'in',
    },
  ],
}

const textShadow = {
  type: 'dropdown',
  property: 'textShadow',
  icon: <GiTwoShadows />,
  options: [
    {
      value: 'none',
      title: 'none',
    },
    {
      value: '2px 2px #565656',
      title: 'sm',
    },
    {
      value: '6px 4px #0000009e',
      title: 'md',
    },
    {
      value: '7px 2px #000000',
      title: 'lg',
    },
  ],
}

// Common

const backgroundColor = {
  type: 'colorDropdown',
  property: 'backgroundColor',
  options: [
    {
      value: 'transparent',
      title: 'none',
      icon: <BgIcon bgColor="transparent" />,
    },
    {
      value: '#85603f',
      title: 'brown',
      icon: <BgIcon bgColor="#85603f" />,
    },
    {
      value: '#E65F0C',
      title: 'orange',
      icon: <BgIcon bgColor="#E65F0C" />,
    },
    {
      value: 'rgb(255, 195, 0)',
      title: 'yellow',
      icon: <BgIcon bgColor="rgb(255, 195, 0)" />,
    },
    {
      value: '#00BA5E',
      title: 'green',
      icon: <BgIcon bgColor="#00BA5E" />,
    },
    {
      value: '#1f441e',
      title: 'green',
      icon: <BgIcon bgColor="#1f441e" />,
    },
    {
      value: '#4CB0EA',
      title: 'blue',
      icon: <BgIcon bgColor="#4CB0EA" />,
    },
    {
      value: '#28527a',
      title: 'blue',
      icon: <BgIcon bgColor="#28527a" />,
    },
    {
      value: '#E112FC',
      title: 'purple',
      icon: <BgIcon bgColor="#E112FC" />,
    },
    {
      value: '#693c72',
      title: 'purple',
      icon: <BgIcon bgColor="#693c72" />,
    },
    {
      value: '#f2dbe1',
      title: 'pink',
      icon: <BgIcon bgColor="#f2dbe1" />,
    },
    {
      value: 'rgb(233, 161, 185)',
      title: 'pink',
      icon: <BgIcon bgColor="rgb(233, 161, 185)" />,
    },
    {
      value: '#f7484e',
      title: 'red',
      icon: <BgIcon bgColor="#f7484e" />,
    },
    {
      value: 'rgb(220, 220, 220)',
      title: 'gray',
      icon: <BgIcon bgColor="rgb(220, 220, 220)" />,
    },
    {
      value: '#292929',
      title: 'gray',
      icon: <BgIcon bgColor="#292929" />,
    },
    {
      value: '#000000',
      title: 'black',
      icon: <BgIcon bgColor="#000000" />,
    },
    {
      value: '#FFFFFF',
      title: 'white',
      icon: <BgIcon bgColor="#FFFFFF" />,
    },
  ],
}

const emoji = {
  type: 'emojiDropdown',
  property: 'emoji',
  icon: '😋',
  options: [
    {
      value: '&#128526',
      title: '&#128526',
    },
    {
      value: '&#10084',
      title: '&#10084',
    },
    {
      value: '🎉',
      title: '🎉',
    },
    {
      value: '🙌',
      title: '🙌',
    },
  ],
}

export const deleteProperty = {
  type: 'button',
  placeholder: <RiDeleteBin6Line color="black" size="1.1rem" />,
  property: '',
  operationType: DELETE,
}

const imageInput = {
  type: 'text',
  placeholder: 'Img',
  inputPlaceholder: 'Enter your link',
  property: 'imageUrl',
}

const imageBgInput = {
  type: 'text',
  placeholder: 'Img',
  inputPlaceholder: 'Enter your link',
  property: 'imageUrl',
}

const redirectInput = {
  type: 'text',
  placeholder: 'Link',
  inputPlaceholder: 'Add a link to redirect to when click',
  property: 'redirect',
}

export const Properties = {
  text: [
    deleteProperty,
    fontSize,
    textAlign,
    alignItems,
    fontWeight,
    borderRadius,
    textShadow,
    redirectInput,
    color,
    backgroundColor,
    emoji,
  ],
  image: [deleteProperty, boxShadow, borderRadius, imageInput, redirectInput],
  inception: [
    deleteProperty,
    border,
    borderRadius,
    imageInput,
    boxShadow,
    backgroundColor,
  ],
}
