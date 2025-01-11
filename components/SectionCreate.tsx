import {BreadcrumbNav} from './ui/Breadcrumb';
import { useRouter } from 'next/router';

interface SectionCreateProps {
    title?: string;
    subtitle?: string;
}

const SectionCreate = ({title, subtitle}: SectionCreateProps) => {
    const router = useRouter();
    const basePath = router.pathname.split('/')[1]; // Gets the first part of the path (e.g., 'rfps')
    
    return(
        <div className="h-full w-full relative font-aipgf-manrope-semibold-1356">
            <img width={20} className="w-full h-16 md:h-full" src="/assets/background/section.png" alt="background" />
            <div className="flex justify-center px-5 md:px-0 items-start absolute top-[35%] md:top-[60%] left-[1%] md:left-[10%] transform -translate-y-1/2">
                <div className="w-full md:mt-10 mt-4 md:pb-20">
                    <div className="flex flex-col gap-1 md:gap-3">
                        <span className="font-semibold text-xl md:text-[38px]">{title}</span>
                        <BreadcrumbNav items={[
                            { label: subtitle || '', href: `/${basePath}` },
                            { label: title || '', href: router.asPath }
                        ]} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionCreate;