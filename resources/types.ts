/**
 * Represents Cursor paginator isntance.
 * @see https://laravel.com/docs/9.x/pagination#cursor-paginator-instance-methods
 */
export interface Paginated<T> {
    data: T[];
    prev_page_url: string | null;
    next_page_url: string | null;
    path: string;
    per_page: number;
}

export type Comment = {
    id: 1;
    author: string;
    content: string;
    created_at: string;
    updated_at: string;
    depth: number;
    children_count: number;
    parent_id: number | null
    path: string
};
