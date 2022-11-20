import * as yup from "yup";

const cashOutShape = yup.object().shape({
  value: yup.number().required(),
  username: yup.string().required(),
});

export default cashOutShape;
