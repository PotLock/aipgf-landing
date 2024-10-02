import * as nearAPI from "near-api-js";


const { keyStores, KeyPair,connect, WalletConnection, Contract } = nearAPI;
const myKeyStore = new keyStores.InMemoryKeyStore();
const PRIVATE_KEY = process.env.NEXT_PUBLIC_NEAR_PRIVATE_KEY;
export const ViewMethod = async (contractId: string, method: string, args: any) => {
    const keyPair = KeyPair.fromString(PRIVATE_KEY || "");
    await myKeyStore.setKey(process.env.NEXT_PUBLIC_NETWORK || "", process.env.NEXT_PUBLIC_NEAR_ACCOUNT_ID || "", keyPair);
    const connectionConfig = {
        networkId: process.env.NEXT_PUBLIC_NETWORK || "",
        keyStore: myKeyStore, // first create a key store
        nodeUrl: process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"https://rpc.mainnet.near.org":"https://rpc.testnet.near.org",
        walletUrl: process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"https://wallet.mainnet.near.org":"https://wallet.testnet.near.org",
        helperUrl: process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"https://helper.mainnet.near.org":"https://helper.testnet.near.org",
        explorerUrl: process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"https://nearblocks.io":"https://testnet.nearblocks.io",
    };

    const nearConnection = await connect(connectionConfig);

    const account = await nearConnection.account(process.env.NEXT_PUBLIC_NEAR_ACCOUNT_ID || "");

    const contract:any = new Contract(account, contractId, {
        viewMethods: [method],
        changeMethods: [],
        useLocalViewExecution: false,
    });
    const response = await contract[method](args);

    return response;
};

export const CallMethod = async (contractId: string, method: string, args: any) => {
    const keyPair = KeyPair.fromString(PRIVATE_KEY || "");
    await myKeyStore.setKey(process.env.NEXT_PUBLIC_NETWORK || "", process.env.NEXT_PUBLIC_NEAR_ACCOUNT_ID || "", keyPair);
    const connectionConfig = {
        networkId: process.env.NEXT_PUBLIC_NETWORK || "",
        keyStore: myKeyStore, // first create a key store
        nodeUrl: process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"https://rpc.mainnet.near.org":"https://rpc.testnet.near.org",
        walletUrl: process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"https://wallet.mainnet.near.org":"https://wallet.testnet.near.org",
        helperUrl: process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"https://helper.mainnet.near.org":"https://helper.testnet.near.org",
        explorerUrl: process.env.NEXT_PUBLIC_NETWORK=="mainnet"?"https://nearblocks.io":"https://testnet.nearblocks.io",
    };

    const nearConnection = await connect(connectionConfig);

    const account = await nearConnection.account(process.env.NEXT_PUBLIC_NEAR_ACCOUNT_ID || "");

    const contract:any = new Contract(account, contractId, {
        viewMethods: [],
        changeMethods: [method],
        useLocalViewExecution: false,
    });
    const response = await contract[method](args);

    return response;
};
