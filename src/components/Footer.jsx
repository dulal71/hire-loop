import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#0b0b10] text-gray-300 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Left Section */}
        <div>
          <div className="flex items-center gap-2 text-white text-xl font-bold">
            <span className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
             HP
            </span>
            Hire Loop
          </div>

          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            The AI-native career platform. Built for people who take their work seriously.
          </p>

          <div className="flex gap-3 mt-6">
            <a className="w-9 h-9 flex items-center justify-center bg-gray-800 rounded hover:bg-purple-600 transition">f</a>
            <a className="w-9 h-9 flex items-center justify-center bg-gray-800 rounded hover:bg-purple-600 transition">p</a>
            <a className="w-9 h-9 flex items-center justify-center bg-gray-800 rounded hover:bg-purple-600 transition">in</a>
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-white font-semibold mb-4">Product</h3>
          <ul className="space-y-2 text-sm">
            <li>Job discovery</li>
            <li>Worker AI</li>
            <li>Companies</li>
            <li>Salary data</li>
          </ul>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-4">Navigations</h3>
          <ul className="space-y-2 text-sm">
            <li>Help center</li>
            <li>Career library</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>Brand Guideline</li>
            <li>Newsroom</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© 2024 Programming Hero. All rights reserved.</p>

        <div className="flex gap-6 mt-3 md:mt-0">
          <a className="hover:text-white">Terms</a>
          <a className="hover:text-white">Privacy</a>
          <a className="hover:text-white">Guideline</a>
        </div>
      </div>
    </footer>
    );
};

export default Footer;