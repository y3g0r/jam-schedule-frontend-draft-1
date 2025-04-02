export interface PostProps {
    id: number;
    title: string;
    content: string;
}

export function Post({title, content}: PostProps) {
    return (
        <article>
            <h3>{title}</h3>
            <div>{content}</div>
        </article>
    )
}