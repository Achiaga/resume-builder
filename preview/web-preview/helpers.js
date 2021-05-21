import { useContext } from 'react'

import { BlocksContext } from './preview'
import { GRID_COLUMNS } from '../../../builder/web-builder/constants'
import { PreviewButton } from '../blocks/button'
import { PrevInception } from '../blocks/inception'
import { PrevText } from '../blocks/text'
import { PrevContactForm } from '../blocks/form'
import GenericImage from '../../../builder/blocks/image'

const zIndexes = {
  inception: 0,
  image: 1,
  text: 2,
  button: 3,
  form: 4,
}

export const previewBlocks = {
  image: GenericImage,
  text: PrevText,
  inception: PrevInception,
  form: PrevContactForm,
  button: PreviewButton,
}

function getBlockZIndex(blockType) {
  return zIndexes[blockType]
}

export function GeneratePreviewBlock({ layoutItem, desktop }) {
  const {
    builder: { blocks },
  } = useContext(BlocksContext)
  const { data, type } = blocks[layoutItem.i] || {}
  const { w, h, x, y, i } = layoutItem || {}
  if (!type || !previewBlocks[type]) return null
  const GenericBlock = previewBlocks[type]
  const zIndex = getBlockZIndex(type)

  return (
    <div
      key={i}
      style={{
        position: 'absolute',
        left: `calc( ${x} *  ( 100% / ${desktop ? GRID_COLUMNS : 100}) )`,
        width: `calc( ${w} * ( 100vw / ${desktop ? GRID_COLUMNS : 100}) )`,
        top: `calc( ${y}  * ( 100vw  / ${desktop ? GRID_COLUMNS : 100}) )`,
        height: `calc( ${h} * ( 100vw / ${desktop ? GRID_COLUMNS : 100}) )`,
        border: data?.border,
        boxShadow: data?.boxShadow,
        borderRadius: data?.borderRadius,
        zIndex: zIndex,
      }}
    >
      <GenericBlock
        {...data}
        parentHeight={h}
        isPreview
        blockId={layoutItem.i}
      />
    </div>
  )
}
