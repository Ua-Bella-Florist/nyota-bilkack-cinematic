import { createFileRoute } from "@tanstack/react-router";

export interface ImageKitFile {
  fileId: string;
  name: string;
  filePath: string;
  url: string;
  thumbnailUrl: string;
  height: number;
  width: number;
  size: number;
  tags?: string[];
}

export const Route = createFileRoute("/api/images")({
  server: {
    handlers: {
      GET: async () => {
        // Retrieve keys from environment variables securely on the server
        const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
        
        if (!privateKey) {
          console.warn("IMAGEKIT_PRIVATE_KEY is not defined in the environment variables.");
          return new Response(
            JSON.stringify({
              error: "IMAGEKIT_PRIVATE_KEY is not configured",
              files: [],
            }),
            {
              status: 200, // Return 200 so the client can fallback gracefully without crashing
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        try {
          // Construct Basic Auth header securely
          const authString = `${privateKey}:`;
          const base64Auth = btoa(authString);
          
          // Fetch up to 1000 image files from the ImageKit API
          const response = await fetch(
            "https://api.imagekit.io/v1/files?fileType=image&limit=1000",
            {
              method: "GET",
              headers: {
                Authorization: `Basic ${base64Auth}`,
                Accept: "application/json",
              },
            }
          );

          if (!response.ok) {
            const errorText = await response.text();
            console.error(`ImageKit API error (${response.status}):`, errorText);
            throw new Error(`ImageKit API returned status ${response.status}`);
          }

          const data = await response.json();
          
          return new Response(JSON.stringify({ files: data }), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "public, max-age=60, s-maxage=60", // Cache response briefly
            },
          });
        } catch (error: any) {
          console.error("Failed to fetch images from ImageKit:", error);
          return new Response(
            JSON.stringify({
              error: error.message || "Failed to fetch images from ImageKit",
              files: [],
            }),
            {
              status: 200, // Return 200 with error details to allow client fallback
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      },
    },
  },
});
