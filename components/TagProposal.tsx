import { FC } from 'react';
import { labelIcons, LabelType } from '../lib/icons';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretDown } from '@phosphor-icons/react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { styled } from '@stitches/react';


const StyledContent = styled(DropdownMenuPrimitive.Content, {
  width: 'var(--radix-dropdown-menu-trigger-width)',
  maxWidth: '100%'
});

interface TagProposalProps {
  label: LabelType;
  onSelect?: (label: LabelType) => void;
}

const TagProposal: FC<TagProposalProps> = ({ label, onSelect }) => {
  const IconComponent = labelIcons[label]?.icon;
  const { color, textColor } = labelIcons[label] || {};

  return (
    <div className="w-full">
      <DropdownMenu>
        <DropdownMenuTrigger 
          className="w-full flex items-center justify-between p-4 rounded-xl border-[1px] border-aipgf-geyser border-solid hover:border-aipgf-geyser transition-colors bg-white"
        >
          <div className="flex items-center gap-3">
            {IconComponent && (
              <IconComponent 
                size={24} 
                weight="bold"
                className="mt-0.5"
                style={{ color: textColor }} 
              />
            )}
            <div className="flex flex-col text-start gap-0.5">
              <span className="text-[15px] font-medium text-[#111827]">{label}</span>
              <span className="text-[13px] text-[#6B7280] leading-tight">
                {labelIcons[label]?.description}
              </span>
            </div>
          </div>
          <CaretDown 
            size={16} 
            weight="bold" 
            className="text-[#9CA3AF] ml-2"
          />
        </DropdownMenuTrigger>
        
        <StyledContent
          align="start"
          sideOffset={4}
          className="bg-white rounded-xl border-[1px] border-aipgf-geyser border-solid shadow-lg p-1.5"
        >
          {Object.entries(labelIcons).map(([key, value]) => {
            const Icon = value.icon;
            return (
              <DropdownMenuItem
                key={key}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F9FAFB] focus:bg-[#F9FAFB] cursor-pointer outline-none"
                onClick={() => onSelect?.(key as LabelType)}
              >
                <Icon 
                  size={24} 
                  weight="bold"
                  className="mt-0.5"
                  style={{ color: value.textColor }}
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-medium text-[#111827]">{key}</span>
                  <span className="text-[13px] text-[#6B7280] leading-tight">
                    {value.description}
                  </span>
                </div>
              </DropdownMenuItem>
            );
          })}
        </StyledContent>
      </DropdownMenu>
    </div>
  );
};

export default TagProposal;