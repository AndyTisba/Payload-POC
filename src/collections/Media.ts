import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  versions: true, // payload has native versioning
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
  versions: true,
};
