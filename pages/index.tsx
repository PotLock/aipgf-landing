import type { NextPage } from "next";
import NavBar from "../components/nav-bar";
import FrameComponent1 from "../components/frame-component1";
import CompanyLogo from "../components/company-logo";
import HeroFundingCards from "../components/HeroFundingCards";
import FeatureCards from "../components/feature-cards";
import HeroProposals from "../components/HeroProposals";
import GrantApplication from "../components/grant-application";
import FundingAgents from "../components/FundingAgents";
import HeroFAQs from "../components/HeroFAQs";
import Container1 from "../components/container1";
import Footer from "../components/footer";

const Homepage: NextPage = () => {
  return (
    <div className="w-full max-w-[1700px] mx-auto relative bg-aipgf-white overflow-hidden flex flex-col items-start justify-start gap-[4.093rem] leading-[normal] tracking-[normal] sm:gap-[1rem] mq825:gap-[2.063rem]">
      <NavBar />
      <main className="self-stretch flex flex-col items-start justify-start gap-[2.937rem] max-w-full mq825:gap-[1.438rem]">
        <FrameComponent1 />
        <section className="self-stretch flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[1.062rem] box-border gap-[2rem] max-w-full text-left text-[2.5rem] text-aipgf-shark font-p mq825:gap-[1rem]">
          <CompanyLogo />
          <div className="self-stretch flex flex-row items-start justify-start py-[0rem] px-[5rem] box-border max-w-full mq825:pl-[2.5rem] mq825:pr-[2.5rem] mq825:box-border">
            <div className="flex-1 rounded-4xs border-aipgf-geyser border-[1px] border-solid box-border overflow-hidden flex flex-row items-start justify-start py-[1.312rem] px-[1rem] gap-[2.5rem] max-w-full lg:flex-wrap lg:justify-center mq825:gap-[1.25rem]">
              <h1 className="m-0 relative text-inherit tracking-[-1px] leading-[3rem] font-medium font-[inherit] sm:text-[1.5rem] sm:leading-[1.813rem] mq825:text-[2rem] mq825:leading-[2.375rem]">
                What is AI-PGF
              </h1>
              <div className="w-[40.313rem] flex flex-col items-start justify-start pt-[0.062rem] px-[0rem] pb-[0rem] box-border max-w-full text-[1.125rem]">
                <h3 className="m-0 self-stretch relative text-inherit font-normal font-[inherit]">
                  we're redefining grant funding by leveraging AI to streamline
                  workflows, reduce overhead, and ensure promising projects
                  receive timely support.
                </h3>
              </div>
            </div>
          </div>
          <HeroFundingCards />
          <FeatureCards />
        </section>
        <HeroProposals />
        <GrantApplication />
        <FundingAgents />
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
