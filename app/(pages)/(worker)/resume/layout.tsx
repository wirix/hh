import { Layout } from "@/components/custom/layout";

export default async function ResumeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout>{children}</Layout>;
}
