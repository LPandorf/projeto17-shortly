export function validation(n){
    return (req,res,next)=>{
        const {error}=n.validate(req.body, {abortEarly: false});
        
        if(error){
            return res.status(422).send(error.details.map(detail=>detail.message));
        }
        
        next();
    }
}