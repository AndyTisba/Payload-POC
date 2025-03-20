import { headers as getHeaders } from "next/headers.js";
import Image from "next/image";
import { getPayload } from "payload";
import React from "react";
import { fileURLToPath } from "url";

import config from "@/payload.config";
import "./styles.css";
import { User, UserRole } from "@/collections/Users";

const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`;

const avatars: Record<UserRole, string> = {
  admin: "👑",
  contributor: "🎨",
  validator: "🔍",
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default async function HomePage() {
  const headers = await getHeaders();
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const res = await payload.auth({ headers });
  const user = res.user as User | null;

  return (
    <div className="home">
      {user && (
        <>
          <h2 className="role">
            {capitalizeFirstLetter(user.role)} {avatars[user.role]}
          </h2>
        </>
      )}

      <div className="content">
        <picture>
          <source srcSet="http://localhost:9000/assets/image.high.jpg" />
          <Image
            alt="Mask"
            height={750 / 5}
            src="http://localhost:9000/assets/image.high.jpg"
            width={565 / 5}
          />
        </picture>
        {!user && <h1>Welcome to Payload POC.</h1>}
        {user && <h1>Welcome back, {user.email}</h1>}
        <div className="links">
          <a
            className="admin"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
          <a
            className="docs"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
      </div>
      <div className="footer">
        <p>Update this page by editing</p>
        <a className="codeLink" href={fileURL}>
          <code>app/(frontend)/page.tsx</code>
        </a>
      </div>
    </div>
  );
}
