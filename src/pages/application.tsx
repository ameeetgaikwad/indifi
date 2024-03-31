import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import Head from "next/head";
import {
  useChainId,
  useWriteContract,
  useAccount,
  useReadContract,
} from "wagmi";
import { useEffect, useState } from "react";
import { indifyABI, usdtABI } from "@/abis/indifyABI";
import { contracts } from "@/configs/contracts";
import { Address } from "viem";
import Layout from "@/views/Layout/Layout";
import { ChainId } from "@/configs/chainId";
import { ethers } from "ethers";
function Application() {
  const { address: account } = useAccount();
  const [lendAmount, setLendAmount] = useState<Number>();
  const [borrowAmount, setBorrowAmount] = useState<Number>();
  const [repayAmount, setRepayAmount] = useState<Number>();
  const { writeContract } = useWriteContract();
  const chainId = useChainId();

  function callLend() {
    console.log(ethers.parseEther(lendAmount?.toString() as string));
    writeContract({
      address: contracts.USDT[chainId as ChainId] as Address,
      abi: usdtABI,
      functionName: "approve",
      args: [
        contracts.IndiFi[chainId as ChainId] as Address,
        ethers.parseEther(lendAmount?.toString() as string),
      ],
    });

    setTimeout(() => {
      writeContract({
        address: contracts.IndiFi[chainId as ChainId] as Address,
        abi: indifyABI,
        functionName: "lend",
        args: [ethers.parseEther(lendAmount?.toString() as string)],
      });
    }, 7000);
  }
  function callBorrow() {
    writeContract({
      address: contracts.IndiFi[chainId as ChainId] as Address,
      abi: indifyABI,
      functionName: "borrow",
      args: [ethers.parseEther(borrowAmount?.toString() as string)],
    });
  }
  function callRepay() {
    writeContract({
      address: contracts.BorrowerToken[chainId as ChainId] as Address,
      abi: usdtABI,
      functionName: "approve",
      args: [
        contracts.IndiFi[chainId as ChainId] as Address,
        ethers.parseEther(repayAmount?.toString() as string),
      ],
    });
    setTimeout(() => {
      writeContract({
        address: contracts.IndiFi[chainId as ChainId] as Address,
        abi: indifyABI,
        functionName: "repay",
        args: [ethers.parseEther(repayAmount?.toString() as string)],
      });
    }, 8000);
  }

  useEffect(() => {}, []);
  return (
    <>
      <Head>
        <title>Indifi</title>
      </Head>
      <Layout>
        {account ? (
          <div className="flex flex-row justify-center items-center h-screen">
            <Card className="w-[40%]">
              <CardHeader>
                <CardTitle className="text-center">Lend&Borrow</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col justify-center">
                <div className="flex flex-row">
                  <div className="mb-2">
                    <Input
                      type="number"
                      placeholder="10 USDT"
                      className="w-[70%] mb-1"
                      inputMode="numeric"
                      value={lendAmount as number}
                      onChange={(e) => setLendAmount(Number(e.target.value))}
                    />
                    <Button
                      variant="outline"
                      onClick={async () => {
                        console.log("lh");
                        callLend();
                      }}
                    >
                      Lend
                    </Button>
                  </div>

                  <div>
                    <div className="flex flex-row">
                      <Input
                        type="number"
                        placeholder="10 USDT"
                        className="w-[70%] mb-1 mr-1"
                        inputMode="numeric"
                        onChange={(e) =>
                          setBorrowAmount(Number(e.target.value))
                        }
                        value={borrowAmount as number}
                      />
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => {
                        callBorrow();
                      }}
                    >
                      Borrow
                    </Button>
                  </div>
                </div>
                <div>
                  <div>
                    <Input
                      type="number"
                      placeholder=""
                      className="w-[35%] mb-1"
                      inputMode="numeric"
                      value={repayAmount as number}
                      onChange={(e) => setRepayAmount(Number(e.target.value))}
                    />
                    <Button
                      variant="outline"
                      onClick={async () => {
                        console.log("lh");
                        callRepay();
                      }}
                    >
                      Repay
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
          </div>
        ) : (
          <div className="flex flex-row justify-center items-center text-white h-screen">
            Connect Wallet
          </div>
        )}
      </Layout>
    </>
  );
}

export default Application;
