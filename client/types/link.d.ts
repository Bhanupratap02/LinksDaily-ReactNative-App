import {User} from './user';
export interface Link {
  title: string;
  link: string;
  urlPreview: UrlPreview;
  createdAt?: string;
  _id: string;
  views: number;
  postedBy: User;
  likes: User[];
}
export interface UrlPreview {
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: {url?: string};
}
