import type React from "react";
import detectEthereumProvider from '@metamask/detect-provider';
import { utf8ToHex } from "web3-utils";

export const signMessage = async (message: string, setError: React.Dispatch<React.SetStateAction<string | null>>) => {
  try {
    if (!(window as any).ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await (window as any).ethereum.send("eth_requestAccounts");
    const provider: any = await detectEthereumProvider();
    if (provider) {

      console.log('Ethereum successfully detected!')

      const chainId = await provider.request({
        method: 'eth_chainId'
      });
      console.log(chainId);

      const accounts = await provider.request({
        method: 'eth_accounts',
      });
      console.log(accounts[0]);
      const signature = await personalSign(accounts, provider, message);
      return signature;
    } else {
      console.error('Please install MetaMask!');
    }

  } catch (error) {
    console.log(error);
  }
}

export const personalSign = async (accounts: any, provider: any, message: string) => {
  try {
    const from = accounts[0];
    const msg = utf8ToHex(message);
    const sign = await provider.request({
      method: 'personal_sign',
      params: [msg, from, 'Example password'],
    });
    console.log(`sign: ${sign}`);
    return sign;
  } catch (err) {
    console.error(err);

  }
}