import { contracts } from "@/configs/contracts";
import { useChainId } from "wagmi";
import { useWriteContract } from "wagmi";

import indifyABI from "@/abis/indifyABI.json";

export const useEthRegistrarControllerContractWrite = ({
  functionName,
  args,
  ...rest
}: any) => {
  const chainId = useChainId();
  const {
    data,
    isError,
    isLoading,
    error,
    write,
    writeAsync,
    reset,
    isSuccess,
  } = useWriteContract({
    // @ts-ignore
    address: contracts.IndiFi[chainId],
    abi: indifyABI,
    functionName,
    args,
    chainId,
    ...rest,
  });
  return {
    data,
    isError,
    isLoading,
    error,
    write,
    writeAsync,
    reset,
    isSuccess,
  };
};

export const useLend = () => {
  const data = useEthRegistrarControllerContractWrite({
    functionName: "lend",
  });
  return data;
};
export const useBorrow = () => {
  const data = useEthRegistrarControllerContractWrite({
    functionName: "borrow",
  });
  return data;
};
export const useRepay = () => {
  const data = useEthRegistrarControllerContractWrite({
    functionName: "repay",
  });
  return data;
};
