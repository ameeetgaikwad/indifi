import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Header() {
  return (
    <>
      <div>
        <div className="flex flex-row justify-between pt-0 px-5 w-full">
          <Link href={"/"}>
            <Image src="/logo.png" alt="logo" width={100} height={100} />
          </Link>
          <div className="flex flex-row gap-x-6 text-center justify-center items-center">
            <Link
              href={"/analytics"}
              className="text-white font-semibold hover:underline"
            >
              Analytics
            </Link>
            <ConnectButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
