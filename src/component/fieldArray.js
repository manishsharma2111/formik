import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Grid,
  Typography,
  Divider,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import { FieldArray } from "formik";
import useForm from "../hook/useForm";
import Input from "./Input";

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
export default function FieldArrays({ values, isSubmitting, error }) {
  const { emptyQuestion } = useForm();
  const classes = useStyles();
  return (
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
                    <Typography gutterBottom variant="h6">
                      Correct Option
                    </Typography>
                    <Grid container fullwidth>
                      <Input
                        className={classes.option}
                        name={`questions.[${index}].options.[0].correct`}
                        label="Correct"
                      />
                    </Grid>
                    <Typography gutterBottom variant="h6" color="secondary">
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
  );
}
