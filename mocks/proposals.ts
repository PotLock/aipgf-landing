import { ProposalTypes } from "@/types/types";

export const mockProposals: ProposalTypes[] = [
  {
    proposal_id: 1,
    author_id: "alice.near",
    name: "Decentralized Education Platform",
    summary: "Building a blockchain-based platform to democratize access to quality education worldwide through peer-to-peer learning and token incentives.",
    labels: ["Quick Start", "A small build"],
    block_height: 12345678,
    ts: Date.now() - 86400000, // 1 day ago
    timeline: JSON.stringify({
      status: "DRAFT",
      updates: [
        { date: "2024-03-01", status: "DRAFT" }
      ]
    }),
    views: 156,
    linked_rfp: undefined,
    blockHeight: 123544,
    submission_deadline: Date.now() + 604800000,
    linked_proposals: []
  },
  {
    proposal_id: 2,
    author_id: "bob.near",
    name: "NEAR Protocol Gaming Hub",
    summary: "Creating a central hub for blockchain games built on NEAR, featuring tournaments, leaderboards, and cross-game asset trading.",
    labels: ["Bounty", "A small build"],
    block_height: 12345679,
    ts: Date.now() - 172800000,
    timeline: JSON.stringify({
      status: "APPROVED",
      updates: [
        { date: "2024-02-15", status: "READY FOR REVIEW" },
        { date: "2024-03-01", status: "APPROVED CONDITIONAL" }
      ]
    }),
    views: 243,
    linked_rfp: 1,
    blockHeight: 12345679,
    submission_deadline: Date.now() + 604800000,
    linked_proposals: []
  },
  {
    proposal_id: 3,
    author_id: "carol.near",
    name: "Sustainable DeFi Infrastructure",
    summary: "Developing eco-friendly DeFi protocols that minimize energy consumption while maintaining high transaction throughput.",
    labels: ["Bounty", "A small build"],
    block_height: 12345680,
    ts: Date.now() - 259200000,
    timeline: JSON.stringify({
      status: "FUNDED",
      updates: [
        { date: "2024-03-08", status: "READY FOR REVIEW" },
        { date: "2024-03-10", status: "EVALUATING" }
      ]
    }),
    views: 189,
    linked_rfp: undefined,
    blockHeight: 12345680,
    submission_deadline: Date.now() + 604800000,
    linked_proposals: []
  },
  {
    proposal_id: 4,
    author_id: "dave.near",
    name: "Cross-Chain Identity Solution",
    summary: "Building a unified identity system that works across multiple blockchain networks, focusing on privacy and security.",
    labels: ["MVP", "Bounty", "A small build"],
    block_height: 12345681,
    ts: Date.now() - 345600000,
    timeline: JSON.stringify({
      status: "CANCELLED",
      updates: [
        { date: "2024-02-01", status: "READY FOR REVIEW" },
        { date: "2024-02-15", status: "APPROVED" },
        { date: "2024-03-01", status: "PAYMENT PROCESSING" },
        { date: "2024-03-10", status: "FUNDED" }
      ]
    }),
    views: 312,
    linked_rfp: 2,
    blockHeight: 12345681,
    submission_deadline: Date.now() + 604800000,
    linked_proposals: []
  },
  {
    proposal_id: 5,
    author_id: "eve.near",
    name: "Decentralized Content Creation Platform",
    summary: "Creating a platform where content creators can monetize their work directly through NFTs and social tokens.",
    labels: ["MVP", "Bounty", "A small build"],
    block_height: 12345682,
    ts: Date.now() - 432000000,
    timeline: JSON.stringify({
      status: "REJECTED",
      updates: [
        { date: "2024-03-05", status: "READY FOR REVIEW" },
        { date: "2024-03-08", status: "DECISION" },
        { date: "2024-03-12", status: "REJECTED" }
      ]
    }),
    views: 167,
    linked_rfp: undefined,
    blockHeight: 12345682,
    submission_deadline: Date.now() + 604800000,
    linked_proposals: []
  },
  {
    proposal_id: 6,
    author_id: "frank.near",
    name: "NFT Marketplace for Digital Art",
    summary: "Building a specialized NFT marketplace focused on digital art with built-in royalty management and artist verification.",
    labels: ["MVP", "Bounty"],
    block_height: 12345683,
    ts: Date.now() - 518400000, // 6 days ago
    timeline: JSON.stringify({
      status: "FUNDED",
      updates: [
        { date: "2024-02-20", status: "DRAFT" },
        { date: "2024-02-25", status: "READY FOR REVIEW" },
        { date: "2024-03-01", status: "EVALUATING" },
        { date: "2024-03-05", status: "APPROVED" },
        { date: "2024-03-10", status: "PAYMENT PROCESSING" },
        { date: "2024-03-15", status: "FUNDED" }
      ]
    }),
    views: 289,
    linked_rfp: undefined,
    blockHeight: 12345683,
    submission_deadline: Date.now() + 604800000,
    linked_proposals: []
  },
  {
    proposal_id: 7,
    author_id: "grace.near",
    name: "Decentralized Social Media Platform",
    summary: "Creating a censorship-resistant social media platform with integrated cryptocurrency rewards.",
    labels: ["Quick Start", "Social"],
    block_height: 12345684,
    ts: Date.now() - 604800000, // 7 days ago
    timeline: JSON.stringify({
      status: "REJECTED",
      updates: [
        { date: "2024-02-28", status: "DRAFT" },
        { date: "2024-03-05", status: "READY FOR REVIEW" },
        { date: "2024-03-10", status: "EVALUATING" },
        { date: "2024-03-12", status: "DECISION" },
        { date: "2024-03-15", status: "REJECTED" }
      ]
    }),
    views: 178,
    linked_rfp: undefined,
    blockHeight: 12345684,
    submission_deadline: Date.now() + 604800000,
    linked_proposals: []
  },
  {
    proposal_id: 8,
    author_id: "henry.near",
    name: "DeFi Lending Protocol",
    summary: "Developing a cross-chain lending protocol with automated interest rate adjustment.",
    labels: ["DeFi", "Bounty"],
    block_height: 12345685,
    ts: Date.now() - 691200000, // 8 days ago
    timeline: JSON.stringify({
      status: "APPROVED",
      updates: [
        { date: "2024-03-01", status: "DRAFT" },
        { date: "2024-03-05", status: "READY FOR REVIEW" },
        { date: "2024-03-10", status: "EVALUATING" },
        { date: "2024-03-15", status: "APPROVED" }
      ]
    }),
    views: 423,
    linked_rfp: 3,
    blockHeight: 12345685,
    submission_deadline: Date.now() + 604800000,
    linked_proposals: []
  },
  {
    proposal_id: 9,
    author_id: "isabel.near",
    name: "Blockchain Gaming SDK",
    summary: "Creating a comprehensive SDK for easy integration of blockchain features into traditional games.",
    labels: ["Gaming", "SDK"],
    block_height: 12345686,
    ts: Date.now() - 777600000, // 9 days ago
    timeline: JSON.stringify({
      status: "CANCELLED",
      updates: [
        { date: "2024-02-15", status: "DRAFT" },
        { date: "2024-02-20", status: "READY FOR REVIEW" },
        { date: "2024-02-25", status: "EVALUATING" },
        { date: "2024-03-01", status: "APPROVED CONDITIONAL" },
        { date: "2024-03-15", status: "CANCELLED" }
      ]
    }),
    views: 156,
    linked_rfp: undefined,
    blockHeight: 12345686,
    submission_deadline: Date.now() + 604800000,
    linked_proposals: []
  },
  {
    proposal_id: 10,
    author_id: "jack.near",
    name: "DAO Governance Framework",
    summary: "Building a flexible and customizable framework for creating and managing DAOs on NEAR.",
    labels: ["DAO", "Governance"],
    block_height: 12345687,
    ts: Date.now() - 864000000, // 10 days ago
    timeline: JSON.stringify({
      status: "DRAFT",
      updates: [
        { date: "2024-03-15", status: "DRAFT" }
      ]
    }),
    views: 198,
    linked_rfp: undefined,
    blockHeight: 12345687,
    submission_deadline: Date.now() + 604800000,
    linked_proposals: []
  }
];
