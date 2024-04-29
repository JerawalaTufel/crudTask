const Joi = require('joi');


module.exports = {
    validateCreatTask : (req, res, cb) => {
        const creatTaskSchema = Joi.object({
            name : Joi.string().required(),
            email: Joi.string().email().required(),
            number : Joi.string().pattern(/^[0-9]{10}$/).required()
        })
        const { error } = creatTaskSchema.validate(req);
        if(error){
           

            return res.status(400).send({
                "status" : 400,
                "message": error.details[0].message.replace(/"/g, '')
            });
          }
          return cb(true);
    },
    validateUpdateTask : (req, res, cb) => {
        const creatTaskSchema = Joi.object({
            name : Joi.string().optional(),
            email: Joi.string().email().optional(),
            number : Joi.string().pattern(/^[0-9]{10}$/).optional()
        })
        const { error } = creatTaskSchema.validate(req);
        if(error){
           

            return res.status(400).send({
                "status" : 400,
                "message": error.details[0].message.replace(/"/g, '')
            });
          }
          return cb(true);
    },
 
}