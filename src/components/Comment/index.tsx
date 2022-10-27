import { Avatar } from "../Avatar";

import { ThumbsUp, Trash } from "phosphor-react";

import { useState } from "react";
import styles from "./Comment.module.css";

interface CommentProps {
  content: string;
  deleteComment: (comment: string) => void;
}

export function Comment({ content, deleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  function handleDeletComment() {
    deleteComment(content);
  }

  function handlelikeComment() {
    setLikeCount((state) => {
      return state + 1;
    });
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/tooruuh.png" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Victor Hugo</strong>
              <time title="11 de maio as 08:13h" dateTime="2022-05-11 08:30:11">
                Cerca de 1h atrás
              </time>
            </div>

            <button onClick={handleDeletComment} title="Deletar comentario">
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handlelikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
