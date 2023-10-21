const { BadRequestError } = require("../helpers/ApiError")

module.exports = {
    CategoryMiddleware(req, res, next){
        const {name, icon} = req.body
        if (name !== undefined){

            if(name === "" || name === "" || name === null ){
                return next(new BadRequestError("Nome da Categoria é Obrigatório!"))
            }
        }

        if (icon !== undefined){
    
            if(icon === "" || icon === "" || icon === null ){
                return next(new BadRequestError("Icone da Categoria é Obrigatório!"))
            }

        }
        next()
    }
}