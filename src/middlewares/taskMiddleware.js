const { BadRequestError } = require("../helpers/ApiError")

module.exports = {
    TaskMiddleware(req, res, next){
        const {title, preference, categories} = req.body
        if (title !== undefined){

            if(title === "" || title === "" || title === null ){
                return next(new BadRequestError("O titulo da tarefa é Obrigatório!"))
            }
        }

        if (preference !== undefined){

            if(preference === "" || preference === "" || preference === null ){
                return next(new BadRequestError("A prioridade da tarefa é Obrigatória!"))
            }
        }
        if (categories !== undefined){

            if(categories.length < 1){
                return next(new BadRequestError("A tarefa deve conter no minimo uma categoria!"))
            }
        }

        next()
    }
}