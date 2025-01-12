import type { NextPage } from "next";
import NavBar from "../components/nav-bar";
import FrameComponent1 from "../components/frame-component1";
import CompanyLogo from "../components/company-logo";
import HeroFundingCards from "../components/HeroFundingCards";
import HeroProposals from "../components/HeroProposals";
import GrantApplication from "../components/grant-application";
import HeroFAQs from "../components/HeroFAQs";
import Container1 from "../components/container1";
import Footer from "../components/footer";
import FundingAgents from "../components/FundingAgents";



const Homepage: NextPage = () => {
  return (
    <div className="w-full mx-auto relative bg-aipgf-white overflow-hidden flex flex-col items-start justify-start gap-[4.093rem] leading-[normal] tracking-[normal] sm:gap-[2rem] mq825:gap-[2.063rem]">
      <NavBar />
      <main className="self-stretch flex flex-col items-start md:ml-20 justify-start gap-[2.937rem] sm:gap-[1.5rem] max-w-full md:px-[1rem]">
        <FrameComponent1 />
        <section className="self-stretch flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[1.062rem] box-border gap-[2rem] max-w-full text-left text-[2.5rem] text-aipgf-shark font-p mq825:gap-[1.5rem] sm:gap-[1rem]">
          <CompanyLogo />
          <div className="self-stretch flex flex-row items-start justify-start py-[0rem] px-[16px] md:px-[5rem] box-border max-w-full">
            <div className="flex-1 rounded-4xs border-aipgf-geyser border-[1px] border-solid box-border overflow-hidden flex flex-col lg:flex-col items-start justify-start py-[1.5rem] px-[1.5rem] gap-[1.5rem] max-w-full sm:py-[1rem] sm:px-[1rem] sm:gap-[1rem]">
              <h1 className="m-0 relative text-inherit tracking-[-1px] leading-[3rem] font-medium font-[inherit] lg:text-[2rem] lg:leading-[2.5rem] mq825:text-[1.75rem] mq825:leading-[2.125rem] sm:text-[1.25rem] sm:leading-[1.5rem]">
                What is AI-PGF
              </h1>
              <div className="w-full flex flex-col items-start justify-start">
                <h3 className="m-0 self-stretch relative text-[1.125rem] font-normal lg:text-[1rem] mq825:text-[0.938rem] sm:text-[0.875rem] sm:leading-[1.25rem]">
                  we're redefining grant funding by leveraging AI to streamline
                  workflows, reduce overhead, and ensure promising projects
                  receive timely support.
                </h3>
              </div>
            </div>
          </div>
          <HeroFundingCards />
        </section>
        <HeroProposals />
        <GrantApplication />
        <FundingAgents/>
        <HeroFAQs />
      </main>
      <div className="self-stretch flex flex-col items-start justify-start max-w-full">
        <Container1 />
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
