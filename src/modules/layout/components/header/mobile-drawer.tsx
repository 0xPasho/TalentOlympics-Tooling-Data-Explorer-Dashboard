"use client";

import * as React from "react";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "~/components/ui/drawer";

export function MobileDrawer({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);

  return (
    <Drawer
      direction="left"
      onOpenChange={() => {
        setIsDrawerOpened(false);
      }}
    >
      <DrawerTrigger
        asChild
        onClick={() => {
          setIsDrawerOpened(true);
        }}
      >
        {children}
      </DrawerTrigger>
      <DrawerContent className="h-full w-[60%]">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader></DrawerHeader>
          <div className="p-4 pb-0">
            <div className="px-8 py-6">
              <div className="-my-2 items-start space-y-2">
                <a
                  className="block w-full py-2 font-semibold"
                  href="/components"
                >
                  Components
                </a>
                <a
                  className="block w-full py-2 font-semibold"
                  href="/templates"
                >
                  Templates
                </a>
                <a
                  className="block w-full py-2 font-semibold"
                  href="https://nativewind.dev"
                  target="_blank"
                >
                  Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
