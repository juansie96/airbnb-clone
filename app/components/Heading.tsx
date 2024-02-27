interface HeadingProps {
  title: string;
  subtitle: string;
}

const Heading = ({ title, subtitle }: HeadingProps) => {
  return (
    <div className='text-start'>
      <h3 className='text-2xl font-semibold'>{title}</h3>
      <p className='mt-2 font-light text-neutral-500'>{subtitle}</p>
    </div>
  );
};

export default Heading;
