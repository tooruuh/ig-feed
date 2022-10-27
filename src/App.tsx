import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { SideBard } from "./components/Sidebar";

import "./styles/global.css";

import styles from "./App.module.css";

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/tooruuh.png",
      name: "Victor Hugo",
      role: "CTO @Apple",
    },
    content: [
      { type: "paragraph", content: "Fala galerra 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      { type: "link", content: "jane.design/doctorcare" },
    ],
    publishedAt: new Date("2022-05-03 20:00:00"),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/diego3g.png",
      name: "Diego Portes",
      role: "CTO @Rocketseat",
    },
    content: [
      { type: "paragraph", content: "Fala galerra 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      { type: "link", content: "jane.design/doctorcare" },
    ],
    publishedAt: new Date("2022-10-10 20:00:00"),
  },
];

function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <SideBard />

        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            );
          })}
        </main>
      </div>
    </>
  );
}

export default App;
