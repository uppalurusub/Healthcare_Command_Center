import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import axios from "axios";

import CommandCenterService from
  "../services/commandCenterService";

import type {
  CommandCenterRequest,
} from "../models/commandCenterRequest";

import type {
  CommandCenterResponse,
} from "../models/commandCenterResponse";

interface UseCommandCenterReturn {
  loading: boolean;

  error: string | null;

  result: CommandCenterResponse | null;

  executeCommandCenter: (
    request: CommandCenterRequest
  ) => Promise<void>;

  reset: () => void;

  clearError: () => void;

  cancelExecution: () => void;
}

interface FastApiValidationError {
  type?: string;

  loc?: Array<string | number>;

  msg?: string;

  input?: unknown;
}

interface FastApiErrorResponse {
  detail?:
    | string
    | FastApiValidationError[];

  message?: string;
}

const useCommandCenter =
  (): UseCommandCenterReturn => {
    const [
      loading,
      setLoading,
    ] = useState<boolean>(false);

    const [
      error,
      setError,
    ] = useState<string | null>(null);

    const [
      result,
      setResult,
    ] =
      useState<CommandCenterResponse | null>(
        null
      );

    const abortControllerRef =
      useRef<AbortController | null>(null);

    useEffect(() => {
      return () => {
        abortControllerRef.current?.abort();
      };
    }, []);

    const executeCommandCenter =
      useCallback(
        async (
          request: CommandCenterRequest
        ): Promise<void> => {
          abortControllerRef.current?.abort();

          const controller =
            new AbortController();

          abortControllerRef.current =
            controller;

          setLoading(true);
          setError(null);
          setResult(null);

          try {
            const response =
              await CommandCenterService.execute(
                request,
                controller.signal
              );

            if (
              controller.signal.aborted
            ) {
              return;
            }

            setResult(response);
          } catch (
            executionError: unknown
          ) {
            if (
              controller.signal.aborted
            ) {
              return;
            }

            setError(
              getCommandCenterErrorMessage(
                executionError
              )
            );
          } finally {
            if (
              !controller.signal.aborted
            ) {
              setLoading(false);
            }

            if (
              abortControllerRef.current ===
              controller
            ) {
              abortControllerRef.current =
                null;
            }
          }
        },
        []
      );

    const cancelExecution =
      useCallback((): void => {
        abortControllerRef.current?.abort();

        abortControllerRef.current = null;

        setLoading(false);

        setError(
          "Healthcare governance analysis was cancelled."
        );
      }, []);

    const reset =
      useCallback((): void => {
        abortControllerRef.current?.abort();

        abortControllerRef.current = null;

        setLoading(false);

        setError(null);

        setResult(null);
      }, []);

    const clearError =
      useCallback((): void => {
        setError(null);
      }, []);

    return {
      loading,
      error,
      result,
      executeCommandCenter,
      reset,
      clearError,
      cancelExecution,
    };
  };

const getCommandCenterErrorMessage = (
  error: unknown
): string => {
  if (axios.isAxiosError(error)) {
    if (
      error.code === "ERR_CANCELED"
    ) {
      return (
        "Healthcare governance analysis " +
        "was cancelled."
      );
    }

    if (
      error.code === "ECONNABORTED"
    ) {
      return (
        "Agent execution timeout. " +
        "The Healthcare Command Center " +
        "analysis exceeded the configured " +
        "request timeout."
      );
    }

    if (!error.response) {
      return (
        "Network Error: Unable to connect " +
        "to the Healthcare Command Center API. " +
        "Verify that the FastAPI service is running."
      );
    }

    const status =
      error.response.status;

    const responseData =
      error.response
        .data as FastApiErrorResponse;

    const detail =
      extractFastApiDetail(
        responseData
      );

    switch (status) {
      case 400:
        return (
          detail ??
          "400 Bad Request: Invalid Healthcare Command Center request."
        );

      case 401:
        return (
          detail ??
          "401 Unauthorized: Authentication is required."
        );

      case 403:
        return (
          detail ??
          "403 Forbidden: You do not have permission to execute this analysis."
        );

      case 404:
        return (
          detail ??
          "404 Not Found: Healthcare Command Center API endpoint was not found."
        );

      case 408:
        return (
          detail ??
          "408 Request Timeout: Agent execution did not complete."
        );

      case 422:
        return (
          detail ??
          "422 Validation Error: Review the hospital metrics and request values."
        );

      case 429:
        return (
          detail ??
          "429 Too Many Requests: Command Center is handling too many requests."
        );

      case 500:
        return (
          detail ??
          "500 Internal Server Error: Healthcare governance agent execution failed."
        );

      case 502:
        return (
          detail ??
          "502 Bad Gateway: An upstream AI service is unavailable."
        );

      case 503:
        return (
          detail ??
          "503 Service Unavailable: Healthcare Command Center is unavailable."
        );

      case 504:
        return (
          detail ??
          "504 Gateway Timeout: Agent swarm execution exceeded the gateway timeout."
        );

      default:
        return (
          detail ??
          `Healthcare Command Center request failed with HTTP status ${status}.`
        );
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return (
    "An unexpected error occurred while " +
    "executing the Healthcare Command Center."
  );
};

const extractFastApiDetail = (
  response?: FastApiErrorResponse
): string | null => {
  if (!response) {
    return null;
  }

  if (
    typeof response.detail === "string"
  ) {
    return response.detail;
  }

  if (
    Array.isArray(response.detail)
  ) {
    return formatValidationErrors(
      response.detail
    );
  }

  if (
    typeof response.message === "string"
  ) {
    return response.message;
  }

  return null;
};

const formatValidationErrors = (
  errors: FastApiValidationError[]
): string => {
  if (errors.length === 0) {
    return "Request validation failed.";
  }

  return errors
    .map((validationError) => {
      const location =
        validationError.loc
          ?.filter(
            (locationItem) =>
              locationItem !== "body"
          )
          .join(" → ");

      const message =
        validationError.msg ??
        "Invalid value";

      if (!location) {
        return message;
      }

      return `${formatFieldName(
        location
      )}: ${message}`;
    })
    .join(" | ");
};

const formatFieldName = (
  fieldName: string
): string => {
  return fieldName
    .replace(/_/g, " ")
    .replace(
      /\b\w/g,
      (character) =>
        character.toUpperCase()
    );
};

export default useCommandCenter;