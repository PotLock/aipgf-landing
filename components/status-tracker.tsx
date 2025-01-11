import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@mui/material"

export default function StatusTracker() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="w-full">
        <Select defaultValue="accepting">
          <SelectTrigger className="w-full border-[1px] border-aipgf-geyser border-solid rounded-lg">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="w-full border-[1px] border-aipgf-geyser border-solid rounded-lg md:text-lg text-sm">
            <SelectItem className="text-sm" value="accepting">Accepting Submission</SelectItem>
            <SelectItem className="text-sm" value="evaluation">Evaluation</SelectItem>
            <SelectItem className="text-sm" value="decision">Decision</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative space-y-4">
        <div className="absolute left-[7px] top-[14px] h-[calc(100%-24px)] w-[2px] bg-muted" />
        <div className="relative flex gap-2">
          <div className="relative">
            <div className="h-4 w-4 rounded-full border-[2px] border-orange-400 border-solid bg-white" />
          </div>
          <div className="flex-1 rounded-lg bg-orange-50/50 px-4 py-3 flex flex-col gap-1">
            <Label className="font-semibold text-sm">1. Accepting Submissions</Label>
            <Label className="text-muted-foreground text-xs">During this stage, the RFP is still open for submissions.</Label>
          </div>
        </div>

        <div className="relative flex gap-2">
          <div className="relative">
            <div className="h-4 w-4 rounded-full border-[2px] border-gray-300 border-solid bg-white" />
          </div>
          <div className="flex-1 pt-1 flex flex-col gap-1 px-3">
            <Label className="font-semibold text-sm">2. Evaluation</Label>
            <Label className="text-muted-foreground text-xs">This RFP is closed for submissions. All submitted proposals are under review.</Label>
          </div>
        </div>

        <div className="relative flex gap-2">
          <div className="relative">
            <div className="h-4 w-4 rounded-full border-[2px] border-gray-300 border-solid bg-white" />
          </div>
          <div className="flex-1 flex-col flex px-3">
            <Label className="font-semibold text-sm">3. Decision</Label>
            <Label className="text-xs text-muted-foreground">Sponsor makes a final decision.</Label>
            <div className="radio-container flex flex-col gap-2 mt-2">
              <div className="radio-wrapper">
                <label className="radio-button text-sm">
                  <input type="radio" name="decision" value="selected" />
                  <Label className="radio-checkmark"></Label>
                  <Label className="radio-label text-xs">Proposal Selected</Label>
                </label>
              </div>
              <div className="radio-wrapper">
                <label className="radio-button text-sm">
                  <input type="radio" name="decision" value="canceled"/>
                  <Label className="radio-checkmark"></Label>
                  <Label className="radio-label text-xs">RFP Canceled</Label>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

