const db = require('../sequelize/models')
const {Op} = require('sequelize')
const {sequelize} = require('../sequelize/models')

module.exports = {
    getTransaction : async(req,res) => {
        const {uid} = req.uid
        try {
            const {role, id} = await db.user.findOne({where: {uid}})
            const branch = await db.branch.findOne({
                where: {user_id : id}
            })
            console.log(branch)
            if(role === "super admin"){
                const data = await db.transaction.findAll()

                res.status(201).send({
                    isError: false,
                    message: "Get All Transaction Success",
                    data
                })
            }else if(role === "branch admin"){
               

                // const data = await db.transaction.findAll({
                //     where: { branch_id :}
                // })
            }

        } catch (error) {
            
        }
    }
}