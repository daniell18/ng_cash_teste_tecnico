import * as yup from "yup";

const loginUserShape = yup.object().shape({
  username: yup.string().min(3).required(),
  password: yup.string().required(),
});

export default loginUserShape;
