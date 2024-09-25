import React from "react";

function Footer() {
  return (
    <>
      <footer className="self-end bg-white border-t border-gray-100 w-full">
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-0 sm:px-6 lg:px-8 lg:pt-0 flex flex-col items-center w-full">
          <div className="mt-2 pt-0 w-full">
            <div className="text-center sm:flex sm:justify-between sm:text-left">
              <p className="text-sm text-gray-500">
                <span className="block sm:inline">All rights reserved.</span>

                <a
                  className="inline-block text-teal-600 underline transition hover:text-teal-600"
                  href="#"
                >
                  Terms & Conditions
                </a>

                <span>&middot;</span>

                <a
                  className="inline-block text-teal-600 underline transition hover:text-teal-600"
                  href="#"
                >
                  Privacy Policy
                </a>
              </p>
              <p className="text-sm text-gray-500 sm:order-first sm:mt-0">
                &copy; 2022 Syntax Software Studio
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
