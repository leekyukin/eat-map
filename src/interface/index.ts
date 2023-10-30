import { User } from "@prisma/client";

export interface StoreType {
  id: number;
  phone: string | null; // tel_no
  address: string | null; // rdn_code_nm
  lat: string | null; // y_dnts
  lng: string | null; // x_cnts
  name: string | null; // upso_nm
  category: string | null; // bizcnd_code_nm
  storeType: string | null; // cob_code_nm
  foodCertifyName: string | null; // crtfc_gbn_nmp
  likes?: LikeType[];
}

export interface LikeType {
  id: number;
  storeId: number;
  userId: number;
  store: StoreType;
}

export interface LikeApiResponse {
  page?: number;
  data: CommentType[];
  totalPage?: number;
}

export interface CommentType {
  id: number;
  storeId: number;
  userId: number;
  store?: StoreType;
  body: string;
  user: UserType;
}

export interface UserType {
  id: number;
  email?: string | null;
  image?: string | null;
  name?: string | null;
}

export interface CommentApiResponse {
  page?: number;
  data: CommentType[];
  totalPage?: number;
}
export interface StoreApiResponse {
  page?: number;
  data: StoreType[];
  totalCount?: number;
  totalPage?: number;
}

export interface LocationType {
  lat: string | null;
  lng: string | null;
  zoom: number;
}

export interface SearchType {
  q?: string;
  district?: string;
}
