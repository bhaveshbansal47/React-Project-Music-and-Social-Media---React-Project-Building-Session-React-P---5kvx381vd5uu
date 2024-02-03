import { likePost } from "@/apis/posts";
import { TokenContext } from "@/app/layout";
import { useContext } from "react";

export function Post({ post, setShowModal }) {
    const {token} = useContext(TokenContext)
    const onLike = async () => {
        if(!token) {
            setShowModal(true)
        } else {
            likePost(post._id)
        }
    }
    const onComment = async () => {
        if(!token) {
            setShowModal(true)
        }
    }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 20,
        border: "1px solid black",
        gap: 20,
        width: 500,
      }}
    >
      <div
        style={{
          display: "flex",
          padding: 10,
          gap: 20,
        }}
      >
        <img
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
          }}
          src={post.author.profileImage}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <h1>{post.title}</h1>
          <h4>By: {post.author.name}</h4>
        </div>
      </div>
      <h3>{post.content}</h3>
      <div
        style={{
          display: "flex",
          padding: 10,
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <img
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
            }}
            src={post.channel.image}
          />
          <h4>Channel: {post.channel.name}</h4>
        </div>
        <h4
          style={{
            cursor: "pointer",
          }}
          onClick={onLike}
        >
          {" "}
          Likes:{post.likeCount}{" "}
        </h4>{" "}
        <h4
          style={{
            cursor: "pointer",
          }}
          onClick={onComment}
        >
          Comments:{post.commentCount}
        </h4>
      </div>
    </div>
  );
}
