export type PostDataType = {
  id: string;
  label?: string;
  site_name?: string;
  title: string;
  description?: string;
  create_at?: string;
  upload_at?: string;
  report_content: string;
  table_content?: string;
  chips?: "new" | "hot" | "default";
  views: number;
};
