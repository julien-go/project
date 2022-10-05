const disconnectUser = (req, res, next) => {
	
	req.session.destroy((err) =>{
		if (err) throw err
		console.log('déconnecté')
		res.json({response: true})
	})
}

export default disconnectUser;