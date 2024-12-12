import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from "./ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Code,
  Type,
  ChevronDown
} from "lucide-react"
import Markdown from 'markdown-to-jsx'
import { useState } from 'react'

interface EditorProps {
  onChange?: (content: string) => void
  content?: string
  onCancel?: () => void
  onSubmit?: () => void
}

interface TextOption {
  label: string
  command: 'setParagraph' | 'setHeading'
  attrs?: { level: 1 | 2 | 3 }
}

const TEXT_OPTIONS: TextOption[] = [
  { label: 'Normal text', command: 'setParagraph' },
  { label: 'Heading 1', command: 'setHeading', attrs: { level: 1 } },
  { label: 'Heading 2', command: 'setHeading', attrs: { level: 2 } },
  { label: 'Heading 3', command: 'setHeading', attrs: { level: 3 } },
]

const TiptapEditor = ({ onChange, content = "", onCancel, onSubmit }: EditorProps) => {
  const [selectedFormat, setSelectedFormat] = useState<string>('Normal text')

  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editorProps: {
      attributes: {
        class: 'min-h-[120px] px-5 py-4 focus:outline-none prose-sm',
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  const handleTextOptionSelect = (option: TextOption) => {
    if (editor) {
      if (option.command === 'setParagraph') {
        editor.chain().focus().setParagraph().run()
      } else if (option.command === 'setHeading' && option.attrs) {
        editor.chain().focus().setHeading(option.attrs).run()
      }
      setSelectedFormat(option.label)
    }
  }

  const toolbarItems = [
    { icon: Bold, action: 'toggleBold', isActive: 'bold' },
    { icon: Italic, action: 'toggleItalic', isActive: 'italic' },
    { icon: Strikethrough, action: 'toggleStrike', isActive: 'strike' },
    null,
    { icon: List, action: 'toggleBulletList', isActive: 'bulletList' },
    { icon: ListOrdered, action: 'toggleOrderedList', isActive: 'orderedList' },
    { icon: Code, action: 'toggleCode', isActive: 'code' },
  ] as const

  //h-11 px-5 text-sm font-medium text-gray-500 hover:text-gray-900 data-[state=active]:text-gray-900 data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 transition-all

  return (
    <div className="w-full border-[1px] border-solid border-aipgf-geyser rounded-lg bg-white shadow-sm">
      <Tabs defaultValue="write" className="w-full">
        <div className="flex items-center justify-between border-b-[1px] border-solid border-aipgf-geyser">
          <TabsList className="h-12 bg-transparent border-0 px-3">
            <div className="flex flex-row gap-2 h-8 bg-gray-100 bg-opacity-10 border-[1px] border-solid border-aipgf-geyser rounded-md">
                <TabsTrigger 
                    value="write"
                    className="bg-transparent rounded-l-md rounded-r-none w-20" 
                    >
                    Write
                </TabsTrigger>
                <TabsTrigger 
                    value="preview"
                    className="bg-transparent rounded-none w-20 rounded-l-none rounded-r-md"
                    >
                    Preview
                </TabsTrigger>
            </div>
          </TabsList>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="h-8 mr-3 px-2 py-1.5 hover:bg-gray-50 text-sm font-normal"
              >
                <Type className="w-4 h-4 text-gray-400 mr-1.5" />
                <span className="text-gray-600">{selectedFormat}</span>
                <ChevronDown className="w-4 h-4 text-gray-400 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {TEXT_OPTIONS.map((option, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => handleTextOptionSelect(option)}
                  className="text-sm"
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <TabsContent value="write" className="mt-0">
          <div className="flex items-center gap-1 border-b-[1px] border-solid border-aipgf-geyser px-3 py-2">
            {toolbarItems.map((item, index) => 
              item === null ? (
                <div key={index} className="w-px h-4 bg-gray-200 mx-2" />
              ) : (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus()[item.action]().run()}
                  className={`
                    p-1.5 h-8 rounded-md hover:bg-gray-100/25 
                    ${editor.isActive(item.isActive) 
                      ? 'bg-gray-100/75 text-black' 
                      : 'text-gray-500 hover:text-gray-900'
                    }
                    transition-all
                  `}
                >
                  <item.icon className="h-4 w-4" />
                </Button>
              )
            )}
          </div>
          <EditorContent editor={editor} />
        </TabsContent>

        <TabsContent value="preview" className="mt-0">
          <div className="min-h-[120px] px-5 py-4 prose prose-sm">
            <Markdown>{editor.getHTML()}</Markdown>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex items-center justify-between px-5 py-3 border-t-[1px] border-solid border-aipgf-geyser bg-gray-50/50">
        <span className="text-xs text-gray-500">
          Markdown is supported
        </span>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            onClick={onCancel}
            className="h-8 px-3.5 text-sm font-medium text-gray-600 hover:text-gray-900 bg-transparent hover:bg-transparent cursor-pointer"
          >
            Cancel
          </Button>
          <Button 
            onClick={onSubmit}
            className="h-8 px-3.5 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white shadow-sm cursor-pointer"
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TiptapEditor 