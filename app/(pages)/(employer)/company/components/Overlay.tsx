"use client";

import { DetailedHTMLProps, HTMLAttributes, useState } from "react";

import { Button, Portal } from "@/app/components";

import { CompanyForm } from "./CompanyForm";

interface IOverlay
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isExistCompany: boolean;
}

export const Overlay = ({ isExistCompany, className, ...props }: IOverlay) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const onIsOpenedClick = (bool: boolean) => {
    setIsOpened(bool);
  };

  return (
    <div className={className} {...props}>
      {!isExistCompany && (
        <Button
          disabled={isOpened}
          color="blue"
          className="mb-4"
          onClick={() => setIsOpened(!isOpened)}
        >
          Создать компанию
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
