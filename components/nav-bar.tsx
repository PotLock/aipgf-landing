import type { NextPage } from "next";

export type NavBarType = {
  className?: string;
};

const NavBar: NextPage<NavBarType> = ({ className = "" }) => {
  return (
    <header
      className={`self-stretch bg-aipgf-white border-aipgf-aqua-haze border-t-[1px] border-solid border-aipgf-aqua-haze border-b-[1px] border-solid box-border flex flex-row items-start justify-start py-[0.687rem] px-[5rem] top-[0] z-[99] sticky max-w-full text-center text-[0.938rem] text-communityintercomcom-black-pearl font-menlo mq825:pl-[2.5rem] mq825:pr-[2.5rem] mq825:box-border ${className}`}
    >
      <div className="flex-1 flex flex-row items-end justify-between pt-[0.468rem] pb-[0.593rem] pl-[0rem] pr-[1.062rem] box-border max-w-full gap-[1.25rem]">
        <div className="flex flex-col items-start justify-start py-[0rem] pl-[0rem] pr-[1.5rem]">
          <div className="flex flex-row items-start justify-start">
            <div className="flex flex-row items-center justify-start gap-[0.562rem]">
              <div className="h-[1.875rem] w-[1.875rem] relative overflow-hidden shrink-0">
                <div className="absolute h-[89%] w-[84.33%] top-[4.33%] right-[7.33%] bottom-[6.67%] left-[8.33%]">
                  <img
                    className="absolute h-[88.76%] w-full top-[0%] right-[0%] bottom-[11.24%] left-[0%] max-w-full overflow-hidden max-h-full"
                    alt=""
                    src="/vector.svg"
                  />
                  <div className="absolute top-[1.606rem] left-[0.375rem] w-[0.1rem] h-[0.056rem]" />
                  <img
                    className="absolute h-[25.09%] w-[14.62%] top-[25.84%] right-[56.92%] bottom-[49.06%] left-[28.46%] max-w-full overflow-hidden max-h-full z-[1]"
                    alt=""
                    src="/vector-1.svg"
                  />
                  <img
                    className="absolute h-[25.09%] w-[14.62%] top-[26.22%] right-[28.06%] bottom-[48.69%] left-[57.31%] max-w-full overflow-hidden max-h-full z-[1]"
                    alt=""
                    src="/vector-2.svg"
                  />
                  <img
                    className="absolute h-[9.74%] w-[22.92%] top-[52.43%] right-[38.34%] bottom-[37.83%] left-[38.74%] max-w-full overflow-hidden max-h-full z-[1]"
                    alt=""
                    src="/vector-3.svg"
                  />
                  <img
                    className="absolute h-[6.37%] w-[7.11%] top-[51.69%] right-[24.11%] bottom-[41.95%] left-[68.77%] max-w-full overflow-hidden max-h-full z-[1]"
                    alt=""
                    src="/vector-4.svg"
                  />
                  <img
                    className="absolute h-[6.37%] w-[6.72%] top-[51.69%] right-[68.77%] bottom-[41.95%] left-[24.51%] max-w-full overflow-hidden max-h-full z-[1]"
                    alt=""
                    src="/vector-5.svg"
                  />
                </div>
              </div>
              <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block min-w-[3.438rem]">
                AI-PGF
              </a>
            </div>
          </div>
        </div>
        <nav className="m-0 w-[21.938rem] flex flex-row items-start justify-start gap-[1.312rem] max-w-full text-left text-[0.963rem] text-communityintercomcom-black-pearl font-aipgf-manrope-semibold-1356 sm:hidden">
          <a
            target="_blank"
            href="https://forum.aipgf.com/bos.forum.potlock.near/widget/app?page=proposals"
            className="[text-decoration:none] cursor-pointer relative leading-[2rem] text-[inherit] inline-block min-w-[4.438rem]"
          >
            Proposals
          </a>
          <nav className="m-0 flex-1 flex flex-row items-start justify-between gap-[1.25rem] text-left text-[0.963rem] text-communityintercomcom-black-pearl font-aipgf-manrope-semibold-1356">
            <div className="flex flex-col items-start justify-start py-[0rem] pl-[0rem] pr-[0.25rem]">
              <a
                href="https://forum.aipgf.com/bos.forum.potlock.near/widget/app?page=rfps"
                target="_blank"
                className="[text-decoration:none] cursor-pointer relative leading-[2rem] text-[inherit] inline-block min-w-[2.188rem]"
              >
                RFPs
              </a>
            </div>
            <a
              href="https://forum.aipgf.com"
              target="_blank"
              className="[text-decoration:none] cursor-pointer relative leading-[2rem] text-[inherit] inline-block min-w-[3.75rem]"
            >
              Projects
            </a>
            <div className="flex flex-col items-start justify-start py-[0rem] pl-[0rem] pr-[0.625rem]">
              <a
                target="_blank"
                href="https://potlock.notion.site/a246c8d932ff46f69b49dcd4144e1188?v=6110401a3e1e49a1a59fb3b359e07a4e&pvs=74"
                className="[text-decoration:none] cursor-pointer relative leading-[2rem] text-[inherit] inline-block min-w-[2.75rem]"
              >
                About
              </a>
            </div>
            <a
              target="_blank"
              href="https://potlock.notion.site/Ai-PGF-Ideas-19544cbfa45949c082811e3bff206455"
              className="[text-decoration:none] cursor-pointer relative leading-[2rem] text-[inherit] inline-block min-w-[2.438rem]"
            >
              Ideas
            </a>
          </nav>
        </nav>
        <div className="h-[3.063rem] hidden flex-col items-start justify-center py-[0rem] pl-[0rem] pr-[0.625rem] box-border text-[0.869rem] text-aipgf-white font-aipgf-manrope-semibold-1356">
          <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pl-[0.5rem] pr-[0rem]">
            <div className="flex-1 flex flex-row items-center justify-start py-[0rem] pl-[0.5rem] pr-[0rem] z-[1]">
              <div className="flex-1 shadow-[0px_0px_0px_2px_#0057ff_inset] rounded-3xl bg-communityintercomcom-blue-ribbon overflow-hidden flex flex-row items-center justify-start py-[0rem] px-[1rem] box-border min-w-[4.375rem]">
                <div className="flex flex-col items-start justify-start py-[0rem] pl-[0rem] pr-[0.25rem]">
                  <img
                    className="w-[1rem] h-[1rem] relative"
                    alt=""
                    src="/svg.svg"
                  />
                </div>
                <div className="flex-1 flex flex-col items-center justify-start">
                  <div className="self-stretch relative leading-[2.5rem] whitespace-nowrap">
                    Submit Proposal
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
