"use client";

export default function LogoutButton() {
  async function handleLogout() {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    window.location.href = "/admin/login";
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-gray-100"
    >
      Logout
    </button>
  );
}