"use server";

import { getCurrentUser } from "@/actions";

import { ResumeForm } from "./components";
import Content from "./components/Content";

export default async function ResumePage() {
  const user = await getCurrentUser();
  if (!user) {
    return <div>авторизуйтесь</div>;
  }

  const { role, email, name, resume } = user;

  if (role !== "WORKER") {
    return <div className="dark:text-white">Вы не ищите работу.</div>;
  }

  if (!resume) return <ResumeForm />;

  return (
    <Content
      namePosition={resume.namePosition}
      age={resume.age}
      text={resume.text}
      country={resume.country}
      city={resume.city}
      username={name}
      email={email}
    />
  );
}
