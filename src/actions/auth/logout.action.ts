export async function logout() {
  fetch("/api/auth/logout", { method: "POST" });
}
