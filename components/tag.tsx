import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

export type TagType = {
  className?: string;
  x?: string;
  cancel?: string;

  /** Style props */
  propBackgroundColor?: CSSProperties["backgroundColor"];
  propWidth?: CSSProperties["width"];
  propFontWeight?: CSSProperties["fontWeight"];
  propColor?: CSSProperties["color"];
  cancelFontSize?: CSSProperties["fontSize"];
};

const Tag: NextPage<TagType> = ({
  className = "",
  propBackgroundColor,
  propWidth,
  x,
  cancel,
  propFontWeight,
  propColor,
  cancelFontSize,
}) => {
  const tagStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
      width: propWidth,
    };
  }, [propBackgroundColor, propWidth]);

  const cancelStyle: CSSProperties = useMemo(() => {
    return {
      fontWeight: propFontWeight,
      color: propColor,
      fontSize: cancelFontSize,
    };
  }, [propFontWeight, propColor, cancelFontSize]);

  return (
    <button
      className={`cursor-pointer [border:none] py-[0.312rem] px-[0.5rem] bg-aipgf-red-ribbon w-[5.475rem] rounded-3xl flex flex-row items-center justify-center box-border gap-[0.187rem] ${className}`}
      style={tagStyle}
    >
      <div className="flex flex-col items-start justify-start">
        <img className="w-[1rem] h-[1rem] relative" alt="" src={x} />
      </div>
      <div
        className="flex-1 relative text-[0.85rem] leading-[1rem] font-semibold font-aipgf-manrope-semibold-1356 text-aipgf-white text-center"
        style={cancelStyle}
      >
        {cancel}
      </div>
    </button>
  );
};

export default Tag;
