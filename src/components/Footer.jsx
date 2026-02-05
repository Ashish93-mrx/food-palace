const Footer = () => {
  return (
    <footer className="bg-orange-500 text-white rounded-t-[3rem] py-10">
      <div className="absolute -top-24 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-24"
          preserveAspectRatio="none"
        >
          <path
            d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,0L0,0Z"
            fill="#f97316"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-10 flex flex-col md:flex-row items-center md:items-start justify-between">
        <div className="text-center md:text-left space-y-1">
          <h2 className="text-xl font-bold">🍽️ Mr Bolat</h2>
          <p className="text-sm">Delivering happiness at your doorstep.</p>
          <p className="text-xs opacity-80 mt-2">
            &copy; {new Date().getFullYear()} FoodZone. All rights reserved.
          </p>
        </div>

        <div className="mt-6 md:mt-0 flex gap-6 text-sm">
          <a
            href="https://www.linkedin.com/in/ashish-n-m/"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Ashish93-mrx"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;