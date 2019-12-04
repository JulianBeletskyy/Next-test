const express = require('express')
const blockRoutes = express.Router()

let blocks = [
	{
		id: 1,
		order: 0,
		elements: [
			{type: 'text', value: 'Some text', order: 0, id: 1},
			{type: 'image', value: 'https://hackernoon.com/hn-images/0*xMaFF2hSXpf_kIfG.jpg', order: 1, id: 2},
		],
	}, {
		id: 2,
		order: 1,
		elements: [
			{type: 'text', value: 'Some another text', order: 1, id: 1},
			{type: 'image', value: 'http://www.footballfreestyle.ru/wp-content/uploads/2014/11/test.jpg', order: 0, id: 2},
		],
	}, {
		id: 3,
		order: 2,
		elements: [
			{type: 'text', value: 'Third text', order: 0, id: 1},
			{type: 'image', value: 'https://awo.aws.org/wp-content/uploads/2017/03/Computer-Based-Testing-BLOG-IMAGE-3-17.jpg', order: 1, id: 2},
		],
	}
]

blockRoutes.get('/', (req, res) => {
	return res.status(200).json({data: blocks})
})

blockRoutes.post('/', (req, res) => {
	const { elements } = req.body
	blocks = [...blocks, {id: blocks.length+1, order: blocks.length, elements}]
	return res.status(200).json({data: blocks})
})

blockRoutes.put('/reorder', (req, res) => {
	const { reordered } = req.body
	blocks = reordered
	return res.status(200).json({data: blocks})
})

blockRoutes.put('/:id', (req, res) => {
	const { elements } = req.body
	const { id } = req.params
	blocks = blocks.map(el => el.id === id*1 ? {...el, elements} : el)
	return res.status(200).json({data: blocks})
})

module.exports = blockRoutes
