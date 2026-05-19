import { renderHook, act } from "@testing-library/react";
import { useLoginForm } from "../useLoginForm";

// 1. Mock Next.js router navigation smoothly
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: mockPush,
    };
  },
}));

describe("useLoginForm Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(); // Reset fetch mock before each run
  });

  // ==========================================
  // NEGATIVE SCENARIO TESTING
  // ==========================================

  it("[Negative] should initialize with empty fields and no validation errors", () => {
    const { result } = renderHook(() => useLoginForm());

    expect(result.current.email).toBe("");
    expect(result.current.password).toBe("");
    expect(result.current.errors).toEqual({});
  });

  it("[Negative] should trigger inline validation errors on blank form submit attempt", async () => {
    const { result } = renderHook(() => useLoginForm());

    // Mock a synthetic submit event without using 'any'
    const mockEvent = {
      preventDefault: jest.fn(),
    } as unknown as React.FormEvent<HTMLFormElement>;

    await act(async () => {
      await result.current.handleLoginSubmit(mockEvent);
    });

    // Check that both validation fields are populated exactly per your hook implementation
    expect(result.current.errors.email).toBe("Email is required.");
    expect(result.current.errors.password).toBe("Password is required.");
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("[Negative] should catch invalid email structures and short passwords", async () => {
    const { result } = renderHook(() => useLoginForm());
    const mockEvent = { preventDefault: jest.fn() } as unknown as React.FormEvent<HTMLFormElement>;

    act(() => {
      result.current.setEmail("trayshmhirk.com"); // Missing @ character
      result.current.setPassword("123"); // Less than 6 characters
    });

    await act(async () => {
      await result.current.handleLoginSubmit(mockEvent);
    });

    expect(result.current.errors.email).toBe("Invalid email format.");
    expect(result.current.errors.password).toBe("Password must be at least 6 characters.");
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("[Negative] should gracefully map back-end authentication field failures", async () => {
    const { result } = renderHook(() => useLoginForm());
    const mockEvent = { preventDefault: jest.fn() } as unknown as React.FormEvent<HTMLFormElement>;

    // Simulate an API field-specific rejection error payload
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        errors: { email: "This email is not registered on Lendsqr." },
      }),
    });

    act(() => {
      result.current.setEmail("unknown@lendsqr.com");
      result.current.setPassword("correctLengthPass");
    });

    await act(async () => {
      await result.current.handleLoginSubmit(mockEvent);
    });

    expect(result.current.errors.email).toBe("This email is not registered on Lendsqr.");
    expect(mockPush).not.toHaveBeenCalled();
  });

  // ==========================================
  // POSITIVE SCENARIO TESTING
  // ==========================================

  it("[Positive] should route successfully to directory layout given valid api response", async () => {
    const { result } = renderHook(() => useLoginForm());
    const mockEvent = { preventDefault: jest.fn() } as unknown as React.FormEvent<HTMLFormElement>;

    // Simulate a successful API response handler
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: "mock-jwt-auth-string" }),
    });

    act(() => {
      result.current.setEmail("admin@lendsqr.com");
      result.current.setPassword("securePassword123");
    });

    await act(async () => {
      await result.current.handleLoginSubmit(mockEvent);
    });

    expect(result.current.errors).toEqual({});
    expect(mockPush).toHaveBeenCalledWith("/dashboard/users");
  });
});
