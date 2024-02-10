import Link from "next/link";

export default function Error404() {
  return (
    <div className="dark:text-white">
      <h2>404</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
