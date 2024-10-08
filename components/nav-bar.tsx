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
          <div className="flex flex-row items-center justify-start gap-[0.562rem]">
            <a href="/" className="flex items-center gap-[0.562rem] hover:opacity-50 transition-opacity text-black [text-decoration:none]">
              <img
                className="h-[1.875rem] w-[1.875rem] relative overflow-hidden shrink-0"
                alt="AIPGF Logo"
                src="/AIPGFLogo.svg"
              />
              <span className="[text-decoration:none] relative font-bold inline-block min-w-[3.438rem]">
                AI-PGF
              </span>
            </a>
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
              href="/explore"
              // target="_blank"
              className="[text-decoration:none] cursor-pointer relative leading-[2rem] text-[inherit] inline-block min-w-[3.75rem]"
            >
              Explore
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
