import { HTMLAttributes } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton as SkeletonLib } from "@/components/ui/skeleton";
import { cn } from "@/utils";

interface VacancyItemSkeletonProps extends HTMLAttributes<HTMLDivElement> {}

export const VacancyItemSkeleton = ({
  className,
  ...props
}: VacancyItemSkeletonProps) => {
  return (
    <Card
      className={cn(
        "grid grid-cols-[60px_1fr] grid-rows-[60px_20px_48px] gap-2 p-4",
        className,
      )}
      {...props}
    >
      <CardHeader className="col-start-1 col-end-3 row-start-1 row-end-2 p-0">
        <SkeletonLib className="h-[60px] w-[60px] rounded-full" />
      </CardHeader>
      <CardContent className="col-start-2 row-start-1 row-end-2 p-0">
        <SkeletonLib className="mb-2 h-4 w-[100px]" />
        <SkeletonLib className="h-6 w-[200px]" />
      </CardContent>
      <CardContent className="col-start-2 col-end-3 row-start-2 row-end-2 flex items-center p-0">
        <SkeletonLib className="mr-1 h-4 w-[80px]" />
        <SkeletonLib className="mx-4 h-4 w-[15px]" />
        <SkeletonLib className="mr-1 h-4 w-[100px]" />
        <SkeletonLib className="mx-4 h-4 w-[15px]" />
        <SkeletonLib className="mr-1 h-4 w-[80px]" />
        <SkeletonLib className="mx-4 h-4 w-[15px]" />
        <SkeletonLib className="mr-1 h-4 w-[60px]" />
      </CardContent>
      <CardFooter className="col-start-2 col-end-3 row-start-3 row-end-3 p-0">
        <SkeletonLib className="mb-2 h-8 w-full" />
      </CardFooter>
    </Card>
  );
};
