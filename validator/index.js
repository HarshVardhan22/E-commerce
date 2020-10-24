//all the functions used below like check or withMessage etc are inbuilt function of the express validator

exports.userSignupValidator = (req,res,next) =>{
    req.check("name","name is required").notEmpty();
    req
      .check("email", "email must be greater than 3 characters")
      .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      .withMessage("Invalid Email Id")
      .isLength({
          min:4
      });
    req
      .check("password", "Password is required")
      .isLength({
        min: 8,
      })
      .withMessage("Password must be 8 characters long")
      .matches(/^[A-Za-z]\w{8,200}$/)
      .withMessage(
        "Password must be between 8 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter"
      );
    const errors  = req.validationErrors(); //to collect all the errors
    if(errors){
        const firstError = errors.map(error => error.msg)[0]; //select the first error from the array of errors declared above
        return res.status(400).json({error: firstError});
    }
    next();//so that this validator moves to the next item/object to check
}