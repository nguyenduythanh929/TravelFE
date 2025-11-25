"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getTourTypesTree, TourTypeResponse } from "@/api/tourTypeApi";
import { cn } from "@/lib/utils";

export default function NavBarHeader() {
  const router = useRouter();
  const [tourTypes, setTourTypes] = useState<TourTypeResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch tour types khi component mount
  useEffect(() => {
    const fetchTourTypes = async () => {
      try {
        setIsLoading(true);
        const data = await getTourTypesTree();
        console.log("Tour types fetched:", data);
        setTourTypes(data);
      } catch (error) {
        console.error("Error loading tour types:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTourTypes();
  }, []);

  // Helper function để tạo URL từ tourType
  const getTourUrl = (tourType: TourTypeResponse): string => {
    const identifier = tourType.value;
    return `/tourdetail/${identifier}`;
  };

  // Render tour type với children thành dropdown menu
  const renderTourTypeWithChildren = (tourType: TourTypeResponse) => {
    return (
      <NavigationMenuItem key={tourType.id}>
        <NavigationMenuTrigger className="text-base font-medium text-gray-700 bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
          {tourType.name}
        </NavigationMenuTrigger>

        {/* SỬA VỊ TRÍ: Thêm !left-0 và bù trừ -left-4 */}
        {/* !left-0: Buộc căn lề trái. -left-4: Bù trừ cho padding/margin ngầm. */}
        <NavigationMenuContent className="!w-[320px] !left-0 -left-4">
          <ul className="p-2 rounded-lg shadow-lg">
            {/* Children links */}
            {tourType.children?.map((child, index) => (
              <li key={child.id}>
                <Link
                  href={getTourUrl(child)}
                  className={cn(
                    "block px-4 py-3 text-base rounded-md transition-colors",
                    "hover:bg-[#4502C7] hover:text-white",
                    "text-[#4502C7] font-medium",
                    // Fix: Đảm bảo mục đầu tiên có nền tím và chữ trắng
                    index === 0 && "bg-[#4502C7] !text-white"
                  )}
                >
                  {child.name}
                </Link>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  };

  // Render tour type không có children thành link thông thường
  const renderTourTypeLink = (tourType: TourTypeResponse) => {
    return (
      <NavigationMenuItem key={tourType.id}>
        <Link href={getTourUrl(tourType)} legacyBehavior passHref>
          <NavigationMenuLink className="text-base font-medium text-gray-700 hover:text-purple-600 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors inline-flex items-center">
            {tourType.name}
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    );
  };

  if (isLoading) {
    return (
      <NavigationMenu>
        <NavigationMenuList className="gap-2">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className="text-base font-medium text-gray-700 px-4 py-2">
                Trang Chủ
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <span className="text-base text-gray-400 px-4">Đang tải...</span>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-1">
        {/* Trang chủ - giữ nguyên */}
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className="text-base font-medium text-gray-700 hover:text-purple-600 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors inline-flex items-center">
              Trang Chủ
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {/* Render dynamic tour types từ API */}
        {tourTypes.map((tourType) => {
          if (tourType.children && tourType.children.length > 0) {
            return renderTourTypeWithChildren(tourType);
          } else {
            return renderTourTypeLink(tourType);
          }
        })}

        {/* Tin tức - giữ nguyên */}
        <NavigationMenuItem>
          <Link href="/news" legacyBehavior passHref>
            <NavigationMenuLink className="text-base font-medium text-gray-700 hover:text-purple-600 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors inline-flex items-center">
              Tin tức
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {/* Liên hệ - giữ nguyên */}
        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className="text-base font-medium text-gray-700 hover:text-purple-600 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors inline-flex items-center">
              Liên hệ
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
