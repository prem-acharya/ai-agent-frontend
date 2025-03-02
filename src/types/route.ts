export type RouteType = {
  public: string[];
  protected: string[];
};

export const routes: RouteType = {
  public: ["/"],
  protected: ["/dashboard"],
};
