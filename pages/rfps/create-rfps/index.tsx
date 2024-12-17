import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import SectionCreate from "@/components/SectionCreate";
import CreateRFP from "@/components/CreateRFP";

const CreateRFPPage = () => {
    return(
        <div className="flex flex-col w-full h-full">
            <NavBar />
            <SectionCreate title="Create RFP" subtitle="RFP"/>
            <CreateRFP/>
            <Footer />
        </div>
    )
}

export default CreateRFPPage;   