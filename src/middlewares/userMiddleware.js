const { BadRequestError } = require("../helpers/ApiError")

module.exports = {
    userMiddleware(req, res, next){
        const { name, email, cellphone, cpf, birthday, password} = req.body
        if (name !== undefined){

            if(name === "" || name === "" || name === null ){
                return next(new BadRequestError("Nome do Usuario é Obrigatório!"))
            }
        }

        if (email !== undefined){
    
            if(email === "" || email === "" || email === null ){
                return next(new BadRequestError("Email do Usuario é Obrigatório!"))
            }

            if(!email.includes("@") || !email.includes(".")){
                return next(new BadRequestError("Formato invalido de Email!"))
            }
        }

        if (cellphone !== undefined){

            if(cellphone === "" || cellphone === "" || cellphone === null ){
                return next(new BadRequestError("Celular do Usuario é Obrigatório!"))
            }

            if(cellphone.length !== 13){
                return next(new BadRequestError("Celular Invalido! Deve conter 13 caracteres!"))
            }
        }

        if (cpf !== undefined){

            if(cpf === "" || cpf === "" || cpf === null ){              
                return next(new BadRequestError("Cpf do Usuario é Obrigatório!"))
            }

            if(cpf.length !== 11){
                return next(new BadRequestError("Cpf Invalido! Deve conter 11 caracteres!"))
            }
        }

        if (birthday !== undefined){

            if(birthday === "" || birthday === "" || birthday === null ){
                return next(new BadRequestError("Data de Nascimento do Usuario é Obrigatório!"))
            }

            const regex = /^\d{4}-\d{2}-\d{2}$/
            if (!regex.test(birthday)) {
                return next(new BadRequestError("Formato da data Invalida ou Incorreta!"))
            }
        }

        if (password !== undefined){

            if(password === "" || password === "" || password === null ){
                return next(new BadRequestError("Senha do Usuario é Obrigatório!"))
            }

            if(password.length < 5){
                return next(new BadRequestError("Senha Invalida! no minimo 5 caraceteres"))
            }
        }

        next()
    }
}