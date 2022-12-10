import {fileTypeFromFile} from 'file-type';
// Installation de file-type et import 

const checkAcceptedExtensions = async (file, acceptedExtensions) => {
	
	// On check le file = si il correspond on obtiens un objet qui contient l'extension  
	// si il ne correspond pas, celui ci est undefined
	const fileType = await fileTypeFromFile(file.filepath)
	
	//Si le fileType est undefined le fichier n'est pas valide
	//Sinon on vérifie si l'extension est dans notre array accepted
	if (!fileType) {
		return false
	} else {
		if (acceptedExtensions.includes(fileType.ext)) {
	    	return true
		}	
		return false
	}
}

export default checkAcceptedExtensions;