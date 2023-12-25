'use client';

import { Button, Card, Portal } from '@/app/components';
import { useState } from 'react';
import { CompanyForm } from './CompanyForm';

export const Overlay = ({ isExistCompany }: { isExistCompany: boolean }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const onIsOpenedClick = (bool: boolean) => {
    setIsOpened(bool);
  };

  return (
    <div>
      {!isExistCompany && (
        <Button
          disabled={isOpened}
          color="blue"
          className="mb-4"
          onClick={() => setIsOpened(!isOpened)}>
          Создать
        </Button>
      )}
      {isOpened && (
        <Portal>
          <CompanyForm setIsOpened={onIsOpenedClick} />
        </Portal>
      )}
    </div>
  );
};
