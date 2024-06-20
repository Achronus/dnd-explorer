type Props = {
  children: React.ReactNode;
};

const Hero = ({ children }: Props) => {
  return (
    <section>
      <div className="hero min-h-[500px] bg-base-200">
        <div className="hero-content text-center">
          <div className="flex flex-col justify-center items-center">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
