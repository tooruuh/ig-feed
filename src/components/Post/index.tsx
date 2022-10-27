import { Avatar } from "../Avatar";
import { Comment } from "../Comment";

import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

import styles from "./Post.module.css";

interface Content {
  type: string;
  content: string;
}

interface PostProps {
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  publishedAt: Date;
  content: Content[];
}

export function Post({ author, publishedAt, content }: PostProps) {
  const [comments, setComments] = useState(["Post mais incrivel que já vi"]);
  const [newCommentText, setNewCommentText] = useState("");

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText("");
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");

    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campp é obrigatório!");
  }

  function deleteComment(commentToDelete: string) {
    const filterComments = comments.filter((comment) => {
      return comment !== commentToDelete;
    });

    setComments(filterComments);
  }

  const disableButton = newCommentText.length === 0;

  return (
    <>
      <article className={styles.post}>
        <header>
          <div className={styles.author}>
            <Avatar src={author.avatarUrl} />

            <div className={styles.authorInfo}>
              <strong>{author.name}</strong>
              <span>{author.role}</span>
            </div>
          </div>

          <time
            title={publishedDateFormatted}
            dateTime={publishedAt.toISOString()}
          >
            {publishedDateRelativeToNow}
          </time>
        </header>

        <div className={styles.content}>
          {content.map((item) => {
            if (item.type === "paragraph") {
              return <p key={item.content}>{item.content}</p>;
            } else if (item.type === "link") {
              return (
                <p key={item.content}>
                  <a href="#">{item.content}</a>
                </p>
              );
            }
          })}
        </div>

        <form onSubmit={handleCreateNewComment} className={styles.form}>
          <strong>Deixe seu feedback</strong>

          <textarea
            name="comment"
            placeholder="Deixe um comentário"
            value={newCommentText}
            onChange={handleNewCommentChange}
            required
            onInvalid={handleNewCommentInvalid}
          />

          <footer>
            <button type="submit" disabled={disableButton}>
              Publicar
            </button>
          </footer>
        </form>

        <div className={styles.commentList}>
          {comments.map((comment) => {
            return (
              <Comment
                key={comment}
                content={comment}
                deleteComment={deleteComment}
              />
            );
          })}
        </div>
      </article>
    </>
  );
}
