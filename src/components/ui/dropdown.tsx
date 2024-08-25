"use client";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Command, CommandGroup, CommandItem, CommandList } from "./command";
import { fields } from "@/constant";
export function Dropdown({
  options,
  title,
  handleDropDownValue,
}: {
  options: string[] | undefined;
  title: string;
  handleDropDownValue: (value: string, valueToUpdate: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=""
        >
          {value && options
            ? options.find((option) => option === value)
            : "Not Selected"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className=" ">
          <CommandList>
            <CommandGroup>
              {options &&
                options.map((option) => {
                  return (
                    <CommandItem
                      key={option}
                      value={option}
                      className=""
                      onSelect={(currentValue) => {
                        if (currentValue !== value) {
                          handleDropDownValue(currentValue, title);
                        }
                        setValue((prevValue) =>
                          currentValue === prevValue ? "" : currentValue
                        );

                        setOpen(false);
                      }}
                    >
                      {option}
                    </CommandItem>
                  );
                })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
