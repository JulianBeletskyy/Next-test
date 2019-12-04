import React, { useState } from 'react'
import { DragDropContext, Droppable, resetServerContext } from 'react-beautiful-dnd'
import DroppableList from '../../components/DroppableList'
import { reorderArray } from '../../utils'
import blocksStyles from './blocks.scss'
import BlockForm from '../../components/BlockForm'
import cn from 'classnames'
import BlockCard from '../../components/BlockCard'
import { get, post, put } from '../../api-client'

const Blocks = ({data}) => {
	const [blocks, setBlocks] = useState(data)
	const [openForm, setOpenForm] = useState(false)
	const [editableBlock, setEditableBlock] = useState({})
	const handleSave = form => {
		const elements = form.elements.map((el, i) => ({
			...el,
			order: i
		}))
		if (!form.id) {
			post('block', {elements}).then(res => {
				if (res.statusCode === 200) {
					setBlocks(res.data)
					setOpenForm(false)
				}
			})
		} else {
			put(`block/${form.id}`, {elements}).then(res => {
				if (res.statusCode === 200) {
					setBlocks(res.data)
					setOpenForm(false)
				}
			})
		}
	}
	const handleEdit = el => {
		setEditableBlock(el)
		setOpenForm(true)
	}
	const handleCloseForm = () => {
		setEditableBlock({})
		setOpenForm(false)
	}
	const onDragEnd = ({source, destination}) => {
		if (!destination || source.index === destination.index) {
			return
		}
		const prevState = Object.assign([], blocks)
		const reordered = reorderArray(blocks, source.index, destination.index).map((el, i) => {
			return {
				...el,
				order: i
			}
		})
		setBlocks(reordered)
		put('block/reorder', {reordered}).then(res => {
			if (res.statusCode !== 200) {
				setBlocks(prevState)
			}
		})
	}
	return (
		<div className={`container ${blocksStyles.tasks}`}>
			<div className="row justify-content-center">
				<div className="col-12 col-sm-6">
					<div className="mb-3 text-center">
						Создайте свой уникальный шаблон из блоков
					</div>
					<div>
						<DragDropContext onDragEnd={onDragEnd}>
							<Droppable
								droppableId="tasks"
								children={(provided, snapshot) => 
									<DroppableList
										provided={provided}
										snapshot={snapshot}
										itemComponent={props => <BlockCard {...props} handleClick={handleEdit} />}
										list={blocks.sort((a, b) => a.order - b.order)} />} />
						</DragDropContext>
					</div>
				</div>
			</div>
			<div>
				<div onClick={() => setOpenForm(true)} className={cn(blocksStyles.addBtn, {[blocksStyles.active]: openForm})}>
					{
						openForm
							? <BlockForm open={openForm} block={editableBlock} onClose={handleCloseForm} onSave={handleSave} />
							: <div className="position-relative w-100 h-100"><span className={blocksStyles.addBtnIcon}>+</span></div>
					}
				</div>
			</div>
		</div>
	)
}

Blocks.getInitialProps = async ({req}) => {
	resetServerContext()
	return get('block').then(res => {
		return res
	})
}

export default Blocks