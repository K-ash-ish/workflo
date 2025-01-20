import { motion } from "motion/react";
import { Layers, Users, Zap, BarChart } from "lucide-react";

const features = [
  {
    name: "Intuitive Kanban Boards",
    description:
      "Visualize your workflow with easy-to-use drag-and-drop Kanban boards.",
    icon: Layers,
  },
  {
    name: "Team Collaboration",
    description:
      "Work seamlessly with your team in real-time across all devices.",
    icon: Users,
  },
  {
    name: "Custom Workflows",
    description: "Create and customize workflows that fit your unique process.",
    icon: Zap,
  },
  {
    name: "Detailed Analytics",
    description:
      "Gain insights into your productivity with comprehensive analytics.",
    icon: BarChart,
  },
];

export function Features() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:h-5/6 h-full flex flex-col md:justify-evenly justify-center gap-6 md:gap-0 ">
      <div className="lg:text-center">
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          A better way to manage tasks
        </p>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          WorkFlo provides powerful features to help you and your team stay
          organized and productive.
        </p>
      </div>

      <div className="mt-10">
        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial="hidden"
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 20 },
              }}
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  {feature.name}
                </p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                {feature.description}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </div>
  );
}
