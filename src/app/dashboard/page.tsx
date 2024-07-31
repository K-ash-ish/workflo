"use client";
import TaskBoard from "@/components/TaskBoard";
import ActionItem from "@/components/ui/ActionItem";
import FeatureCard from "@/components/ui/FeatureCard";
import TaskModal from "@/components/ui/TaskModal";
import { features } from "@/constant";
import { useModal } from "@/context/ModalContext";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";
import useTask from "@/hooks/useTasks";
import { addTask } from "@/lib/features/taskSlice";

function page() {
  const { isOpen, openModal } = useModal();
 
  return (
    <section className="w-full py-3 px-4 flex flex-col gap-2 relative">
      <div className="flex  items-center justify-between">
        <h2 className="font-barlow font-semibold text-3xl">
          Good morning, Joe!
        </h2>

        <Link href={"/dashboard"} className="flex text-sm gap-2">
          Help & feedback{" "}
          <Image
            src="/question-circle.png"
            width={20}
            height={20}
            alt="Feedback"
            className="object-contain"
          />
        </Link>
      </div>
      <div className="flex justify-between gap-2 my-">
        {features?.map((feature, index) => (
          <FeatureCard
            key={index}
            src={feature.image}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <label htmlFor="search" className="relative">
          <Image
            src="/search.png"
            width={18}
            height={18}
            alt="Toggle password visibility"
            className="absolute right-2 top-3"
          />

          <input
            type="text"
            placeholder="Search"
            id="search"
            className="py-2 px-3 bg-white rounded-md   focus:border-none focus:outline-[#d2d2d2]  text-[#797979] placeholder-gray-400 placeholder:pl-1  caret-gray-400 "
          />
        </label>
        <ul className="flex gap-4 mb-4">
          <ActionItem icon="/calender.png" actionName="Calender view" />
          <ActionItem icon="/double-star.png" actionName="Automation" />
          <ActionItem icon="/filter.png" actionName="Filter" />
          <ActionItem icon="/share.png" actionName="Share" />
          <button
            onClick={openModal}
            className=" rounded-md text-white bg-gradient-to-t from-[#342592] to-[#5747B9] py-2 px-2 capitalize flex justify-center items-center gap-2"
          >
            Create new
            <span className="rounded-full bg-white text-black  w-5 h-5 flex justify-center items-center">
              +
            </span>
          </button>
        </ul>
      </div>
      <TaskBoard />
      {isOpen && <TaskModal />}
    </section>
  );
}

export default page;
