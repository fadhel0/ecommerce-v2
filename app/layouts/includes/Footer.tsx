'use client';

const Footer = () => {
  return (
    <footer className="border-t mt-20">
      <div className="flex flex-wrap justify-between mx-auto max-w-screen-xl py-10 gap-10 px-4">
        {/* Buy section */}
        <ul className="text-gray-700 w-full sm:w-1/2 md:w-1/4 lg:w-1/6">
          <li className="font-bold text-lg">Buy</li>
          <li className="mt-2 py-1 text-xs hover:underline cursor-pointer">
            Registration
          </li>
          <li className="py-1 text-xs hover:underline cursor-pointer">
            eBay Money Back Guarantee
          </li>
          <li className="py-1 text-xs hover:underline cursor-pointer">
            Bidding & buying help
          </li>
          <li className="py-1 text-xs hover:underline cursor-pointer">
            Stores
          </li>
        </ul>

        {/* Sell section */}
        <ul className="text-gray-700 w-full sm:w-1/2 md:w-1/4 lg:w-1/6">
          <li className="font-bold text-lg">Sell</li>
          <li className="mt-2 py-1 text-xs hover:underline cursor-pointer">
            Start selling
          </li>
          <li className="py-1 text-xs hover:underline cursor-pointer">
            Learn to sell
          </li>
          <li className="py-1 text-xs hover:underline cursor-pointer">
            Affiliates
          </li>
        </ul>

        {/* About eBay section */}
        <ul className="text-gray-700 w-full sm:w-1/2 md:w-1/4 lg:w-1/6">
          <li className="font-bold text-lg">About eBay</li>
          <li className="mt-2 py-1 text-xs hover:underline cursor-pointer">
            Company info
          </li>
          <li className="py-1 text-xs hover:underline cursor-pointer">News</li>
          <li className="py-1 text-xs hover:underline cursor-pointer">
            Investors
          </li>
          <li className="py-1 text-xs hover:underline cursor-pointer">
            Careers
          </li>
          <li className="py-1 text-xs hover:underline cursor-pointer">
            Government relations
          </li>
          <li className="py-1 text-xs hover:underline cursor-pointer">
            Policies
          </li>
        </ul>

        <ul className="text-gray-700 w-full sm:w-1/2 md:w-1/4 lg:w-1/6">
          <li className="font-bold text-lg">Buy</li>
          <li className="mt-2 py-1 text-xs hover:underline cursor-pointer">
            Registration
          </li>
          <li className="py-1 text-xs hover:underline cursor-pointer">
            eBay Money Back Guarantee
          </li>
          <li className="py-1 text-xs hover:underline cursor-pointer">
            Bidding & buying help
          </li>
          <li className="py-1 text-xs hover:underline cursor-pointer">
            Stores
          </li>
        </ul>

        {/* Repeat similar structure for other sections */}
      </div>
    </footer>
  );
};

export default Footer;
