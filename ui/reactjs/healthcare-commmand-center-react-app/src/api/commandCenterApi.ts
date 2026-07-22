import axiosClient from "./axiosClient";

import type { CommandCenterRequest } from "../models/commandCenterRequest";
import type { CommandCenterResponse } from "../models/commandCenterResponse";



export const executeCommandCenterApi = async (
  request: CommandCenterRequest
): Promise<CommandCenterResponse> => {
  const response = await axiosClient.post<CommandCenterResponse>(
    "/command-center/execute",
    request
  );

  return response.data;
};