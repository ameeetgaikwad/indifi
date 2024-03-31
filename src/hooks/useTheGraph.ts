import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
export const useSubGraph = () => {
  const { address: account } = useAccount();
  const [lendAmount, setLendAmount] = useState(0);
  const [borrowAmount, setBorrowAmount] = useState(0);
  //   const tokensQuery = `
  //  query($account:String)
  //   {
  //   registerReferrals(where: {referredBy: $account}) {
  //     domainName
  //     comission
  //     referredTo
  //   }
  //  }
  // `;
  const tokensQuery = `
query($account:String)
{
 tokensBorroweds(where: {borrower: $account}) {
   amount
   borrower
   id
 }
 liquidityProvideds(where: {provide: $account}) {
   id
   amount
   provide
 }
}
`;
  const client = new ApolloClient({
    uri: "https://api.studio.thegraph.com/query/69301/indianfi/v0.0.1",
    cache: new InMemoryCache(),
  });
  useEffect(() => {
    client
      .query({
        query: gql(tokensQuery),
        variables: {
          account: account,
        },
      })
      .then((data) => {
        console.log("Subgraph data: ", data);
        setBorrowAmount(
          data.data.tokensBorroweds.reduce(
            (accumulator: number, currentValue: any) => {
              return (
                accumulator +
                Math.trunc(Number(ethers.formatEther(currentValue.amount)))
              );
            },
            0
          )
        );
        setLendAmount(
          data.data.liquidityProvideds.reduce(
            (accumulator: number, currentValue: any) => {
              return (
                accumulator +
                Math.trunc(Number(ethers.formatEther(currentValue.amount)))
              );
            },
            0
          )
        );
      })
      .catch((err) => {
        console.log("Error fetching data: ", err);
      });
  }, [account]);

  return {
    lendAmount: lendAmount,
    borrowAmount: borrowAmount,
  };
};
