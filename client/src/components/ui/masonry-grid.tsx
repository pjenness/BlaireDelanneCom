import { ReactNode } from "react";

interface MasonryGridProps {
  children: ReactNode;
  columns?: number[];
  gap?: number;
}

const MasonryGrid = ({
  children,
  columns = [1, 2, 3, 4], // Default columns for different breakpoints [mobile, tablet, desktop, large]
  gap = 5
}: MasonryGridProps) => {
  return (
    <div
      className={`grid grid-cols-${columns[0]} sm:grid-cols-${columns[1]} md:grid-cols-${columns[2]} lg:grid-cols-${columns[3]} gap-${gap}`}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, minmax(300px, 1fr))`,
        gap: `${gap * 4}px`,
        gridAutoFlow: "dense"
      }}
    >
      {children}
    </div>
  );
};

export default MasonryGrid;
