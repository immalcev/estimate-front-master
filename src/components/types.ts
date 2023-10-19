export type ProjectData = {
  id: number;
  name: string;
  description: string;
  status: number;
  start_date: string;
  scope?: string;
  userCount?: number;
  parent?: number | null;
};

export type PersonData = {
  id: number;
  surname?: string;
  name?: string;
  patronymic?: string;
  onClick?: (id: number) => void;
  selected?: boolean;
  availableActivities?: { id: number, name: string }[];
};

export type UserData = {
  id?: number;
  login: string;
  password: string;
  personId?: number;
};

export type UserRoleProjectData = {
  id: number;
  users: number;
  role?: number;
  task: number;
  type_of_activity?: number;
  score?: number;
}

export type RoleData = {
  id: number;
  name: string;
}

export type CommentData = {
  id: number;
  user: number | string;
  comments: string;
  taskid: number;
}

export type StatusData = {
  id: number;
  name: string;
}

export interface SearchProps {
  onSearchQueryChange: (query: string) => void;
}