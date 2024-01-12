import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const useQueryParams = () => {
  const searchParams = useSearchParams()!;
  const router = useRouter();
  const pathname = usePathname();

  const push = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      router.push(pathname + '?' + params.toString());
      router.refresh();
    },
    [searchParams],
  );

  const deleteParams = useCallback(() => {
    router.push(pathname);
  }, []);

  return { push, deleteParams };
};
