import Link from "next/link"

interface BreadcrumbProps {
  items: {
    label: string
    href?: string
  }[]
}

export function BreadcrumbNav({ items }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-2 text-sm md:text-lg">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index < items.length - 1 ? (
            <>
              <Link 
                href={item.href || '#'} 
                className="text-black no-underline font-semibold hover:underline"
              >
                {item.label}
              </Link>
              <span className="text-gray-600">&#62;</span>
            </>
          ) : (
            <span className="font-normal text-gray-600">{item.label}</span>
          )}
        </div>
      ))}
    </div>
  )
} 