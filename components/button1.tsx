import type { NextPage } from "next";
import { useMemo, type CSSProperties, useCallback } from "react";
import { Button } from "@mui/material";

export type Button1Type = {
  className?: string;
  button?: string;

  /** Style props */
  propHeight?: CSSProperties["height"];
  propWidth?: CSSProperties["width"];
  buttonFlex?: CSSProperties["flex"];

  /** Action props */
  onButtonClick3?: () => void;
};

const Button1: NextPage<Button1Type> = ({
  className = "",
  button,
  onButtonClick3,
  propHeight,
  propWidth,
  buttonFlex,
}) => {
  const buttonStyle: CSSProperties = useMemo(() => {
    return {
      height: propHeight,
      width: propWidth,
      flex: buttonFlex,
    };
  }, [propHeight, propWidth, buttonFlex]);

  const onButtonClick = useCallback(() => {
    window.open("https://app.aipgf.com");
  }, []);

  return (
    <Button
      className={`h-[4.25rem] w-[9.75rem] hover:opacity-50 transition-all ease-in-out duration-400 cursor-pointer ${className}`}
      disableElevation
      variant="contained"
      sx={{
        textTransform: "none",
        color: "#1c1c1e",
        fontSize: "23",
        background: "#fff",
        border: "#93949d solid 1px",
        borderRadius: "42px",
        "&:hover": { background: "#fff" },
        width: 156,
        height: 68,
      }}
      onClick={onButtonClick3}
      style={buttonStyle}
    >
      {button}
    </Button>
  );
};

export default Button1;
