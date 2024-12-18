import type { NextPage } from "next";
import Link from 'next/link';

export type CompanyLogoType = {
  className?: string;
};

interface LogoInfo {
  src: string;
  alt: string;
  href: string;
  visible: boolean;
}

const logos: LogoInfo[] = [
  {
    src: "/-potlock.svg",
    alt: "PotLock Logo",
    href: "https://potlock.org",
    visible: true,
  },
  {
    src: "/nearfoundation-1@2x.png",
    alt: "NEAR Foundation Logo",
    href: "https://near.foundation",
    visible: true,
  },
  {
    src: "/viaprizegraytransparent.png",
    alt: "Viaprize Logo",
    href: "https://viaprize.org",
    visible: true,
  },
  {
    src: "/lottopgf.png",
    alt: "LottoPGF Logo",
    href: "https://lottopgf.org",
    visible: true,
  },
  {
    src: "/white-logo56effa5f-1@2x.png",
    alt: "Masa Logo",
    href: "https://masa.ai",
    visible: false,
  },
  {
    src: "/642c2b9f9cb98d610d7661e6-gtciconlight-1.svg",
    alt: "Gitcoin Icon",
    href: "https://gitcoin.co",
    visible: false,
  },
];

const CompanyLogo: NextPage<CompanyLogoType> = ({ className = "" }) => {
  const fixedHeightRem = 3; // Fixed height in rem

  return (
    <div
      className={`self-stretch mt-24 sm:mt-5 flex flex-col items-center justify-center py-[3.5rem] px-[3.75rem] gap-[2rem] text-center text-[1.25rem] text-gray-900 font-p mq825:gap-[1rem] mq825:pl-[1.875rem] mq825:pr-[1.875rem] mq825:box-border ${className}`}
    >
      <h2 className="m-0 self-stretch relative text-inherit tracking-[-0.01em] leading-[1.75rem] font-bold font-[inherit] sm:text-[1rem] sm:leading-[1.375rem]">
        Building with the Best
      </h2>
      <div className="self-stretch sm:flex-col sm:space-y-6 flex flex-row items-center justify-evenly py-[0rem] px-[14.125rem] gap-[1.25rem] sm:pl-[1.25rem] sm:pr-[1.25rem] sm:box-border mq825:pl-[3.5rem] mq825:pr-[3.5rem] mq825:box-border mq1425:flex-wrap mq1425:pl-[7.063rem] mq1425:pr-[7.063rem] mq1425:box-border">
        {logos.filter(logo => logo.visible).map((logo, index) => (
          <Link key={index} href={logo.href} target="_blank" rel="noopener noreferrer">
            <img
              src={logo.src}
              alt={logo.alt}
              style={{ height: `${fixedHeightRem}rem`, width: 'auto' }}
              className="transition-opacity duration-300 hover:opacity-80 cursor-pointer"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompanyLogo;