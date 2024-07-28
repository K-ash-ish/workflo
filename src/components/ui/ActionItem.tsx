import Image from "next/image";
import React from "react";

function ActionItem({
  actionName,
  icon,
}: {
  actionName: string;
  icon: string;
}) {
  return (
    <li className="flex gap-2 items-center p-2 bg-[#F4F4F4] text-[#797979] text-base">
      {actionName}
      <Image
        src={icon}
        width={20}
        height={20}
        alt="HOME"
        className="object-contain "
      />
    </li>
  );
}

export default ActionItem;
