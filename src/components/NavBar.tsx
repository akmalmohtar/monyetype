"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavBar() {
  const param = usePathname();

  return (
    <div className="w-[25%]">
      <Tabs value={param}>
        <TabsList className="grid grid-cols-2 rounded p-0 bg-white">
          <TabsTrigger value="/typing">
            <Link className="w-full" href={"/typing"}>
              Typing Test
            </Link>
          </TabsTrigger>
          <TabsTrigger value="/rhythm">
            <Link className="w-full" href={"/rhythm"}>
              Rhythm Letter
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
