import {pool, asyncQuery} from '../../config/database.js';


const getAllPosts= async () => {
    const selectReports = 'SELECT DISTINCT reported_posts.id, reported_posts.post_id, reported_posts.user_id, reported_posts.report_message, DATE_FORMAT( reported_posts.report_date, "%d/%m/%Y %H:%i" ) AS report_date, posts.text_content, DATE_FORMAT( posts.publication_date, "%d/%m/%Y %H:%i" ) AS publication_date, users.username AS post_username, users.id AS post_user_id FROM reported_posts JOIN posts ON posts.id = reported_posts.post_id JOIN users ON users.id = posts.user_id'
    const posts = await asyncQuery(selectReports) 
    return posts
}

const getPostImage = async (array) => {
    const selectUrl = 'SELECT url FROM images JOIN posts ON posts.image_id = images.id WHERE posts.id = ?'
    console.log(array)
    const data = []
    for(let i = 0; i<= array.length; i++){
        if(i === array.length){
            return data
        } else {
            // traitement 
            const image = await asyncQuery(selectUrl, [array[i].post_id])
            data.push({...array[i], image: image[0]})
        }
    }
}

const getReports = async (req, res) => {
    
    const reportsList = await getAllPosts();
    const reports = await getPostImage(reportsList)
    // console.log(reports)
    res.json({response: true, reports})

}

export default getReports;