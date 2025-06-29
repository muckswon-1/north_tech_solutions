import {clsx} from 'clsx';
import PasswordValidator from 'password-validator';
import {twMerge} from 'tailwind-merge';


export function cn(...inputs) {
    return twMerge(clsx(...inputs))
  }


  let passwordSchema = new PasswordValidator();

  passwordSchema
  .is().min(8)
  .is().max(100)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().not().spaces()
  .has().symbols()
  .is().not().oneOf(['Passw0rd', 'Password123']);

  export default passwordSchema;