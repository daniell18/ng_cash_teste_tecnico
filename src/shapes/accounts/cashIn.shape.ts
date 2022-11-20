import * as yup from "yup";

const cashInShape = yup.object().shape({
  value: yup.number().required(),
});

export default cashInShape;
