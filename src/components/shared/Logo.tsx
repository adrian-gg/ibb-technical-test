import Link from "next/link";

const Logo = () => {
  return (
    <>
      <Link
        href="/"
        className="w-full flex justify-center items-center text-primary font-bold aspect-square"
      >
        <p className="text-lg font-black">XAT</p>
      </Link>
    </>
  );
};

export default Logo;
