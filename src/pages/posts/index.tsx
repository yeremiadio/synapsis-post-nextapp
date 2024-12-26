import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getPosts } from "@/api/post";

import Layout from "@/components/Layout";

import pageUrlsConfig from "@/utils/configs/pageUrlsConfig";
import { QUERY_KEYS } from "@/utils/configs/queryKeys";
import { Input, Pagination, Spin } from "antd";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import filterObjectIfValueIsEmpty from "@/utils/functions/filterObjectIfValueIsEmpty";
import useDebounce from "@/utils/hooks/useDebounce";

const PostsPage: React.FC = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 1000);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const { data: queryData, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.POSTS, page, perPage, debouncedSearch],
    queryFn: async () => {
      const response = await getPosts({
        page,
        per_page: perPage,
        ...filterObjectIfValueIsEmpty({ title: debouncedSearch }),
      });
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
          <div className="p-4 flex justify-center items-center">
            <Input
              rootClassName="bg-white w-full max-w-[320px]"
              value={search}
              placeholder="Search title..."
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
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
          <div className="justify-center items-center flex py-4">
            <Pagination
              total={100}
              onChange={(page, pageSize) => {
                setPage(page);
                setPerPage(pageSize);
              }}
              defaultPageSize={10}
              defaultCurrent={1}
            />
          </div>
        </Fragment>
      )}
    </Layout>
  );
};

export default PostsPage;
