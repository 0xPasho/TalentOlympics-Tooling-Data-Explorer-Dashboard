"use client";

import { Input } from "~/components/ui/input";
import { BorderBeamAnimation } from "./input-animation";
import { Button } from "~/components/ui/button";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const HeroInput = () => {
  const [input, setInput] = useState("");
  const router = useRouter();
  const handleSubmitInput = () => {
    router.push("/transactions/" + input);
  };

  return (
    <div className="relative">
      <div className="relative flex w-full">
        <BorderBeamAnimation />
        <Input
          type="text"
          placeholder="Search by Address / Txn Hash / Block"
          className="h-12 w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmitInput();
            }
          }}
        />
      </div>
      <div className="absolute right-4 top-2">
        <Button
          onClick={() => {
            handleSubmitInput();
          }}
          className="aspect-square p-0"
          size="sm"
        >
          <SearchIcon className="w-5" />
        </Button>
      </div>
    </div>
  );
};

export default HeroInput;
