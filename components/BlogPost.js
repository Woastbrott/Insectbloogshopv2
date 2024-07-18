export default function BlogPost({ title, content }) {
    return (
      <article>
        <h2>{title}</h2>
        <div>{content}</div>
      </article>
    );
  }
  