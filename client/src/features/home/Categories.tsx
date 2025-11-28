import { CATEGORIES } from "@/constants";

const Categories = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {CATEGORIES.map((category, index) => {
        const Icon = category.icon;
        return (
          <a
            key={index}
            href={category.link}
            className="flex gap-4 items-center justify-center py-3 px-5 glass-border hover:bg-black/40
                        hover:shadow-md transition-all duration-300 ease-out group"
          >
            <Icon className="w-12 h-12 text-dark-700 transition-colors duration-300" />
            <p className="text-lg font-medium text-dark-700">{category.name}</p>
          </a>
        );
      })}
    </div>
  );
};

export default Categories;
