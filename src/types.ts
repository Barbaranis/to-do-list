export type Priority = 'Haute' | 'Moyenne' | 'Basse';


export type Task = {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  deadline: string;
};

