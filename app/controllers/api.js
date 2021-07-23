module.exports = {

    notFoundResource(_, response){
        response.status(404).json({data: [], error: `Resource not found`});
    }

}