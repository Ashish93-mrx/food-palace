// Footer.tsx
const Footer = () => {
  return (
    <footer className="bg-orange-500 text-white py-6 mt-10 z-50">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-xl font-bold">🍽️ Mr Bolat</h2>
          <p className="text-sm">Delivering happiness at your doorstep.</p>
        </div>

        <div className="flex gap-4 text-sm">
          <a href="https://www.linkedin.com/in/ashish-n-m/" target="_blank" className="hover:underline">LinkedIn</a>
          <a href="https://github.com/Ashish93-mrx" target="_blank" className="hover:underline">Github</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
        </div>
      </div>

      <p className="text-center text-xs mt-4">
        &copy; {new Date().getFullYear()} FoodZone. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
