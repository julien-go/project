export const checkAcceptedExtensions = (file) => {
	const type = file.mimetype.split('/').pop()
	const accepted = ['jpeg', 'jpg', 'png', 'gif']
	if (accepted.includes(type)) {
	    return true
	}
	return false
}

export default checkAcceptedExtensions;