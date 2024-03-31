import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";
import {
  getDefaultConfig,
  RainbowKitProvider,
  Chain,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { polygonMumbai, sepolia, polygonZkEvmTestnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const PolygonCardona = {
  id: 2442,
  name: "Cardona Testnet",
  iconUrl:
    "https://c8.alamy.com/zooms/9/ca8385ccae4b473490b2f3c035cc6a9f/2g0r7je.jpg",
  iconBackground: "#fff",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.cardona.zkevm-rpc.com"] },
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://cardona-zkevm.polygonscan.com",
      apiUrl: "https://cardona-zkevm.polygonscan.com/api",
    },
  },
  testnet: true,
  contracts: {
    multicall3: {
      address: "0x50354531544DBB8397E7f853B03540a0c13b1e45",
      blockCreated: 1816738,
    },
  },
} as const satisfies Chain;
const AvailSepoila = {
  id: 202402021700,
  name: "OP Avail Sepolia Testnet",
  iconUrl:
    "https://www.availproject.org/_next/static/media/logo_large.80d5666f.png",
  iconBackground: "#fff",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://op-avail-sepolia.alt.technology"] },
  },
  blockExplorers: {
    default: {
      name: "AvailScan",
      url: "https://op-avail-sepolia-explorer.alt.technology",
      apiUrl: "https://op-avail-sepolia-explorer.alt.technology/api",
    },
  },
  testnet: true,
  contracts: {
    multicall3: {
      address: "0x12b0e4B1790953415F076dA5f706b7292DDF08c5",
      blockCreated: 149959,
    },
  },
} as const satisfies Chain;

const Lumio = {
  id: 9990,
  name: "Lumio L2 Testnet",
  iconUrl:
    "https://c8.alamy.com/zooms/9/ca8385ccae4b473490b2f3c035cc6a9f/2g0r7je.jpg",
  iconBackground: "#fff",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet.lumio.io"] },
  },
  blockExplorers: {
    default: {
      name: "LumioScan",
      url: "https://explorer.testnet.lumio.io",
      apiUrl: "https://explorer.testnet.lumio.io/api",
    },
  },
  testnet: true,
  contracts: {
    multicall3: {
      address: "0x85746084D5F8d5420C16eABeB636d02D904b6B03",
      blockCreated: 4590786,
    },
  },
} as const satisfies Chain;

const config = getDefaultConfig({
  appName: "Indifi",
  projectId: "2455679236dbec241fec394feb4fe62d",
  chains: [PolygonCardona, AvailSepoila, Lumio, sepolia, polygonZkEvmTestnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <AnonAadhaarProvider _useTestAadhaar={true}>
            <Component {...pageProps} />
          </AnonAadhaarProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
