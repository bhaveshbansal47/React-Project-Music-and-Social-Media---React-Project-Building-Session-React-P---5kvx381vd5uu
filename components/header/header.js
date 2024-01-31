"use client";
import Link from "next/link";
import { TokenContext } from "@/app/layout";
import { useContext } from "react";
import { useRouter } from "next/navigation";

export function Header() {
  const { token, setToken } = useContext(TokenContext);
  const router = useRouter();
  const onLoginLogout = () => {
    if (token) {
      localStorage.removeItem("token");
      setToken();
    }
    router.push("/signin");
  };

  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
      }}
      id="header"
    >
      <img
        src="https://e7.pngegg.com/pngimages/711/190/png-clipart-soundcloud-computer-icons-social-media-logo-music-sound-of-colors-company-internet.png"
        width={100}
        height={50}
      />
      <div
        style={{
          color: "white",
          fontSize: 24,
          gap: 20,
          display: "flex",
        }}
      >
        <Link href={"/"}>Home</Link>
        <Link href={"/social"}>Social</Link>
        <Link href={"/library"}>Library</Link>
      </div>
      <button
        style={{
          border: "none",
          backgroundColor: "white",
          padding: 10,
          fontSize: 20,
          fontWeight: "700",
          cursor: "pointer",
        }}
        onClick={onLoginLogout}
      >
        {token ? "Logout" : "Login"}
      </button>
    </div>
  );
}
