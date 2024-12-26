import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Button, Form, Input, Modal, Spin } from "antd";
import { useRouter } from "next/router";

import { deletePost, getPostById, updatePost } from "@/api/post";
import { getUserById } from "@/api/user";
import Layout from "@/components/Layout";
import { QUERY_KEYS } from "@/utils/configs/queryKeys";
import { useEffect, useState } from "react";
import { Post } from "@/types/endpoints/post";
import toast from "react-hot-toast";
import pageUrlsConfig from "@/utils/configs/pageUrlsConfig";

const PostDetail = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const {
    data: post,
    isLoading,
    isError: isErrorPost,
  } = useQuery({
    queryKey: [QUERY_KEYS.POST_DETAIL],
    queryFn: async () => {
      const response = await getPostById(Number(id));
      return response;
    },
    placeholderData: keepPreviousData,
    enabled: !!id,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(post?.title ?? "");
  const [body, setBody] = useState(post?.body ?? "");
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const queryClient = useQueryClient();

  const showModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const showModalDelete = () => {
    setIsModalDeleteOpen(!isModalDeleteOpen);
  };

  const { data: userAuthor, isLoading: isLoadingUserAuthor } = useQuery({
    queryKey: [QUERY_KEYS.USER_DETAIL],
    queryFn: async () => {
      if (post?.user_id) {
        const response = await getUserById(post?.user_id);
        return response;
      }
    },
    placeholderData: keepPreviousData,
    enabled: !!post?.user_id,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: Partial<Post>) =>
      await updatePost(Number(id), { title: data.title, body: data.body }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POSTS, QUERY_KEYS.POST_DETAIL],
      });
      setIsModalOpen(false);
      toast.success("Successfully create post!");
      router.push(pageUrlsConfig.posts);
    },
    onError: (error) => toast.error("Failed to create post. " + error.message),
  });
  const { mutate: mutateDelete, isPending: isPendingDelete } = useMutation({
    mutationFn: async (data: Partial<Post>) => await deletePost(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POSTS, QUERY_KEYS.POST_DETAIL],
      });
      setIsModalOpen(false);
      toast.success("Successfully delete post!");
      router.push(pageUrlsConfig.posts);
    },
    onError: (error) => toast.error("Failed to delete post. " + error.message),
  });

  const onFinishEdit = () => {
    return mutate({
      title,
      body,
    });
  };

  useEffect(() => {
    if (post) {
      setBody(post.body);
      setTitle(post.title);
    }
  }, [post]);

  return (
    <Layout>
      <Modal
        title="Delete Post"
        open={isModalDeleteOpen}
        onOk={showModalDelete}
        onCancel={showModalDelete}
        okText="Delete"
        okButtonProps={{
          onClick: () => mutateDelete({}),
          disabled: isPendingDelete,
          danger: true,
        }}
        okType="primary"
      >
        <p>
          Are you sure you want to delete this post? This action cannot be
          undone.
        </p>
      </Modal>
      <Modal
        title="Edit Post"
        open={isModalOpen}
        onCancel={showModal}
        okButtonProps={{
          onClick: () => onFinishEdit(),
          disabled: isPending,
        }}
        okText={
          isPending ? <Spin indicator={<LoadingOutlined spin />} /> : "Save"
        }
      >
        <Form
          preserve={false}
          name="editPost"
          layout="vertical"
          className="w-full"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input title..." }]}
          >
            <Input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              defaultValue={post?.title ?? ""}
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input description..." }]}
          >
            <Input.TextArea
              value={body}
              onChange={(event) => setBody(event.target.value)}
              defaultValue={post?.body ?? ""}
            />
          </Form.Item>
        </Form>
      </Modal>
      {isErrorPost ? (
        <p>Failed to fetch post</p>
      ) : isLoading ? (
        <div className="flex justify-center items-center my-4">
          <Spin />
        </div>
      ) : (
        <>
          <Button
            className="mx-2 my-4 text-gray-700 hover:!text-white hover:!bg-blue-400 font-semibold"
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={() => router.back()}
          >
            Back
          </Button>
          <div className="flex md:justify-center md:items-center m-2 md:m-4">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-[560px]">
              <h1 className="text-gray-700 font-bold text-center text-lg mb-4">
                {post?.title ?? "-"}
              </h1>
              <span className="text-gray-700 font-bold text-base">
                Description :
              </span>
              <p className="text-gray-500 text-sm my-2">{post?.body}</p>
              <div className="mt-4">
                <h5 className="text-gray-700 font-bold text-base">
                  Author Detail :
                </h5>
                <p className="text-gray-600 text-sm">
                  Name: {userAuthor?.name ?? "-"}
                </p>
                <p className="text-gray-600 text-sm">
                  Email: {userAuthor?.email ?? "-"}
                </p>
                <p className="text-gray-600 text-sm">
                  Gender: {userAuthor?.gender ?? "-"}
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  className="mt-2 font-semibold !bg-blue-500 hover:!bg-blue-600"
                  type="primary"
                  onClick={showModal}
                  icon={<EditOutlined />}
                >
                  Edit
                </Button>
                <Button
                  className="mt-2 font-semibold !bg-red-500 hover:!bg-red-600"
                  type="primary"
                  onClick={showModalDelete}
                  icon={<DeleteOutlined />}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default PostDetail;
