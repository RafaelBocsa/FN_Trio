import React from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import api from "../api/axios";

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

const Navbar = ({ username, name, email, picture }) => {
  return (
    <div className="flex justify-between p-10 z-10">
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-12">
          <div>
            <div className="flex items-center hover:opacity-50 font-medium">
              <img src="/FNCSWhite.png" alt="" className="h-14" />
              <h2 className="hidden sm:block text-xl ">Trio Zone</h2>
            </div>
          </div>
        </div>

        {name || email || picture ? (
          <div className="flex items-center gap-4 z-10 ">
            {picture && (
              <Popover>
                <PopoverButton id="button1">
                  <img
                    src={picture}
                    alt="User Avatar"
                    className="h-14 w-14 rounded-full "
                  />
                </PopoverButton>
                <PopoverPanel
                  transition
                  anchor="bottom"
                  className="divide-y divide-white/5 rounded-xl bg-white/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 z-10"
                >
                  <div className="p-3">
                    <Link
                      className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                      href="#"
                    >
                      <p className="font-semibold text-white">Username</p>
                      <p className="text-white/50">{username}</p>
                    </Link>
                    <Link
                      className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                      href="https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash"
                      target="_blank"
                    >
                      <p className="font-semibold text-white">Google gemini</p>
                      <p className="text-white/50">Gemini-2.5-flash</p>
                    </Link>
                  </div>
                  <div className="p-3">
                    <Link
                      className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
                      to={`${api.defaults.baseURL}/logout`}
                    >
                      <p className="font-semibold text-white">Logout</p>
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
