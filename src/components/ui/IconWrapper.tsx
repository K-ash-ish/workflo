import { LucideProps } from "lucide-react";

export function IconWrapper({
  icon: Icon,
  style,
}: {
  icon: React.FC<LucideProps>;
  style?: React.CSSProperties;
}) {
  return <Icon style={style} className="text-gray-500 w-5 h-auto" />;
}
