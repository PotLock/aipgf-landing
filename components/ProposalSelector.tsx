import { useState, useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Check, Search, Trash2 } from "lucide-react";
import { ViewMethod } from "@/hook/near-method";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface Proposal {
  id: number;
  snapshot: {
    name: string;
    summary: string;
    editor_id: string;
    timestamp: number;
  };
}

interface ProposalSelectorProps {
  onProposalSelect: (proposal: Proposal) => void;
  selectedProposals: Proposal[];
}

const ProposalSelector = ({ onProposalSelect, selectedProposals }: ProposalSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Proposal[]>([]);
  const [allProposals, setAllProposals] = useState<Proposal[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const proposalIds = await ViewMethod(
          process.env.NEXT_PUBLIC_NETWORK === "mainnet"
            ? process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT ?? ""
            : process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT_TESTNET ?? "",
          "get_all_proposal_ids",
          {}
        );

        const proposals = await Promise.all(
          proposalIds.map(async (id: number) => {
            return await ViewMethod(
              process.env.NEXT_PUBLIC_NETWORK === "mainnet"
                ? process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT ?? ""
                : process.env.NEXT_PUBLIC_AI_PGF_FORUM_CONTRACT_TESTNET ?? "",
              "get_proposal",
              { proposal_id: id }
            );
          })
        );

        setAllProposals(proposals);
        setSearchResults(proposals);
      } catch (error) {
        console.error("Error fetching proposals:", error);
      }
    };

    fetchProposals();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setIsDropdownOpen(true);

    if (!value.trim()) {
      setSearchResults(allProposals);
      return;
    }

    const filtered = allProposals.filter(proposal => 
      proposal.snapshot.name.toLowerCase().includes(value.toLowerCase()) ||
      proposal.snapshot.summary.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const isProposalSelected = (proposal: Proposal) => {
    return selectedProposals.some(p => p.id === proposal.id);
  };

  const handleDeleteAll = () => {
    selectedProposals.forEach(proposal => onProposalSelect(proposal));
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative w-full">
        {/* Selected Proposals */}
        <div className="mt-2 space-y-2 pb-2">
            {selectedProposals.map((proposal) => (
            <div 
                key={proposal.id}
                className="flex items-center justify-between px-2 text-black"
            >
                <Link 
                    href={`${window.location.origin}/proposals/${proposal.id}`}
                    target="_blank" 
                    className="text-sm font-medium text-black"
                  >
                    #{proposal.id}: {proposal.snapshot.name}
                </Link>
                <Button
                variant="ghost"
                size="sm"
                onClick={() => onProposalSelect(proposal)}
                className="bg-transparent hover:bg-transparent"
                >
                    <Trash2 className="w-3 h-3" />
                </Button>
            </div>
            ))}
        </div>
        <div className="relative flex items-center">
          <Input
            type="text"
            placeholder="Search issues"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setIsDropdownOpen(true)}
            className="w-full pl-3 pr-10 py-2 border-[1px] border-solid border-aipgf-geyser rounded-lg"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 hover:bg-transparent p-0 bg-transparent"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && searchResults.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[300px] overflow-y-auto">
            {searchResults.map((proposal) => (
              <div
                key={proposal.id}
                className={cn(
                  "flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50",
                  isProposalSelected(proposal) && "bg-gray-50"
                )}
                onClick={() => {
                  onProposalSelect(proposal);
                  // Don't close dropdown to allow multiple selections
                }}
              >
                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium">
                      #{proposal.id}: {proposal.snapshot.name}
                    </Label>
                    {isProposalSelected(proposal) && (
                      <Check className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalSelector; 