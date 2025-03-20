This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## MinIO Setup

### Déployer Docker MinIO

```bash
docker run -p 9000:9000 -p 9001:9001 -e "MINIO_ROOT_USER=admin" -e "MINIO_ROOT_PASSWORD=password" quay.io/minio/minio server /data --console-address ":9001"
```

⇒ Go to [localhost:9001](http://127.0.0.1:9001) and login with `admin/password`

### Create a bucket

- Go to **http://localhost:9001**.
- Click on **"Buckets"**
- Click on **"Create Bucket"**
- Name the bucket as **"media-dam"**
- Click on **"Create Bucket"**.

### Add files

- On the page **“Object browser”**
- Click on the bucket name **"media-dam"**.
- Click on **"Upload File"**.
- Select your images/videos
- Validate

### Read files

(Maybe need to kill z-scaller)

- Install `minio/mc`

```bash
brew install minio/stable/mc
```

- Configure `mc`

```bash
mc alias set myminio [http://127.0.0.1:9000](http://127.0.0.1:9000/) admin password
```

- To download file

```bash
mc cp myminio/media-dam/"filename" .
```

(It will download the file in the current folder)

- Make bucket public

```bash
mc anonymous set public myminio/media-dam
```

(to check, go on http://127.0.0.1:9000/media-dam/filename )
