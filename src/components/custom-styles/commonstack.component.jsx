import { Stack } from "@mui/system";
import React from "react";

const CommonStack = ({
  children,
  direction,
  justifyContent,
  alignItems,
  flexWrap,
  height,
  onSubmit,
  component,
  spacing,
  bgcolor,
  textAlign
}) => {
  return (
    <Stack
      direction={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}
      flexWrap={flexWrap}
      sx={{ height: { height } }}
      component={component}
      onSubmit={onSubmit}
      spacing={spacing}
      bgcolor={bgcolor}
      textAlign={textAlign}
    >
      {children}
    </Stack>
  );
};

export default CommonStack;
