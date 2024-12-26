import { Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import CookieManager from "@/utils/configs/cookieConfig";
import pageUrlsConfig from "@/utils/configs/pageUrlsConfig";
import { LogoutOutlined } from "@ant-design/icons";
import SwitcherDarkMode from "../SwitcherDarkMode";

const Navbar: React.FC = () => {
  const router = useRouter();
  const cookieManager = new CookieManager();
  const handleLogout = () => {
    router.replace("/");
    cookieManager.clearAllCookies();
  };

  return (
    <nav className="dark:bg-gray-800 bg-white p-4 shadow fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link
            href={pageUrlsConfig.posts}
            className={`dark:text-white text-gray-700 ${
              router.pathname.startsWith(pageUrlsConfig.posts)
                ? "font-bold"
                : ""
            }`}
          >
            Synapsis Post App
          </Link>
        </div>
        <div className="inline-flex gap-2 lg:gap-4 items-center">
          <SwitcherDarkMode />
          <Button
            className="text-gray-700 !bg-red-500 hover:!text-white hover:!bg-red-600 font-semibold"
            type="primary"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
