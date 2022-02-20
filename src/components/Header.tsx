import Image from "next/image";
import Link from "next/link";

const Header = () => (
    <>        
      <Link href="/">
          <Image src="/title_logo.svg" width={90} height={29} alt="nitsuki" />
    </Link>
    </>
)

export default Header;