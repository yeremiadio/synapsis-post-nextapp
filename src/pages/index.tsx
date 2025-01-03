import CookieManager from "@/utils/configs/cookieConfig";
import pageUrlsConfig from "@/utils/configs/pageUrlsConfig";
import { Button, Form, FormProps, Input } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

const cookieManager = new CookieManager();

type FieldType = {
  name: string;
  accessToken: string;
};

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const onFinish: FormProps<FieldType>["onFinish"] = ({
    name,
    accessToken,
  }) => {
    setIsLoading(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        toast.success(`Hello Welcome!, ${name}`);
        cookieManager.addCookies({
          accessToken,
          name,
        });
        router.push(pageUrlsConfig.posts);
        resolve();
      }, 1000);
    });
  };

  return (
    <div className="justify-center items-center flex h-screen bg-slate-50">
      <div className="bg-white px-4 py-6 rounded-lg shadow-lg w-full lg:w-[420px] mx-2">
        <h2 className="text-gray-700 font-bold text-lg mb-1 mt-2 text-center">
          Synapsis Post App
        </h2>
        <p className="text-gray-600 text-base mt-1 mb-2 text-center">
          Welcome back
        </p>
        <Form
          name="auth"
          onFinish={onFinish}
          layout="vertical"
          className="w-full"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Access Token"
            name="accessToken"
            rules={[
              { required: true, message: "Please input your access token!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null} className="mb-0">
            <Button
              loading={isLoading}
              className="w-full"
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Home;
