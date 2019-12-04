import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

const getListStyle = direction => ({
  ...direction === 'horizontal' ? {display: 'flex'} : null,
  height: '100%',
})

const DroppableList = ({provided, snapshot, list, itemComponent: Component, direction = 'vertical'}) => {
  return (
    <div
      ref={provided.innerRef}
      style={getListStyle(direction)}>
      {
        list.map((item, index) => (
          <Draggable
            key={item.id}
            draggableId={item.id.toString()}
            index={index}>
            {(provided, snapshot) => (
              <Component {...item} index={index} provided={provided} snapshot={snapshot} />
            )}
          </Draggable>
        ))
      }
      {provided.placeholder}
    </div>
  )
}

export default DroppableList
