import React, { useEffect } from 'react'
import formStyles from './FormElement.scss'

let textInput = null
let fileInput = null

const FormElement = ({type, value, index, onChange, onRemove}) => {
	useEffect(() => {
		if (textInput) {
			textInput.focus()
		}
	}, [type])
	const handleChange = ({target: {value}}) => {
		onChange(value, index)
	}
	const handleChangeImage = ({target: {files}}) => {
		const [file] = files
		const reader = new window.FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => {
			onChange(reader.result, index)
		}
	}
	return (
		<div>
      {
      	type === 'text'
      		? <div className="mb-3">
	      			<input
	    					type="text"
	    					className={formStyles.textInput}
	    					value={value}
	    					ref={ref => textInput = ref}
	    					onChange={handleChange} />
	    				<span className={formStyles.textfieldBar}></span>
    				</div>
      		: <div className={formStyles.dropZone} >
      				<input
      					type="file"
      					className={formStyles.fileInput}
      					ref={ref => fileInput = ref}
      					accept="image/*"
      					onChange={handleChangeImage} />
      				<div className={formStyles.imagePreview} style={{backgroundImage: `url(${value})`}}></div>
      				{
      					!value && <span className={formStyles.helpText}>Выберите картинку</span> 
      				}
      			</div>
      }
		</div>
	)
}

export default FormElement
