import Image from "next/image";

function FeatureCard({
  src,
  title,
  description,
}: {
  src: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex bg-white w-[]  px-4 py-5 gap-2 items-center rounded-md">
      <Image
        src={src}
        alt="Image"
        width={0}
        height={0}
        className="w-14 h-auto"
      />
      <div>
        <h4 className="text-[#757575] font-semibold  text-sm ">{title}</h4>
        <p className="text-[#868686] text-xs">{description}</p>
      </div>
    </div>
  );
}
export default FeatureCard;
