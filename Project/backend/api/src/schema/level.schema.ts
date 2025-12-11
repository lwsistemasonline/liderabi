export interface LevelSchema {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CreateLevelData {
  name: string;
}

export interface UpdateLevelData {
  name: string;
}
