export interface PostProps {
    id: number;
    author: string;
    title: string;
    content: string;
}

export function Post({title, content, author}: PostProps) {
    return (
        <article>
            <h3>{title}</h3>
            <div>{content}</div>
            <div>Author: {author}</div>
        </article>
    )
}