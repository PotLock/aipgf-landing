import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

export type ContainerType = {
  className?: string;
  doINeedToBuildOnNEAR?: string;
  canISubmitAnExistingProduct?: string;
  whatIfImJustBuildingOpenSour?: string;

  /** Style props */
  propAlignSelf?: CSSProperties["alignSelf"];
  propFlex?: CSSProperties["flex"];
  propMinWidth?: CSSProperties["minWidth"];
  propGap?: CSSProperties["gap"];
  propDisplay?: CSSProperties["display"];
  propGap1?: CSSProperties["gap"];
  question03Padding?: CSSProperties["padding"];
  question5Padding?: CSSProperties["padding"];
};

const Container: NextPage<ContainerType> = ({
  className = "",
  propAlignSelf,
  propFlex,
  propMinWidth,
  propGap,
  doINeedToBuildOnNEAR,
  propDisplay,
  propGap1,
  canISubmitAnExistingProduct,
  whatIfImJustBuildingOpenSour,
  question03Padding,
  question5Padding,
}) => {
  const containerStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      flex: propFlex,
      minWidth: propMinWidth,
    };
  }, [propAlignSelf, propFlex, propMinWidth]);

  const question03Style: CSSProperties = useMemo(() => {
    return {
      gap: propGap,
      padding: question03Padding,
    };
  }, [propGap, question03Padding]);

  const doINeedStyle: CSSProperties = useMemo(() => {
    return {
      display: propDisplay,
    };
  }, [propDisplay]);

  const question5Style: CSSProperties = useMemo(() => {
    return {
      gap: propGap1,
      padding: question5Padding,
    };
  }, [propGap1, question5Padding]);

  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start max-w-full z-[1] text-left text-[1.5rem] text-grays-black font-p ${className}`}
      style={containerStyle}
    >
      <div
        className="self-stretch border-aipgf-geyser border-[1px] border-solid flex flex-row items-start justify-between pt-[1.437rem] pb-[1.375rem] pl-[1.937rem] pr-[0.562rem] gap-[1.25rem] mq825:flex-wrap"
        style={question03Style}
      >
        <h1
          className="m-0 relative text-inherit tracking-[-0.2px] leading-[1.688rem] font-medium font-[inherit] sm:text-[1.188rem] sm:leading-[1.313rem]"
          style={doINeedStyle}
        >
          {doINeedToBuildOnNEAR}
        </h1>
        <img className="h-[2rem] w-[2rem] relative" alt="" src="/plus-4.svg" />
      </div>
      <div
        className="self-stretch border-aipgf-geyser border-[1px] border-solid box-border flex flex-row items-start justify-between pt-[1.437rem] pb-[1.375rem] pl-[1.937rem] pr-[0.562rem] gap-[1.25rem] max-w-full mq825:flex-wrap"
        style={question5Style}
      >
        <h1 className="m-0 relative text-inherit tracking-[-0.2px] leading-[1.688rem] font-medium font-[inherit] inline-block max-w-full sm:text-[1.188rem] sm:leading-[1.313rem]">
          {canISubmitAnExistingProduct}
        </h1>
        <img className="h-[2rem] w-[2rem] relative" alt="" src="/plus-4.svg" />
      </div>
      <div className="self-stretch border-aipgf-geyser border-[1px] border-solid box-border flex flex-row items-start justify-between pt-[1.437rem] pb-[1.375rem] pl-[1.937rem] pr-[0.562rem] gap-[1.25rem] max-w-full mq825:flex-wrap">
        <h1 className="m-0 relative text-inherit tracking-[-0.2px] leading-[1.688rem] font-medium font-[inherit] inline-block max-w-full sm:text-[1.188rem] sm:leading-[1.313rem]">
          {whatIfImJustBuildingOpenSour}
        </h1>
        <img className="h-[2rem] w-[2rem] relative" alt="" src="/plus-4.svg" />
      </div>
    </div>
  );
};

export default Container;
