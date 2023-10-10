import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import { ChangeEvent, useState } from "react";
import styles from "@/styles/Home.module.scss";
import NavHeader from "@/components/NavHeader";
import Footer from "@/components/Footer";
import contents from "@/images/contents.png";
import { renderDate } from "@/components/RenderDate";

import { Posts, PostValues } from "@/types/postsValue";
import { Box, Pagination, Modal, CircularProgress } from "@mui/material";
import axios from "axios";
import swal from "sweetalert";
import { useQuery, useQueryClient } from "react-query";
import { Formik, Field, ErrorMessage, Form, FormikHelpers } from "formik";
import * as Yup from "yup";

const inter = Inter({ subsets: ["latin"], weight: "400" });

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [posts, setPosts] = useState<Posts[]>([]);
  const [recentPosts, setRecentPosts] = useState<Posts[]>([]);
  const [limit, setLimit] = useState<number>(20);
  const [total, setTotal] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchData, setSearchData] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  // modal state handling functions
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // --end--

  const router = useRouter();
  const queryClient = useQueryClient();

  // react query to make api call
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts", limit, page],
    queryFn: async () => {
      await axios({
        method: "GET",
        url:
          process.env.NEXT_PUBLIC_HOST_API + `post?limit=${limit}&page=${page}`,
        headers: {
          "app-id": process.env.NEXT_PUBLIC_APP_ID,
        },
      }).then((res) => {
        setLoading(false);
        setRecentPosts(res?.data?.data?.slice(0, 3));
        setPosts(res?.data?.data?.slice(3));
        setTotal(res?.data?.total);
        setCount(res?.data?.total / limit);
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

  //formik initial values for create post modal
  const initialValues: PostValues = {
    text: "",
    image: "",
    likes: null,
    link: "https://github.com/joshuah91",
    tags: ["content", "design", "insight"],
    owner: "60d0fe4f5311236168a10a10",
  };
  // --end--

  return (
    <>
      {/* html header section */}
      <Head>
        <title>Stackbuld Blog</title>
        <meta name="description" content="Stackbuld blog platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* --end-- */}

      <main className={`${styles.main} ${inter.className}`}>
        <NavHeader />
        <div className={styles.body}>
          {/* header section */}
          <div className={styles.headerArea}>
            <div className={styles.textArea}>
              {/* search by text instead of title */}
              <div className={styles.searchArea}>
                <input
                  type="search"
                  placeholder="search..."
                  className={styles.search}
                  value={searchData}
                  onChange={(event: any) => {
                    setSearchData(event.currentTarget.value);
                    let filteredData: Posts[] = [];
                    if (event.currentTarget.value.length > 2) {
                      setLoading(true);
                      filteredData = posts?.filter((post) => {
                        return post.text.includes(event?.currentTarget?.value);
                      });
                      console.log(filteredData);
                    } else {
                      filteredData = [];
                    }
                    if (filteredData.length > 0) {
                      console.log(filteredData);
                      setPosts(filteredData);
                      setRecentPosts(filteredData?.slice(0, 3));
                      setTotal(filteredData?.length);
                      setCount(1);
                      setLoading(false);
                    } else return;
                  }}
                  onBlur={(event: any) => {
                    if (event?.currentTarget.value.length === 0) {
                      router.reload();
                    }
                  }}
                />
              </div>
              {/* --end-- */}
              <h1>Checkout our resources</h1>
              <h4>
                Subscribe to learn about new product features, the latest in
                technology, solutions, and updates.
              </h4>
            </div>
            <div className={styles.buttonArea}>
              <button className={styles.createbutton} onClick={handleOpen}>
                Create Post
              </button>
            </div>
          </div>
          {/* --end-- */}

          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              {/* recent posts section */}
              <section>
                <div className={styles.recentSection}>
                  <h3>Recent Blog Posts</h3>
                  <div className={styles.rContent}>
                    <div className={styles.column1}>
                      <div className={styles.blogCard}>
                        <div className={styles.blogCard_image}>
                          <Image
                            priority
                            src={recentPosts[0]?.image}
                            fill={true}
                            style={{
                              objectFit: "cover",
                            }}
                            alt="blog media"
                          />
                        </div>
                        <div className={styles.blogCard_content}>
                          <div className={styles.blogCard_content_moment}>
                            <p>{`${recentPosts[0]?.owner?.firstName} ${recentPosts[0]?.owner?.lastName}`}</p>
                            <p style={{ marginTop: "-5px" }}>.</p>
                            <p>{renderDate(recentPosts[0]?.publishDate)}</p>
                          </div>
                          <div className={styles.blogCard_content_titleArea}>
                            <h5>UX reviews presentation</h5>
                            <button
                              onClick={() =>
                                router.push({
                                  pathname: "/post",
                                  query: {
                                    id: recentPosts[0]?.id,
                                  },
                                })
                              }
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g id="arrow-up-right">
                                  <path
                                    id="Icon"
                                    d="M7 17L17 7M17 7H7M17 7V17"
                                    stroke="#101828"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                              </svg>
                            </button>
                          </div>
                          <div className={styles.blogCard_content_words}>
                            <p>{recentPosts[0]?.text}</p>
                          </div>
                          <div className={styles.blogCard_content_tags}>
                            {recentPosts[0]?.tags.map((tag, index) => {
                              return (
                                <div
                                  key={index}
                                  className={styles.blogCard_content_tags__item}
                                >
                                  {tag}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    {recentPosts.length > 2 && (
                      <div className={styles.column2}>
                        <div className={styles.blogCard}>
                          <div className={styles.blogCard_image}>
                            <Image
                              priority
                              src={recentPosts[1]?.image}
                              fill={true}
                              style={{
                                objectFit: "cover",
                              }}
                              alt="blog media"
                            />
                          </div>
                          <div className={styles.blogCard_content}>
                            <div className={styles.blogCard_content_moment}>
                              <p>{`${recentPosts[1]?.owner?.firstName} ${recentPosts[1]?.owner?.lastName}`}</p>
                              <p style={{ marginTop: "-5px" }}>.</p>
                              <p>{renderDate(recentPosts[1]?.publishDate)}</p>
                            </div>
                            <div className={styles.blogCard_content_titleArea}>
                              <h5>UX reviews presentation</h5>
                              <button
                                onClick={() =>
                                  router.push({
                                    pathname: "/post",
                                    query: {
                                      id: recentPosts[1]?.id,
                                    },
                                  })
                                }
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g id="arrow-up-right">
                                    <path
                                      id="Icon"
                                      d="M7 17L17 7M17 7H7M17 7V17"
                                      stroke="#101828"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                </svg>
                              </button>
                            </div>
                            <div className={styles.blogCard_content_words}>
                              <p>{recentPosts[1]?.text}</p>
                            </div>
                            <div className={styles.blogCard_content_tags}>
                              {recentPosts[1]?.tags.map((tag, index) => {
                                return (
                                  <div
                                    key={index}
                                    className={
                                      styles.blogCard_content_tags__item
                                    }
                                  >
                                    {tag}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <div className={styles.blogCard}>
                          <div className={styles.blogCard_image}>
                            <Image
                              priority
                              src={recentPosts[2]?.image}
                              fill={true}
                              style={{
                                objectFit: "cover",
                              }}
                              alt="blog media"
                            />
                          </div>
                          <div className={styles.blogCard_content}>
                            <div className={styles.blogCard_content_moment}>
                              <p>{`${recentPosts[2]?.owner?.firstName} ${recentPosts[2]?.owner?.lastName}`}</p>
                              <p style={{ marginTop: "-5px" }}>.</p>
                              <p>{renderDate(recentPosts[2]?.publishDate)}</p>
                            </div>
                            <div className={styles.blogCard_content_titleArea}>
                              <h5>UX reviews presentation</h5>
                              <button
                                onClick={() =>
                                  router.push({
                                    pathname: "/post",
                                    query: {
                                      id: recentPosts[2]?.id,
                                    },
                                  })
                                }
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g id="arrow-up-right">
                                    <path
                                      id="Icon"
                                      d="M7 17L17 7M17 7H7M17 7V17"
                                      stroke="#101828"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                </svg>
                              </button>
                            </div>
                            <div className={styles.blogCard_content_words}>
                              <p>{recentPosts[2]?.text}</p>
                            </div>
                            <div className={styles.blogCard_content_tags}>
                              {recentPosts[2]?.tags.map((tag, index) => {
                                return (
                                  <div
                                    key={index}
                                    className={
                                      styles.blogCard_content_tags__item
                                    }
                                  >
                                    {tag}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
              {/* --end-- */}

              {/* all blogs section */}
              <section>
                <div className={styles.allSection}>
                  <h3>All Blog Posts</h3>
                  <div className={styles.aContent}>
                    {posts?.map((post, index) => {
                      return (
                        <div key={post.id} className={styles.blogCard}>
                          <div className={styles.blogCard_image}>
                            <Image
                              priority
                              src={post.image}
                              fill={true}
                              style={{
                                objectFit: "cover",
                              }}
                              alt="blog media"
                            />
                          </div>
                          <div className={styles.blogCard_content}>
                            <div className={styles.blogCard_content_moment}>
                              <p>{`${post?.owner?.firstName} ${post?.owner?.lastName}`}</p>
                              <p style={{ marginTop: "-5px" }}>.</p>
                              {post?.updatedDate !== undefined ? (
                                <p>{renderDate(post?.updatedDate)}</p>
                              ) : (
                                <p>{renderDate(post?.publishDate)}</p>
                              )}
                            </div>
                            <div className={styles.blogCard_content_titleArea}>
                              <h5>UX reviews presentation</h5>
                              <button
                                onClick={() =>
                                  router.push({
                                    pathname: "/post",
                                    query: {
                                      id: post?.id,
                                    },
                                  })
                                }
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g id="arrow-up-right">
                                    <path
                                      id="Icon"
                                      d="M7 17L17 7M17 7H7M17 7V17"
                                      stroke="#101828"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                </svg>
                              </button>
                            </div>
                            <div className={styles.blogCard_content_words}>
                              <p>{post.text}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <Pagination
                  count={count}
                  showFirstButton
                  showLastButton
                  color="secondary"
                  sx={{
                    float: "right",
                    marginTop: "20px",
                  }}
                  size="large"
                  page={page}
                  onChange={(event: ChangeEvent<unknown>, page: number) => {
                    setPage(page);
                  }}
                />
              </section>
              {/* --end-- */}

              {/* gallery section */}
              <section>
                <div className={styles.gSection}>
                  <div className={styles.gSection_text}>
                    <h1>No long-term contracts. No catches.</h1>
                    <p>Start your 30-day free trial today.</p>
                    <div className={styles.buttonArea}>
                      <button className={styles.button1}>Learn More</button>
                      <button className={styles.button2}>Get Started</button>
                    </div>
                  </div>
                  <div className={styles.gSection_gallery}>
                    <Image src={contents} alt="contents" />
                  </div>
                </div>
              </section>
              {/* --end-- */}

              {/* subscription section */}
              <section>
                <div className={styles.subSection}>
                  <div className={styles.subSection_subArea}>
                    <h3>Join 2,000+ subscribers</h3>
                    <p>Stay in the loop with everything you need to know.</p>
                  </div>
                  <div className={styles.subSection_emailArea}>
                    <div className={styles.email}>
                      <input type="email" placeholder="Enter your email..." />
                      <p>We care about your data in our privacy policy</p>
                    </div>
                    <div className={styles.emailButton}>
                      <button>Subscribe</button>
                    </div>
                  </div>
                </div>
              </section>
              {/* --end-- */}
            </>
          )}
        </div>
        {/* modal to create a single post */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Formik
              initialValues={initialValues}
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
                  method: "POST",
                  url: process.env.NEXT_PUBLIC_HOST_API + `post/create`,
                  headers: {
                    "app-id": process.env.NEXT_PUBLIC_APP_ID,
                  },
                  data: formDetails,
                })
                  .then((res) => {
                    console.log(res);
                    setSubmitting(false);
                    swal({
                      icon: "success",
                      title: "Success!",
                      text: "Created Successfully!",
                    });
                    handleClose();
                  })
                  .catch((err) => {
                    console.log(err);
                    swal({
                      icon: "error",
                      title: "Error!",
                      text: "Something went wrong. Please try again later!",
                    });
                  });
              }}
            >
              {({ values, errors, isSubmitting }) => (
                <Form>
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

        <Footer />
      </main>
    </>
  );
}

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
