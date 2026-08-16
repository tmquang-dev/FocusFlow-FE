import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  renderWithProviders,
  screen,
  waitFor,
  fireEvent,
} from "@/utils/test-utils";
import { kanbanServices } from "@/api/services/kanbanServices";
import type { IBackendTask } from "@/api/services/kanbanServices.type";
import Home from "@/pages/home/Home";
import { moveTaskOptimistic, setDeletingTask } from "./kanbanSlice";
import { moveTaskThunk } from "./kanbanThunks";

const mockTasks: IBackendTask[] = [
  {
    id: "task-1",
    task_num: "1",
    title: "Task One",
    description: "Description One",
    status: "BACKLOG",
    order: 1,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "task-2",
    task_num: "2",
    title: "Task Two",
    description: "Description Two",
    status: "TO_DO",
    order: 1,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "task-3",
    task_num: "3",
    title: "Task Three",
    description: "Description Three",
    status: "IN_PROGRESS",
    order: 1,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "task-4",
    task_num: "4",
    title: "Task Four",
    description: "Description Four",
    status: "DONE",
    order: 1,
    created_at: "2026-01-01T00:00:00Z",
  },
];

const defaultWorkspaceState = {
  workspaces: [
    { id: "ws-1", name: "Default Workspace", created_at: "2026-01-01" },
  ],
  activeWorkspaceId: "ws-1",
  isLoading: false,
  error: null,
};

describe("Kanban Feature Integration Suite", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    vi.clearAllMocks();
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
    sessionStorage.clear();
  });

  // --------------------------------------------------------------------------
  // Scenario 1: Initial Fetching & Column Rendering
  // --------------------------------------------------------------------------
  it("Scenario 1: should fetch and render tasks correctly across all 4 columns", async () => {
    vi.spyOn(kanbanServices, "getTasksByWorkspace").mockResolvedValueOnce({
      status: "success",
      data: { tasks: mockTasks },
    });

    renderWithProviders(<Home />, {
      preloadedState: {
        workspace: defaultWorkspaceState,
      },
    });

    await waitFor(() => {
      expect(screen.getByText("Task One")).toBeInTheDocument();
      expect(screen.getByText("Task Two")).toBeInTheDocument();
      expect(screen.getByText("Task Three")).toBeInTheDocument();
      expect(screen.getByText("Task Four")).toBeInTheDocument();
    });

    expect(screen.getByText("#1")).toBeInTheDocument();
    expect(screen.getByText("#2")).toBeInTheDocument();
    expect(screen.getByText("#3")).toBeInTheDocument();
    expect(screen.getByText("#4")).toBeInTheDocument();
  });

  // --------------------------------------------------------------------------
  // Scenario 2: Quick Task Creation (AddNewTask)
  // --------------------------------------------------------------------------
  it("Scenario 2: should create a new task via AddNewTask input and add it to BACKLOG", async () => {
    vi.spyOn(kanbanServices, "getTasksByWorkspace").mockResolvedValueOnce({
      status: "success",
      data: { tasks: [] },
    });

    const quickAddSpy = vi
      .spyOn(kanbanServices, "quickAddTask")
      .mockResolvedValueOnce({
        status: "success",
        data: {
          task: {
            id: "task-new",
            task_num: "5",
            title: "Newly Created Task",
            description: "",
            status: "BACKLOG",
            order: 1,
            created_at: "2026-01-01T00:00:00Z",
          },
        },
      });

    renderWithProviders(<Home />, {
      preloadedState: {
        workspace: defaultWorkspaceState,
      },
    });

    const input = screen.getByPlaceholderText(/Add a new task to Backlog/i);
    await user.type(input, "Newly Created Task");
    const form = input.closest("form");
    if (form) {
      fireEvent.submit(form);
    }

    await waitFor(() => {
      expect(quickAddSpy).toHaveBeenCalledWith("ws-1", {
        title: "Newly Created Task",
      });
      expect(screen.getByText("Newly Created Task")).toBeInTheDocument();
    });

    expect(input).toHaveValue("");
  });

  // --------------------------------------------------------------------------
  // Scenario 3: Optimistic Movement & Rollback on Error
  // --------------------------------------------------------------------------
  it("Scenario 3: should update task position optimistically and rollback if server move fails", async () => {
    vi.spyOn(kanbanServices, "getTasksByWorkspace").mockResolvedValueOnce({
      status: "success",
      data: { tasks: mockTasks },
    });

    const { store } = renderWithProviders(<Home />, {
      preloadedState: {
        workspace: defaultWorkspaceState,
      },
    });

    await waitFor(() => {
      expect(screen.getByText("Task One")).toBeInTheDocument();
    });

    // 1. Move task-1 from BACKLOG to TO_DO optimistically
    store.dispatch(
      moveTaskOptimistic({
        activeId: "task-1",
        targetColumnId: "TO_DO",
        targetIndex: 0,
      }),
    );

    expect(
      store.getState().kanban.tasks.find((t) => t.id === "task-1")?.columnId,
    ).toBe("TO_DO");

    // 2. Reject move task thunk with previous snapshot (Rollback)
    store.dispatch(
      moveTaskThunk.rejected(
        null,
        "requestId-123",
        {
          taskId: "task-1",
          status: "TO_DO",
          order: 1,
          previousTasksSnapshot: mockTasks.map((t) => ({
            ...t,
            desc: t.description,
            columnId: t.status,
          })),
        },
        {
          message: "Server connection error",
          previousTasksSnapshot: mockTasks.map((t) => ({
            ...t,
            desc: t.description,
            columnId: t.status,
          })),
        },
      ),
    );

    // Position rolled back to BACKLOG
    expect(
      store.getState().kanban.tasks.find((t) => t.id === "task-1")?.columnId,
    ).toBe("BACKLOG");
  });

  // --------------------------------------------------------------------------
  // Scenario 4: Task Detail Modal Interactions
  // --------------------------------------------------------------------------
  it("Scenario 4: should open TaskDetailModal on card click and close on Escape key", async () => {
    vi.spyOn(kanbanServices, "getTasksByWorkspace").mockResolvedValueOnce({
      status: "success",
      data: { tasks: mockTasks },
    });

    renderWithProviders(<Home />, {
      preloadedState: {
        workspace: defaultWorkspaceState,
      },
    });

    await waitFor(() => {
      expect(screen.getByText("Task One")).toBeInTheDocument();
    });

    // Click task card
    await user.click(screen.getByText("Task One"));

    // Verify Task Details Modal opens
    await waitFor(() => {
      expect(screen.getByText("Task Details")).toBeInTheDocument();
    });

    // Press Escape to close modal
    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByText("Task Details")).not.toBeInTheDocument();
    });
  });

  // --------------------------------------------------------------------------
  // Scenario 5: Reusable Delete Task Flow & Confirmation Modal
  // --------------------------------------------------------------------------
  it("Scenario 5: should open GlobalConfirmDeleteModal when deleting task, and handle confirmation & localStorage suppression", async () => {
    vi.spyOn(kanbanServices, "getTasksByWorkspace").mockResolvedValueOnce({
      status: "success",
      data: { tasks: mockTasks },
    });

    const deleteSpy = vi
      .spyOn(kanbanServices, "deleteTask")
      .mockResolvedValueOnce({
        status: "success",
        message: "Task deleted successfully.",
      });

    const { store } = renderWithProviders(<Home />, {
      preloadedState: {
        workspace: defaultWorkspaceState,
      },
    });

    await waitFor(() => {
      expect(screen.getByText("Task One")).toBeInTheDocument();
    });

    // 1. Dispatch setDeletingTask to open global delete modal
    store.dispatch(setDeletingTask({ id: "task-1", title: "Task One" }));

    await waitFor(() => {
      expect(
        screen.getByText(/Are you sure you want to delete task/i),
      ).toBeInTheDocument();
      expect(screen.getByText('"Task One"')).toBeInTheDocument();
    });

    // 2. Click Delete Task button inside modal
    const confirmDeleteButton = screen.getByRole("button", {
      name: /^Delete Task$/i,
    });
    await user.click(confirmDeleteButton);

    await waitFor(() => {
      expect(deleteSpy).toHaveBeenCalledWith("task-1");
      expect(screen.queryByText("Task One")).not.toBeInTheDocument();
    });
  });

  // --------------------------------------------------------------------------
  // Scenario 6: Workspace Switch & Board State Isolation
  // --------------------------------------------------------------------------
  it("Scenario 6: should re-fetch tasks when activeWorkspaceId changes", async () => {
    const getTasksSpy = vi
      .spyOn(kanbanServices, "getTasksByWorkspace")
      .mockResolvedValue({
        status: "success",
        data: { tasks: mockTasks },
      });

    renderWithProviders(<Home />, {
      preloadedState: {
        workspace: {
          workspaces: [
            { id: "ws-1", name: "Workspace 1", created_at: "2026-01-01" },
            { id: "ws-2", name: "Workspace 2", created_at: "2026-01-01" },
          ],
          activeWorkspaceId: "ws-1",
          isLoading: false,
          error: null,
        },
      },
    });

    await waitFor(() => {
      expect(getTasksSpy).toHaveBeenCalledWith("ws-1");
    });
  });
});
