
module.exports = {
    errorMiddleware(error, req, res, next){
        const statusCode = error.statusCode ?? 500 // O ?? verifica se o valor à esquerda (error.statusCode) é nulo ou indefinido. semelhante ao ||
        const message = error.statusCode ? error.message : 'Internal Server Error'
        return res.status(statusCode).json({message})
    }
}