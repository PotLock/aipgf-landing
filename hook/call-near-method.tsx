import * as nearAPI from "near-api-js";

// creates keyStore from a private key string
// you can define your key here or use an environment variable

const { keyStores, KeyPair,connect, WalletConnection, Contract } = nearAPI;
const myKeyStore = new keyStores.InMemoryKeyStore();
const PRIVATE_KEY = process.env.NEXT_PUBLIC_NEAR_PRIVATE_KEY;
// creates a public / private key pair using the provided private key

// adds the keyPair you created to keyStore

export const ViewMethod = async (contractId: string, method: string, args: any) => {
    const keyPair = KeyPair.fromString(PRIVATE_KEY || "");
    await myKeyStore.setKey("mainnet", process.env.NEXT_PUBLIC_NEAR_ACCOUNT_ID || "", keyPair);
    const connectionConfig = {
        networkId: "mainnet",
        keyStore: myKeyStore, // first create a key store
        nodeUrl: "https://rpc.mainnet.near.org",
        walletUrl: "https://wallet.mainnet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://nearblocks.io",
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
