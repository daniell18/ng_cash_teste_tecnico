import { hashSync } from "bcryptjs";
import * as yup from "yup";

const createUserShape = yup.object().shape({
  username: yup.string().required(),
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .transform((pwd) => hashSync(pwd, 10)),
});

export default createUserShape;
