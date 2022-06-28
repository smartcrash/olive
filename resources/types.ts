export type Comment = {
    id: 1;
    author: string;
    content: string;
    created_at: string;
    updated_at: string;
    children_count: number;
    parent_id: number | null
    path: string
};