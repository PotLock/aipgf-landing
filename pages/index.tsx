import type { NextPage } from "next";
import NavBar from "../components/nav-bar";
import FrameComponent1 from "../components/frame-component1";
import CompanyLogo from "../components/company-logo";
import FrameComponent2 from "../components/frame-component2";
import FeatureCards from "../components/feature-cards";
import FrameComponent3 from "../components/frame-component3";
import GrantApplication from "../components/grant-application";
import FrameComponent4 from "../components/frame-component4";
import FrameComponent5 from "../components/frame-component5";
import Container1 from "../components/container1";
import Footer from "../components/footer";
import styles from "./index.module.css";

const Homepage: NextPage = () => {
  return (
    <div className={styles.homepage}>
      <NavBar />
      <main className={styles.frameParent}>
        <FrameComponent1 />
        <section className={styles.companyLogoParent}>
          <CompanyLogo />
          <div className={styles.headingSubheadingWrapper}>
            <div className={styles.headingSubheading}>
              <h1 className={styles.whatIsAiPgf}>What is AI-PGF</h1>
              <div className={styles.wereRedefiningGrantFundingWrapper}>
                <h3 className={styles.wereRedefiningGrant}>
                  we're redefining grant funding by leveraging AI to streamline
                  workflows, reduce overhead, and ensure promising projects
                  receive timely support.
                </h3>
              </div>
            </div>
          </div>
          <FrameComponent2 />
          <FeatureCards />
        </section>
        <FrameComponent3 />
        <GrantApplication />
        <FrameComponent4 />
        <FrameComponent5 />
      </main>
      <div className={styles.containerParent}>
        <Container1 />
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
