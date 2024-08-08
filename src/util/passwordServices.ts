import bcrypt from "bcrypt";


const encryptPassword = async (plainPassword : string) => {
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
  } catch (error) {
    console.log("error hashing password :>> ", error);
    return null;
  }
};


// !


const verifyPassword = async (plainPassword: string, hashedPassword: string) => {
  const isPasswordCorrect = await bcrypt.compare(plainPassword, hashedPassword);
  return isPasswordCorrect;
};

export { encryptPassword, verifyPassword };