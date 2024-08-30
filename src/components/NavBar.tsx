"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavBar() {
  let param = usePathname();

  if (param === "/") {
    param = "/typing";
  }

  return (
    <div className="w-[25%] tracking-normal">
      <Tabs value={param}>
        <TabsList className="grid grid-cols-2 rounded p-0 ">
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
