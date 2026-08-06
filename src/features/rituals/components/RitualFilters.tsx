import { Search, Flame, Check } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

export interface RitualFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedDifficulty?: string;
  onDifficultyChange?: (difficulty: string) => void;
  isHot?: boolean | undefined;
  onIsHotChange?: (isHot: boolean | undefined) => void;
}

const DIFFICULTIES = ["dễ", "trung bình", "khó", "rất khó"];

export function RitualFilters({
  searchTerm,
  onSearchChange,
  selectedDifficulty,
  onDifficultyChange,
  isHot,
  onIsHotChange,
}: RitualFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm nghi lễ..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-transparent border-input rounded"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 items-center">
        {onIsHotChange && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={isHot !== undefined ? "default" : "outline"}
                size="icon-lg"
              >
                <Flame
                  className={`${
                    isHot === true ? "fill-current text-orange-400" : ""
                  }`}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-40">
              <DropdownMenuItem onClick={() => onIsHotChange(undefined)}>
                Tất cả
                {isHot === undefined && <Check className="w-3.5 h-3.5" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onIsHotChange(true)}>
                Nổi bật (Hot)
                {isHot === true && <Check className="w-3.5 h-3.5" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onIsHotChange(false)}>
                Bình thường
                {isHot === false && <Check className="w-3.5 h-3.5" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {onDifficultyChange && (
          <>
            <Button
              variant={selectedDifficulty === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => onDifficultyChange("all")}
              className="cursor-pointer text-xs"
            >
              Tất cả độ khó
            </Button>
            {DIFFICULTIES.map((level) => (
              <Button
                key={level}
                variant={selectedDifficulty === level ? "default" : "outline"}
                size="sm"
                onClick={() => onDifficultyChange(level)}
                className="cursor-pointer text-xs capitalize"
              >
                {level}
              </Button>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
