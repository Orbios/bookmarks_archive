interface Bookmark {
  id: number;
  title: string;
  url: string;
  tags: Tag[];
  isDeleted?: boolean;
  isTagged?: boolean;
  creationDate?: Date;
  lastEditDate?: Date;
  originalPath?: string;
}
