import { CollectionConfig } from "payload";

const KeepeekMedia: CollectionConfig = {
  slug: "keepeek-media",
  labels: {
    singular: "Keepeek Media",
    plural: "Keepeek Media",
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "keepeekId",
      type: "text",
      required: true,
    },
    {
      name: "url",
      type: "text",
      required: true,
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        if (data.keepeekId) {
          try {
            const response = await fetch(`https://api.keepeek.com/v1/media/${data.keepeekId}`, {
              headers: {
                Authorization: `Bearer YOUR_KEEPEEK_API_TOKEN`,
              },
            });

            if (response.ok) {
              const responseData = await response.json();
              data.url = responseData.url; // Assuming Keepeek API returns a URL
            } else {
              console.error("Error fetching Keepeek media:", response.statusText);
            }
          } catch (error) {
            console.error("Error fetching Keepeek media:", error);
          }
        }
        return data;
      },
    ],
  },
};

export default KeepeekMedia;
