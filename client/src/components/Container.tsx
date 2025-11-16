import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  outer?: string;
  as?: React.ElementType;
  id?: string;
  global?: boolean;
};

export default function Container({
  id,
  children,
  className,
  outer,
  as: Component = "div",
  global,
}: ContainerProps) {
  return (
    <div className={outer} id={id}>
      <Component
        className={cn(
          `container max-w-[1288px] mx-auto`,
          global ? "flex flex-col gap-24" : "",
          className
        )}
      >
        {children}
      </Component>
    </div>
  );
}