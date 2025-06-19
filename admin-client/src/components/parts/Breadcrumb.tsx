import { tv } from "tailwind-variants";
import { NavLink } from 'react-router';
import { FiChevronRight } from 'react-icons/fi';

const breadcrumbItem = tv({
  base: "inline-flex items-center text-sm transition-colors",
  variants: {
    active: {
      true: "text-gray-900 font-semibold",
      false: "text-gray-500 hover:text-gray-700",
    },
  },
});

type BreadcrumbItem = {
  label: string;
  to?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div className="flex items-center space-x-2" key={index}>
            {index > 0 && <FiChevronRight className="w-4 h-4 text-gray-400" />}
            {item.to && !isLast ? (
              <NavLink
                end
                to={item.to} className={({ isActive }) => breadcrumbItem({ active: isActive || isLast })}>
                {item.label}
              </NavLink>
            ) : (
              <span className={breadcrumbItem({ active: true })}>
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
