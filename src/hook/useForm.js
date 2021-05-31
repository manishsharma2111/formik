import * as yup from "yup";

const useForm = () => {
  const FORM_VALIDATION = yup.object().shape({
    name: yup.string().required("Required"),
    description: yup.string().required("Required"),
    questions: yup.array().of(
      yup.object().shape({
        question: yup.string().required("Required"),
        options: yup.array().of(
          yup.object().shape({
            correct: yup.string().required("Required"),
            incorrect1: yup.string().required("Required"),
            incorrect2: yup.string().required("Required"),
            incorrect3: yup.string().required("Required"),
          })
        ),
      })
    ),
  });
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("my values", values);
    try {
      await new Promise((res) => setTimeout(res, 2500));
      resetForm();
    } catch (error) {
      setSubmitting(false);
    }
  };
  const emptyQuestion = {
    question: "",
    options: [{ correct: "", incorrect1: "", incorrect2: "", incorrect3: "" }],
  };
  const initialValues = {
    name: "",
    description: "",
    questions: [emptyQuestion],
  };
  return {
    FORM_VALIDATION,
    onSubmit,
    initialValues,
    emptyQuestion,
  };
};

export default useForm;
