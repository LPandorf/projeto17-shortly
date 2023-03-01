import Joi from "joi";

export const singSchema=Joi.object({
    email: Joi.string.email().required(),
    password: Joi.string.required()
});