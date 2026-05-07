import { fireEvent, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { inviteApi } from "@api/invite";
import renderUi from "@test/renderUi";

import SetPassword from "./SetPassword";

vi.mock("@api/invite", () => ({
  inviteApi: {
    verifyToken: vi.fn(),
    setPassword: vi.fn(),
  },
}));

vi.mock("@components/ui/Header/Header", () => ({
  default: () => null,
}));

const mockVerifyToken = vi.mocked(inviteApi.verifyToken);
const mockSetPassword = vi.mocked(inviteApi.setPassword);

const renderPage = (token?: string) =>
  renderUi(<SetPassword />, {
    initialEntries: [token ? `/set-password?token=${token}` : "/set-password"],
  });

const waitForForm = () =>
  waitFor(() =>
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument(),
  );

const fillAndSubmit = (password: string, confirm: string) => {
  fireEvent.change(screen.getByLabelText(/^password$/i), {
    target: { value: password },
  });
  fireEvent.change(screen.getByLabelText(/confirm password/i), {
    target: { value: confirm },
  });
  fireEvent.click(screen.getByRole("button", { name: /set password/i }));
};

describe("SetPassword", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  // ── No token ──────────────────────────────────────────────────────────────

  it("shows an error alert immediately when no token is in the URL", () => {
    renderPage();

    expect(screen.getByText(/no invitation token found/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /go to login/i }),
    ).toBeInTheDocument();
    expect(mockVerifyToken).not.toHaveBeenCalled();
  });

  // ── Verify token — error ──────────────────────────────────────────────────

  it("shows an error alert when verifyToken rejects", async () => {
    mockVerifyToken.mockRejectedValue(new Error("expired"));

    renderPage("bad-token");

    await waitFor(() =>
      expect(screen.getByText(/invalid or has expired/i)).toBeInTheDocument(),
    );
    expect(
      screen.getByRole("link", { name: /go to login/i }),
    ).toBeInTheDocument();
  });

  // ── Verify token — success ────────────────────────────────────────────────

  describe("valid token", () => {
    beforeEach(() => {
      mockVerifyToken.mockResolvedValue({
        name: "Tanaka Hiroshi",
        email: "tanaka@dojo.ro",
      });
    });

    it("renders the form with the student's name after token verification", async () => {
      renderPage("valid-token");

      await waitFor(() =>
        expect(
          screen.getByRole("heading", { name: /set your password/i }),
        ).toBeInTheDocument(),
      );
      expect(screen.getByText(/welcome, tanaka hiroshi/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /set password/i }),
      ).toBeInTheDocument();
    });

    // ── Form validation ─────────────────────────────────────────────────────

    it.each([
      {
        label: "password too short",
        password: "short",
        confirm: "short",
        errorPattern: /at least 8 characters/i,
      },
      {
        label: "passwords do not match",
        password: "ValidPass1!",
        confirm: "DifferentPass2!",
        errorPattern: /passwords do not match/i,
      },
    ])(
      "shows a validation error when $label",
      async ({ password, confirm, errorPattern }) => {
        renderPage("valid-token");
        await waitForForm();
        fillAndSubmit(password, confirm);

        await waitFor(() =>
          expect(screen.getByText(errorPattern)).toBeInTheDocument(),
        );
      },
    );

    // ── Submit — success ────────────────────────────────────────────────────

    it.each([
      {
        label: "shows the success screen",
        token: "valid-token",
        verify: async () => {
          await waitFor(() =>
            expect(
              screen.getByText(/your password has been set/i),
            ).toBeInTheDocument(),
          );
          expect(
            screen.getByRole("link", { name: /go to login/i }),
          ).toBeInTheDocument();
        },
      },
      {
        label: "calls setPassword with the correct token and password",
        token: "my-secret-token",
        verify: async () => {
          await waitFor(() =>
            expect(mockSetPassword).toHaveBeenCalledWith({
              token: "my-secret-token",
              password: "NewSecurePass1!",
            }),
          );
        },
      },
    ])("on valid submission: $label", async ({ token, verify }) => {
      mockSetPassword.mockResolvedValue(undefined);

      renderPage(token);
      await waitForForm();
      fillAndSubmit("NewSecurePass1!", "NewSecurePass1!");

      await verify();
    });

    // ── Submit — server error ───────────────────────────────────────────────

    it.each([
      {
        label: "400 response",
        error: Object.assign(new Error("Bad Request"), {
          isAxiosError: true,
          response: { status: 400 },
        }),
        isAxiosError: true,
        errorPattern: /invalid or has expired/i,
      },
      {
        label: "network error",
        error: new Error("Network error"),
        isAxiosError: false,
        errorPattern: /something went wrong/i,
      },
    ])(
      "shows an error alert on $label",
      async ({ error, isAxiosError, errorPattern }) => {
        mockSetPassword.mockRejectedValue(error);

        const axios = await import("axios");
        vi.spyOn(axios.default, "isAxiosError").mockReturnValue(isAxiosError);

        renderPage("valid-token");
        await waitForForm();
        fillAndSubmit("NewSecurePass1!", "NewSecurePass1!");

        await waitFor(() =>
          expect(screen.getByText(errorPattern)).toBeInTheDocument(),
        );
      },
    );
  });
});
