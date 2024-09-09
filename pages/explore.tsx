import type { NextPage } from "next";
import NavBar from "../components/nav-bar";
import Footer from "../components/footer";
import BuildCTA from "../components/buildcta";
import AgentsExplore from "../components/AgentsExplore";
import agentsData from "../data/agents.json";
import { useState } from "react";
import { AgentData } from "./types/AgentData"; // Make sure to import the AgentData type

const Homepage: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredAgents: AgentData[] = agentsData.filter(agent => 
    (agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     agent.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedTags.length === 0 || selectedTags.every(tag => agent.tags.includes(tag)))
  );

  return (
    <div className="w-full max-w-[1700px] mx-auto relative bg-aipgf-white overflow-hidden flex flex-col items-start justify-start gap-[4.093rem] leading-[normal] tracking-[normal] sm:gap-[1rem] mq825:gap-[2.063rem]">
      <NavBar />
      <main className="self-stretch flex flex-col items-start justify-start gap-[2.937rem] max-w-full mq825:gap-[1.438rem]">
        <section className="self-stretch flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[1.062rem] box-border gap-[2rem] max-w-full text-left text-[2.5rem] text-aipgf-shark font-p mq825:gap-[1rem]">
          <div className="self-stretch flex flex-row items-start justify-start py-[0rem] px-[5rem] box-border max-w-full mq825:pl-[2.5rem] mq825:pr-[2.5rem] mq825:box-border">
            <div className="flex-1 rounded-4xs border-aipgf-geyser border-[1px] border-solid box-border overflow-hidden flex flex-col items-center justify-center py-[1.312rem] px-[1rem] gap-[1rem] max-w-full text-center">
              <h1 className="m-0 relative text-inherit tracking-[-1px] leading-[3rem] font-medium font-[inherit] sm:text-[1.5rem] sm:leading-[1.813rem] mq825:text-[2rem] mq825:leading-[2.375rem]">
                Explore AI-PGF Agents
              </h1>
              <h3 className="m-0 relative text-[1.125rem] font-normal font-[inherit] max-w-[40.313rem]">
                See what the AI-PGF ecosystem is building
              </h3>
              <div className="w-full max-w-[600px] flex flex-col items-center gap-4">
                <input
                  type="text"
                  placeholder="Search agents..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="flex flex-wrap gap-2 justify-center">
                  {Array.from(new Set(agentsData.flatMap(agent => agent.tags))).map((tag) => (
                    <button
                      key={tag}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-white'
                      }`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <AgentsExplore agents={filteredAgents} />
      </main>
      <div className="self-stretch flex flex-col items-start justify-start max-w-full">
        <BuildCTA />
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
