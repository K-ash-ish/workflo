import { LucideProps } from "lucide-react";

export function IconWrapper({
  icon: Icon,
  style,
  strokeWidth,
  color,
}: {
  icon: React.FC<LucideProps>;
  style?: React.CSSProperties;
  strokeWidth?: number;
  color?: string;
}) {
  return (
    <Icon
      style={style}
      strokeWidth={strokeWidth}
      color={color}
      className="text-gray-500 w-5 h-auto"
    />
  );
}
