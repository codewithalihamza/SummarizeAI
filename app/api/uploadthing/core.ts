import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing({
    errorFormatter: (err) => {
        console.error("Upload error:", err);
        return { message: "Failed to upload file" };
    },
});

export const ourFileRouter = {
    pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
        .onUploadError((err) => {
            console.error(err);
        })
        .onUploadComplete(async ({ file }) => {
            return { fileUrl: file.url, fileName: file.name };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter; 