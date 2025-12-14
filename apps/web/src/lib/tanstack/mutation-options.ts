/**
 * TanStack Query - Mutation Options Factory
 *
 * Type-safe mutation options with automatic cache invalidation,
 * toast notifications, and optimistic update utilities.
 *
 * @see https://tanstack.com/query/v5/docs/framework/react/guides/mutations
 */

import type {
  QueryClient,
  QueryKey,
  UseMutationOptions,
} from '@tanstack/react-query';
import { toast } from 'sonner';
import type { ApiError } from './types';

// ============================================================================
// Types
// ============================================================================

/**
 * Toast notification configuration
 */
interface ToastConfig<TData, TVariables> {
  /** Toast message on success */
  successMessage?: string | ((data: TData, variables: TVariables) => string);
  /** Toast message on error */
  errorMessage?: string | ((error: ApiError) => string);
  /** Show loading toast during mutation */
  showLoading?: boolean;
  /** Loading toast message */
  loadingMessage?: string;
}

/**
 * Cache invalidation configuration
 */
interface CacheInvalidationConfig {
  /** Query keys to invalidate on success */
  invalidateKeys?: QueryKey[];
  /** Query keys to remove from cache on success */
  removeKeys?: QueryKey[];
  /** Whether to wait for invalidation before proceeding */
  awaitInvalidation?: boolean;
}

/**
 * Extended mutation options with utilities
 */
interface ExtendedMutationOptions<
  TData,
  TVariables,
  TError = ApiError,
  TContext = unknown,
> {
  /** Mutation function */
  mutationFn: (variables: TVariables) => Promise<TData>;
  /** Optional mutation key */
  mutationKey?: QueryKey;
  /** Toast notification configuration */
  toast?: ToastConfig<TData, TVariables>;
  /** Cache invalidation configuration */
  cache?: CacheInvalidationConfig;
  /** Called before mutation */
  onMutate?: (
    variables: TVariables,
  ) => Promise<TContext | undefined> | TContext | undefined;
  /** Called on success */
  onSuccess?: (
    data: TData,
    variables: TVariables,
    context: TContext | undefined,
  ) => Promise<void> | void;
  /** Called on error */
  onError?: (
    error: TError,
    variables: TVariables,
    context: TContext | undefined,
  ) => Promise<void> | void;
  /** Called on settled */
  onSettled?: (
    data: TData | undefined,
    error: TError | null,
    variables: TVariables,
    context: TContext | undefined,
  ) => Promise<void> | void;
  /** Retry configuration */
  retry?: boolean | number | ((failureCount: number, error: TError) => boolean);
  /** Retry delay */
  retryDelay?: number | ((attemptIndex: number, error: TError) => number);
}

// ============================================================================
// Mutation Options Factory
// ============================================================================

/**
 * Creates mutation options with automatic toast notifications and cache invalidation
 *
 * @example
 * ```ts
 * const createUserMutation = createMutationOptions({
 *   mutationFn: (data: CreateUserData) => api.createUser(data),
 *   toast: {
 *     successMessage: "User created successfully!",
 *     errorMessage: (error) => error.message,
 *     showLoading: true,
 *     loadingMessage: "Creating user...",
 *   },
 *   cache: {
 *     invalidateKeys: [queryKeys.users.all],
 *   },
 *   onSuccess: (data) => {
 *     // Additional success handling
 *   },
 * });
 *
 * // Usage with useMutation
 * const mutation = useMutation(createUserMutation(queryClient));
 * ```
 */
export function createMutationOptions<
  TData,
  TVariables,
  TError = ApiError,
  TContext = unknown,
>(
  options: ExtendedMutationOptions<TData, TVariables, TError, TContext>,
): (
  queryClient: QueryClient,
) => UseMutationOptions<TData, TError, TVariables, TContext> {
  const {
    mutationFn,
    mutationKey,
    toast: toastConfig,
    cache: cacheConfig,
    onMutate,
    onSuccess,
    onError,
    onSettled,
    retry,
    retryDelay,
  } = options;

  return (
    queryClient: QueryClient,
  ): UseMutationOptions<TData, TError, TVariables, TContext> => ({
    mutationFn,
    mutationKey,
    retry,
    retryDelay,

    onMutate: async (variables: TVariables) => {
      // Show loading toast if configured
      if (toastConfig?.showLoading) {
        toast.loading(toastConfig.loadingMessage ?? 'Processing...', {
          id: 'mutation-loading',
        });
      }

      // Call original onMutate if provided
      if (onMutate) {
        return (await onMutate(variables)) as TContext;
      }
      return undefined as TContext;
    },

    onSuccess: async (
      data: TData,
      variables: TVariables,
      context: TContext,
    ) => {
      // Dismiss loading toast
      if (toastConfig?.showLoading) {
        toast.dismiss('mutation-loading');
      }

      // Show success toast if configured
      if (toastConfig?.successMessage) {
        const message =
          typeof toastConfig.successMessage === 'function'
            ? toastConfig.successMessage(data, variables)
            : toastConfig.successMessage;
        toast.success(message);
      }

      // Handle cache invalidation
      if (cacheConfig?.invalidateKeys?.length) {
        const invalidationPromises = cacheConfig.invalidateKeys.map((key) =>
          queryClient.invalidateQueries({ queryKey: key }),
        );

        if (cacheConfig.awaitInvalidation) {
          await Promise.all(invalidationPromises);
        }
      }

      // Handle cache removal
      if (cacheConfig?.removeKeys?.length) {
        for (const key of cacheConfig.removeKeys) {
          queryClient.removeQueries({ queryKey: key });
        }
      }

      // Call original onSuccess if provided
      if (onSuccess) {
        await onSuccess(data, variables, context);
      }
    },

    onError: async (
      error: TError,
      variables: TVariables,
      context: TContext | undefined,
    ) => {
      // Dismiss loading toast
      if (toastConfig?.showLoading) {
        toast.dismiss('mutation-loading');
      }

      // Show error toast if configured
      if (toastConfig?.errorMessage) {
        const message =
          typeof toastConfig.errorMessage === 'function'
            ? toastConfig.errorMessage(error as unknown as ApiError)
            : toastConfig.errorMessage;
        toast.error(message);
      } else {
        // Default error message
        const apiError = error as unknown as ApiError;
        toast.error(apiError?.message ?? 'An error occurred');
      }

      // Call original onError if provided
      if (onError) {
        await onError(error, variables, context);
      }
    },

    onSettled: async (
      data: TData | undefined,
      error: TError | null,
      variables: TVariables,
      context: TContext | undefined,
    ) => {
      // Call original onSettled if provided
      if (onSettled) {
        await onSettled(data, error, variables, context);
      }
    },
  });
}

// ============================================================================
// Optimistic Update Utilities
// ============================================================================

/**
 * Context for optimistic updates with rollback support
 */
export interface OptimisticContext<TData> {
  previousData: TData | undefined;
}

/**
 * Creates optimistic mutation options for list operations
 *
 * @example
 * ```ts
 * const deleteTodoMutation = createOptimisticListMutation({
 *   mutationFn: (id: string) => api.deleteTodo(id),
 *   queryKey: queryKeys.todos.list(),
 *   updateFn: (oldData, variables) =>
 *     oldData.filter((todo) => todo.id !== variables),
 *   toast: {
 *     successMessage: "Todo deleted!",
 *   },
 * });
 * ```
 */
export function createOptimisticListMutation<
  TData extends unknown[],
  TVariables,
  TError = ApiError,
>(options: {
  mutationFn: (variables: TVariables) => Promise<unknown>;
  queryKey: QueryKey;
  updateFn: (oldData: TData, variables: TVariables) => TData;
  toast?: ToastConfig<unknown, TVariables>;
}): (
  queryClient: QueryClient,
) => UseMutationOptions<unknown, TError, TVariables, OptimisticContext<TData>> {
  const { mutationFn, queryKey, updateFn, toast: toastConfig } = options;

  return (
    queryClient: QueryClient,
  ): UseMutationOptions<
    unknown,
    TError,
    TVariables,
    OptimisticContext<TData>
  > => ({
    mutationFn,

    onMutate: async (
      variables: TVariables,
    ): Promise<OptimisticContext<TData>> => {
      // Cancel any outgoing refetches to prevent overwriting optimistic update
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData<TData>(queryKey);

      // Optimistically update the cache
      if (previousData) {
        queryClient.setQueryData<TData>(
          queryKey,
          updateFn(previousData, variables),
        );
      }

      // Return context with the snapshotted value
      return { previousData };
    },

    onSuccess: () => {
      if (toastConfig?.successMessage) {
        const message =
          typeof toastConfig.successMessage === 'string'
            ? toastConfig.successMessage
            : 'Success';
        toast.success(message);
      }
    },

    onError: (
      error: TError,
      _variables: TVariables,
      context: OptimisticContext<TData> | undefined,
    ) => {
      // Rollback to the previous value on error
      if (context?.previousData) {
        queryClient.setQueryData<TData>(queryKey, context.previousData);
      }

      // Show error toast
      if (toastConfig?.errorMessage) {
        const message =
          typeof toastConfig.errorMessage === 'function'
            ? toastConfig.errorMessage(error as unknown as ApiError)
            : toastConfig.errorMessage;
        toast.error(message);
      } else {
        const apiError = error as unknown as ApiError;
        toast.error(apiError?.message ?? 'An error occurred');
      }
    },

    onSettled: () => {
      // Always refetch after error or success to ensure cache is in sync
      queryClient.invalidateQueries({ queryKey });
    },
  });
}

/**
 * Creates optimistic mutation options for single item updates
 *
 * @example
 * ```ts
 * const updateTodoMutation = createOptimisticItemMutation({
 *   mutationFn: (data: UpdateTodoData) => api.updateTodo(data),
 *   getQueryKey: (variables) => queryKeys.todos.detail(variables.id),
 *   updateFn: (oldData, variables) => ({ ...oldData, ...variables }),
 *   toast: {
 *     successMessage: "Todo updated!",
 *   },
 * });
 * ```
 */
export function createOptimisticItemMutation<
  TData,
  TVariables,
  TError = ApiError,
>(options: {
  mutationFn: (variables: TVariables) => Promise<TData>;
  getQueryKey: (variables: TVariables) => QueryKey;
  updateFn: (oldData: TData, variables: TVariables) => TData;
  invalidateKeys?: QueryKey[];
  toast?: ToastConfig<TData, TVariables>;
}): (
  queryClient: QueryClient,
) => UseMutationOptions<TData, TError, TVariables, OptimisticContext<TData>> {
  const {
    mutationFn,
    getQueryKey,
    updateFn,
    invalidateKeys,
    toast: toastConfig,
  } = options;

  return (
    queryClient: QueryClient,
  ): UseMutationOptions<
    TData,
    TError,
    TVariables,
    OptimisticContext<TData>
  > => ({
    mutationFn,

    onMutate: async (
      variables: TVariables,
    ): Promise<OptimisticContext<TData>> => {
      const queryKey = getQueryKey(variables);

      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData<TData>(queryKey);

      // Optimistically update the cache
      if (previousData) {
        queryClient.setQueryData<TData>(
          queryKey,
          updateFn(previousData, variables),
        );
      }

      return { previousData };
    },

    onSuccess: (data: TData, variables: TVariables) => {
      const queryKey = getQueryKey(variables);

      // Update cache with actual response data
      queryClient.setQueryData<TData>(queryKey, data);

      // Invalidate related queries
      if (invalidateKeys?.length) {
        for (const key of invalidateKeys) {
          queryClient.invalidateQueries({ queryKey: key });
        }
      }

      if (toastConfig?.successMessage) {
        const message =
          typeof toastConfig.successMessage === 'function'
            ? toastConfig.successMessage(data, variables)
            : toastConfig.successMessage;
        toast.success(message);
      }
    },

    onError: (
      error: TError,
      variables: TVariables,
      context: OptimisticContext<TData> | undefined,
    ) => {
      const queryKey = getQueryKey(variables);

      // Rollback to the previous value
      if (context?.previousData) {
        queryClient.setQueryData<TData>(queryKey, context.previousData);
      }

      if (toastConfig?.errorMessage) {
        const message =
          typeof toastConfig.errorMessage === 'function'
            ? toastConfig.errorMessage(error as unknown as ApiError)
            : toastConfig.errorMessage;
        toast.error(message);
      } else {
        const apiError = error as unknown as ApiError;
        toast.error(apiError?.message ?? 'An error occurred');
      }
    },
  });
}

// ============================================================================
// Mutation Presets
// ============================================================================

/**
 * Default retry configuration for mutations
 * Mutations are not retried by default as they may not be idempotent
 */
export const defaultMutationPreset = {
  retry: false,
  networkMode: 'online' as const,
} as const;

/**
 * Retry configuration for idempotent mutations
 * Use only for mutations that are safe to retry (e.g., PUT, DELETE)
 */
export const idempotentMutationPreset = {
  retry: 3,
  retryDelay: (attemptIndex: number) =>
    Math.min(1000 * 2 ** attemptIndex, 30000),
  networkMode: 'online' as const,
} as const;
