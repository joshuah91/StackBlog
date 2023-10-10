export type Posts = {
  id: string;
  image: string;
  likes: number;
  tags: string[];
  text: string;
  publishDate: string;
  updatedDate?: string;
  owner: {
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    picture: string;
  };
};

export type Post = {
  id: string;
  image: string;
  likes: number;
  link: string;
  tags: string[];
  text: string;
  publishDate: string;
  updatedDate?: string;
  owner: {
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    picture: string;
  };
};

export type PostValues = {
  text: string;
  image: string;
  likes: number | null;
  link: string;
  tags: string[];
  owner: string;
};
