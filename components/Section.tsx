import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SectionProps } from "@/types/types"
import { categoryOptions, sortOptions, stageOptions, stageOptionsForRFPs } from "@/lib/constant"
import { X, Search } from "lucide-react"

const Section = ({ title, description, type, search, sortBy, sortCategory, sortByStage }: SectionProps) => {
  const [windowSize, setWindowSize] = useState<{width: number | null, height: number | null}>({
    width: null,
    height: null,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const isDesktop = windowSize.width && windowSize.width > 768

  return (
    <div className="relative w-full h-full z-0 font-aipgf-manrope-semibold-1356">
      <img 
        width={100} 
        className={`w-full ${isDesktop ? 'h-full' : 'h-60'}`} 
        src={isDesktop ? "/assets/background/background-section.png" : "/assets/background/background-mobile.png"} 
        alt="background" 
      />
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col text-center px-5 items-center">
          <span className="font-semibold mq825:text-3xl text-17xl mb-1">{title}</span>
          <p className="font-semibold md:text-lg text-xs mq825:max-w-sm max-w-2xl">{description}</p>
          
          <div className="flex mq825:flex-col flex-row gap-3 mt-3 items-center">
            <div className="relative mq825:w-full w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                className="pl-9 pr-9 py-2 rounded-full bg-white border-[1px] border-aipgf-geyser border-solid outline-none focus:ring-0 focus:outline-none focus:border-0"
                placeholder="Search"
                onChange={(e) => search?.(e.target.value)}
              />
              <X className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 cursor-pointer" />
            </div>

            <div className="flex flex-row gap-3 mq825:max-w-sm max-w-6xl">
              <Select onValueChange={(value) => sortBy?.(value)} defaultValue="All">
                <SelectTrigger className="w-[170px] mq825:w-[100px] rounded-full bg-white border-[1px] border-aipgf-geyser border-solid">
                  <SelectValue placeholder={`${isDesktop ? 'Sort by: ' : ''}All`} />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.label} value={option.label}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => sortCategory?.(value)} defaultValue="All">
                <SelectTrigger className="w-[170px] mq825:w-[100px] rounded-full bg-white border-[1px] border-aipgf-geyser border-solid">
                  <SelectValue placeholder={`${isDesktop ? 'Category: ' : ''}All`} />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.label} value={option.label}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {type === "proposals" && (
                <Select onValueChange={(value) => sortByStage?.(value)} defaultValue="All">
                  <SelectTrigger className="w-[170px] mq825:w-[100px] rounded-full bg-white border-[1px] border-aipgf-geyser border-solid">
                    <SelectValue placeholder={`${isDesktop ? 'Stage: ' : ''}All`} />
                  </SelectTrigger>
                  <SelectContent>
                    {stageOptions.map((option) => (
                      <SelectItem key={option.label} value={option.label}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {type === "rfps" && (
                <Select onValueChange={(value) => sortByStage?.(value)} defaultValue="All">
                  <SelectTrigger className="w-[170px] mq825:w-[100px] rounded-full bg-white border-[1px] border-aipgf-geyser border-solid">
                    <SelectValue placeholder={`${isDesktop ? 'Timeline: ' : ''}All`} />
                  </SelectTrigger>
                  <SelectContent>
                    {stageOptionsForRFPs.map((option) => (
                      <SelectItem key={option.label} value={option.label}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Section