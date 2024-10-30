import Link from "next/link"
import { useState, KeyboardEvent,ChangeEvent,useEffect, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { useWalletSelector } from "@/context/WalletSelectorContext"
import AvatarProfile from "./AvatarProfile";
import AddMemberModal from './AddMemberModal';
import { ViewMethod,CallMethod } from "@/hook/near-method";
import { Social,NetworkIDEnum } from "@builddao/near-social-js";
import { getTeamMembersFromSocialProfileData } from "@/lib/common";
import Big from 'big.js';


const Editor = dynamic(()=>import("./Editor"),{ssr:false})

const CreateProject = ({edit}:{edit?:boolean}) =>{
    const {accountId,selector} = useWalletSelector()
    const [description, setDescription] = useState<string>('');
    const [isShowDropDown, setIsShowDropDown] = useState<boolean>(false)
    const [selectReview, setSelectReview] = useState<boolean>(false)
    const [isShow,setIsShow] = useState<boolean>(false)
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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
    const [existingSocialData, setExistingSocialData] = useState<any>(null);
    const [publicGoodReason, setPublicGoodReason] = useState<string>('');
    const [hasSmartContracts, setHasSmartContracts] = useState<boolean>(false);
    const [originalSmartContracts, setOriginalSmartContracts] = useState<any>(null);
    const [smartContracts, setSmartContracts] = useState<any>([["", ""]]);
    const [originalGithubRepos, setOriginalGithubRepos] = useState<any>(null);
    const [githubRepos, setGithubRepos] = useState<any>(null);
    const [hasReceivedFunding, setHasReceivedFunding] = useState<boolean>(false);
    const [originalFundingSources, setOriginalFundingSources] = useState<any>(null);
    const [fundingSources, setFundingSources] = useState<any>(null);
    const [existingHorizonProject, setExistingHorizonProject] = useState<any>(null);
    const [registeredProject, setRegisteredProject] = useState<any>(null);
    const [showFundingModal, setShowFundingModal] = useState<boolean>(false);
    const [projectName, setProjectName] = useState<string>("");
    const [originalCategories, setOriginalCategories] = useState<any>(null);
    const [categories, setCategories] = useState<any>([]);
    const [currentGithubRepo, setCurrentGithubRepo] = useState<string>('');
    const [isRegisterDao, setIsRegisterDao] = useState<boolean>(false)
    const [daoAddress, setDaoAddress] = useState<string|null>(null)


    const CHAIN_OPTIONS = {
        NEAR: { isEVM: false },
        Solana: { isEVM: false },
        Ethereum: { isEVM: true },
        Polygon: { isEVM: true },
        Avalanche: { isEVM: true },
        Optimism: { isEVM: true },
        Arbitrum: { isEVM: true },
        BNB: { isEVM: true },
        Sui: { isEVM: false },
        Aptos: { isEVM: false },
        Polkadot: { isEVM: false },
        Stellar: { isEVM: false },
        ZkSync: { isEVM: false }, // Note: ZkSync aims for EVM compatibility but might not fully be considered as traditional EVM at the time of writing.
        Celo: { isEVM: true },
        Aurora: { isEVM: true },
        Injective: { isEVM: true },
        Base: { isEVM: false },
        Manta: { isEVM: false }, // Listed twice in the original list; included once here.
        Fantom: { isEVM: true },
        ZkEVM: { isEVM: true }, // Considering the name, assuming it aims for EVM compatibility.
        Flow: { isEVM: false },
        Tron: { isEVM: true },
        MultiverseX: { isEVM: false }, // Formerly known as Elrond, not traditionally EVM but has some level of compatibility.
        Scroll: { isEVM: true }, // Assuming EVM compatibility based on the context of ZkEVM.
        Linea: { isEVM: true }, // Assuming non-EVM due to lack of information.
        Metis: { isEVM: true },
    };

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


    const CATEGORIES = {
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
        network: process.env.NEXT_PUBLIC_NETWORK=="mainnet"?NetworkIDEnum.Mainnet:NetworkIDEnum.Testnet,
    });


    const handleChangeCategory = (category: string) => {
        setCategories((prevCategories:any) => {
            if (prevCategories.includes(category)) {
                return prevCategories.filter((c:any) => c !== category);
            } else {
                return [...prevCategories, category];
            }
        });
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

    const handleImageUpload = async(event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const res = await fetch("https://ipfs.near.social/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": file.type
                    },
                    body: file,
                });
                const { cid } = await res.json();
                setProfileImage(cid)
            } catch (e) {
                console.log(e);
            }
        }
    };

    const handleAddMember = (memberId: string) => {
        setTeamMembers(prevMembers => [...prevMembers, memberId]);
        //setIsAddMemberModalOpen(false);
    };


    const validateNearAddress = (address:string) => {
        const NEAR_ACCOUNT_ID_REGEX =
            /^(?=.{2,64}$)(?!.*\.\.)(?!.*-$)(?!.*_$)[a-z\d._-]+$/i;
        let isValid = NEAR_ACCOUNT_ID_REGEX.test(address);
        // Additional ".near" check for IDs less than 64 characters
        if ((address.length < 64 && !address.endsWith(".near")) || !address.endsWith(".testnet")) {
            isValid = false;
        }
        return isValid;
    }

    const loadSocialData = async(accountId: string, shouldSetTeamMembers: boolean) => {
        const socialData: any = await social.get({
            keys: [`${accountId}/**`],
            useApiServer:process.env.NEXT_PUBLIC_NETWORK=="mainnet"?true:false
        });
        console.log("socialData: ", socialData);
        if (!socialData || !socialData[accountId]?.profile) {
            setSocialDataFetched(true);
            setProjectName("")
            setOriginalCategories([])
            setCategories([])
            setDescription("")
            setSocialLinks({
                website: "",
                twitter: "",
                telegram: "",
                github: ""
            })
            setTeamMembers([])
            return;
        }
        const profileData = socialData[accountId].profile;
        const backgroundImage = profileData.backgroundImage;
        const profileImage = profileData.image.ipfs_cid || "";
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
        setProjectName(profileData?.name || "");
        setOriginalCategories(categories);
        setCategories(categories);
        setDescription(description);
        setSocialLinks({
            website: website,
            twitter: twitter,
            telegram: telegram,
            github: github,
        });
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
        if(daoAddress){
            if(daoAddress && !socialDataFetched){
                loadSocialData(daoAddress, true);
            }
        }else{
            if(accountId && !socialDataFetched){
                loadSocialData(accountId, true);
            }
        }
    },[accountId, socialDataFetched,daoAddress])

    const isCreateProjectDisabled =
        !profileImage ||
        !projectName ||
        !description ||
        !publicGoodReason ||
        (categories.includes(CATEGORY_MAPPINGS.OPEN_SOURCE) &&
            !githubRepos.filter((val:any) => val[0]).length) ||
        (hasSmartContracts && !smartContracts.length) || // TODO: REVIEW THIS
        (hasReceivedFunding && !fundingSources.length) ||
        !categories.length;

    // useEffect(() => {
    //     console.log('Profile Image:', profileImage);
    //     console.log('Project Name:', projectName);
    //     console.log('Description:', description);
    //     console.log('Public Good Reason:', publicGoodReason);
    //     console.log('Categories:', categories);
    //     console.log('GitHub Repos:', githubRepos);
    //     console.log('Has Smart Contracts:', hasSmartContracts);
    //     console.log('Smart Contracts:', smartContracts);
    //     console.log('Has Received Funding:', hasReceivedFunding);
    //     console.log('Funding Sources:', fundingSources);
    // }, [profileImage, projectName, description, publicGoodReason, categories, githubRepos, hasSmartContracts, smartContracts, hasReceivedFunding, fundingSources]);

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
        if (isCreateProjectDisabled) return console.log("Not create project");
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
                name: projectName,
                plCategories: JSON.stringify(categories),
                description: description,
                plPublicGoodReason: publicGoodReason,
                plSmartContracts: hasSmartContracts
                ? JSON.stringify(formattedSmartContracts)
                : null,
                plGithubRepos:githubRepos?.length>0? JSON.stringify(
                    githubRepos?.map((repo:any) => repo[0]).filter((val:any) => val)
                ):"[]",
                plFundingSources: fundingSources?.length>0? JSON.stringify(fundingSources):"[]"  ,
                linktree: {
                    website: socialLinks.website,
                    twitter: socialLinks.twitter,
                    telegram: socialLinks.telegram,
                    github: socialLinks.github,
                },
                plTeam: JSON.stringify(teamMembers),
                image:{
                    ipfs_cid: profileImage
                },
                backgroundImage: {
                    ipfs_cid: "bafkreihaernx7oqhyfkl6kde55ktudfxznnsuk5oyhe52m2hn3imprycq4"
                },
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
                [isRegisterDao?daoAddress as string:accountId as string]: diff,
            },
        };
        const potlockRegistryArgs = {
          list_id: 1, // hardcoding to potlock registry list for now
        };
        const horizonArgs = {
            account_id: isRegisterDao?daoAddress as string:accountId as string,
        };
        // first, we have to get the account from social.near to see if it exists. If it doesn't, we need to add 0.1N to the deposit
        await ViewMethod( process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"social.near":"v1.social08.testnet", "get_account", {account_id: isRegisterDao?daoAddress as string:accountId as string}).then(async(account) => {
            const socialTransaction:any = {
                receiverId: process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"social.near":"v1.social08.testnet",
                actions: [
                    {
                        type: "FunctionCall",
                        params: {
                            methodName: "set",
                            args: socialArgs,
                            gas: "30000000000000",
                            deposit: (() => {
                                let depositFloat = JSON.stringify(socialArgs).length * 0.00015;
                                if (!account) {
                                    depositFloat += 0.1;
                                }
                                // Convert to yoctoNEAR (1 NEAR = 10^24 yoctoNEAR) and round to the nearest integer
                                const yoctoNEAR = Big(depositFloat).mul(Big(10).pow(24)).round(0);
                                // Convert to string and remove any decimal point
                                return yoctoNEAR.toFixed().replace('.', '');
                            })()
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
                        receiverId: process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"lists.potlock.near":"lists.potlock.testnet",
                        actions: [
                            {
                                type: "FunctionCall",
                                params: {
                                    methodName: "register_batch",
                                    args: potlockRegistryArgs,
                                    gas: "30000000000000",
                                    deposit: Big(0.05).mul(Big(10).pow(24)).toString()
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
            if (isRegisterDao) {
                transactions = transactions.map((tx) => ({
                    ...tx,
                    contractName: daoAddress,
                    methodName: "add_proposal",
                    args: {
                        proposal: {
                        description: edit
                            ? "Update project on Potlock (via NEAR Social)"
                            : "Create project on Potlock (3 steps: Register information on NEAR Social, register on Potlock, and register on NEAR Horizon)",
                        kind: {
                            FunctionCall: {
                            receiver_id: tx.receiverId,
                            actions: tx.actions.map((action:any) => ({
                                method_name: action.params.methodName,
                                gas: action.params.gas,
                                deposit: action.params.deposit,
                                args: Buffer.from(JSON.stringify(action.params.args), "utf-8").toString("base64"),
                            })),
                            },
                        },
                        },
                    },
                    deposit: "100000000000000000000000",
                    gas: "300000000000000",
                }));
            }
            await wallet.signAndSendTransactions({
                callbackUrl: `${window.location.origin}/create-proposal`,
                transactions,
            });
        })
    };

    const loadRegisteredProject = useCallback(async () => {
        const registrations = await ViewMethod(process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"lists.potlock.near":"lists.potlock.testnet", "get_registrations_for_registrant", {
            registrant_id: isRegisterDao?daoAddress as string:accountId as string
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
    }, [isRegisterDao,accountId]);
    useEffect(()=>{
        if(isRegisterDao){
            loadRegisteredProject()
        }
    },[loadRegisteredProject])
    
    const validateGithubRepoUrl = (url: string) => {
        const githubRepoUrlPattern = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9_.-]+\/?$/;
        return githubRepoUrlPattern.test(url);
    };

    const handleRemoveTeamMember = (memberToRemove: string) => {
        setTeamMembers(teamMembers.filter(member => member !== memberToRemove));
    };

    const handleAddSmartContract = () => {
        setSmartContracts([...smartContracts, ["", ""]]);
    };

    const handleSmartContractChange = (index: number, field: 'chain' | 'address', value: string) => {
        const updatedContracts = [...smartContracts];
        updatedContracts[index][field === 'chain' ? 0 : 1] = value;
        setSmartContracts(updatedContracts);
    };

    const handleRemoveSmartContract = (index: number) => {
        const updatedContracts = smartContracts.filter((_: any, i: number) => i !== index);
        setSmartContracts(updatedContracts);
    };

    const handleProjectNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProjectName(event.target.value);
    };

    const handleGithubRepoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentGithubRepo(e.target.value);
    };

    const handleGithubRepoKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && currentGithubRepo.trim()) {
            const fullUrl = currentGithubRepo.startsWith('https://github.com/') ? currentGithubRepo : `https://github.com/${currentGithubRepo}`;
            if (validateGithubRepoUrl(fullUrl)) {
                setGithubRepos((prevRepos:string[]) => [...(prevRepos || []), [fullUrl]]);
                setCurrentGithubRepo('');
            } else {
                alert('Please enter a valid GitHub repository URL');
            }
        }
    };

    const removeGithubRepo = (index: number) => {
        setGithubRepos((prevRepos:string[]) => prevRepos.filter((_:any, i:number) => i !== index));
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handlePublicGoodReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPublicGoodReason(e.target.value);
    };

    return(
        <div className="w-full max-w-[1700px] mx-auto bg-aipgf-white overflow-hidden gap-[4.093rem] leading-[normal] tracking-[normal] sm:gap-[1rem] mq825:gap-[2.063rem] md:px-[5rem] self-stretch font-aipgf-manrope-semibold-1356">
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
                            <div className="cntr flex flex-row items-start gap-2">
                                <input type="checkbox" id="registerDao" className="hidden-xs-up" checked={isRegisterDao} onChange={(e)=>setIsRegisterDao(e.target.checked)}/>
                                <label htmlFor="registerDao" className="cbx"></label>
                                <span className="font-semibold">Register as DAO</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="font-bold text-lg">{isRegisterDao?"DAO Address":"Project ID"}</span>
                                <input onChange={(e)=>setDaoAddress(e.target.value)} disabled={!isRegisterDao} value={!isRegisterDao?accountId as string:""} type="text" placeholder={isRegisterDao?"Enter DAO Address here":"Enter project ID here"} className="text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-800 border-[1px] border-aipgf-geyser box-border border-solid rounded-lg" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="font-bold text-lg">Project Name &#42;</span>
                                <input 
                                    type="text" 
                                    placeholder="Enter project here" 
                                    className="text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-800 border-[1px] border-aipgf-geyser box-border border-solid rounded-lg" 
                                    value={projectName}
                                    onChange={handleProjectNameChange}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="font-bold text-lg">Category &#40;select multiple&#41; &#42;</span>
                                <div className="w-full relative">
                                    <div onClick={()=>setIsShowDropDown((prv)=>!prv)} className="w-full bg-white focus:border-gray-100 shadow-sm cursor-pointer mt-2 border-[1px] border-aipgf-geyser box-border border-solid rounded-lg flex flex-row justify-between px-3 py-2">
                                        <input type="text" placeholder="Choose Category" className="w-full focus:outline-none bg-white" value={categories.join(', ')} />
                                        <img width={20} src="/assets/icon/arrow-down-gray.svg" alt="icon" />
                                    </div>
                                    {
                                        isShowDropDown&&(
                                            <div className="w-full absolute top-12 bg-white border-[1px] border-aipgf-geyser box-border border-solid p-3 rounded-lg h-50 z-20 shadow-lg flex flex-col gap-2">
                                                {
                                                    Object.values(CATEGORIES).map((category,index)=>(
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
                                <span className="font-bold text-lg">Why is this project a public good? &#42;</span>
                                <textarea
                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-black"
                                    rows={4}
                                    value={publicGoodReason}
                                    onChange={handlePublicGoodReasonChange}
                                    placeholder="Explain why your project is a public good..."
                                />
                            </div>
                            <div className="flex flex-col gap-2 pb-16 md:pb-10">
                                <span className="font-bold text-lg">Overview &#42;</span>
                                <textarea
                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-black"
                                    rows={6}
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    placeholder="Provide an overview of your project..."
                                />
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
                            <div className="flex flex-col gap-4 mt-2">
                                <div className="flex flex-col gap-3">
                                    <div className="cntr flex flex-row items-start gap-2 pb-2">
                                        <input
                                            type="checkbox"
                                            id="hasSmartContracts"
                                            checked={hasSmartContracts}
                                            onChange={(e) => setHasSmartContracts(e.target.checked)}
                                            className="hidden-xs-up"
                                        />
                                        <label htmlFor="hasSmartContracts" className="cbx"></label>
                                        <span>Yes, my project has smart contracts</span>
                                    </div>
                                    {hasSmartContracts && (
                                        <div className="flex flex-col gap-4 border-t-[1px] border-aipgf-geyser border-solid pt-4">
                                            <div className="flex flex-col gap-3 border-b-[1px] border-aipgf-geyser border-solid pb-5">
                                                <span className="text-gray-600 text-lg font-bold mt-2">
                                                    Smart Contract Address
                                                </span>
                                                <div className="flex flex-col gap-2">
                                                    <span>Wallet Addresses</span>
                                                    <span className="text-sm text-gray-600">Enter the addresses where your smart contracts are saved.</span>
                                                    {smartContracts.map((contract: any, index: number) => (
                                                        <div key={index} className="flex flex-row gap-1 items-center">
                                                            <div className="flex gap-2 p-1 border-[1px] border-aipgf-geyser box-border border-solid rounded-lg items-center focus:ring-1 focus:ring-gray-800">
                                                                <div className="relative w-[220px] border-r-[1px] border-aipgf-geyser border-solid">
                                                                    <select
                                                                        className="appearance-none w-full bg-white p-2 rounded-l-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500 cursor-pointer"
                                                                        value={contract[0]}
                                                                        onChange={(e) => handleSmartContractChange(index, 'chain', e.target.value)}
                                                                    >
                                                                        <option value={""}>Select a chain</option>
                                                                        {Object.entries(CHAIN_OPTIONS).map(([chain, { isEVM }]) => (
                                                                            <option key={chain} value={chain}>
                                                                                {chain}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <input 
                                                                    type="text" 
                                                                    placeholder="Enter Address" 
                                                                    className="outline-none focus:outline-none h-5 text-sm w-full p-2"
                                                                    value={contract[1]}
                                                                    onChange={(e) => handleSmartContractChange(index, 'address', e.target.value)}
                                                                />
                                                                
                                                            </div>
                                                            
                                                            <button onClick={() => handleRemoveSmartContract(index)} className="bg-white cursor-pointer">
                                                                <img width={15} src="/assets/icon/delete.svg" alt="icon" />
                                                            </button>
                                                            
                                                        </div>
                                                    ))}
                                                </div>
                                                <button 
                                                    onClick={handleAddSmartContract}
                                                    className="flex items-center cursor-pointer font-semibold justify-center px-4 py-2 border border-transparent text-sm rounded-md text-white bg-black hover:bg-opacity-90 focus:outline-none"
                                                >
                                                    <span>Add another contract</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {categories.includes(CATEGORY_MAPPINGS.OPEN_SOURCE) && (
                                    <div className="border-b-[1px] border-aipgf-geyser border-solid pb-5">
                                        <span>Open source repositories</span>
                                        <div className="flex flex-col gap-2 mt-3">
                                            <span className="text-sm text-gray-600">Enter the address where your open source repository is saved.</span>
                                            {githubRepos && githubRepos.map((repo: string[], index: number) => (
                                                <div key={index} className="flex flex-col gap-2 p-2">
                                                    <div className="flex justify-between items-center"> 
                                                        <Link 
                                                            href={repo[0]} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer" 
                                                            className="text-sm font-bold hover:underline no-underline text-blue-600"
                                                        >
                                                            {repo[0]}
                                                        </Link>
                                                        <button onClick={() => removeGithubRepo(index)} className="bg-white cursor-pointer">
                                                            <img src="/assets/icon/delete.svg" alt="Remove repo" width="15" height="15" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="flex gap-2 border-[1px] border-aipgf-geyser box-border border-solid rounded-lg items-center focus:ring-1 focus:ring-gray-800">
                                                <span className="text-gray-500 border-r-[1px] border-solid border-aipgf-geyser px-2 py-2">https://github.com/</span>
                                                <input 
                                                    type="text" 
                                                    className="focus:outline-none h-5 text-sm w-full px-1 py-2"
                                                    value={currentGithubRepo}
                                                    onChange={handleGithubRepoChange}
                                                    onKeyUp={handleGithubRepoKeyPress}
                                                    placeholder="Enter repo and press Enter"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="flex flex-col gap-4 border-b-[1px] border-aipgf-geyser border-solid pb-5">
                                    <div className="flex items-center gap-1">
                                        <input
                                            type="checkbox"
                                            id="hasReceivedFunding"
                                            className="hidden-xs-up"
                                            onChange={(e) => {
                                                setHasReceivedFunding(e.target.checked);
                                            }}
                                            checked={hasReceivedFunding}
                                        />
                                        <label htmlFor="hasReceivedFunding" className="cbx"></label>
                                        <label htmlFor="hasReceivedFunding" className="lbl">
                                            Yes, my project has received funding
                                        </label>
                                    </div>
                                    {
                                        hasReceivedFunding&&(
                                            <div className="flex flex-col gap-4 border-t-[1px] border-aipgf-geyser border-solid pt-4">
                                                <div className="flex flex-col gap-2">
                                                    <span className="text-gray-600 text-lg font-bold mt-2">
                                                    Funding sources
                                                    </span>
                                                    <span className="text-sm text-gray-600">Add any previous funding you have received.</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowFundingModal(true)}
                                                    className="flex items-center cursor-pointer font-semibold justify-center px-4 py-2 border border-transparent text-sm rounded-md text-white bg-black hover:bg-opacity-90 focus:outline-none"
                                                >
                                                    Add Funding Source
                                                </button>
                                            </div>
                                        )
                                    }
                                </div>
                                {showFundingModal && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                        <div className="bg-white rounded-lg shadow-lg p-6 pt-3 w-full max-w-md">
                                            <div className="flex justify-between items-center mb-4">
                                                <h2 className="text-lg font-semibold flex flex-row items-center">
                                                    <img width={30} src="/assets/icon/dolar.svg" alt="icon" /> Add Past Funding Source
                                                </h2>
                                                <button className="bg-white rounded-full p-1 cursor-pointer" onClick={() => setShowFundingModal(false)}>
                                                    <img width={30} src="/assets/icon/close-x.svg" alt="icon" />
                                                </button>
                                            </div>
                                            <div className="flex flex-col gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Name of investor</label>
                                                    <input type="text" placeholder="Enter investor name" className="mt-1 block w-full px-3 py-2 border-aipgf-geyser border-[1px] border-solid rounded-md focus:outline-none focus:ring-1 focus:ring-black sm:text-sm" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Date (optional)</label>
                                                    <div className="relative mt-1">
                                                        <input type="text" placeholder="mm/dd/yyyy" className="block w-full px-3 py-2 border-aipgf-geyser border-[1px] border-solid rounded-md focus:outline-none focus:ring-1 focus:ring-black sm:text-sm" />
                                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                            <i className="fas fa-calendar-alt text-gray-400"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                                    <textarea placeholder="Type description" className="mt-1 block w-full min-h-20 px-3 py-2 border-aipgf-geyser border-[1px] border-solid rounded-md focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"></textarea>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Denomination of investment</label>
                                                    <input type="text" placeholder="e.g. NEAR, USD, USDC, etc." className="mt-1 block w-full px-3 py-2 border-aipgf-geyser border-[1px] border-solid rounded-md focus:outline-none focus:ring-1 focus:ring-black sm:text-sm" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Investment amount</label>
                                                    <input type="text" placeholder="e.g. 1000" className="mt-1 block w-full px-3 py-2 border-aipgf-geyser border-[1px] border-solid rounded-md focus:outline-none focus:ring-1 focus:ring-black sm:text-sm" />
                                                </div>
                                                <div className="flex justify-end">
                                                    <button type="button" className="px-4 py-2 bg-black text-white font-semibold hover:bg-opacity-80 cursor-pointer  rounded-md focus:outline-none">Add Funding Source</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="flex flex-col gap-4 border-b-[1px] border-aipgf-geyser border-solid pb-5">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-lg font-bold text-gray-700">Social Links (optional)</span>
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
                                        <div className="flex gap-2 border-[1px] border-aipgf-geyser box-border border-solid rounded-lg items-center focus:outline-none focus:ring-1 focus:ring-gray-800">
                                            <span className="text-gray-500 border-r-[1px] border-solid border-aipgf-geyser p-2">https://github.com/</span>
                                            <input 
                                                type="text" 
                                                className="focus:outline-none h-5 text-sm p-2 px-1"
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
                onRemoveMember={handleRemoveTeamMember}
                existingMembers={teamMembers}
            />
        </div>
        
    )
}
export default CreateProject;