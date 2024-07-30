import { RiMenu2Fill } from "@remixicon/react";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white text-gray-500">
      <nav className="flex justify-center w-full">
        <div className="flex w-full items-center justify-between p-4 text-sm md:hidden">
          <div>
            <RiMenu2Fill/>
          </div>
          <div>
            Get Started
          </div>
        </div>
        <div className="hidden md:flex w-full items-center justify-between max-w-7xl p-4 text-sm">
          <div className="">
            <ul className="flex gap-8">
              <li><Link href='/'>Home</Link></li>
              <li>About Us</li>
              <li>Pricing</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div className="flex gap-8">
            <div>Submit PastPapers!</div>
            <div>Get Started</div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
