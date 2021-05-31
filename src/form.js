import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  makeStyles,
} from "@material-ui/core";

import { Form, Formik } from "formik";
import Input from "./component/Input";
import useForm from "./hook/useForm";
import FieldArrays from "./component/fieldArray";
import React from "react";

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

export default function ControlledAccordians() {
  const classes = useStyles();
  const { FORM_VALIDATION, onSubmit, initialValues } = useForm();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={FORM_VALIDATION}
      onSubmit={onSubmit}
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

            <FieldArrays
              values={values}
              error={errors}
              isSubmitting={isSubmitting}
            />

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
