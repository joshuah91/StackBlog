import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import styles from "@/styles/post.module.scss";
import NavHeader from "@/components/NavHeader";
import Footer from "@/components/Footer";
import { renderDate } from "@/components/RenderDate";
import { Post, PostValues } from "@/types/postsValue";

import { Box, Modal, CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useQuery, useQueryClient } from "react-query";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import swal from "sweetalert";
import { Formik, Field, ErrorMessage, Form, FormikHelpers } from "formik";
import * as Yup from "yup";

const inter = Inter({ subsets: ["latin"], weight: "400" });

const Post = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<Post>({} as Post);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  // modal state handling functions
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);
  // --end--

  const router = useRouter();
  const { id } = router.query;

  const queryClient = useQueryClient();

  // react query to make api call
  const { isLoading, error, data } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      await axios({
        method: "GET",
        url: process.env.NEXT_PUBLIC_HOST_API + `post/${id}`,
        headers: {
          "app-id": process.env.NEXT_PUBLIC_APP_ID,
        },
      }).then((res) => {
        console.log("ptst", res);
        setLoading(false);
        setPost(res?.data);
      });

      if (error) {
        console.log(error);
        return swal({
          title: "Error",
          icon: "error",
          text: "Something went wrong. Please try again later!",
        });
      }
    },
  });
  // --end--

  //function to delete a single post
  const deletePost = async (event: ChangeEvent<unknown>, id: string) => {
    event.preventDefault();
    setLoading(true);
    await axios({
      method: "DELETE",
      url: process.env.NEXT_PUBLIC_HOST_API + `post/${id}`,
      headers: {
        "app-id": process.env.NEXT_PUBLIC_APP_ID,
      },
    })
      .then((res) => {
        router.back();
      })
      .catch((err) => {
        console.log(err);
        swal({
          title: "error",
          icon: "error",
          text: "Something went wrong. Please try again later!",
        });
      });
  };
  // --end--

  //formik initial values for create post modal
  const initialValues: PostValues = {
    text: post?.text,
    image: post?.image,
    likes: post?.likes,
    link: post?.link,
    tags: post?.tags,
    owner: post?.owner?.id,
  };
  // --end--

  return (
    <>
      {/* html header section */}
      <Head>
        <title>Post</title>
        <meta name="description" content="Stackbuld blog platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* --end-- */}

      <main className={`${styles.main} ${inter.className}`}>
        <NavHeader />
        <div className={styles.post}>
          {/* header section */}
          <section>
            <div className={styles.headerSection}>
              <button onClick={() => router.back()}>
                <ArrowBackIcon />
                Back
              </button>
              {post?.updatedDate !== undefined ? (
                <p className={styles.moment}>
                  Published {renderDate(post?.updatedDate)}
                </p>
              ) : (
                <p className={styles.moment}>
                  Published {renderDate(post?.publishDate)}
                </p>
              )}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <h1>How our fashion world emerges</h1>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "64px",
                  }}
                >
                  <button onClick={handleEditOpen}>
                    <EditIcon />
                  </button>
                  <button onClick={handleDeleteOpen}>
                    <DeleteIcon />
                  </button>
                </div>
              </div>
              <p className={styles.hcontent}>{post?.text}</p>
              <div className={styles.headerSection_image}>
                <Image
                  priority
                  src={post?.image}
                  fill={true}
                  style={{
                    objectFit: "cover",
                  }}
                  alt="blog media"
                />
              </div>
            </div>
          </section>
          {/* --end-- */}

          {/* content section */}
          <section>
            <div className={styles.content}>
              <p className={styles.intro}>{post?.text}</p>
              <div className={styles.content_image}>
                <Image
                  priority
                  src={post?.image}
                  fill={true}
                  style={{
                    objectFit: "cover",
                  }}
                  alt="blog media"
                />
              </div>
              <div className={styles.blockquote}>
                <blockquote>
                  “In a world older and more complete than ours they move
                  finished and complete, gifted with extensions of the senses we
                  have lost or never attained, living by voices we shall never
                  hear.”
                </blockquote>
                <p> - Olivia Rhye, Product Designer</p>
              </div>
              <p className={styles.intro}>
                Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam
                suspendisse morbi eleifend faucibus eget vestibulum felis.
                Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam.
                Mauris posuere vulputate arcu amet, vitae nisi, tellus
                tincidunt. At feugiat sapien varius id. Eget quis mi enim, leo
                lacinia pharetra, semper. Eget in volutpat mollis at volutpat
                lectus velit, sed auctor. Porttitor fames arcu quis fusce augue
                enim. Quis at habitant diam at. Suscipit tristique risus, at
                donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet
                sodales id est ac volutpat.
              </p>
              <a
                href={post.link}
                target="_blank"
                style={{
                  color: "blue",
                  textDecoration: "underline",
                }}
              >
                {post.link}
              </a>
              <div className={styles.conclusion}>
                <h6>Conclusion</h6>
                <p>
                  Morbi sed imperdiet in ipsum, adipiscing elit dui lectus.
                  Tellus id scelerisque est ultricies ultricies. Duis est sit
                  sed leo nisl, blandit elit sagittis. Quisque tristique
                  consequat quam sed. Nisl at scelerisque amet nulla purus
                  habitasse. Nunc sed faucibus bibendum feugiat sed interdum.
                  Ipsum egestas condimentum mi massa. In tincidunt pharetra
                  consectetur sed duis facilisis metus. Etiam egestas in nec sed
                  et. Quis lobortis at sit dictum eget nibh tortor commodo
                  cursus. Odio felis sagittis, morbi feugiat tortor vitae
                  feugiat fusce aliquet. Nam elementum urna nisi aliquet erat
                  dolor enim. Ornare id morbi eget ipsum. Aliquam senectus neque
                  ut id eget consectetur dictum. Donec posuere pharetra odio
                  consequat scelerisque et, nunc tortor. Nulla adipiscing erat a
                  erat. Condimentum lorem posuere gravida enim posuere cursus
                  diam.
                </p>
              </div>
              <div className={styles.user}>
                <div className={styles.user_imageArea}>
                  <div className={styles.user_imageArea_image}>
                    <Image
                      src={post?.owner?.picture}
                      width={56}
                      height={56}
                      alt="user"
                    />
                  </div>
                  <div className={styles.user_imageArea_name}>
                    <h6>{`${post?.owner?.firstName} ${post?.owner?.lastName}`}</h6>
                    <p>Content Writer</p>
                  </div>
                </div>
                <div className={styles.user_tags}>
                  {post?.tags?.map((tag, index) => {
                    return (
                      <div key={index} className={styles.user_tags_item}>
                        {tag}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
          {/* --end-- */}
        </div>
        {/* edit modal for a single post */}
        <Modal
          open={editOpen}
          onClose={handleEditClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Formik
              initialValues={initialValues}
              enableReinitialize
              validationSchema={Yup.object().shape({
                text: Yup.string()
                  .required("This field is required")
                  .min(5, "text cannot be less than 5 characters"),
                image: Yup.string().required("This field is required").url(),
                likes: Yup.number()
                  .required("This field is required")
                  .min(1, "minimum of 1"),
              })}
              onSubmit={(
                values: PostValues,
                { setSubmitting }: FormikHelpers<PostValues>
              ) => {
                let formDetails = {
                  text: values.text,
                  image: values.image,
                  likes: values.likes,
                  link: values.link,
                  tags: values.tags,
                  owner: values.owner,
                };
                axios({
                  method: "PUT",
                  url: process.env.NEXT_PUBLIC_HOST_API + `post/${post.id}`,
                  headers: {
                    "app-id": process.env.NEXT_PUBLIC_APP_ID,
                  },
                  data: formDetails,
                }).then((res) => {
                  console.log(res);
                  setSubmitting(false);
                  handleEditClose();
                  router.reload();
                });
              }}
            >
              {({ values, errors, isSubmitting }) => (
                <Form>
                  {/* <pre>{JSON.stringify({ values, errors }, null, 2)}</pre> */}
                  <div className={styles.modal}>
                    <h4>Create Post</h4>
                    <div className={styles.modal_field}>
                      <label htmlFor="text">Text</label>
                      <Field
                        as="textarea"
                        name="text"
                        placeholder="type here..."
                      />
                      <ErrorMessage name="text">
                        {(msg: string) => (
                          <div style={{ color: "red" }}>{msg}</div>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className={styles.modal_field}>
                      <label htmlFor="image">Image String</label>
                      <Field
                        name="image"
                        type="text"
                        placeholder="image url..."
                      />
                      <ErrorMessage name="image">
                        {(msg: string) => (
                          <div style={{ color: "red" }}>{msg}</div>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className={styles.modal_field}>
                      <label htmlFor="likes">Likes</label>
                      <Field name="likes" type="number" placeholder="26" />
                      <ErrorMessage name="likes">
                        {(msg: string) => (
                          <div style={{ color: "red" }}>{msg}</div>
                        )}
                      </ErrorMessage>
                    </div>
                    <button type="submit">
                      {isSubmitting ? (
                        <CircularProgress size={25} sx={{ color: "white" }} />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </Box>
        </Modal>
        {/* --end-- */}

        {/* delete confirmation modal for a single post */}
        <Modal
          open={deleteOpen}
          onClose={handleDeleteClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className={styles.modal}>
              <h4>Delete Post</h4>
              <p>Are you sure you want to delete this post?</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={handleDeleteClose}
                  style={{ backgroundColor: "transparent", color: "#7f56d9" }}
                >
                  cancel
                </button>
                <button
                  onClick={(event: ChangeEvent<unknown>) => {
                    deletePost(event, post?.id);
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          </Box>
        </Modal>
        {/* --end-- */}

        <Footer />
      </main>
    </>
  );
};

export default Post;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 700,
  width: "100%",
  bgcolor: "background.paper",
  border: "0.4px solid #7f56d9",
  boxShadow: 8,
  p: 4,
};
