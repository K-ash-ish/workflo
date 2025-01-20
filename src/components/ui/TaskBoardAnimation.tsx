import { motion } from "motion/react";

export function TaskBoardAnimation() {
  return (
    <div className="  md:w-1/2 md:h-full animate-fade-up-300 opacity-0">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 514 384"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className=""
        preserveAspectRatio="xMidYMid meet"
      >
        <g id="TaskBoard">
          <rect width="514" height="384" fill="none" />
          <g id="TaskColumn" className="animate--up ">
            <rect
              id="Completed"
              x="385.375"
              y="96"
              width="104.625"
              height="215"
              rx="4"
              fill="#DCFCE7"
            />
            <rect
              id="UnderReview"
              x="262.365"
              y="96"
              width="104.625"
              height="215"
              rx="4"
              fill="#CFFAFE"
            />
            <rect
              id="InProgress"
              x="139.799"
              y="96"
              width="104.625"
              height="215"
              rx="4"
              fill="#FEF9C3"
            />
            <rect
              id="ToDo"
              x="23"
              y="96"
              width="104.625"
              height="215"
              rx="4"
              fill="#FEE2E2"
            />
          </g>
          <g id="TaskCards">
            <rect
              id="Task1"
              x="43"
              y="126"
              width="64"
              height="38.0282"
              rx="4"
              fill="white"
            />

            <motion.rect
              id="Task2"
              x="43"
              y="177.972"
              width="64"
              height="38.0282"
              rx="4"
              fill="white"
              initial={{ x: 0, y: 0 }}
              animate={{
                scale: [1, 1.2, 1.2, 1.2, 1.2, 1.2, 1],
                x: [0, 0, 118.4865, 118.4865, 241.0525, 364.0625, 364.0625],
                y: [0, 0, -51.972, -51.972, -51.972],
              }}
              transition={{
                duration: 6,
                ease: "easeInOut",
                times: [0, 0.2, 0.4, 0.6, 0.8, 1],
              }}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default TaskBoardAnimation;
