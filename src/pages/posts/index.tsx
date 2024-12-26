import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getPosts } from "@/api/post";

import Layout from "@/components/Layout";

import { QUERY_KEYS } from "@/utils/configs/queryKeys";
import { useRouter } from "next/router";
import pageUrlsConfig from "@/utils/configs/pageUrlsConfig";
import { Fragment } from "react";
import { Spin } from "antd";

const PostsPage: React.FC = () => {
  const router = useRouter();
  const { data: queryData, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: async () => {
      const response = await getPosts({});
      return response;
    },
    placeholderData: keepPreviousData,
  });

  return (
    <Layout>
      {isLoading ? (
        <div className="flex justify-center items-center my-4">
          <Spin />
        </div>
      ) : (
        <Fragment>
          <h1>Posts Page</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {queryData?.map((post) => (
              <div
                onClick={() =>
                  router.push(`${pageUrlsConfig.posts}/${post.id}`)
                }
                key={post.id}
                className="bg-white p-4 m-2 rounded-lg shadow h-fit lg:h-[120px] hover:-translate-y-2
          transition-all cursor-pointer"
              >
                <h2 className="text-gray-800 font-bold mb-2">{post.title}</h2>
                <p className="text-gray-500 truncate">{post.body}</p>
              </div>
            ))}
          </div>
        </Fragment>
      )}
    </Layout>
  );
};

export default PostsPage;
