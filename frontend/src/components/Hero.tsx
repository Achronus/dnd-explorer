const Hero = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <section>
      <div className="hero min-h-[350px] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-2xl">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
