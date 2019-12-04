import React, { useState } from 'react'
import formStyles from './blockForm.scss'
import cn from 'classnames'
import { DragDropContext, Droppable, resetServerContext } from 'react-beautiful-dnd'
import DroppableList from '../DroppableList'
import FormElement from '../FormElement'
import BlockFormElement from '../BlockFormElement'
import { reorderArray } from '../../utils'
import { ImageIcon, TextIcon } from '../icons'

const formStruct = {elements: []}

const BlockForm = ({open, onClose, onSave, block}) => {
	const [form, setForm] = useState(block.id ? block : formStruct)
	const [dragable, setDragable] = useState(false)
	const handleClose = e => {
		e.stopPropagation()
		onClose()
	}
	const handleChange = (value, index) => {
		setForm({...form, elements: form.elements.map((el, i) => i === index ? {...el, value} : el)})
	}
	const handleRemove = index => {
		setForm({...form, elements: form.elements.filter((el, i) => i !== index)})
	}
	const onDragEnd = ({source, destination}) => {
		if (!destination || source.index === destination.index) {
			return
		}
		setForm({...form, elements: reorderArray(form.elements, source.index, destination.index)})
	}
	const addTextElement = () => {
		setForm({...form, elements: [...form.elements, {id: 1, type: 'text', value: ''}]})
	}
	const addImageElement = () => {
		setForm({...form, elements: [...form.elements, {id: 2, type: 'image', value: null}]})
	}
	const handleSave = (e) => {
		e.stopPropagation()
		dragable ? onSave(form) : setDragable(true)
	}
	const handleCancel = (e) => {
		e.stopPropagation()
		dragable ? setDragable(false) : onClose()
	}
	const formExistText = (form => {
		return !!form.elements.find(el => el.type === 'text')
	})(form)
	const formExistImage = (form => {
		return !!form.elements.find(el => el.type === 'image')
	})(form)
	const isCanSave = (form => {
		return form.elements.some(el => !!el.value)
	})(form)
	return (
		<div className={cn(formStyles.blockForm, {[formStyles.active]: open})}>
			<div className={formStyles.blockCloseIcon} onClick={handleClose}>
				x
			</div>
			<div className="d-flex flex-column h-100 overflow-auto">
				<div className="flex-fill">
					{
						dragable
							? <DragDropContext onDragEnd={onDragEnd}>
									<Droppable
										droppableId="form"
										children={
											(provided, snapshot) => 
												<div className="pt-5 pb-3 px-3 h-100">
													<DroppableList
														provided={provided}
														snapshot={snapshot}
														itemComponent={BlockFormElement}
														list={form.elements} />
												</div>
										} />
								</DragDropContext>
							: <div className="pt-5 pb-3 px-3 h-100">
									{
										form.elements.map((element, i) =>
											<div key={i} className="mb-3">
												<FormElement {...element} index={i} onChange={handleChange} onRemove={handleRemove} />
											</div>)
									}
								</div>
					}
				</div>
				<div className="mt-auto px-3">
					{
						!dragable &&
							<div className="d-flex justify-content-around align-items-center border-top border-bottom py-2">
								<div>
									<button type="button" disabled={formExistText} className={formStyles.iconBtn} onClick={addTextElement}>
										<TextIcon />
									</button>
								</div>
								<div>
									<button type="button" disabled={formExistImage} className={formStyles.iconBtn} onClick={addImageElement}>
										<ImageIcon />
									</button>
								</div>
							</div>
					}
					<div className="py-2 d-flex justify-content-around">
						<button type="button" onClick={handleCancel}>{dragable ? 'Править' : 'Закрыть'}</button>
						<button type="button" disabled={!isCanSave} onClick={handleSave}>{dragable ? (form.id ? 'Изменить блок' : 'Создать блок') : 'Сохранить'}</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BlockForm
