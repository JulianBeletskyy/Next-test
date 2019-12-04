import React from 'react'
import { DEFAULT_IMAGE } from '../../config'
import blockStyles from './blockCard.scss'

const getItemStyle = (isDragging, draggableStyle) => ({
	...draggableStyle,
  userSelect: 'none',
  borderRadius: 5,
  margin: '0 0 8px 0',
  background: '#fff',
  boxShadow: isDragging ? '0px 0px 15px 1px rgba(0,0,0,0.1)' : '0px 0px 5px 1px rgba(0,0,0,0.1)',
  cursor: 'pointer',
  overflow: 'hidden',
})

const BlockCard = ({id, elements, provided, snapshot, handleClick}) => {
	return (
		<div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={() => handleClick({id, elements})}
      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
			{
				elements.sort((a, b) => a.order - b.order).map((el, i) =>
					<div key={i} className={blockStyles.block}>
						{
							el.type === 'image'
							? <div>
									<div className={blockStyles.blockImage} style={{backgroundImage: `url(${el.value || DEFAULT_IMAGE})`}}></div>
								</div>
							: <div className="p-2 text-center">
									{el.value}
								</div>
						}
					</div>)
			}
		</div>
	)
}

export default BlockCard