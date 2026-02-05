const Contact = () => {
    return (
      <div className="bg-orange-50 flex items-center justify-center py-4">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-orange-500 text-center">
            Contact Us
          </h2>
  
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="Your Name"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="you@example.com"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300"
                rows="4"
                placeholder="Write your message..."
              />
            </div>
  
            <button
              type="submit"
              className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-xl transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default Contact;
  