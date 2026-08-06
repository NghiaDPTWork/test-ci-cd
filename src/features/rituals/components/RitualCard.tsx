import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Flame, Calendar, Award } from "lucide-react";
import type { Ritual } from "../types";
import defaultImage from "../image/image.png";

export interface RitualCardProps {
  ritual: Ritual;
}

const getDifficultyColor = (level: string) => {
  switch (level) {
    case "dễ":
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
    case "trung bình":
      return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
    case "khó":
      return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20";
    case "rất khó":
      return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export function RitualCard({ ritual }: RitualCardProps) {
  return (
    <Card className="group relative overflow-hidden border bg-card rounded-lg transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <img
                className="w-full h-full object-cover rounded-md"
                src={ritual.ritualMedias?.[4]?.url || defaultImage}
                alt="Ritual Picture Description"
              />
            </div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
                <Link to={`/rituals/${ritual.id}`}>{ritual.name}</Link>
              </CardTitle>
              {ritual.isHot && (
                <Badge
                  variant="destructive"
                  className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-full bg-red-500 text-white border-0"
                >
                  <Flame className="w-3 h-3 fill-current" />
                  Hot
                </Badge>
              )}
            </div>
            <CardDescription className="text-xs text-muted-foreground line-clamp-1">
              {ritual.reference || "Nguồn dân gian"}
            </CardDescription>
          </div>
          <Badge
            className={`${getDifficultyColor(ritual.difficultyLevel)} border-0 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full`}
          >
            {ritual.difficultyLevel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {ritual.description}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Âm lịch: {ritual.dateLunar}
            </span>
            {ritual.timeOfExecution && (
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                Giờ: {ritual.timeOfExecution}
              </span>
            )}
          </div>
          <Button
            variant="link"
            size="sm"
            asChild
            className="p-0 h-auto cursor-pointer font-medium text-primary hover:underline"
          >
            <Link to={`/rituals/${ritual.id}`}>Xem chi tiết →</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
