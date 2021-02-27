import blocks from '../blocks'

export const generatePageCode = (layout, layoutBlocks) => {
	return layout.map((layoutItem) => {
		const BlockKey = layoutItem.i
		return generatePreviewBlock(layoutBlocks[BlockKey], layoutItem)
	})
}

function generatePreviewBlock(blockInfo, layoutItemInfo) {
	if (!blockInfo?.type) return null
	const { w, h, x, y, i } = layoutItemInfo || {}
	const Block = blocks[blockInfo.type]

	return (
		<div
			key={i}
			style={{
				gridColumn: `${x + 1} /  ${x + 1 + w}`,
				gridRow: `${y + 1} /  ${y + 1 + h}`
			}}>
			<Block data={blockInfo.data} isPreview />
		</div>
	)
}
