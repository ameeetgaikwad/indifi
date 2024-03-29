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
          <div>
            <ConnectButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
