import apiClient from "../api/apiClient";



import type {
  CommandCenterRequest,
} from "../models/commandCenterRequest";

import type {
  CommandCenterResponse,
} from "../models/commandCenterResponse";

const COMMAND_CENTER_ENDPOINT =
  "/command-center/execute";

const COMMAND_CENTER_TIMEOUT =
  10 * 60 * 1000;

class CommandCenterService {
  static async execute(
    request: CommandCenterRequest,
    signal?: AbortSignal
  ): Promise<CommandCenterResponse> {
    const response =
      await apiClient.post<CommandCenterResponse>(
        COMMAND_CENTER_ENDPOINT,
        request,
        {
          signal,

          timeout:
            COMMAND_CENTER_TIMEOUT,
        }
      );

    return response.data;
  }
}

export default CommandCenterService;