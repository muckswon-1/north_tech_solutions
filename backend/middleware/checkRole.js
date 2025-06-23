module.exports = function checkRole(allowedRoles = []) {
    return (req,res,next) => {
        const userRole = req.user?.role;
        const userId = req.user?.id;

        // console.log(userRole);
        // console.log(allowedRoles);
        // console.log(req.params.id);
        // console.log(userId);
        // console.log(req.params.id === userId);



        if(!userRole || !allowedRoles.includes(userRole)){
            console.log('userRole not included')
            return res.status(403).json({ message: 'Forbidden: Insufficent role'})
        }

        if(allowedRoles.includes('user') && req.params.id && userRole !== 'admin'){
            console.log('user role')
            if(userId !== req.params.id){
                return res.status(403).json({ message: 'Forbidden: Cannot access other user data'});
            }
        }

       next();
    }
}