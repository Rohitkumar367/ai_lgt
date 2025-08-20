import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-[10rem] bg-amber-400 justify-center items-center flex">
      <h2>Home</h2>
      <Button>Subscribe</Button>
    </div>
  );
}
