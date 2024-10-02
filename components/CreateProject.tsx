import Link from "next/link"
import { useState, KeyboardEvent,ChangeEvent,useEffect, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { useWalletSelector } from "@/context/WalletSelectorContext"
import AvatarProfile from "./AvatarProfile";
import AddMemberModal from './AddMemberModal';
import { ViewMethod,CallMethod } from "@/hook/near-method";
import { Social } from "@builddao/near-social-js";
import { getTeamMembersFromSocialProfileData } from "@/lib/common";


const Editor = dynamic(()=>import("@/components/Editor"),{ssr:false})

const CreateProject = ({edit}:{edit?:boolean}) =>{
    const {accountId,selector} = useWalletSelector()
    const [description, setDescription] = useState<string|null>(null)
    const [isShowDropDown, setIsShowDropDown] = useState<boolean>(false)
    const [selectReview, setSelectReview] = useState<boolean>(false)
    const [isShow,setIsShow] = useState<boolean>(false)
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [walletAddress, setWalletAddress] = useState<string>('');
    const [walletAddresses, setWalletAddresses] = useState<string[]>([]);
    const [repositories, setRepositories] = useState<string[]>([]);
    const [repositoryInput, setRepositoryInput] = useState<string>('');
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [socialLinks, setSocialLinks] = useState({
        website: '',
        twitter: '',
        telegram: '',
        github: ''
    });
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState<boolean>(false);
    const [teamMembers, setTeamMembers] = useState<string[]>([]);
    const [socialDataFetched, setSocialDataFetched] = useState<boolean>(false);
    const [socialData, setSocialData] = useState<any>(null);
    const [existingSocialData, setExistingSocialData] = useState<any>(null);
    const [publicGoodReason, setPublicGoodReason] = useState<string>('');
    const [hasSmartContracts, setHasSmartContracts] = useState<boolean>(false);
    const [originalSmartContracts, setOriginalSmartContracts] = useState<any>(null);
    const [smartContracts, setSmartContracts] = useState<any>(null);
    const [originalGithubRepos, setOriginalGithubRepos] = useState<any>(null);
    const [githubRepos, setGithubRepos] = useState<any>(null);
    const [hasReceivedFunding, setHasReceivedFunding] = useState<boolean>(false);
    const [originalFundingSources, setOriginalFundingSources] = useState<any>(null);
    const [fundingSources, setFundingSources] = useState<any>(null);
    const [existingHorizonProject, setExistingHorizonProject] = useState<any>(null);
    const [registeredProject, setRegisteredProject] = useState<any>(null);
    const [proposals, setProposals] = useState<any>(null);
    const [teamMember, setTeamMember] = useState<string>('');


    const checkExistingProject = async() => {
        try{
            await ViewMethod("nearhorizon.near","get_project",{
                account_id: accountId
            })
            // console.log(existingHorizonProject)
            setExistingHorizonProject(true)
        }catch(error){
            setExistingHorizonProject(false)
        }
    }

    useEffect(()=>{
        if(accountId){
            checkExistingProject()
        }
    },[accountId])

    const categories = {
        SOCIAL_IMPACT: "Social Impact",
        NON_PROFIT: "NonProfit",
        CLIMATE: "Climate",
        PUBLIC_GOOD: "Public Good",
        DE_SCI: "DeSci",
        OPEN_SOURCE: "Open Source",
        COMMUNITY: "Community",
        EDUCATION: "Education",
    };

    const CATEGORY_MAPPINGS:any = {
        SOCIAL_IMPACT: "Social Impact",
        NON_PROFIT: "NonProfit",
        CLIMATE: "Climate",
        PUBLIC_GOOD: "Public Good",
        DE_SCI: "DeSci",
        OPEN_SOURCE: "Open Source",
        COMMUNITY: "Community",
        EDUCATION: "Education",
        _deprecated: {
            "social-impact": "SOCIAL_IMPACT",
            "non-profit": "NON_PROFIT",
            climate: "CLIMATE",
            "public-good": "PUBLIC_GOOD",
            "de-sci": "DE_SCI",
            "open-source": "OPEN_SOURCE",
            community: "COMMUNITY",
            education: "EDUCATION",
        },
    };

    const social = new Social({
        contractId: process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"social.near":"v1.social08.testnet",
    });


    const handleChangeCategory = (category: string) => {
        setSelectedCategories((prevCategories) => {
            if (prevCategories.includes(category)) {
                return prevCategories.filter((c) => c !== category);
            } else {
                return [...prevCategories, category];
            }
        });
    };

    const handleChangeWalletAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWalletAddress(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && walletAddress.trim() !== '') {
            setWalletAddresses(prevAddresses => [...prevAddresses, walletAddress.trim()]);
            setWalletAddress('');
        }
    };

    const handleRemoveWalletAddress = (indexToRemove: number) => {
        setWalletAddresses(prevAddresses => 
            prevAddresses.filter((_, index) => index !== indexToRemove)
        );
    };

    const handleRepositoryInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepositoryInput(event.target.value);
    };

    const handleAddRepository = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && repositoryInput.trim() !== '') {
            setRepositories((prevRepositories) => [...prevRepositories, repositoryInput.trim()]);
            setRepositoryInput('');
        }
    };

    const handleRemoveRepository = (index: number) => {
        setRepositories((prevRepositories) => prevRepositories.filter((_, i) => i !== index));
    };

    const handleSocialLinkChange = (field: keyof typeof socialLinks) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSocialLinks(prev => ({ ...prev, [field]: value }));
    };

    const handleSocialLinkKeyPress = (field: keyof typeof socialLinks) => (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const value = (event.target as HTMLInputElement).value;
            setSocialLinks(prev => ({ ...prev, [field]: value }));
        }
    };

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddMember = (memberId: string) => {
        setTeamMembers(prevMembers => [...prevMembers, memberId]);
        setIsAddMemberModalOpen(false);
    };


    const validateNearAddress = (address:string) => {
        const NEAR_ACCOUNT_ID_REGEX =
            /^(?=.{2,64}$)(?!.*\.\.)(?!.*-$)(?!.*_$)[a-z\d._-]+$/i;
        let isValid = NEAR_ACCOUNT_ID_REGEX.test(address);
        // Additional ".near" check for IDs less than 64 characters
        if (address.length < 64 && !address.endsWith(".near")) {
            isValid = false;
        }
        return isValid;
    }

    const loadSocialData = async(accountId: string, shouldSetTeamMembers: boolean) => {
        const socialData: any = await social.get({
            keys: [`${accountId}/**`],
        });
        console.log("socialData: ", socialData);
        if (!socialData || !socialData[accountId]?.profile) {
            setSocialDataFetched(true);
            setSocialData({
                name: "",
                originalCategories: [],
                categories: [],
                description: "",
                website: "",
                twitter: "",
                telegram: "",
                github: "",
                teamMembers: [],
            });
            return;
        }
        const profileData = socialData[accountId].profile;
        const backgroundImage = profileData.backgroundImage;
        const profileImage = profileData.image || "";
        const description = profileData.description || "";
        const publicGoodReason = profileData.plPublicGoodReason || "";
        let categories: any[] = [];
        if (profileData.plCategories) {
            categories = JSON.parse(profileData.plCategories);
        } else if (profileData?.category) {
            // old/deprecated version
            if (typeof profileData.category == "string") {
                const availableCategory =
                CATEGORY_MAPPINGS[
                    CATEGORY_MAPPINGS._deprecated[profileData.category]
                    ];
                if (availableCategory) {
                    categories.push(availableCategory);
                }
            }
        }
        const smartContracts = profileData.plSmartContracts
        ? Object.entries(JSON.parse(profileData.plSmartContracts)).reduce(
            (accumulator:any, [chain, contracts]:any) => {
                const contractsForChain = Object.keys(contracts).map(
                (contractAddress) => {
                    return [chain, contractAddress]; // Create an array with the chain and contract address
                    }
                );
                return accumulator.concat(contractsForChain); // Add the arrays for this chain to the accumulator
            },
            []
        )
        : [];
        const hasSmartContracts = smartContracts.length > 0;
        smartContracts.push(["", ""]); // Add an empty string to the end of the array to allow for adding new contracts
        const githubRepos = profileData.plGithubRepos
            ? JSON.parse(profileData.plGithubRepos).map((repo:any) => [repo])
            : [];
        const originalGithubRepos = githubRepos;
        githubRepos.push([""]); // Add an empty string to the end of the array to allow for adding new repos
        const fundingSources = profileData.plFundingSources
            ? JSON.parse(profileData.plFundingSources)
            : [];
        const hasReceivedFunding = fundingSources.length > 0;
        const linktree = profileData.linktree || {};
        const twitter = linktree.twitter || "";
        const telegram = linktree.telegram || "";
        const github = linktree.github || "";
        const website = linktree.website || "";
        const team = getTeamMembersFromSocialProfileData(profileData);
        setExistingSocialData(socialData[accountId]);
        setProfileImage(profileImage);
        setSocialData({
            name: profileData?.name || "",
            description: description,
            originalCategories: categories,
            categories: categories,
            website: website,
            twitter: twitter,
            telegram: telegram,
            github: github,
            teamMembers: teamMembers,  
        })
        setPublicGoodReason(publicGoodReason);
        setHasSmartContracts(hasSmartContracts);
        setOriginalSmartContracts(smartContracts);
        setSmartContracts(smartContracts);
        setOriginalGithubRepos(githubRepos);
        setGithubRepos(githubRepos);
        setHasReceivedFunding(hasReceivedFunding);
        setSocialDataFetched(true);
        if (shouldSetTeamMembers) {
            setTeamMembers(team);
        }
    };

    useEffect(()=>{
        if(accountId && !socialDataFetched){
            loadSocialData(accountId, true);
        }
    },[accountId, socialDataFetched])

    const isCreateProjectDisabled =
        !profileImage ||
        !socialData?.name ||
        !socialData?.description ||
        !publicGoodReason ||
        (socialData?.categories.includes(CATEGORY_MAPPINGS.OPEN_SOURCE) &&
            !githubRepos.filter((val:any) => val[0]).length) ||
        (hasSmartContracts && !smartContracts.length) || // TODO: REVIEW THIS
        (hasReceivedFunding && !fundingSources.length) ||
        !socialData?.categories.length;

    const deepObjectDiff = (objOriginal:any, objUpdated:any) => {
        if (!objUpdated) objUpdated = {};
        let diff = {};
        function findDiff(original:any, updated:any, diffObj:any) {
            Object.keys(updated).forEach((key) => {
            const updatedValue = updated[key];
            const originalValue = original ? original[key] : undefined;
            // If both values are objects, recurse.
            if (
                typeof updatedValue === "object" &&
                updatedValue !== null &&
                (originalValue === undefined ||
                (typeof originalValue === "object" && originalValue !== null))
            ) {
                const nestedDiff = originalValue
                ? findDiff(originalValue, updatedValue, {})
                : updatedValue;
                if (Object.keys(nestedDiff).length > 0) {
                diffObj[key] = nestedDiff;
                }
            } else if (updatedValue !== originalValue) {
                // Direct comparison for string values.
                diffObj[key] = updatedValue;
            }
            });
            return diffObj;
        }
        return findDiff(objOriginal, objUpdated, diff);
    };

    const handleCreateOrUpdateProject = async (e:any) => {
        // if (isCreateProjectDisabled) return console.log("Not create project");
        e.preventDefault();
        const wallet = await selector.wallet();
        // format smart contracts
        const formattedSmartContracts = smartContracts?.reduce(
            (accumulator:any, [chain, contractAddress]:any) => {
                if (!chain || !contractAddress) return accumulator; // Skip empty entries
                // If the chain doesn't exist in the accumulator, initialize it with an empty object
                if (!accumulator[chain]) {
                accumulator[chain] = {};
                }
                // Add the contractAddress with an empty string as its value under the chain
                accumulator[chain][contractAddress] = "";
                return accumulator; // Return the updated accumulator for the next iteration
            },
            {}
        );
        const socialDatas = {
          // basic profile details
            profile: {
                name: socialData.name,
                plCategories: JSON.stringify(socialData.categories),
                description: socialData.description,
                plPublicGoodReason: publicGoodReason,
                plSmartContracts: hasSmartContracts
                ? JSON.stringify(formattedSmartContracts)
                : null,
                plGithubRepos:githubRepos?.length>0? JSON.stringify(
                    githubRepos?.map((repo:any) => repo[0]).filter((val:any) => val)
                ):null,
                plFundingSources: fundingSources?.length>0? JSON.stringify(fundingSources):null  ,
                linktree: {
                website: socialData.website,
                twitter: socialData.twitter,
                telegram: socialData.telegram,
                github: socialData.github,
                },
                plTeam: JSON.stringify(socialData.teamMembers),
                image: profileImage||"",
            },
            // follow & star Potlock
            index: {
                star: {
                key: {
                    type: "social",
                    path: "old.potlock.near/widget/Index",
                },
                value: {
                    type: "star",
                },
                },
                notify: {
                key: "old.potlock.near",
                value: {
                    type: "star",
                    item: {
                    type: "social",
                    path: "old.potlock.near/widget/Index",
                    },
                },
                },
            },
            graph: {
                star: {
                ["old.potlock.near"]: {
                    widget: {
                    Index: "",
                    },
                },
                },
                follow: {
                ["old.potlock.near"]: "",
                },
            },
        };
        const diff = deepObjectDiff(existingSocialData, socialDatas);
        const socialArgs = {
            data: {
                [accountId as string]: diff,
            },
        };
        const potlockRegistryArgs = {
          list_id: 1, // hardcoding to potlock registry list for now
        };
        const horizonArgs = {
            account_id: accountId,
        };
        // first, we have to get the account from social.near to see if it exists. If it doesn't, we need to add 0.1N to the deposit
        await ViewMethod( process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"social.near":"v1.social08.testnet", "get_account", {account_id: accountId}).then(async(account) => {
            // signerId: string;
            // receiverId: string;
            // actions: Array<Action>;
            //action type
            // type: "FunctionCall";
            // params: {
            //     methodName: string;
            //     args: object;
            //     gas: string;
            //     deposit: string;
            // };
            const socialTransaction:any = {
                receiverId: process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"social.near":"v1.social08.testnet",
                actions: [
                    {
                        type: "FunctionCall",
                        params: {
                            methodName: "set",
                            args: socialArgs,
                            gas: "30000000000000",
                            deposit:BigInt(Math.imul(JSON.stringify(socialArgs).length * 0.00015,Math.pow(10, 24)))
                        }
                    }
                ]
            };
            // instantiate transactions array that we will be passing to Near.call()
            let transactions = [socialTransaction];
            // if this is a creation action, we need to add the registry and horizon transactions
            if (!edit) {
                transactions.push(
                    // register project on potlock
                    {
                        receiverId: process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"potlock.near":"potlock.testnet",
                        actions: [
                            {
                                type: "FunctionCall",
                                params: {
                                    methodName: "register_batch",
                                    args: potlockRegistryArgs,
                                    gas: "30000000000000",
                                    deposit: BigInt(Math.imul(0.05,Math.pow(10, 24))).toString()
                                }
                            }
                        ]
                    }
                );
                if (!existingHorizonProject) {
                    transactions.push(
                        // register on NEAR Horizon
                        {
                            receiverId: process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"nearhorizon.near":"nearhorizon.testnet",
                            actions: [
                                {
                                    type: "FunctionCall",
                                    params: {
                                        methodName: "add_project",
                                        args: horizonArgs,
                                        gas: "30000000000000",
                                        deposit: "0"
                                    }
                                }
                            ]
                        }
                    );
                }
            }
            await wallet.signAndSendTransactions({
                callbackUrl: `${window.location.origin}`,
                transactions,
            });
        })
    };

    const loadRegisteredProject = useCallback(async () => {
        const registrations = await ViewMethod(process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"lists.potlock.near":"lists.potlock.testnet", "get_registrations_for_registrant", {
            registrant_id: accountId
        });
        if (registrations) {
            const registration = registrations.find(
                (registration: any) =>
                    registration.list_id === 1
            );
            if (registration) {
                setRegisteredProject(await ViewMethod(process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"lists.potlock.near":"lists.potlock.testnet", "get_registration", {
                    registration_id: registration.id
                }));
            }
        }
    }, [accountId]);
    useEffect(()=>{
        if(accountId){
            loadRegisteredProject()
        }
    },[loadRegisteredProject])
    
    const handleAddTeamMember = () => {
        let isValid = validateNearAddress(teamMember);
        if(isValid){
            if (!teamMembers.find((tm) => tm == teamMember)) {
                setSocialData({
                ...socialData,
                teamMembers: [...teamMembers, teamMember]
            })
            }
        }
    };
    

    return(
        <div className="w-full max-w-[1700px] mx-auto bg-aipgf-white overflow-hidden gap-[4.093rem] leading-[normal] tracking-[normal] sm:gap-[1rem] mq825:gap-[2.063rem] md:px-[5rem] self-stretch">
            <div className="flex justify-center items-center">
                <div className="w-full">
                    <div className="flex flex-col-reverse md:flex-row md:gap-20 justify-between py-5">
                        <div className="flex flex-col w-full gap-7 md:mt-0 mt-5">
                            <div className="w-full h-full gap-5 flex md:flex-col flex-row justify-start md:justify-center items-center">
                                <div className="flex">
                                    <AvatarProfile accountId={accountId as string} size={120} image={profileImage as string} />
                                    <label htmlFor="imageUpload" className="bg-white cursor-pointer">
                                        <img className="translate-x-[-0px] translate-y-[40px] md:translate-x-[-40px] md:translate-y-[80px] md:w-[40px] w-[19px]" src="/assets/icon/camera.svg" alt="icon" />
                                        <input
                                            id="imageUpload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                <button 
                                    className="bg-white cursor-pointer"
                                    onClick={() => setIsAddMemberModalOpen(true)}
                                >
                                    <small className="relative left-[-20px] text-base font-bold">Add member</small>
                                </button>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="font-bold text-lg">Project ID</span>
                                <input disabled value={accountId as string} type="text" placeholder="Enter title here" className="text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-800 border-[1px] border-aipgf-geyser box-border border-solid rounded-lg" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="font-bold text-lg">Project Name</span>
                                <input type="text" placeholder="Enter project here" className="text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-800 border-[1px] border-aipgf-geyser box-border border-solid rounded-lg" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="font-bold text-lg">Category &#40;select multiple&#41;</span>
                                <div className="w-full relative">
                                    <div onClick={()=>setIsShowDropDown((prv)=>!prv)} className="w-full bg-white focus:border-gray-100 shadow-sm cursor-pointer mt-2 border-[1px] border-aipgf-geyser box-border border-solid rounded-lg flex flex-row justify-between px-3 py-2">
                                        <input type="text" placeholder="Choose Category" className="w-full focus:outline-none bg-white" value={selectedCategories.join(', ')} />
                                        <img width={20} src="/assets/icon/arrow-down-gray.svg" alt="icon" />
                                    </div>
                                    {
                                        isShowDropDown&&(
                                            <div className="w-full absolute top-12 bg-white border-[1px] border-aipgf-geyser box-border border-solid p-3 rounded-lg h-50 z-20 shadow-lg flex flex-col gap-2">
                                                {
                                                    Object.values(categories).map((category,index)=>(
                                                        <button onClick={()=>handleChangeCategory(category)} key={index} className="w-full text-start text-sm md:text-base bg-white hover:bg-gray-100 hover:bg-opacity-10 rounded-lg p-2 cursor-pointer">
                                                            {category}
                                                        </button>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="font-bold text-lg">Why Do you consider yourself a public good</span>
                                <textarea placeholder="Enter response here." className="text-sm focus:outline-none focus:ring-1 focus:ring-gray-800 border-[1px] border-aipgf-geyser box-border border-solid rounded-lg resize-none h-44 px-3 py-2" />
                            </div>
                            <div className="flex flex-col gap-2 pb-16 md:pb-10">
                                <span className="font-bold text-lg">Description</span>
                                <Editor/>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="font-semibold text-xl">Final Consent</span>
                                <div className="flex flex-col gap-1 mt-2">
                                    <div className="flex flex-col gap-4">
                                        <div className="cntr flex flex-row items-start gap-2">
                                            <input type="checkbox" id="cbx" className="hidden-xs-up"/>
                                            <label htmlFor="cbx" className="cbx"></label>
                                            <span>I&#39;ve agree to AIPGF&#39;s <strong className="underline">Terms and Conditions</strong> and commit to honoring it</span>
                                        </div>
                                        <div className="cntr flex flex-row items-start gap-2">
                                            <input type="checkbox" id="cbx1" className="hidden-xs-up"/>
                                            <label htmlFor="cbx1" className="cbx"></label>
                                            <span>I&#39;ve agree to AIPGF&#39;s <strong className="underline">Code of Conduct</strong> and commit to honoring it</span>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between w-full md:justify-end items-center md:gap-10 mt-10 pb-20">
                                <button onClick={handleCreateOrUpdateProject} className="flex md:text-base text-sm flex-row gap-2 px-5 py-3 items-center hover:bg-gray-100 hover:bg-opacity-30 cursor-pointer rounded-full">
                                    {
                                        selectReview?(
                                            <div className="flex flex-row items-center gap-2">
                                                <span>Update your project</span>
                                            </div>
                                        ):
                                        (
                                            <div className="flex flex-row items-center gap-2">
                                                <span>Create new project</span>
                                            </div>
                                        )
                                    }
                                </button>

                            </div>
                        </div>
                        <div className="w-full md:w-[30rem] flex gap-3 flex-col"> 
                            <div className="flex flex-col border-b-[1px] border-solid border-aipgf-geyser">
                                <span className="text-gray-600 text-lg font-bold mt-2">Author Details</span>
                                <div className="flex flex-col py-3 gap-4">
                                    <span className="">
                                        Author
                                    </span>
                                    <div className="flex flex-row gap-2 items-center">
                                        <AvatarProfile accountId={accountId as string} size={40}/>
                                        <span className="text-sm font-bold">{accountId}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-3">
                                    <span className="text-gray-600 text-lg font-bold mt-2">
                                        Smart Contract Address
                                    </span>
                                    <div className="flex flex-col gap-2">
                                        <span>Wallet Addresses</span>
                                        <span className="text-sm text-gray-600">Enter the addresses where your smart contracts are saved.</span>
                                        {walletAddresses.map((address, index) => (
                                            <div key={index} className="flex flex-col gap-2 p-2">
                                                <div className="flex justify-between"> 
                                                    <span className="text-sm font-bold">{address}</span>
                                                    <button onClick={() => handleRemoveWalletAddress(index)} className="bg-white cursor-pointer">
                                                        <img src="/assets/icon/delete.svg" alt="icon" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="flex gap-2 p-2 border-[1px] border-aipgf-geyser box-border border-solid rounded-lg items-center focus:ring-1 focus:ring-gray-800">
                                            <input 
                                                type="text" 
                                                placeholder="Enter Address" 
                                                className="outline-none focus:outline-none  h-5 text-sm w-full"
                                                value={walletAddress}
                                                onChange={handleChangeWalletAddress}
                                                onKeyUp={handleKeyPress}
                                            />
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="border-b-[1px] border-aipgf-geyser border-solid pb-5">
                                    <span>Open source repositories</span>
                                    <div className="flex flex-col gap-2 mt-3">
                                        <span className="text-sm text-gray-600">Enter the address where your open source repository is saved.</span>
                                        {repositories.map((repo, index) => (
                                            <div key={index} className="flex flex-col gap-2 p-2">
                                                <div className="flex justify-between"> 
                                                    <Link style={{color:"unset"}} className="text-sm font-bold hover:underline no-underline" href={repo}>{repo}</Link>
                                                    <button onClick={() => handleRemoveRepository(index)} className="bg-white cursor-pointer">
                                                        <img src="/assets/icon/delete.svg" alt="icon" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="flex gap-2 border-[1px] border-aipgf-geyser box-border border-solid rounded-lg items-center focus:ring-1 focus:ring-gray-800">
                                            <span className="text-gray-500 border-r-[1px] border-solid border-aipgf-geyser px-2 py-2">https://github.com/</span>
                                            <input 
                                                type="text" 
                                                className="focus:outline-none h-5 text-sm w-full px-1 py-2"
                                                value={repositoryInput}
                                                onChange={handleRepositoryInputChange}
                                                onKeyUp={handleAddRepository}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4 border-b-[1px] border-aipgf-geyser border-solid pb-5">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-lg font-bold text-gray-700">Social Links</span>
                                        <span className="text-sm text-gray-400">At least one link is required</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span>Website</span>
                                        <div className="flex gap-2 border-[1px] border-aipgf-geyser box-border border-solid rounded-lg items-center focus:ring-1 focus:ring-gray-800">
                                            <span className="text-gray-500 border-r-[1px] border-solid border-aipgf-geyser p-2">https://</span>
                                            <input 
                                                type="text" 
                                                className="focus:outline-none h-5 text-sm p-2 px-1 w-full"
                                                value={socialLinks.website}
                                                onChange={handleSocialLinkChange('website')}
                                                onKeyUp={handleSocialLinkKeyPress('website')}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span>Twitter</span>
                                        <div className="flex gap-2 border-[1px] border-aipgf-geyser box-border border-solid rounded-lg items-center focus:ring-1 focus:ring-gray-800">
                                            <span className="text-gray-500 border-r-[1px] border-solid border-aipgf-geyser p-2">@</span>
                                            <input 
                                                type="text" 
                                                className="focus:outline-none h-5 text-sm w-full"
                                                value={socialLinks.twitter}
                                                onChange={handleSocialLinkChange('twitter')}
                                                onKeyUp={handleSocialLinkKeyPress('twitter')}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span>Telegram</span>
                                        <div className="flex gap-2 border-[1px] border-aipgf-geyser box-border border-solid rounded-lg items-center focus:ring-1 focus:ring-gray-800">
                                            <span className="text-gray-500 border-r-[1px] border-solid border-aipgf-geyser p-2">@</span>
                                            <input 
                                                type="text" 
                                                className="focus:outline-none w-full h-5 text-sm p-2 px-1"
                                                value={socialLinks.telegram}
                                                onChange={handleSocialLinkChange('telegram')}
                                                onKeyUp={handleSocialLinkKeyPress('telegram')}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span>Github</span>
                                        <div className="flex gap-2 border-[1px] border-aipgf-geyser box-border border-solid rounded-lg items-center focus:ring-1 focus:ring-gray-800">
                                            <span className="text-gray-500 border-r-[1px] border-solid border-aipgf-geyser p-2">https://github.com/</span>
                                            <input 
                                                type="text" 
                                                className="focus:outline-none focus:ring-1 focus:ring-gray-800 h-5 text-sm p-2 px-1"
                                                value={socialLinks.github}
                                                onChange={handleSocialLinkChange('github')}
                                                onKeyUp={handleSocialLinkKeyPress('github')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddMemberModal
                isOpen={isAddMemberModalOpen}
                onClose={() => setIsAddMemberModalOpen(false)}
                onAddMember={handleAddMember}
                existingMembers={teamMembers}
            />
        </div>
        
    )
}
export default CreateProject;