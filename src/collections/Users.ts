import type { CollectionConfig } from "payload";

export type UserRole = "admin" | "contributor" | "validator";

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  access: {
    read: ({ req }) => (req.user && "role" in req.user ? req.user.role === "admin" : false),
    update: ({ req }) => req.user?.id === req.query.id,
    delete: () => false,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: "role",
      type: "select",
      options: [
        {
          label: "Administrateur",
          value: "admin",
        },
        {
          label: "Contributeur",
          value: "contributor",
        },
        {
          label: "Validateur",
          value: "validator",
        },
      ],
      required: true,
      defaultValue: "contributor", // Default role
      hidden: false, // Ensure the role is visible in API responses
    },
  ],
};
