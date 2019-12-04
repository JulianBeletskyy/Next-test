export const reorderArray = (array, startIndex, endIndex) => {
	const list = [...array]
  const [removedTask] = list.splice(startIndex, 1)
  list.splice(endIndex, 0, removedTask)
  return list
}

export const replaceArrayItems = (startArray, endArray, startIndex, endIndex) => {
	const srcList = Array.from(startArray)
  const destList = Array.from(endArray)
  const [removedMove] = srcList.splice(startIndex, 1)
  destList.splice(endIndex, 0, removedMove)
  return { srcList, destList }
}
