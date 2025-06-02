export interface ITag {
  id: string;
  name: string;
  colorBg: string;
  colorText: string;
}

export interface ITagListResponse {
  tags: ITag[];
}
