import React from "react";
import flatMap from "lodash/flatMap";
import keyBy from "lodash/keyBy";
import map from "lodash/map";
import mapValues from "lodash/mapValues";
import transform from "lodash/transform";
import { BUTTON_POSITION } from "../types";

function baseModify(...parts) {
  return ["fui", ...parts].filter((part) => part).join("-");
}

export function defaultModifyId(id, namespace) {
  return baseModify(namespace, id);
}

export function defaultModifyClassName(className) {
  return baseModify(className);
}

export function attributesToProps(attributes) {
  let props = mapValues(keyBy(attributes, "label"), "value");

  if (props.class) {
    props.className = props.class;
    delete props.class;
  }

  return props;
}

export function keyByHandle(fields) {
  return keyBy(fields, "handle");
}

export function getFieldHandles(fields) {
  return map(fields, "handle");
}

export function getFormFields(form) {
  return flatMap(form.pages, getPageFields);
}

export function getPageFields(page) {
  return flatMap(page.rows, "fields");
}

export function getPageFieldHandles(page) {
  return getFieldHandles(getPageFields(page));
}

export function getFormDefaultValues(form) {
  return transform(
    getFormFields(form),
    (result, field) => (result[field?.handle] = ""),
    {}
  );
}

export function requiredPropErrorMessage(propName) {
  return `${propName} is required`;
}

export function requiredPropError(propName) {
  throw new Error(requiredPropErrorMessage(propName));
}

export function objectError(error, object) {
  throw new Error(`${error}: ${JSON.stringify(object)}`);
}

export function getButtonGroupJustifyContent(buttonsPosition) {
  switch (buttonsPosition) {
    case BUTTON_POSITION.CENTER:
      return "center";
    case BUTTON_POSITION.LEFT_RIGHT:
      return "space-between";
    case BUTTON_POSITION.RIGHT:
      return "flex-end";
    default:
      return "flex-start";
  }
}
