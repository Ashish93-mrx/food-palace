const Footer = () => {
  return (
    <footer className="bg-orange-500 text-white py-6">
      <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center md:items-start justify-between">
        
        <div className="text-center md:text-left space-y-1">
          <h2 className="text-xl font-bold">🍽️ Mr Bolat</h2>
          <p className="text-sm">Delivering happiness at your doorstep.</p>
          <p className="text-xs opacity-80 mt-2">
            &copy; {new Date().getFullYear()} FoodZone. All rights reserved.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex gap-4 text-sm">
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