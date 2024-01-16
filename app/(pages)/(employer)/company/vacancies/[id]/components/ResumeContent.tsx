import { Button, Card } from '@/app/components';
import { Resume, User } from '@prisma/client';

export const ResumeContent = ({
  user,
}: {
  user: User & {
    resume: Resume;
  };
}) => {
  // const getCurrentButton = () => {
  //   if (!user) return;

  //   if (stateFetching === 'not' && user.feedback[0]?.isInvite === undefined) {
  //     return (
  //       <>
  //         <Button color={'green'} className="mr-4" onClick={() => onInviteClick(true)}>
  //           Приглашение
  //         </Button>
  //         <Button color="red" onClick={() => onInviteClick(false)}>
  //           Отказ
  //         </Button>
  //       </>
  //     );
  //   } else if (user.feedback[0]?.isInvite && !(stateFetching === 'isFetching')) {
  //     return (
  //       <Button color={'green'} disabled>
  //         Приглашён
  //       </Button>
  //     );
  //   } else if (!user.feedback[0]?.isInvite && !(stateFetching === 'isFetching')) {
  //     return (
  //       <Button color={'red'} disabled>
  //         Отказ
  //       </Button>
  //     );
  //   } else {
  //     return (
  //       <Button color={'gray'} disabled>
  //         Отправка...
  //       </Button>
  //     );
  //   }
  // };
  return (
    <Card color="whiteShadow" className="w-full bg-sky-900 p-4 relative h-[400px]">
      <div className="overflow-auto h-[320px]">Данные: {user.resume?.text}</div>
      {/* <div className="absolute right-4 bottom-4">{getCurrentButton()}</div> */}
    </Card>
  );
};
