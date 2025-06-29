const {User} = require("../../models");

exports.getSessionUser = async (req, res) => {
    try {
      if (req.user && req.user.id) {
        const user = await User.findByPk(req.user.id,{
          attributes: ['id', 'email']
        });

        if(!user){
          return res.status(404).json({message: "User not found"})
        }

        res.status(200).json({ user: { id: user.id, email: user.email } });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }