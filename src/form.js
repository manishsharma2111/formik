import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
  Divider,
  IconButton,
} from "@material-ui/core";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import { FieldArray, Form, Formik } from "formik";
import Input from "./component/Input";

import React from "react";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  errorColor: {
    color: theme.palette.error.main,
  },
  noWrap: {
    [theme.breakpoints.up("sm")]: {
      flexWrap: "nowrap",
    },
  },

  option: {
    paddingRight: "40px",
    paddingLeft: "10px",
    paddingBottom: "10px",
  },
  description: {
    paddingLeft: "8px",
    paddingRight: "40px",
  },
  card: {
    marginBottom: "7px",
  },
}));

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

const emptyQuestion = {
  question: "",
  options: [{ correct: "", incorrect1: "", incorrect2: "", incorrect3: "" }],
};

export default function ControlledAccordions() {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",

        questions: [emptyQuestion],
      }}
      validationSchema={FORM_VALIDATION}
      onSubmit={async (values) => {
        console.log("my values", values);
        return new Promise((res) => setTimeout(res, 2500));
      }}
    >
      {({ values, errors, isSubmitting }) => (
        <Form autoComplete="off">
          <Grid container direction="column" spacing={2}>
            <Card className={classes.card}>
              <CardContent>
                <Grid fullwidth item container spacing={2}>
                  <Grid item xs={12}>
                    <Input
                      name="name"
                      label="Name"
                      className={classes.description}
                    />

                    <Input
                      name="description"
                      label="Description"
                      className={classes.description}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <FieldArray name="questions">
              {({ push, remove }) => (
                <React.Fragment>
                  {values.questions.map((_, index) => (
                    <Grid
                      direction="column"
                      container
                      item
                      key={index}
                      spacing={2}
                      className={classes.card}
                    >
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-label="Expand"
                        >
                          <Input
                            name={`questions.[${index}].question`}
                            label="Question"
                            style={{ paddingLeft: "5px" }}
                          />
                        </AccordionSummary>

                        <AccordionDetails>
                          <Grid container direction="column" spacing={2}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              color="success"
                            >
                              Correct Option
                            </Typography>
                            <Grid container fullwidth>
                              <Input
                                className={classes.option}
                                name={`questions.[${index}].options.[0].correct`}
                                label="Correct"
                              />
                            </Grid>
                            <Typography
                              gutterBottom
                              variant="h6"
                              color="secondary"
                            >
                              Incorrect Options
                            </Typography>
                            <Grid container fullwidth>
                              <Input
                                className={classes.option}
                                name={`questions.[${index}].options.[0].incorrect1`}
                                label="Incorrect"
                              />
                            </Grid>

                            <Input
                              className={classes.option}
                              name={`questions[${index}].options.[0].incorrect2`}
                              label="Incorrect"
                            />

                            <Input
                              className={classes.option}
                              name={`questions[${index}].options.[0].incorrect3`}
                              label="Incorrect"
                            />
                          </Grid>
                        </AccordionDetails>
                        <Divider />
                        <Grid item>
                          <AccordionActions>
                            <IconButton
                              style={{ fontSize: "40px", paddingRight: "20px" }}
                              disabled={isSubmitting}
                              onClick={() => remove(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </AccordionActions>
                        </Grid>
                      </Accordion>
                    </Grid>
                  ))}

                  <Grid item container justify="flex-end">
                    <IconButton>
                      <AddOutlinedIcon
                        disabled={isSubmitting}
                        variant="contained"
                        onClick={() => push(emptyQuestion)}
                        style={{ fontSize: "40px" }}
                      />
                    </IconButton>
                  </Grid>
                </React.Fragment>
              )}
            </FieldArray>

            {/* <IconButton>
              <SaveIcon
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                color="success"
                style={{ fontSize: "40px" }}
              />
            </IconButton> */}
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="contained"
              color="primary"
              startIcon={
                isSubmitting ? <CircularProgress size="0.9rem" /> : undefined
              }
            >
              {isSubmitting ? "Submitting" : "Submit"}
            </Button>
          </Grid>

          <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
        </Form>
      )}
    </Formik>
  );
}
