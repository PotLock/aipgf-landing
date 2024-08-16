import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import styles from "./tag.module.css";

export type TagType = {
  className?: string;
  x?: string;
  cancel?: string;

  /** Style props */
  propBackgroundColor?: CSSProperties["backgroundColor"];
  propWidth?: CSSProperties["width"];
  propFontWeight?: CSSProperties["fontWeight"];
  propColor?: CSSProperties["color"];
};

const Tag: NextPage<TagType> = ({
  className = "",
  propBackgroundColor,
  propWidth,
  x,
  cancel,
  propFontWeight,
  propColor,
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
    };
  }, [propFontWeight, propColor]);

  return (
    <button className={[styles.tag, className].join(" ")} style={tagStyle}>
      <div className={styles.icon}>
        <img className={styles.xIcon} alt="" src={x} />
      </div>
      <div className={styles.cancel} style={cancelStyle}>
        {cancel}
      </div>
    </button>
  );
};

export default Tag;
