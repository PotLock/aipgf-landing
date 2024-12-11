import type { NextPage } from "next";
import Link from "next/link";
import ButtonLogin from "./ButtonLogin";
import { useState, useEffect } from "react";

export type NavBarType = {
  className?: string;
};

const NavBar: NextPage<NavBarType> = ({ className = "" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full max-w-[1700px] mx-auto bg-aipgf-white flex flex-col items-start justify-start gap-[4.093rem] leading-[normal] tracking-[normal] sm:gap-[1rem] mq825:gap-[2.063rem] font-aipgf-manrope-semibold-1356">
      <header
        className={`self-stretch bg-aipgf-white border-aipgf-aqua-haze border-t-[1px] border-b-[1px] border-solid box-border flex flex-row items-start justify-start py-[0.687rem] px-[5rem] top-[0] z-[50] sticky max-w-full text-center text-[0.938rem] text-communityintercomcom-black-pearl font-menlo mq825:pl-[2.5rem] mq825:pr-[2.5rem] mq825:box-border ${className}`}
      >
        <div className="flex-1 flex flex-row items-end justify-between pt-[0.468rem] pb-[0.593rem] pl-[0rem] pr-[1.062rem] box-border max-w-full gap-[1.25rem]">
          <div className="flex flex-col items-start justify-start py-[0rem] pl-[0rem] pr-[1.5rem]">
            <div className="flex flex-row items-center justify-start gap-[0.562rem]">
              <Link href="/" className="flex items-center gap-[0.562rem] hover:opacity-50 transition-opacity text-black [text-decoration:none]">
                <img
                  className="h-[1.875rem] w-[1.875rem] relative overflow-hidden shrink-0"
                  alt="AIPGF Logo"
                  src="/AIPGFLogo.svg"
                />
                <span className="[text-decoration:none] relative font-semibold inline-block min-w-[3.438rem]">
                  AI-PGF
                </span>
              </Link>
            </div>
          </div>
          <nav className="m-0 w-[26.938rem] flex flex-row items-center justify-start gap-[1.312rem] max-w-full text-left text-[0.963rem] text-communityintercomcom-black-pearl font-aipgf-manrope-semibold-1356 sm:hidden">
            <Link
              href="/proposals"
              className="[text-decoration:none] cursor-pointer relative leading-[2rem] text-[inherit] inline-block min-w-[4.438rem]"
            >
              Proposals
            </Link>
            <nav className="m-0 flex-1 flex flex-row items-center justify-between gap-[1.25rem] text-left text-[0.963rem] text-communityintercomcom-black-pearl font-aipgf-manrope-semibold-1356">
              <div className="flex flex-col items-start justify-start py-[0rem] pl-[0rem] pr-[0.25rem]">
                <Link
                  href="/rfps"
                  className="[text-decoration:none] cursor-pointer relative leading-[2rem] text-[inherit] inline-block min-w-[2.188rem]"
                >
                  RFPs
                </Link>
              </div>
              <Link
                href="/explore"
                // target="_blank"
                className="[text-decoration:none] cursor-pointer relative leading-[2rem] text-[inherit] inline-block min-w-[3.75rem]"
              >
                Explore
              </Link>
              <div className="flex flex-col items-start justify-start py-[0rem] pl-[0rem] pr-[0.625rem]">
                <Link
                  target="_blank"
                  href="https://potlock.notion.site/a246c8d932ff46f69b49dcd4144e1188?v=6110401a3e1e49a1a59fb3b359e07a4e&pvs=74"
                  className="[text-decoration:none] cursor-pointer relative leading-[2rem] text-[inherit] inline-block min-w-[2.75rem]"
                >
                  About
                </Link>
              </div>
              <Link
                target="_blank"
                href="https://potlock.notion.site/Ai-PGF-Ideas-19544cbfa45949c082811e3bff206455"
                className="[text-decoration:none] cursor-pointer relative leading-[2rem] text-[inherit] inline-block min-w-[2.438rem]"
              >
                Ideas
              </Link>
              <ButtonLogin />
            </nav>
          </nav>
          <button 
            onClick={toggleMenu}
            className="hidden sm:flex flex-col justify-center items-center w-8 h-8 bg-white space-y-1.5 focus:outline-none"
          >
            <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
          <div className={`fixed top-[4.25rem] left-0 w-full bg-white h-full border-t border-aipgf-aqua-haze transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} sm:block hidden`}>
            <nav className="flex flex-col p-4 space-y-4">
              <Link
                href="/proposals"
                className="text-communityintercomcom-black-pearl hover:text-gray-600 transition-colors px-4 py-2 no-underline"
                onClick={() => setIsMenuOpen(false)}
              >
                Proposals
              </Link>
              <Link
                href="/rfps"
                className="text-communityintercomcom-black-pearl hover:text-gray-600 transition-colors px-4 py-2 no-underline"
                onClick={() => setIsMenuOpen(false)}
              >
                RFPs
              </Link>
              <Link
                href="/explore"
                className="text-communityintercomcom-black-pearl hover:text-gray-600 transition-colors px-4 py-2 no-underline"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore
              </Link>
              <Link
                href="https://potlock.notion.site/a246c8d932ff46f69b49dcd4144e1188?v=6110401a3e1e49a1a59fb3b359e07a4e&pvs=74"
                className="text-communityintercomcom-black-pearl hover:text-gray-600 transition-colors px-4 py-2 no-underline"
                onClick={() => setIsMenuOpen(false)}
                target="_blank"
              >
                About
              </Link>
              <Link
                href="https://potlock.notion.site/Ai-PGF-Ideas-19544cbfa45949c082811e3bff206455"
                className="text-communityintercomcom-black-pearl hover:text-gray-600 transition-colors px-4 py-2 no-underline"
                onClick={() => setIsMenuOpen(false)}
                target="_blank"
              >
                Ideas
              </Link>
              <div className="px-4 py-2">
                <ButtonLogin />
              </div>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
