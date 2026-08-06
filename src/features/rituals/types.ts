import type {
  BaseFliterParams,
  PaginationResponse,
  SelectOption,
} from "@/shared/types";

export interface Ritual {
  id: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  deletedAt: null;
  name: string;
  timeOfExecution?: string;
  dateLunar: string;
  dateSolar: string;
  difficultyLevel: "dễ" | "khó" | "trung bình" | "rất khó";
  description: string;
  content: string;
  reference: string;
  isHot: boolean;
  ritualCategoryId: string;
  ritualMedias?: RitualMedia[];
  ritualTags?: [];
}

export interface RitualMedia {
  alt?: string;
  id: string;
  ritualId: string;
  type?: string;
  url?: string;
}

export interface CreateRitualDto {
  name: string;
  dateLunar: string;
  dateSolar?: string;
  timeOfExecution?: string;
  difficultyLevel: "dễ" | "khó" | "trung bình" | "rất khó";
  description?: string;
  content?: string;
  reference?: string;
  isHot?: boolean;
  ritualCategoryId?: string;
}

export type UpdateRitualDto = Partial<CreateRitualDto>;

// Select option for Dropdown
export type RitualSelectOption = SelectOption;

// Fliter
export interface RitualFliterParams extends BaseFliterParams {
  difficultLevel?: string;
  isHot?: boolean;
  ritualCategoryId?: string;
}

export type RitualListResponse = PaginationResponse<Ritual>;
