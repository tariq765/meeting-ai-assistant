import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/pricing", "/login", "/register"],
        disallow: ["/dashboard/", "/meetings/", "/settings/", "/api/"],
      },
    ],
    sitemap: "https://meetingai.vercel.app/sitemap.xml",
  };
}
