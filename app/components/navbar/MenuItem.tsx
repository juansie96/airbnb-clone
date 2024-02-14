'use client';

interface MenuItemProps {
  label: string;
  onClick: () => void;
}

const MenuItem = ({ label, onClick }: MenuItemProps) => {
  return (
    <div
      onClick={onClick}
      className='cursor-pointer px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100'
    >
      {label}
    </div>
  );
};

export default MenuItem;
