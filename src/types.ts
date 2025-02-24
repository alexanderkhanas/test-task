export type BookId = number

export type Book = {
    id: BookId;
    name: string;
    author: string;
    summary: string;
    genre: string;
    cover_url: string;
    views: string;
    likes: string;
    quotes: string;
}

export type BookSlideId = number;

export type BookSlide = {
    book_id: BookId;
    id: BookSlideId;
    cover: string;
}