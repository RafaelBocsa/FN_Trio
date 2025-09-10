import React from "react";
import { Link } from "react-router-dom";
// import userSettings from "./UserSettings";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

// http://localhost:8080/logout

function userSettings() {
  return (
    <Popover className="relative">
      <PopoverButton>Solutions</PopoverButton>
      <PopoverPanel anchor="bottom" className="flex flex-col">
        <Link href="/analytics">Analytics</Link>
        <Link href="/engagement">Engagement</Link>
        <Link href="/security">Security</Link>
        <Link href="/integrations">Integrations</Link>
      </PopoverPanel>
    </Popover>
  );
}

const Navbar = ({ name, email, picture }) => {
  return (
    <div className="flex justify-between p-12 ">
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-12">
          <Link href="/dashboard">
            <div className="flex items-center hover:opacity-50">
              <img src="/FNCSWhite.png" alt="" className="h-14" />
              <h2 className="hidden sm:block text-xl ">Trio Zone</h2>
            </div>
          </Link>
        </div>

        {name || email || picture ? (
          <div className="flex items-center gap-4 ">
            {picture && (
              <Popover>
                <PopoverButton>
                  <img
                    src={picture}
                    alt="User Avatar"
                    className="h-14 w-14 rounded-full "
                  />
                </PopoverButton>
                <PopoverPanel
                  transition
                  anchor="bottom"
                  className="divide-y divide-white/5 rounded-xl bg-white/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                >
                  <div className="p-3">
                    <Link
                      className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                      href="#"
                    >
                      <p className="font-semibold text-white">Username</p>
                      <p className="text-white/50">{name}</p>
                    </Link>
                    <Link
                      className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                      href="#"
                    >
                      <p className="font-semibold text-white">Name</p>
                      <p className="text-white/50">{name}</p>
                    </Link>
                    <Link
                      className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                      href="#"
                    >
                      <p className="font-semibold text-white">Reports</p>
                      <p className="text-white/50">Keep track of your growth</p>
                    </Link>
                  </div>
                  <div className="p-3">
                    <Link
                      className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                      to={"http://localhost:8080/logout"}
                    >
                      <p className="font-semibold text-white">Logout</p>
                    </Link>
                  </div>
                  <div className="p-3">
                    <Link
                      className="block rounded-lg py-2 px-3 transition hover:bg-white/5 text-red-400 hover:text-red-400 lg:text-white"
                      to={"http://localhost:8080/logout"}
                    >
                      <p className="font-semibold ">Delete Account</p>
                    </Link>
                  </div>
                </PopoverPanel>
              </Popover>
            )}
            <div className="hidden lg:flex flex-col">
              {name && <p className="font-medium">{name}</p>}
              {email && <p className="text-sm text-gray-500">{email}</p>}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <p>Loading user data...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
