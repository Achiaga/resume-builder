import RGL, { WidthProvider } from '../../components/react-grid-layout'
import { v4 as uuid } from 'uuid'
import PropTypes from 'prop-types'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { forwardRef, useEffect, useRef, useState } from 'react'
import {
  addBlock,
  editBlock,
  editItemDraggableProperty,
  generateBuilderBlocks,
  addCallbackToBlock,
  normalizeLayout,
  normalizeBlockStructure,
  denormalizeInceptionBlock,
} from '../web-builder/helpers'
import { Box } from '@chakra-ui/react'
import { GRID_COLUMNS } from '../web-builder/constants'
import { useDispatch, useSelector } from 'react-redux'
import {
  getGridRowHeight,
  getNewBlock,
  getSelectedBlockId,
  setNewBlock,
  udpateBlocksConfigInception,
} from '../../features/builderSlice'

const ReactGridLayout = WidthProvider(RGL)

function isObjectOutside(newItem, rowHeight, gridRef) {
  const parentHeight = gridRef.current.parentElement.getBoundingClientRect()
    .height
  const rowsNumber = Math.round(parentHeight / rowHeight)
  return newItem.y + newItem.h > rowsNumber
}

const BlockInception = forwardRef(({ extraProps, ...data }, ref) => {
  const dispatch = useDispatch()
  const { type: newBlockType, id: newBlockId } = useSelector(getNewBlock)
  const selectedBlockId = useSelector(getSelectedBlockId)
  const gridRowHeight = useSelector(getGridRowHeight)

  const { reRender, blockKey: parentBlockKey } = extraProps

  const [secondRender, setSecondRender] = useState(false)
  const gridRef = useRef()
  const [blocksConfig, udpateBlocksConfig] = useState(() =>
    normalizeBlockStructure(data.blocks)
  )
  const [layout, setLayout] = useState(() => normalizeLayout(data.blocks))

  useEffect(() => {
    udpateBlocksConfig((blocksConfig) =>
      addCallbackToBlock(blocksConfig, editBlockCallback)
    )
  }, [])

  useEffect(() => {
    setSecondRender(uuid())
  }, [reRender])

  useEffect(() => {
    setLayout((layout) => editItemDraggableProperty(layout, selectedBlockId))
  }, [selectedBlockId])

  const editBlockCallback = (newData, blockId, operationType) => {
    udpateBlocksConfig((blocksConfig) => {
      const newBlocksConfig = editBlock(
        blocksConfig,
        blockId,
        newData,
        operationType
      )
      updateBlockConfig(layout, newBlocksConfig)
      return newBlocksConfig
    })
  }

  function updateBlockConfig(layout, newBlocksConfig) {
    dispatch(
      udpateBlocksConfigInception({
        newBlocks: denormalizeInceptionBlock(layout, newBlocksConfig),
        parentBlockKey,
      })
    )
  }

  const updateLayout = (layout) => {
    if (layout?.length !== Object.keys(blocksConfig)?.length) return
    setLayout(layout)
    updateBlockConfig(layout, blocksConfig)
  }

  function onDrop(layout, droppedBlockLayout) {
    if (newBlockType === 'inception') return null
    setLayout(layout)
    udpateBlocksConfig((blocksConfig) => {
      const newBlocksConfig = addBlock(
        droppedBlockLayout?.i,
        newBlockType,
        blocksConfig,
        editBlockCallback
      )
      updateBlockConfig(layout, newBlocksConfig)
      return newBlocksConfig
    })
    dispatch(setNewBlock({ type: null }))
  }

  function handleLayoutChange(layout, _, newItem) {
    if (isObjectOutside(newItem, gridRowHeight, gridRef)) {
      return setSecondRender(uuid())
    }
    updateLayout(layout)
  }

  const isDroppable = selectedBlockId?.includes('inception')
  // eslint-disable-next-line no-unused-vars
  const { contentEditable, ...extraData } = data
  return (
    <Box
      {...extraData}
      w="100%"
      h="100%"
      id="inception"
      cursor="pointer"
      outline="1px dashed lightgray"
    >
      <ReactGridLayout
        innerRef={gridRef}
        key={secondRender}
        cols={GRID_COLUMNS}
        rowHeight={gridRowHeight}
        margin={[0, 0]}
        style={{ width: '100%', height: '100%' }}
        autoSize={false}
        preventCollision={true}
        isDroppable={isDroppable}
        onDrop={onDrop}
        droppingItem={{ i: 'child-inception-' + newBlockId, w: 20, h: 10 }}
        verticalCompact={false}
        className="layout"
        onDragStop={handleLayoutChange}
        onResizeStop={handleLayoutChange}
        layout={layout}
      >
        {generateBuilderBlocks(blocksConfig)}
      </ReactGridLayout>
    </Box>
  )
})

BlockInception.displayName = 'BlockInception'

BlockInception.propTypes = {
  extraProps: PropTypes.shape({
    reRender: PropTypes.bool,
    blockKey: PropTypes.string,
    layoutCallback: PropTypes.func,
    rowHeight: PropTypes.number,
  }),
}

export default BlockInception
