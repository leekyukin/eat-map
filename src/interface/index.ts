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
}

export interface StoreApiResponse {
	page?: number;
	data: StoreType[];
	totalCount?: number;
	totalPage?: number;
}
