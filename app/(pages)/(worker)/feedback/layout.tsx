import { Layout } from "@/components/custom/layout";

export default async function FeedbackLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout>{children}</Layout>;
}
