import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Global horizontal rhythm. Keeps every section aligned to the same
 * editorial grid at all breakpoints.
 */
export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12 ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
}
