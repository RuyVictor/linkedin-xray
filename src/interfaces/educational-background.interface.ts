export interface IEducationalBackground {
  school: string;
  educationInfo: {
    degree?: string;
    segment?: string;
  };
  dateRange: {
    startDate?: string;
    endDate?: string | "the moment";
  };
  description?: string;
}
