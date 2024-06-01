import { FC, ReactNode } from 'react';

type props = {
  children?: ReactNode;
}

const Section: FC<props> = function(props) {
  const { children } = props;
  return (
    <section className='w-2/5 py-2 px-4 mx-auto'>
      {children}
    </section>
  );
};

export default Section;