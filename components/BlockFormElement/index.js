import React from 'react'

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

const BlockFormElement = ({type, value, provided, snapshot}) => {
	return (
		<div
			ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
      {
      	type === 'text'
      		? <div className="p-3">
	      			{value}
    				</div>
      		: <div>
      				<img src={value} alt="" className="img-fluid" />
      			</div>
      }
		</div>
	)
}

export default BlockFormElement