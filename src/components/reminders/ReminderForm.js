import React, { Component } from "react";
import PropTypes from "prop-types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import FormTextInput from "../shared/forms/FormTextInput";
import FormDatePicker from "../shared/forms/FormDatePicker";
import FormErrorMessage from "../shared/forms/FormErrorMessage";
import FormLabel from "../shared/forms/FormLabel";
import FormFieldset from "../shared/forms/FormFieldset";
import BaseButton from "../shared/buttons/BaseButton";
import FormActions from "../shared/forms/FormActions";
import CheckIcon from "../icons/CheckIcon";
import {
  DATE_FORMAT,
  DATE_REGEX,
  TIME_FORMAT,
  TIME_REGEX,
} from "../../helpers/calendar";
import FormTimePicker from "../shared/forms/FormTimePicker";
import ReminderColorPicker from "./ReminderColorPicker";
import { ALL_COLORS } from "../../helpers/colors";
import { ReminderPropType } from "../shared/prop-types/reminder";
import ReminderForecastContainer from "./forecast/ReminderForecastContainer";

const ReminderSchema = Yup.object().shape({
  description: Yup.string()
    .max(30, "لطفا بیش از 30 کاراکتر وارد نکنید.")
    .required("لطفا اعلان خود را وارد کنید.(حداکثر 30 کاراکتر)"),
  color: Yup.string()
    .oneOf(ALL_COLORS, "رنگ ناشناخنه!")
    .required("لطفا یک رنگ انتخاب کنید."),
  date: Yup.string()
    .matches(DATE_REGEX, `تاریخ باید به فرمت باشد (${DATE_FORMAT}).`)
    .required("لطفا تاریخ اعلان را مشخص کنید."),
  time: Yup.string()
    .matches(TIME_REGEX, `زمان باید به فرمت باشد (${TIME_FORMAT}).`)
    .required("لطفا زمان اعلان را مشخص کنید."),
});

class ReminderForm extends Component {
  static propTypes = {
    reminder: ReminderPropType.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  getInitialValues = () => {
    const { description, color, date, time, city } = this.props.reminder;

    return {
      description,
      color,
      date,
      time,
      city: city,
    };
  };

  handleSubmit = (values) => {
    this.props.onSubmit({
      id: this.props.reminder.id,
      description: values.description,
      color: values.color,
      city: values.city,
      date: values.date,
      time: values.time,
    });
  };

  render() {
    return (
      <Formik
        initialValues={this.getInitialValues()}
        validationSchema={ReminderSchema}
        onSubmit={this.handleSubmit}
      >
        <Form className="w-full flex flex-col gap-3">
          <FormFieldset>
            <FormLabel htmlFor="description">اعلان خود را وارد کنید </FormLabel>
            <div className="flex flex-row flex-wrap gap-2">
              <Field
                id="description"
                name="description"
                component={FormTextInput}
                placeholder="تماس دقیقه ای"
                className="flex-grow"
              />
              <Field
                name="color"
                as={ReminderColorPicker}
                className="flex-shrink"
              />
            </div>
            <ErrorMessage component={FormErrorMessage} name="description" />
            <ErrorMessage component={FormErrorMessage} name="color" />
          </FormFieldset>

          <FormFieldset>
            <FormLabel htmlFor="date">زمان</FormLabel>

            <div className="flex flex-row flex-wrap gap-2">
              <Field
                id="date"
                name="date"
                component={FormDatePicker}
                className="flex-grow"
              />
              <Field
                id="time"
                name="time"
                component={FormTimePicker}
                className="w-full sm:w-44"
              />
            </div>
            <ErrorMessage component={FormErrorMessage} name="date" />
            <ErrorMessage component={FormErrorMessage} name="time" />
          </FormFieldset>

          {/* <FormFieldset>
            <FormLabel htmlFor="city">Where?</FormLabel>
            <Field
              id="city"
              name="city"
              component={FormTextInput}
              placeholder="e.g.: New York City"
            />
            <ErrorMessage component={FormErrorMessage} name="city" />
          </FormFieldset> */}

          <ReminderForecastContainer names={{ city: "city", date: "date" }} />

          <FormActions>
            <BaseButton
              type="submit"
              className="bg-indigo-700 hover:bg-indigo-500 text-white"
            >
              <CheckIcon svgClassName="w-6 h-6" />
              تایید
            </BaseButton>
          </FormActions>
        </Form>
      </Formik>
    );
  }
}

export default ReminderForm;
