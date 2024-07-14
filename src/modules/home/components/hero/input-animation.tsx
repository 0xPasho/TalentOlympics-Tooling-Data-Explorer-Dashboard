import { cn } from "~/lib/utils";

interface BorderBeamProps {
  className?: string;
}

export const BorderBeamAnimation = ({ className }: BorderBeamProps) => {
  return (
    <div
      style={
        {
          "--size": 150,
          "--duration": 15,
          "--anchor": 90,
          "--border-width": 1.5,
          "--color-from": "#9c40ff",
          "--color-to": "purple",
          "--delay": `-0s`,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        "after:animate-border-beam after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        className,
      )}
    />
  );
};
