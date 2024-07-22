"use client";
import { SearchInput } from "@/components/search-input";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Data {
  id: number;
  subject: string;
  class: string;
  education_level: string;
  exam_type: string;
  institution: string;
  description: string;
  exam_page_link: string;
  exam_file_path: string;
  year: number;
  uploaded_date: Date;
}

export default function Home() {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/recently-added");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex-grow flex flex-col justify-center py-24 md:py-16 px-6 md:px-8 xl:px-16 w-full m-auto">
      <div className="flex flex-col items-start w-full">
        <div className="flex flex-col items-center w-full mx-auto">
          <div>
            <span className="text-6xl lg:text-7xl font-bold text-teal-600">
              Mapepa
            </span>
            <span className="text-3xl lg:text-4xl text-gray-500">.com</span>
          </div>
          <SearchInput defaultValue={null} />
        </div>
        <div className="w-full mt-8 sm:mt-0">
          <h1 className="text-xl text-gray-500">Recently added papers</h1>
          <div className="w-full my-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {loading
              ? [...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="rounded  shadow-md border border-gray-100 bg-white p-4 sm:p-6 flex flex-col min-w-[280px]"
                  >
                    <Skeleton height={25} width={200} />
                    <Skeleton height={23} width={160} />
                    <Skeleton height={20} width={130} />
                    <Skeleton height={20} width={120} />
                    <Skeleton height={20} width={120} />
                    <div className="mt-2 flex gap-2">
                      <Skeleton height={20} width={80} />
                      <Skeleton height={20} width={80} />
                      <Skeleton height={20} width={60} />
                    </div>
                  </div>
                ))
              : data.map((item) => (
                  <div
                    key={item.id}
                    className="rounded shadow-md border border-gray-100 bg-white p-4 sm:p-6 flex flex-col"
                  >
                    <span className="font-bold text-teal-600">
                      {item.subject} - {item.class}
                    </span>
                    <span className="text-sm">{item.institution}</span>
                    <span className="text-gray-500 text-sm">
                      Annual Examinations - {item.year}
                    </span>
                    <span className="text-gray-500 text-sm">
                      Kinondoni Region
                    </span>
                    <div className="mt-2 flex gap-2">
                      <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                        {item.exam_type}
                      </span>
                      <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                        {item.education_level}
                      </span>
                      <span className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
                        Math
                      </span>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </main>
  );
}
