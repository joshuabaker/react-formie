import React, { forwardRef } from "react";
import { BaseWrapper } from "./BaseWrapper";
import { useFormieContext } from "./FormieContext";

export const PageHeader = forwardRef((props, ref) => {
  const { components, form, options } = useFormieContext();

  return (
    <BaseWrapper
      className={options.modifyClassName("page-header")}
      ref={ref}
      {...props}
    >
      {form.settings.displayCurrentPageTitle && <components.PageTitle />}
    </BaseWrapper>
  );
});