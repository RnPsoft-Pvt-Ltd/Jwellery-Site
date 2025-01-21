import React from "react";

export default function Footer() {
  return (
    <footer className="flex">
    <div className="bg-black text-white py-8 md:py-12 w-[100%]">
      <div className="container flex bg-black text-white py-8 md:py-12 w-fit">
        {/* Logo Section */}
        <div>
        <div className="flex ml-10">
          <div className="w-fit h-fit">
            <img src="https://storage.googleapis.com/jwelleryrnpsoft/logo.png" alt="" />
          </div>
          <div className=" w-fit">
            <div className=" font-italiana text-[50px] font-normal text-left h-fit">Cresthaven</div>
            <div className=" font-italiana text-[37px] font-normal text-left h-fit" style={{letterSpacing: '0.2rem'}}>Venture LLP</div>
          </div>
        </div>
        <div className="ml-12 mt-2">
        <div className="text-[23px] text-gray-300 text-left font-albert">
            Always Enhancing What's
        </div>
        <div className="text-[23px] text-gray-300 text-left font-albert">
            Already Beautiful
        </div>
        </div>
        </div>

        {/* Collection Section */}
        <div className="w-fit space-y-7 mr-12 ml-24 mt-6">
          <h2 className="text-2xl font-normal font-albert">Collection</h2>
          <ul className="space-y-5">
            <li>
              <a href="#" className="text-gray-300 hover:text-white font-albert text-xl">
                Mens Jewelry
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white font-albert text-xl">
                Womens Jewelry
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white font-albert text-xl">
                Kids Jewelry
              </a>
            </li>
          </ul>
        </div>

        {/* About Us Section */}
        <div className="w-fit space-y-7 ml-12 mr-16 mt-6">
          <h2 className="text-2xl font-normal font-albert">About Us</h2>
          <ul className="space-y-5">
            <li>
              <a href="#" className="text-gray-300 hover:text-white font-albert text-xl">
                Our Story
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white font-albert text-xl">
                Reviews
              </a>
            </li>
          </ul>
        </div>        
      </div>
    </div>
    {/* Newsletter Section */}
    <div className="bg-[#2C2C2C] w-[45%] py-10">
    <h2 className="text-3xl font-normal text-center text-white font-albert">Never Miss On Deals</h2>
    <div className="flex mx-16 mt-16">
      <input
        type="email"
        placeholder="enter your email here"
        className="p-2 w-full bg-white text-black outline-none"
      />
      <button className="bg-black text-white px-4 py-2 hover:bg-gray-800">
        Subscribe
      </button>
    </div>

    {/* Social Media Icons */}
    <div className="flex space-x-4 mt-32 ml-16">
      <a href="#" className="hover:text-gray-500">
        <svg className=" h-7 w-7" fill="white" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      </a>
      <a href="#" className="hover:text-gray-300">
        <svg className="h-7 w-7" fill="white" viewBox="0 0 24 24">
          <path d="M24 11.7c0 6.45-5.27 11.68-11.78 11.68-2.07 0-4-.53-5.7-1.45L0 24l2.13-6.27a11.57 11.57 0 0 1-1.7-6.04C.44 5.23 5.72 0 12.23 0 18.72 0 24 5.23 24 11.7M12.22 1.85c-5.46 0-9.9 4.41-9.9 9.83 0 2.15.7 4.14 1.88 5.76L2.96 21.1l3.8-1.2a9.9 9.9 0 0 0 5.46 1.62c5.46 0 9.9-4.4 9.9-9.83a9.88 9.88 0 0 0-9.9-9.83z" />
        </svg>
      </a>
      <a href="#" className="hover:text-gray-300">
        <svg className="h-7 w-7" fill="white" viewBox="0 0 24 24">
          <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
        </svg>
      </a>
      <a href="#" className="hover:text-gray-300">
        <svg className="h-7 w-7" fill="white" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      </a>
    </div>
  </div>
  </footer>
  );
}
