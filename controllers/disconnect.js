const disconnectUser = (req, res, next) => {
	
	req.session.destroy((err) =>{
		if (err) throw err
		console.log('déconnecté')
	})
}

export default disconnectUser;