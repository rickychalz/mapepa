"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchInput } from "@/components/search-input-result";
import { RiHeartLine, RiShare2Line } from "@remixicon/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";

interface Data {
  id: number;
  subject: string;
  class: string;
  education_level: string;
  exam_type: string;
  institution: string;
  description: string | null;
  exam_page_link: string | null;
  exam_file_path: string | null;
  year: number;
  uploaded_date: Date;
}

export default function SearchResults() {
  const [data, setData] = useState<Data[]>([]);
  const [filteredData, setFilteredData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({
    class: [],
    subject: [],
    exam_type: [],
    institution: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/all-data");
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

  useEffect(() => {
    if (!loading) {
      const handleSearch = () => {
        const searchTerms = searchQuery
          .toLowerCase()
          .split(" ")
          .filter((term) => term.trim() !== "");

        const filtered = data.filter((item) => {
          const itemYearString = item.year.toString().toLowerCase();
          const fieldsToSearch = [
            item.class.toLowerCase(),
            item.subject.toLowerCase(),
            item.institution.toLowerCase(),
            item.education_level.toLowerCase(),
            // item.description.toLowerCase(), // Uncomment if you want to include description
            itemYearString,
          ];

          // Check if every search term is included in each of the item's fields
          return searchTerms.every((term) =>
            fieldsToSearch.some((field) => field === term)
          );
        });

        setFilteredData(filtered);
      };

      handleSearch();
    }
  }, [data, searchQuery, loading]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = data;

      Object.keys(selectedFilters).forEach((filterKey) => {
        if (selectedFilters[filterKey].length > 0) {
          filtered = filtered.filter((item) =>
            selectedFilters[filterKey].includes(
              item[filterKey as keyof Data] as unknown as string
            )
          );
        }
      });

      setFilteredData(filtered);
    };

    applyFilters();
  }, [selectedFilters, data]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = data;

      Object.keys(selectedFilters).forEach((filterKey) => {
        if (selectedFilters[filterKey].length > 0) {
          filtered = filtered.filter((item) =>
            selectedFilters[filterKey].includes(
              item[filterKey as keyof Data] as unknown as string
            )
          );
        }
      });

      setFilteredData(filtered);
    };

    applyFilters();
  }, [selectedFilters, data]);

  const handleFilterChange = (filterKey: string, value: string) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: prevFilters[filterKey].includes(value)
        ? prevFilters[filterKey].filter((item) => item !== value)
        : [...prevFilters[filterKey], value],
    }));
  };

  const renderFilterTags = (filterKey: string, options: string[]) => (
    <div className="flex gap-2 flex-wrap">
      {options.map((option) => (
        <button
          key={option}
          className={`inline-flex items-center rounded-md px-3 py-2 text-xs font-medium ring-1 ring-inset ${
            selectedFilters[filterKey].includes(option)
              ? "bg-teal-600 text-white ring-teal-600/20"
              : "bg-teal-50 text-teal-600 ring-teal-600/10"
          }`}
          onClick={() => handleFilterChange(filterKey, option)}
        >
          {option}
        </button>
      ))}
    </div>
  );

  const uniqueClasses = Array.from(new Set(data.map((item) => item.class)));
  const uniqueSubjects = Array.from(new Set(data.map((item) => item.subject)));
  const uniqueEducationLevel = Array.from(
    new Set(data.map((item) => item.education_level))
  );
  const uniqueInstitutions = Array.from(
    new Set(data.map((item) => item.institution))
  );

  return (
    <main className="flex-grow flex flex-col py-8 md:py-16 px-6 md:px-8 xl:px-16 w-full m-auto">
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col items-center w-full mx-auto">
          <Link href="/">
            <span className="text-5xl md:text-6xl font-bold text-teal-600">
              Mapepa
            </span>
            <span className="text-2xl md:text-3xl text-gray-500">.com</span>
          </Link>
          <SearchInput defaultValue={searchQuery} />
        </div>

        <div className="mb-4 w-full sm:w-[600px] lg:w-[850px] ">
          <div className="flex flex-row gap-2 overflow-x-auto items-start">
            <div className="flex-shrink-0">
              {renderFilterTags("institution", uniqueInstitutions)}
            </div>
            <div className="flex-shrink-0">
              {renderFilterTags("subject", uniqueSubjects)}
            </div>
            <div className="flex-shrink-0">
              {renderFilterTags("class", uniqueClasses)}
            </div>
            <div className="flex-shrink-0">
              {renderFilterTags("exam_type", uniqueEducationLevel)}
            </div>
          </div>
        </div>

        <div className="mb-10 lg:mb-16 mt-4 text-lg text-center">
          <span className="text-gray-500">Showing results for </span>
          <span className="font-bold">{searchQuery || '" "'}</span>
          <div className="mt-2 text-sm text-gray-500">
            {filteredData.length} result{filteredData.length !== 1 ? "s" : ""}{" "}
            found
          </div>
        </div>

        <div className="flex flex-col items-center w-full">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between w-full sm:w-[550px] md:w-[600px] lg:w-[850px] border-b border-gray-300 px-6 sm:px-8 lg:px-0  pb-6 lg:pb-8 mb-8 lg:mb-16"
                >
                  <div className="flex flex-col items-start gap-0.5 lg:gap-1">
                    <Skeleton height={15} width={300} />
                    <Skeleton height={15} width={150} />
                    <Skeleton height={15} width={120} />
                    <Skeleton height={15} width={150} />
                    <div className="mt-2 flex gap-2">
                      <Skeleton height={15} width={80} />
                      <Skeleton height={15} width={80} />
                      <Skeleton height={15} width={60} />
                    </div>
                  </div>
                  <div className="hidden gap-8">
                    <Skeleton circle={true} height={24} width={24} />
                    <Skeleton circle={true} height={24} width={24} />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.id}
                className="flex items-center w-full justify-between sm:w-[550px] md:w-[600px] lg:w-[850px] border-b border-gray-300 pb-6 lg:pb-8 mb-8 lg:mb-16"
              >
                <div className="flex flex-col items-start gap-1">
                  <div className="flex flex-col gap-2 items-start xl:flex-row xl:items-center">
                    <div className="text-md lg:text-lg flex flex-wrap flex-row gap-2 items-center font-bold text-teal-600">
                      <span>Annual Examinations</span>
                      <span>{item.subject}</span>
                      <span>{item.class}</span>
                    </div>
                    <div className="text-sm md:text-md lg:text-lg text-gray-500">
                      {item.institution} - {item.year}
                    </div>
                  </div>
                  <div className="text-sm lg:text-md text-gray-500">
                    Kinondoni Region
                  </div>
                  <div className="mt-2 flex gap-2">
                    <span className="inline-flex items-center rounded-md bg-teal-50 px-2 py-1 text-xs font-medium text-teal-600 ring-1 ring-inset ring-teal-600/20">
                      {item.exam_type}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-teal-50 px-2 py-1 text-xs font-medium text-teal-600 ring-1 ring-inset ring-teal-600/10">
                      {item.education_level}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-teal-50 px-2 py-1 text-xs font-medium text-teal-600 ring-1 ring-inset ring-teal-600/10">
                      Math
                    </span>
                  </div>
                </div>
                <div className="hidden md:items-center gap-8">
                  <RiHeartLine color="#6b7280" />
                  <RiShare2Line color="#6b7280" />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              <p>No results found for "{searchQuery}"</p>
              <p>
                Try searching with different keywords or check out our{" "}
                <a href="/popular">popular items</a>.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
