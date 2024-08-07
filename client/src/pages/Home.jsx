import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import HomeSlider from "../components/HomeSlider";
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
  const [saleListings, setSaleListings] = React.useState([]);
  const [rentListings, setRentListings] = React.useState([]);

  console.log(rentListings);

  useEffect(() => {
    const fetchRentListings = async () => {
      try {
        const response = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await response.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.error("Error fetching rent listings", error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const response = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await response.json();
        setSaleListings(data);
      } catch (error) {
        console.error("Error fetching sale listings", error);
      }
    };
    fetchRentListings();
  }, []);
  return (
    <div>
      {/* Swiper */}
      <div className="relative">
        <HomeSlider />
        <div className="absolute top-0 px-16">
          <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
            <h1 className="text-gray-200 font-bold text-3xl lg:text-6xl">
              Find your next <span className="text-slate-500">perfect</span>
              <br /> place with ease
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm">
              Search for your next home, apartment, or property with ease.{" "}
              <br />
              We have a wide range of properties to choose from.
            </p>
            <Link
              to={"/search"}
              className="text-xs text-blue-800 font-bold hover:bg-slate-800 hover:text-white transition bg-slate-200 w-32 p-3 rounded-full flex justify-center items-center"
            >
              Explore Now
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
      {/* Hero Section */}

      {/* Listing of products */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm hover:underline text-gray-400"
                to={"/search?type=rent"}
                
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-gray-400 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
