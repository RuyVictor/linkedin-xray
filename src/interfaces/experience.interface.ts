export interface IExperience {
  company: string;
  timeline: {
    position: string;
    location?: string;
    dateRange: {
      startDate: string;
      endDate: string | "the moment";
      duration: string;
    };
    description?: string;
  }[];
}
