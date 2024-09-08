import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import { Button } from "@mui/material";
import Link from "next/link";

export type Button1Type = {
  className?: string;
  button?: string;
  disabled?: boolean;
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
  disabled = false,
  buttonFlex,
}) => {
  const buttonStyle: CSSProperties = useMemo(() => {
    return {
      height: propHeight,
      width: propWidth,
      flex: buttonFlex,
    };
  }, [propHeight, propWidth, buttonFlex]);

  return (
    <Link href="/explore" passHref>
      <Button
        className={`h-[4.25rem] w-[9.75rem] hover:opacity-50 transition-all ease-in-out duration-400 cursor-pointer ${className}`}
        disableElevation
        disabled={disabled}
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
    </Link>
  );
};

export default Button1;
