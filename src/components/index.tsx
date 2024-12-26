import React from "react";
import Link from "next/link";
import pageUrlsConfig from "@/utils/configs/pageUrlsConfig";
import { useRouter } from "next/router";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import CookieManager from "@/utils/configs/cookieConfig";
const Navbar: React.FC = () => {
  const router = useRouter();
  const cookieManager = new CookieManager();
  const handleLogout = () => {
    router.replace("/");
    cookieManager.clearAllCookies();
  };
  return (
    <nav className="bg-white p-4 shadow fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link
            href={pageUrlsConfig.posts}
            className={`text-gray-700 ${
              router.pathname.startsWith(pageUrlsConfig.posts)
                ? "font-bold"
                : ""
            }`}
          >
            Synapsis Post App
          </Link>
        </div>
        <Button
          className="text-gray-700 !bg-red-500 hover:!text-white hover:!bg-red-600 font-semibold"
          type="primary"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
